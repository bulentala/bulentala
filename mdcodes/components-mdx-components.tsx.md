Dosya Yolu: components\mdx-components.tsx

```tsx
import { ReactNode, ComponentProps } from "react";

export const CustomMDXComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a className="text-blue-600 hover:underline" {...props} />
  ),

  Alert: ({ children }: { children: ReactNode }) => (
    <div className="p-4 my-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800">
      {children}
    </div>
  ),
};

```