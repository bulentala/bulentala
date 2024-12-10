import { writeFileSync, readdirSync, statSync, readFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

const excludeFiles = [
  "favicon.ico",
  "README.md",
  "file.svg",
  "globe.svg",
  "next.svg",
  "vercel.svg",
  "window.svg",
  "package.json",
  "pnpm-lock.yaml",
  "test.mdx",
  ".gitignore",
];
const excludeFolders = [
  ".git",
  "node_modules",
  ".next",
  ".vscode",
  ".github",
  "scan",
];

const scanDirectory = (dir: string): { path: string; content: string }[] => {
  let results: { path: string; content: string }[] = [];
  readdirSync(dir).forEach((file) => {
    if (excludeFiles.includes(file) || excludeFolders.includes(file)) return;
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(scanDirectory(filePath));
    } else {
      results.push({
        path: filePath,
        content: readFileSync(filePath, "utf-8"),
      });
    }
  });
  return results;
};

export async function GET() {
  try {
    const files = scanDirectory(process.cwd());
    writeFileSync("data/data.json", JSON.stringify(files, null, 2), "utf-8");
    return NextResponse.json({ files });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to scan directory" },
      { status: 500 },
    );
  }
}
