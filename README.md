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

Para evitar el not found por incompatibilidad de https a http se pone esto en package.json: "dev": "set NODE_TLS_REJECT_UNAUTHORIZED=0&& next dev"