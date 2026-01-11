const fs = require('fs').promises;
const path = require('path');
const v8toIstanbul = require('v8-to-istanbul');
const reports = require('istanbul-reports');
const { createContext } = require('istanbul-lib-report');
const { createCoverageMap } = require('istanbul-lib-coverage');

const coverageDir = path.join(process.cwd(), 'coverage/temp');
const istanbulCoverageDir = path.join(process.cwd(), 'coverage/frontend');

async function convertCoverage() {
  // 1. Check for data
  try { await fs.access(coverageDir); } catch { console.log('No coverage data found.'); return; }

  const coverageMap = createCoverageMap();
  const files = await fs.readdir(coverageDir);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const v8Coverage = JSON.parse(await fs.readFile(path.join(coverageDir, file), 'utf-8'));

    for (const entry of v8Coverage) {
      if (!entry.url) continue;
      // Filter: Only localhost files, ignore node_modules
      if (entry.url.includes('localhost') && !entry.url.includes('node_modules')) {
        let scriptPath = entry.url;
        try { scriptPath = new URL(entry.url).pathname; } catch(e) {}
        if (scriptPath.startsWith('/')) scriptPath = scriptPath.substring(1);
        
        const diskPath = path.join(process.cwd(), 'public', scriptPath);

        try {
            const converter = v8toIstanbul(diskPath, 0, { source: entry.source });
            await converter.load();
            converter.applyCoverage(entry.functions);
            coverageMap.merge(converter.toIstanbul());
        } catch (err) {}
      }
    }
  }

  // 3. Generate HTML Report
  const context = createContext({ dir: istanbulCoverageDir, coverageMap });
  ['html', 'lcovonly'].forEach(type => reports.create(type).execute(context));

  // Logic to check thresholds
  const summary = coverageMap.getCoverageSummary().data;
  
  
  const thresholds = { lines: 10, statements: 10, functions: 10, branches: 10 };
  let belowThreshold = [];

  for (const [metric, threshold] of Object.entries(thresholds)) {
    const covered = summary[metric].pct;
    if (covered < threshold) belowThreshold.push(`${metric}: ${covered}%`);
  }

  if (belowThreshold.length > 0) {
    console.error(' Thresholds NOT met.');
    process.exitCode = 1;
  } else {
    
    console.log('\n All frontend coverage thresholds met.'); 
  }

  console.log(`Coverage report generated in ${istanbulCoverageDir}`);
}

convertCoverage();