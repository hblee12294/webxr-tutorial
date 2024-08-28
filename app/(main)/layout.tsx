import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header></Header>

      <div className="flex-1 z-0 max-w-5xl mx-auto container px-6 pt-10 md:py-20 prose prose-zinc prose-h1:mb-[2.5em] prose-h2:mt-[2em] md:prose-lg lg:prose-xl">
        {children}
      </div>

      <Footer></Footer>
    </div>
  );
}
