"use client";

import { useEffect, useRef } from "react";

import { DraggingApp } from "@/demos/dragging";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const app = new DraggingApp(container);
    app.start();

    return () => {
      app.dispose();
    };
  }, []);

  return <div ref={containerRef} className="size-full"></div>;
}
