"use client";

import { useEffect, useRef } from "react";

import { BaseApp } from "@/demos/base";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const app = new BaseApp(container);
    app.start();

    return () => {
      app.dispose();
    };
  }, []);

  return <div ref={containerRef} className="size-full"></div>;
}
