"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  PiArrowSquareOut,
  PiArrowClockwise,
  PiRocketLaunch,
  PiArrowsOut,
  PiX,
  PiLock,
  PiGlobe,
} from "react-icons/pi";
import FadeDown from "@/components/motionEffect/FadeDown";
import { deployedAppPreview } from "@/../public/data/ResearchDeployedData";

const ResearchDeployed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const reload = useCallback(() => {
    setIsLoading(true);
    setLoadError(false);
    if (iframeRef.current) {
      iframeRef.current.src = deployedAppPreview.url;
    }
  }, []);

  const openExternal = () => {
    window.open(deployedAppPreview.url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add("browser-fullscreen-active");
    } else {
      document.body.classList.remove("browser-fullscreen-active");
    }
    return () => document.body.classList.remove("browser-fullscreen-active");
  }, [isFullscreen]);

  const BrowserChrome = ({ fullscreen = false }: { fullscreen?: boolean }) => (
    <div className={`browser-window${fullscreen ? " fullscreen" : ""}`}>
      {/* Title bar */}
      <div className="browser-toolbar">
        <div className="browser-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span
            className="dot green"
            role="button"
            tabIndex={0}
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={() => setIsFullscreen(!fullscreen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsFullscreen(!fullscreen);
            }}
          />
        </div>
        <div className="browser-tabs-area">
          <div className="browser-tab active">
            <span className="browser-tab-favicon">◉</span>
            <span className="browser-tab-title">{deployedAppPreview.title}</span>
          </div>
        </div>
        {fullscreen && (
          <button
            type="button"
            className="browser-close-fullscreen"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
          >
            <PiX size={18} />
          </button>
        )}
      </div>

      {/* Address bar */}
      <div className="browser-nav">
        <button
          type="button"
          className="browser-nav-btn"
          onClick={reload}
          aria-label="Reload"
          title="Reload"
        >
          <PiArrowClockwise size={16} />
        </button>
        <div className="browser-url-bar">
          <PiLock size={13} className="browser-lock" />
          <span className="browser-url">{deployedAppPreview.url}</span>
        </div>
        <button
          type="button"
          className="browser-nav-btn"
          onClick={() => setIsFullscreen(!fullscreen)}
          aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          <PiArrowsOut size={16} />
        </button>
        <button
          type="button"
          className="browser-nav-btn primary"
          onClick={openExternal}
          aria-label="Open in new tab"
          title="Open in new tab"
        >
          <PiArrowSquareOut size={16} />
        </button>
      </div>

      {/* Viewport */}
      <div className="browser-viewport">
        {isLoading && !loadError && (
          <div className="browser-loading">
            <div className="browser-spinner" />
            <p className="browser-loading-text">Loading {deployedAppPreview.title}…</p>
            <p className="browser-loading-sub">Spinning up the deployment</p>
          </div>
        )}

        {loadError && (
          <div className="browser-fallback">
            <div className="fallback-icon">
              <PiGlobe size={28} />
            </div>
            <p className="fallback-title">Embedding blocked by the host</p>
            <p className="fallback-sub">Open it directly for the full experience.</p>
            <button type="button" className="browser-fallback-btn" onClick={openExternal}>
              Open BAMM Dashboard
              <PiArrowSquareOut size={15} />
            </button>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={deployedAppPreview.url}
          title={deployedAppPreview.title}
          className={`browser-iframe${isLoading || loadError ? " hidden" : ""}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setLoadError(true);
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );

  return (
    <section className="research-deployed-section">
      <style jsx global>{`
        body.browser-fullscreen-active {
          overflow: hidden;
        }
      `}</style>

      <div className="container">
        <FadeDown>
          <div className="deploy-header">
            <div className="deploy-badge">
              <span className="badge-live-dot" />
              <PiRocketLaunch size={13} />
              Research Deployed
            </div>

            <h2 className="deploy-title">
              Try It{" "}
              <span className="deploy-title-accent">Live</span>
              {" "}— In Your Browser
            </h2>

            <p className="deploy-desc">{deployedAppPreview.description}</p>

            <Link
              href={deployedAppPreview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="deploy-open-link"
            >
              Open full app
              <PiArrowSquareOut size={15} />
            </Link>
          </div>
        </FadeDown>

        <FadeDown>
          <div className="browser-outer">
            {!isFullscreen && <BrowserChrome />}
          </div>
          <div className="browser-hint-row">
            <span>Scroll, click, and generate motion directly from this page</span>
            <span className="browser-hint-dot" />
            <span>Use fullscreen for the best experience</span>
          </div>
        </FadeDown>
      </div>

      {isFullscreen && <BrowserChrome fullscreen />}
    </section>
  );
};

export default ResearchDeployed;
