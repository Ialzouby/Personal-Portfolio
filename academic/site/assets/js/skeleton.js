/* =============================================================================
   Motion-sequence visualiser
   Procedurally animates a skeleton through a gait cycle and renders a receding
   trail of earlier poses, mirroring how generated motion is shown in papers.
   No dependencies; pure canvas 2D with a hand-rolled perspective projection.
   ========================================================================== */
(function () {
  "use strict";

  var canvas = document.getElementById("motion-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- proportions (metres-ish, pelvis at origin, +y up, +z forward) ---- */
  var SEG = {
    thigh: 0.42, shin: 0.40, foot: 0.15,
    spineLow: 0.21, spineUp: 0.21, neck: 0.10, skull: 0.10,
    upperArm: 0.27, foreArm: 0.24, hand: 0.08,
    hipHalf: 0.10, shoulderHalf: 0.17
  };

  var BONES = [
    ["pelvis", "spine"], ["spine", "chest"], ["chest", "neck"], ["neck", "head"],
    ["chest", "shoulderL"], ["chest", "shoulderR"],
    ["shoulderL", "elbowL"], ["elbowL", "wristL"], ["wristL", "handL"],
    ["shoulderR", "elbowR"], ["elbowR", "wristR"], ["wristR", "handR"],
    ["pelvis", "hipL"], ["pelvis", "hipR"],
    ["hipL", "kneeL"], ["kneeL", "ankleL"], ["ankleL", "toeL"],
    ["hipR", "kneeR"], ["kneeR", "ankleR"], ["ankleR", "toeR"]
  ];

  var GHOSTS = 6;        // trailing poses
  var GHOST_STEP = 16;   // frames between captured poses
  var GHOST_GAP = 0.60;  // world-space spacing between trail poses
  var GROUND_Y = -0.79;
  var BASE_YAW = 0.5;    // three-quarter view so the trail reads as receding

  function rotY(x, z, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [x * c + z * s, z * c - x * s];
  }

  /* Forward kinematics for one frame of the gait cycle. */
  function buildPose(p) {
    var j = {};
    var bob = 0.035 * Math.cos(2 * p);
    var sway = 0.022 * Math.sin(p);
    var hipTwist = 0.11 * Math.sin(p);
    var shoulderTwist = -0.17 * Math.sin(p);
    var lean = 0.05;

    j.pelvis = [sway, bob, 0];
    j.spine = [sway * 0.6, bob + SEG.spineLow, lean * 0.4];
    j.chest = [sway * 0.3, bob + SEG.spineLow + SEG.spineUp, lean];
    j.neck = [0, j.chest[1] + SEG.neck, lean * 1.1];
    j.head = [0, j.neck[1] + SEG.skull, lean * 1.25 + 0.02 * Math.sin(2 * p)];

    // --- legs ---
    [["L", p, -1], ["R", p + Math.PI, 1]].forEach(function (leg) {
      var side = leg[0], ph = leg[1], dir = leg[2];
      var hip = rotY(dir * SEG.hipHalf, 0, hipTwist);
      var hx = j.pelvis[0] + hip[0], hz = j.pelvis[2] + hip[1], hy = j.pelvis[1];

      // knee flexes through swing (peaks at ph = 0) and stays near-straight in stance
      var thigh = 0.62 * Math.sin(ph);
      var bend = 0.95 * Math.max(0, Math.cos(ph)) + 0.1;
      var shin = thigh - bend;

      var kx = hx, ky = hy - SEG.thigh * Math.cos(thigh), kz = hz + SEG.thigh * Math.sin(thigh);
      var ax = kx, ay = ky - SEG.shin * Math.cos(shin), az = kz + SEG.shin * Math.sin(shin);
      var ankleAngle = -0.25 + 0.35 * Math.sin(ph + 1.2);

      j["hip" + side] = [hx, hy, hz];
      j["knee" + side] = [kx, ky, kz];
      j["ankle" + side] = [ax, ay, az];
      j["toe" + side] = [ax, ay + SEG.foot * Math.sin(ankleAngle), az + SEG.foot * Math.cos(ankleAngle)];
    });

    // --- arms (counter-swing against the same-side leg) ---
    [["L", p, -1], ["R", p + Math.PI, 1]].forEach(function (arm) {
      var side = arm[0], ph = arm[1], dir = arm[2];
      var sh = rotY(dir * SEG.shoulderHalf, 0, shoulderTwist);
      var sx = j.chest[0] + sh[0], sz = j.chest[2] + sh[1], sy = j.chest[1];

      var upper = -0.52 * Math.sin(ph);
      var elbow = 0.42 + 0.3 * Math.max(0, Math.sin(ph + 0.6));
      var fore = upper + elbow;

      var ex = sx + dir * 0.02, ey = sy - SEG.upperArm * Math.cos(upper), ez = sz + SEG.upperArm * Math.sin(upper);
      var wx = ex, wy = ey - SEG.foreArm * Math.cos(fore), wz = ez + SEG.foreArm * Math.sin(fore);

      j["shoulder" + side] = [sx, sy, sz];
      j["elbow" + side] = [ex, ey, ez];
      j["wrist" + side] = [wx, wy, wz];
      j["hand" + side] = [wx, wy - SEG.hand * Math.cos(fore), wz + SEG.hand * Math.sin(fore)];
    });

    return j;
  }

  /* ---- render state ---- */
  var W = 0, H = 0, dpr = 1;
  var theme = { accent: "#6b86ff", line: "rgba(255,255,255,0.12)", dot: "#ffffff" };
  var frames = [];
  var frameCount = 0;
  var yaw = 0, yawTarget = 0;
  var pointerX = 0, hasPointer = false;
  var running = true;
  var startTime = performance.now();

  function readTheme() {
    var cs = getComputedStyle(document.documentElement);
    theme.accent = cs.getPropertyValue("--accent").trim() || "#6b86ff";
    theme.dot = cs.getPropertyValue("--text").trim() || "#ffffff";
    theme.muted = cs.getPropertyValue("--muted").trim() || "#7d8494";
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* Perspective projection: world -> screen. Returns [x, y, scale, depth]. */
  var FOCAL = 2.6, CAM_DIST = 3.5, Y_LIFT = 0.1;
  var X_ANCHOR = 0.57; // current pose sits right of centre; the trail runs left

  function project(pt, zShift) {
    var r = rotY(pt[0], pt[2] + zShift, yaw);
    var x = r[0], z = r[1];
    // camera sits at +z looking toward -z, so receding poses gain depth and shrink
    var depth = CAM_DIST - z;
    if (depth < 0.5) depth = 0.5;
    var k = FOCAL / depth;
    var S = Math.min(W, H) * 0.5;
    return [W * X_ANCHOR + x * k * S, H / 2 - (pt[1] + Y_LIFT) * k * S, k, depth];
  }

  function drawGround() {
    var span = 1.8, near = 1.6, far = -4.0, step = 0.3;
    ctx.fillStyle = theme.muted;
    for (var z = far; z <= near; z += step) {
      for (var x = -span; x <= span + 0.001; x += step) {
        var q = project([x, GROUND_Y, z], 0);
        if (q[1] < 0 || q[1] > H || q[0] < -20 || q[0] > W + 20) continue;
        var fade = Math.max(0, Math.min(1, (q[3] - 2.0) / 4.5));
        ctx.globalAlpha = 0.3 * Math.pow(1 - fade, 1.6);
        var r = Math.max(0.6, q[2] * 1.1);
        ctx.beginPath();
        ctx.arc(q[0], q[1], r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawPose(pose, zShift, alpha, isCurrent) {
    var pts = {};
    for (var name in pose) pts[name] = project(pose[name], zShift);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // bones
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = isCurrent ? 2 : 1.25;
    if (isCurrent) {
      ctx.shadowColor = theme.accent;
      ctx.shadowBlur = 12;
    }
    ctx.beginPath();
    for (var i = 0; i < BONES.length; i++) {
      var a = pts[BONES[i][0]], b = pts[BONES[i][1]];
      if (!a || !b) continue;
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // head — radius is the projected neck-to-skull distance so the circle
    // meets the neck joint exactly instead of floating above it
    var h = pts.head, nk = pts.neck;
    var skullR = Math.max(2, Math.hypot(h[0] - nk[0], h[1] - nk[1]));
    ctx.beginPath();
    ctx.arc(h[0], h[1], skullR, 0, Math.PI * 2);
    ctx.stroke();

    // joints
    if (isCurrent) {
      ctx.fillStyle = theme.dot;
      ctx.globalAlpha = alpha * 0.9;
      for (var k in pts) {
        if (k === "head") continue;
        var q = pts[k];
        ctx.beginPath();
        ctx.arc(q[0], q[1], Math.max(1.2, q[2] * 3.2), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // contact shadow under the figure
    if (isCurrent) {
      ["ankleL", "ankleR"].forEach(function (key) {
        var world = pose[key];
        var g = project([world[0], GROUND_Y, world[2]], zShift);
        var rad = Math.max(3, g[2] * 16);
        var grad = ctx.createRadialGradient(g[0], g[1], 0, g[0], g[1], rad);
        grad.addColorStop(0, theme.accent);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(g[0], g[1], rad, rad * 0.34, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    ctx.globalAlpha = 1;
  }

  function render(now) {
    var t = (now - startTime) / 1000;
    ctx.clearRect(0, 0, W, H);

    // gentle sway around the base angle plus pointer parallax
    yawTarget = BASE_YAW + 0.2 * Math.sin(t * 0.19) + (hasPointer ? pointerX * 0.35 : 0);
    yaw += (yawTarget - yaw) * 0.05;

    var pose = buildPose(t * 2.5);
    frames.push(pose);
    if (frames.length > GHOSTS * GHOST_STEP + 2) frames.shift();

    drawGround();

    // oldest/furthest first so nearer poses paint over them
    for (var g = GHOSTS; g >= 1; g--) {
      var idx = frames.length - 1 - g * GHOST_STEP;
      if (idx < 0) continue;
      var fade = 1 - g / (GHOSTS + 1);
      drawPose(frames[idx], -g * GHOST_GAP, 0.5 * Math.pow(fade, 0.7), false);
    }
    drawPose(pose, 0, 1, true);

    frameCount++;
    if (running) requestAnimationFrame(render);
  }

  function renderStatic() {
    ctx.clearRect(0, 0, W, H);
    yaw = BASE_YAW;
    drawGround();
    for (var g = GHOSTS; g >= 1; g--) {
      var fade = 1 - g / (GHOSTS + 1);
      drawPose(buildPose(-g * 0.55), -g * GHOST_GAP, 0.5 * Math.pow(fade, 0.7), false);
    }
    drawPose(buildPose(0), 0, 1, true);
  }

  /* ---- wiring ---- */
  readTheme();
  resize();

  window.addEventListener("resize", function () {
    resize();
    if (reduced) renderStatic();
  });

  document.addEventListener("themechange", function () {
    readTheme();
    if (reduced) renderStatic();
  });

  canvas.addEventListener("pointermove", function (e) {
    var rect = canvas.getBoundingClientRect();
    pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    hasPointer = true;
  });
  canvas.addEventListener("pointerleave", function () { hasPointer = false; });

  if (reduced) {
    renderStatic();
    return;
  }

  // pause the loop when the visual scrolls out of view
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      var visible = entries[0].isIntersecting;
      if (visible && !running) {
        running = true;
        requestAnimationFrame(render);
      } else if (!visible) {
        running = false;
      }
    }, { threshold: 0 }).observe(canvas);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      requestAnimationFrame(render);
    }
  });

  requestAnimationFrame(render);
})();
