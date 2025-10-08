export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* TODO: Agregar Sidebar aquí */}
      <aside className="w-64 bg-placeholder border-r border-selected">
        <div className="p-4">
          <h2 className="text-xl font-bold">Panel Admin</h2>
        </div>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
