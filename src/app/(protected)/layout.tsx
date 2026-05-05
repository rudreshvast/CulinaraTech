import Navbar from "@/components/ui/navbar";

export const dynamic = 'force-dynamic';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
    </>
  );
}
