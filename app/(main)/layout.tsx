export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto container px-6 pt-10 md:py-20 prose prose-zinc md:prose-lg lg:prose-xl">
      {children}
    </div>
  );
}
