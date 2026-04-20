import type { Metadata } from "next";
import { ViewTransitionProvider } from "@/context/view-transition-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joe Danields — Creative Technologist",
  description: "Next.js 15 technical portfolio blending AI/ML and premium interaction design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ViewTransitionProvider>{children}</ViewTransitionProvider>
      </body>
    </html>
  );
}
