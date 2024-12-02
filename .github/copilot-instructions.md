# Copilot Instructions

## General Guidelines

- Use ECMA-262, 15th edition standards when writing code.
- Write code in its simplest form and as basic as possible.
- Follow the Next.js v15 App Router structure.

## Type Definitions

- Use TypeScript for type safety.
- Use Zod for schema validation.
- Define types and schemas in a separate file (e.g., `types/playlist.ts`).

### Example:

```typescript
// [playlist.ts](http://_vscodecontentref_/2)
import { z } from "zod";
export const PlaylistItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});
export type PlaylistItem = z.infer<typeof PlaylistItemSchema>;
```

## API Routes

- Use `NextResponse` from `next/server` to handle responses.
- Validate data using Zod schemas before sending the response.

## Fetching Data

- Use environment variables for API URLs.
- Handle errors gracefully and log them.

## Page Components

- Use TypeScript for type safety.
- Fetch data directly within the component using async/await.
- Use `Link` from `next/link` for navigation.
- Map over data arrays to dynamically generate components.
- Ensure each mapped component has a unique `key` prop.
