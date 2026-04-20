"use client";

import { ViewTransitions } from "next-view-transitions";

export function ViewTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ViewTransitions>{children}</ViewTransitions>;
}
