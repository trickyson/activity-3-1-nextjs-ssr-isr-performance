# Activity 3.1 — Performance Memo

**Status:** Pending actual local k6 measurements. Do not submit this placeholder as a completed benchmark.

## Test environment
- Next.js production server: `npm run build && npm start`
- MySQL: XAMPP `testdb.timesample`
- k6: 10 virtual users for 10 seconds
- SSR URL: `http://localhost:3000/server-side`

## Measured results (fill after running k6)
- Total HTTP requests: **TBD**
- Average response duration: **TBD**
- 95th percentile response duration: **TBD**
- Request failure rate: **TBD**
- Successful checks: **TBD**

## 200-word memo
Write the final 200-word analysis after capturing the actual k6 output. Explain that SSR performs a database query on each request while ISR serves a pre-rendered page with a 10-second regeneration window. Report measured values and compare SSR/ISR using additional equivalent load tests before making numerical claims.
