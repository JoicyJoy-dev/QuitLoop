import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/forgot-password");

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
