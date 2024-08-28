import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh">
      <Header></Header>

      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
