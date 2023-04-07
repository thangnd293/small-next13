export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>This is Auth layout</h1>
      {children}
    </div>
  );
}
