import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import { courses } from "@/lib/course-data";

const categories = [
  "All",
  "Food Safety",
  "Dairy Tech",
  "Automation",
  "Quality Control",
  "Packaging Tech",
];

export default function CoursesCatalogPage() {
  return (
    <main className="bg-surface text-on-surface min-h-screen pb-28">
      <Navbar />

      <section className="max-w-[1280px] mx-auto px-6 pt-6">
        <h2 className="font-h2 text-h2 text-on-surface mb-4">
          Master the Future of Food
        </h2>
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input
            className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-container text-body-md transition-all shadow-sm"
            placeholder="Search for courses, technologies, or skills..."
            type="text"
          />
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-label-sm whitespace-nowrap active:scale-95 duration-200 ${
                index === 0
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <article
            key={course.slug}
            className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {course.badge ? (
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">
                    {course.badge}
                  </span>
                </div>
              ) : null}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-primary font-bold text-sm">
                {course.price}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  school
                </span>
                <span className="text-on-surface-variant text-label-sm">
                  {course.category}
                </span>
              </div>

              <h3 className="font-h3 text-h3 mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>

              <p className="text-on-surface-variant text-sm font-medium mb-4">
                {course.instructor},{" "}
                <span className="opacity-70">{course.partner}</span>
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-[18px]">
                      schedule
                    </span>
                    <span className="text-[12px]">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-[18px]">
                      signal_cellular_alt
                    </span>
                    <span className="text-[12px]">{course.level}</span>
                  </div>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View Details{" "}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
