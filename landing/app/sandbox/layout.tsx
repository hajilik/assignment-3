import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sandbox — Unibank BaaS API Explorer",
  description: "Test the Unibank BaaS REST API interactively before going live.",
};

export default function SandboxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
