import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/account-deletion");

export default function AccountDeletionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
