const fs = require('fs');
const dir = 'benchmark-results';
const keys = ['http_reqs', 'http_req_duration', 'http_req_failed', 'checks'];
const lines = ['# CI Performance Results', '', 'Environment: GitHub-hosted Ubuntu runner, production Next.js, MySQL 8, 10 k6 VUs, 10 seconds per endpoint.', '', '| Metric | SSR | ISR |', '|---|---:|---:|'];
const reports = ['ssr','isr'].map(name => JSON.parse(fs.readFileSync(`${dir}/${name}-summary.json`, 'utf8')));
const value = (r,key) => {
  const m = r.metrics[key];
  if (!m) return 'N/A';
  if (key === 'http_reqs') return String(m.values.count ?? 'N/A');
  if (key === 'http_req_duration') return (m.values.avg ?? NaN).toFixed(2) + ' ms average';
  return ((m.values.rate ?? NaN)*100).toFixed(2) + '%';
};
for (const key of keys) lines.push(`| ${key} | ${value(reports[0],key)} | ${value(reports[1],key)} |`);
lines.push('', 'These are CI runner measurements, not Windows/XAMPP measurements. SSR and ISR have different data-access behavior; compare with that limitation.');
fs.writeFileSync(`${dir}/comparison.md`, lines.join('\n') + '\n');
console.log(lines.join('\n'));
