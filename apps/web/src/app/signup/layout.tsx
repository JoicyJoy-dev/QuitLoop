import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/signup");

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
