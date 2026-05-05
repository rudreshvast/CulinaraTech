import { Footer } from '@/components/layout/Footer';
import Navbar from '@/components/ui/navbar';

export const dynamic = 'force-dynamic';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <main className='container mx-auto'>{children}</main>
      <Footer />
    </>
  );
}
