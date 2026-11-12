const fs = require('fs');
const dir = 'benchmark-results';
const reports = ['ssr', 'isr'].map(name => JSON.parse(fs.readFileSync(`${dir}/${name}-summary.json`, 'utf8')));
function metric(report, key) {
  const m = report.metrics?.[key];
  if (!m) return 'N/A';
  const v = m.values ?? m;
  if (key === 'http_reqs') return String(v.count ?? 'N/A');
  if (key === 'http_req_duration') return typeof v.avg === 'number' ? v.avg.toFixed(2) + ' ms average' : 'N/A';
  return typeof v.rate === 'number' ? (v.rate * 100).toFixed(2) + '%' : 'N/A';
}
const lines = [
  '# CI Performance Results',
  '',
  'Environment: GitHub-hosted Ubuntu runner, production Next.js, MySQL 8, 10 k6 VUs, 10 seconds per endpoint.',
  '',
  '| Metric | SSR | ISR |',
  '|---|---:|---:|'
];
for (const key of ['http_reqs', 'http_req_duration', 'http_req_failed', 'checks']) {
  lines.push(`| ${key} | ${metric(reports[0], key)} | ${metric(reports[1], key)} |`);
}
lines.push('', 'These are CI runner measurements, not Windows/XAMPP measurements.');
fs.writeFileSync(`${dir}/comparison.md`, lines.join('\n') + '\n');
console.log(lines.join('\n'));
