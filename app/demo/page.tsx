"use client";

import { useEffect, useRef } from "react";

import { BaseApp } from "@/components/BaseApp";

export default function Home() {
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

  return <div ref={containerRef} className="h-dvh"></div>;
}
