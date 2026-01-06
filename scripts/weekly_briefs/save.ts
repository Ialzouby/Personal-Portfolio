// scripts/weekly_briefs/save.ts
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname);

function saveWeeklyJson(name: string, obj: any) {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  const p = path.join(DIR, name);
  fs.writeFileSync(p, JSON.stringify(obj, null, 2));
}

module.exports = { saveWeeklyJson };

export {};
