import http from 'k6/http';
import { check } from 'k6';
export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99']
  }
};
const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
const path = __ENV.TEST_PATH || '/server-side';
export default function () {
  const response = http.get(`${baseUrl}${path}`);
  const expected = path === '/isr' ? 'Incremental Static Regeneration' : 'Server-Side Rendering';
  check(response, {
    'HTTP 200': r => r.status === 200,
    'expected page heading': r => r.body.includes(expected),
    'SSR database value present': r => path === '/isr' || (r.body.includes('CI-MySQL-Verified') || (!r.body.includes('Database unavailable') && !r.body.includes('No rows found')))
  });
}
