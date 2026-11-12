# Activity 3.1 — Next.js SSR vs ISR Performance Analysis Lab

NEUST Graduate School · Web Systems, Frameworks, and Technologies

## Requirements
- Node.js 20+
- XAMPP with MySQL running
- k6 installed locally

## Setup
1. Start **MySQL** in XAMPP.
2. Open `http://localhost/phpmyadmin` and import `database/testdb.sql` (or execute it in SQL tab).
3. Copy `.env.example` to `.env.local` and adjust MySQL credentials.
4. Run `npm install` and `npm run dev`.
5. Visit `http://localhost:3000`, `/server-side`, and `/isr`.

## Production mode and k6
1. Stop the development server.
2. Run `npm run build` then `npm start`.
3. In another terminal run `k6 run tests/load-test.js`.
4. Save the full terminal results and fill `performance-memo.md` with **real measurements**.
5. For a fair SSR-vs-ISR comparison, benchmark both endpoints using identical load parameters (e.g., `BASE_URL` plus a modified path), report both sets of results, and consider DB warmup/caching.

## Architecture
- `/server-side` — `getServerSideProps` queries `testdb.timesample` on every request.
- `/isr` — `getStaticProps` returns a build-time timestamp with `revalidate: 10`.
- `lib/db.js` — MySQL connection via `mysql2/promise`.
- `tests/load-test.js` — k6 script, 10 virtual users, 10 seconds.

## Evidence checklist
- XAMPP MySQL and phpMyAdmin table
- SSR page with real DB value
- ISR page in production mode
- Actual k6 console results
- GitHub Actions successful build
- PDF report with GitHub URL and approved screenshots

**Note:** The SSR page intentionally shows a database error state instead of crashing if MySQL is unavailable. The k6 check detects that state; HTTP 200 alone is not proof of a successful database query.
