import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/layout/Footer";

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
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-primary-fixed px-4 py-2 rounded-full text-sm mb-4">
              Next-Gen Vocational Training
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Bridge the Gap. <br />
              <span className="text-primary">Lead the Industry.</span>
            </h1>

            <p className="mt-6 text-lg text-on-surface-variant">
              Master culinary arts with modern engineering and food-tech
              innovation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn-primary">Explore Courses</button>

              <button className="btn-outlined">Partner With Us</button>
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
          <h2 className="text-3xl font-bold mb-10">Featured Courses</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="min-w-[30%] snap-start">
                <div className="bg-white rounded-[2rem] p-6 airy-shadow border border-slate-100 group cursor-pointer transition-all hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-2xl h-56 mb-6">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-xs">
                      Industry Led
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-label-sm text-outline">
                      <span className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          data-icon="schedule"
                        >
                          schedule
                        </span>{" "}
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          data-icon="bar_chart"
                        >
                          bar_chart
                        </span>{" "}
                        {course.level}
                      </span>
                    </div>
                    <h3 className="font-h3 text-h3 text-on-background">
                      {course.title}
                    </h3>
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-primary">
                        {course.price}
                      </span>
                      <button className="text-primary-container font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Enroll Now{" "}
                        <span
                          className="material-symbols-outlined"
                          data-icon="arrow_forward"
                        >
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="md:py-24 bg-surface-container-low overflow-hidden">
        <div className="container mx-auto px-0 md:px-6">
          <div className="bg-primary-container md:rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  stroke="white"
                  strokeDasharray="10 10"
                  strokeWidth="2"
                ></circle>
                <circle
                  cx="200"
                  cy="200"
                  r="140"
                  stroke="white"
                  strokeWidth="2"
                ></circle>
                <circle
                  cx="200"
                  cy="200"
                  r="100"
                  stroke="white"
                  strokeDasharray="5 5"
                  strokeWidth="2"
                ></circle>
              </svg>
            </div>
            <div className="md:w-3/5 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-[0.5] font-medium rounded-full bg-white/20 backdrop-blur-sm text-label-sm border border-white/30">
                Direct Industry Pipeline
              </div>
              <h2 className="font-h1 text-h1 leading-none">
                Real-World Experience at Scale.
              </h2>
              <p className="font-body-lg text-white/80">
                Our apprenticeships connect you directly with top-tier food
                processing units. Learn on-site, earn credits, and secure your
                place in the industry before you graduate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-xl font-h3 text-body-md shadow-lg active:scale-95 transition-all">
                  View Placements
                </button>
                <div className="flex -space-x-3 items-center">
                  <img
                    alt="Student 1"
                    className="w-10 h-10 rounded-full border-2 border-primary-container"
                    data-alt="portrait of a young professional smiling in a clean industrial kitchen setting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7PYqPc54xICeG5HJCUM_FrTAx74kuBeOCUeY5z2kDxwrThIW7shnhJR_T4ifFrwith8_brB29BXoW0XgBc7Bhra-SbgYD8e_N7_oPCnqZJI1InsHaPUEll2ggDyWoXYzwRa-V4_tnm_1DOdXOmsNfaPaB00e2nyVUMTOMHUCIDYwIEKBzmjIZ752ePuLeF8SX72hh3n3GnaXgUsewAcCvosg1Et1C1DprDK5jDyuyYyj0p5ueK_gMq1GxVInaIjXlQVf6FZwOsUE"
                  />
                  <img
                    alt="Student 2"
                    className="w-10 h-10 rounded-full border-2 border-primary-container"
                    data-alt="portrait of a confident woman in a lab coat in a modern science facility"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlB846S7gcyMzNh67fU_SftVZLAs98I5jHkqVN73At5Le24glBgy2aSCzo94i23OZlveLGTgKqZbTGquuJlhqascCDktzy6pltFaEoh-12qBoYK6id6-TaFlArcbW55njDgT2xQ4dqvu9RZtCzIOymkxZClMCJ330KGXogJEUZezmlS7koOdSVDxFMejWGRZK1lIfcuM3ZtVixUzCTAOB579d_c85eBHjd7O2ne5Wb-6LF_M1bw4K0YYaD4QDXIjPRsm8bdn85dOc"
                  />
                  <img
                    alt="Student 3"
                    className="w-10 h-10 rounded-full border-2 border-primary-container"
                    data-alt="portrait of a young man with a friendly expression in a corporate tech environment"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWUd2jVfNhYQ9Cd9P-loUtQC86d9OhphI-u7GOLmw2sTmp9vBoOOjthn1fDhdQklc4jFgfU4mxsQVnbjZ5BGmy-z0gwl_mxDQ9xfaYNAe-684Ho5exARrfVY3cC5DHWqb7hgOYzn2PDsIlu0xAvUQvv9l9jDc5lfFOD1sjpNTfVNpv7rRnTHNIaYrPTntuHBuDKf_GyBqAYAugFd750OMOnqgVvBN8YRAbb5E-GO28neId2vpwmwgYEB-nZKXZBVtQ1EUWX_2XhxE"
                  />
                  <span className="pl-6 text-label-sm font-medium">
                    Joined by 500+ professionals
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex flex-col gap-4 relative z-10">
              <div className="glass-card p-6 rounded-2xl border-white/20 text-on-background">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="material-symbols-outlined text-primary-container"
                    data-icon="factory"
                  >
                    factory
                  </span>
                  <p className="font-h3 text-body-md text-slate-800">
                    Global Foods Corp
                  </p>
                </div>
                <p className="text-label-sm text-slate-600 font-medium leading-none mb-4">
                  {"\"CulinaraTech students are the most tech-literate candidates we've interviewed.\""}
                </p>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                  <span>Placement Lead</span>
                  <span className="text-secondary">Verified Partner</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border-white/20 text-on-background translate-x-8">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="material-symbols-outlined text-primary-container"
                    data-icon="precision_manufacturing"
                  >
                    precision_manufacturing
                  </span>
                  <p className="font-h3 text-body-md text-slate-800">
                    AgriTech Solutions
                  </p>
                </div>
                <p className="text-label-sm text-slate-600 font-medium leading-none mb-4">
                  {"\"Bridging the vocational gap with cutting-edge automation training.\""}
                </p>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                  <span>R&amp;D Director</span>
                  <span className="text-secondary">Verified Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </main>
  );
}
