# Activity 3.1 — Performance Memo

This activity evaluated Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) using a Next.js Pages Router application. The SSR page queried the latest record from a MySQL database through mysql2 on every request. The ISR page displayed a generated timestamp and used a ten-second revalidation interval. GitHub Actions provided an Ubuntu runner, a temporary MySQL 8 service, database seeding, a production Next.js build, and automated endpoint verification. Both pages were benchmarked separately with k6 using ten virtual users for ten seconds.

The successful workflow recorded 6,911 HTTP requests for SSR and 36,391 for ISR. Average request duration was 14.40 milliseconds for SSR and 2.72 milliseconds for ISR. Thus, ISR processed approximately 5.27 times as many requests during its test and showed approximately 81 percent lower average request duration. These measurements reflect the GitHub-hosted testing environment, not a local Windows or XAMPP installation.

The difference is consistent with their rendering strategies: SSR performs a database query for each request, while ISR serves previously generated content and periodically regenerates it. ISR performed better for this static demonstration, whereas SSR remains appropriate when responses require current database information. Results should not be generalized without repeated tests under controlled conditions and comparable production workloads.

## Measured evidence

| Metric | SSR | ISR |
|---|---:|---:|
| HTTP requests | 6,911 | 36,391 |
| Mean response duration | 14.40 ms | 2.72 ms |

Source: [Successful GitHub Actions k6 workflow #5](https://github.com/trickyson/activity-3-1-nextjs-ssr-isr-performance/actions/runs/43152888666). The memo above contains exactly 200 words; headings and table are excluded.
