This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Build Configuration

This project uses a dedicated production TypeScript config at `tsconfig.build.json` so build-time compilation excludes test files and avoids test-only dependency issues. Use `npx next build` for production builds, and continue using `vitest` for test execution.

## Local staging and smoke test

To verify the app is ready to push, run a clean local staging workflow:

1. Install or update dependencies:

```bash
npm install
```

2. Ensure your local environment file contains any required secrets in `.env.local`.

3. Run a clean production build:

```bash
npm run build
```

4. Start the app locally in production mode:

```bash
npm start
```

5. Open `http://localhost:3000` and verify the app loads correctly. Check key routes such as `/`, `/shopping-list`, and `/app-viewer/space-shooter` to ensure pages render.

6. Optionally run the test suite to validate behavior:

```bash
npm test
```

A successful `npm run build` and smoke verification in production mode means the code is ready to push to staging or production.