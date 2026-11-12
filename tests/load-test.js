import http from 'k6/http';
import { check } from 'k6';
export const options = { vus: 10, duration: '10s', thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<2000'] } };
const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
export default function () {
  const res = http.get(`${baseUrl}/server-side`);
  check(res, { 'HTTP status is 200': r => r.status === 200, 'SSR heading present': r => r.body.includes('Server-Side Rendering'), 'database data available': r => !r.body.includes('Database unavailable') });
}
