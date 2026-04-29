import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function LandingPage() {
  const courses = [
    {
      title: "Advanced Food Safety & Biosecurity",
      duration: "12 Weeks",
      level: "Advanced",
      price: "₹14,999",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuApIVFtp_h8j2sqZKpaqjgmI7TYl1auD9Hx8hV390IgAPQZX9EUzrr-Cjbv8VKoiVkWmkjh9SuQiIdSVJOWrzdlbVWJkIHTRPUPd2wFAUsfGp5FZQSxNu_t7kfmmfMRVe40Q40HnLbbPkuraEOmIuSY55tBQDlwHvlSq4r45AEEv7E9RZHPPZFJwdfVbYWpzB39BQqo63NnXg2RxbE9s9Xpc-aLuROURN4xppTaWGFeikxgkdLXk1AlieRm05Ztoy2qAoWYIg6Cdcs",
    },
    {
      title: "Dairy Processing Automation",
      duration: "8 Weeks",
      level: "Intermediate",
      price: "₹12,499",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAlAXxEkk02V8VGFfDr3Hptt-uULUfr5ThKnclmweoH6aFzIJV_Iwxwb6b0xDJNNFtO5SzmjTU76N3DYC9OoSe88zRz5w1gmRh7pFbduM3QpiEh-ju3G6jCDBigLq3fJXqTOwLMWCZaOgJLz0CKpXfM4e0742GS3n6H8K1G_fPJ9MyW5uxy3WazHaIaizPHQtiPgBF_AB0rzI3071ZOTWlizIjVwA2gxOwty0zlH-4814AAT0lDvcCEEuh-fi3k0lJSGf0htkQTCn8",
    },
    {
      title: "Alternative Protein Synthesis",
      duration: "16 Weeks",
      level: "Expert",
      price: "₹18,999",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDX-uHoHsQKjnULWJtelz26_yRMKIaKRRAW7_8K00KLT-fB27ZiyX4W1PhGeeZqghxpSJtunKZz07ZIw6x_LMC3bQlZMR0BKIEGrUN4fN4VVYbqC4cJS0aFe2vTByg4snzUmBNxW9Px5UGGrqQIsb6R6Fyg0UaudzKkgkcaAGc1SI4mqf00y9mem3xGQbvoVY5cRUXxwbImV6EVEIktU7W-CwYyX4dDHe8lgCSLdgrvgzfXsWC0EGT7i3GtL2fDA4taTJEVTcHQ1Q",
    },
  ];

  return (
    <main className="bg-background text-on-background min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">
              CulinaraTech
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="#">Home</Link>
            <Link href="#">Courses</Link>
            <Link href="#">Apprenticeships</Link>
            <Link href="#">Partners</Link>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden">
            <Menu size={24} />
          </button>

          <button className="hidden md:block bg-primary text-white px-5 py-2 rounded-lg">
            Join Platform
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-primary-fixed px-4 py-2 rounded-full text-sm mb-4">
              Next-Gen Vocational Training
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Bridge the Gap. <br />
              <span className="text-primary">
                Lead the Industry.
              </span>
            </h1>

            <p className="mt-6 text-lg text-on-surface-variant">
              Master culinary arts with modern engineering and food-tech
              innovation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn-primary">
                Explore Courses
              </button>

              <button className="btn-outlined">
                Partner With Us
              </button>
            </div>
          </div>

          <div className="relative h-[400px] w-full">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLobF3p9YYI_jvVQMbPcK_G4PS2StAfayFLDq-3EyBPxqko8hQ8piuFNz6iz-CinyZzvyWq1PJOsswfj1suMuJbWisgi59U8S8acgmfusJrvmfOVlUgb5dLyViGOMvRUvH2ZEDXhTkCikUGhyt_OTwJ92QMwf_oAravpy-Ncp3fgQZck8L7TV5dcJW0Ty-pnL5lq4pd4F5YXLaLstC7Lth31rBEKAvOrhkIQcqUU1F4N1pFDyD4g_6rcIREzTv5LU5mRNXqO2lsO0"
              alt="Hero"
              fill
              className="object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">
            Featured Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="card-cyber p-5 rounded-2xl"
              >
                <div className="relative h-56 w-full mb-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  {course.duration} • {course.level}
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {course.title}
                </h3>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-primary font-bold">
                    {course.price}
                  </span>

                  <button className="text-primary font-medium">
                    Enroll →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Real-World Experience at Scale
          </h2>

          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Get connected directly with food-tech companies through
            apprenticeships and placements.
          </p>

          <button className="mt-8 bg-white text-primary px-6 py-3 rounded-lg font-semibold">
            View Placements
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl">
            CulinaraTech
          </h3>

          <div className="flex gap-6 text-sm">
            <Link href="#">Courses</Link>
            <Link href="#">Partners</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}