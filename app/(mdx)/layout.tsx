export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-zinc md:prose-lg lg:prose-xl">{children}</div>
  );
}
