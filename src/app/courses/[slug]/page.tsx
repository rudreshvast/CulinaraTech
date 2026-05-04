import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { courses, featuredCourseSlug } from "@/lib/course-data";

type CourseDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const curriculum = [
  "Introduction to Food Safety",
  "Microbiological Risks & Control",
  "Automation in Quality Assurance",
  "Industrial Case Studies",
];

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { slug } = await params;
  const course =
    courses.find((item) => item.slug === slug) ??
    courses.find((item) => item.slug === featuredCourseSlug);

  if (!course) {
    notFound();
  }

  return (
    <main className="bg-background font-body-md text-on-surface min-h-screen pb-28">
      <Navbar />

      <section className="relative h-[380px] md:h-[500px] w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex flex-col gap-2">
            <span className="bg-primary-container text-on-primary-container w-fit px-4 py-1 rounded-full text-label-sm uppercase tracking-wider">
              {course.level} Certification
            </span>
            <h2 className="font-h1 text-h1 text-on-surface max-w-3xl">
              {course.title}
            </h2>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card airy-shadow p-4 rounded-xl flex flex-col items-center justify-center text-center border-t-2 border-t-secondary-fixed-dim">
              <span className="material-symbols-outlined text-primary mb-2">
                calendar_today
              </span>
              <span className="font-h3 text-h3 block">
                {course.duration.split(" ")[0]}
              </span>
              <span className="text-label-sm text-outline">Weeks</span>
            </div>
            <div className="glass-card airy-shadow p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-primary mb-2">
                signal_cellular_alt
              </span>
              <span className="font-h3 text-h3 block">{course.level}</span>
              <span className="text-label-sm text-outline">Level</span>
            </div>
            <div className="glass-card airy-shadow p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-primary mb-2">
                group
              </span>
              <span className="font-h3 text-h3 block">500+</span>
              <span className="text-label-sm text-outline">Enrolled</span>
            </div>
          </div>

          <article className="flex flex-col gap-4">
            <h3 className="font-h3 text-h3 text-on-surface border-l-4 border-secondary-fixed-dim pl-4">
              Overview
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {course.overview}
            </p>
          </article>

          <div className="flex flex-col gap-4">
            <h3 className="font-h3 text-h3 text-on-surface">Curriculum</h3>
            <div className="space-y-2">
              {curriculum.map((module, index) => (
                <div
                  key={module}
                  className={`glass-card airy-shadow rounded-xl overflow-hidden ${
                    index === 2 ? "border-l-4 border-secondary-fixed-dim" : ""
                  }`}
                >
                  <div
                    className={`w-full p-4 flex items-center justify-between ${
                      index === 2 ? "bg-surface-container-low" : ""
                    }`}
                  >
                    <span className="font-label-sm text-label-sm flex items-center gap-4">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 2
                            ? "bg-primary text-on-primary"
                            : "bg-primary-fixed text-primary"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {module}
                    </span>
                    <span
                      className={`material-symbols-outlined ${
                        index === 2 ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                  {index === 2 ? (
                    <div className="p-4 bg-white text-on-surface-variant border-t border-outline-variant/30">
                      <ul className="space-y-1 list-disc pl-5 text-body-md">
                        <li>AI-driven contamination detection</li>
                        <li>Robotic sampling in high-risk zones</li>
                        <li>Blockchain for supply chain transparency</li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card airy-shadow p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
            <img
              alt={course.instructor}
              className="w-28 h-28 rounded-2xl object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChFclTYynUZFp3mU-bIXxPEFkD7tYQ7I6Up-lEUISpnH0aQeuu6YwVFqvTEUcsFWanboqYW-LRV5xTZRL7jTdUOBF7sR5UGAX5lyyJNMRTs0Cvuk5pki9eFTjA1eNpGL_T4hnbsYPthdiz7yL-0CIVcloBsPtmRYvpaCDx2Tjn_d9lVVJ-g2157NIMYkqa0h3qAOlkQeNgnP7e8v3yxOph6uH7sszcu1os00DNdk3hu4RIjztZQ4VogCJfz9bQ3a3lvPbXxxKxkDM"
            />
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-h3 text-h3 text-on-surface">
                {course.instructor}
              </h4>
              <p className="text-primary font-semibold mb-2">
                Mentor at {course.partner}
              </p>
              <p className="text-on-surface-variant text-body-md">
                Industry-led guidance focused on real production workflows,
                compliance, and practical implementation.
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 glass-card airy-shadow p-6 rounded-3xl border-t-4 border-t-primary-container">
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <span className="text-label-sm text-outline">
                  Full Course Access
                </span>
                {course.originalPrice ? (
                  <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[12px] font-bold">
                    20% OFF
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col">
                <span className="text-h1 font-h1 text-on-surface">
                  {course.price}
                </span>
                {course.originalPrice ? (
                  <span className="text-outline line-through text-body-md">
                    {course.originalPrice}
                  </span>
                ) : null}
              </div>
              <div className="space-y-2 my-2">
                {[
                  "Lifetime access to lectures",
                  "1-on-1 mentorship session",
                  "Industry recognized certificate",
                ].map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      check_circle
                    </span>
                    <span className="text-body-md">{benefit}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-bold text-lg airy-shadow hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-4">
                Enroll Now
                <span className="material-symbols-outlined">trending_flat</span>
              </button>
              <p className="text-center text-label-sm text-outline mt-1">
                7-day money back guarantee
              </p>
              <Link
                href="/courses"
                className="text-center text-primary text-sm font-semibold"
              >
                Back to catalog
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
