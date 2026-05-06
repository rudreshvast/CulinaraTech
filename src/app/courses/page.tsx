'use client';

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { courses } from "@/lib/course-data";

const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "duration", label: "Duration (Shortest First)" },
  { value: "difficulty", label: "Difficulty (Beginner First)" },
];

export default function CoursesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(5);
  const [sortBy, setSortBy] = useState("trending");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Dynamically generate categories from courses
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(courses.map((course) => course.category))
    ).sort();
    return ["All", ...uniqueCategories];
  }, []);

  const visibleCategories = categories.slice(0, visibleCategoriesCount);
  const hasMoreCategories = visibleCategoriesCount < categories.length;

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Apply sorting
    const sortedResult = [...result];

    switch (sortBy) {
      case "name":
        sortedResult.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "trending":
        sortedResult.sort((a, b) => {
          const aHasTrending = a.badge === "Trending" ? 1 : 0;
          const bHasTrending = b.badge === "Trending" ? 1 : 0;
          return bHasTrending - aHasTrending;
        });
        break;
      case "popular":
        sortedResult.sort((a, b) => {
          const aHasPopular = a.badge === "Popular" ? 1 : 0;
          const bHasPopular = b.badge === "Popular" ? 1 : 0;
          return bHasPopular - aHasPopular;
        });
        break;
      case "price-low":
        sortedResult.sort((a, b) => {
          const aPrice = parseInt(a.price.replace(/[₹,]/g, ""));
          const bPrice = parseInt(b.price.replace(/[₹,]/g, ""));
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        sortedResult.sort((a, b) => {
          const aPrice = parseInt(a.price.replace(/[₹,]/g, ""));
          const bPrice = parseInt(b.price.replace(/[₹,]/g, ""));
          return bPrice - aPrice;
        });
        break;
      case "duration":
        sortedResult.sort((a, b) => {
          const aDuration = parseInt(a.duration);
          const bDuration = parseInt(b.duration);
          return aDuration - bDuration;
        });
        break;
      case "difficulty":
        const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
        sortedResult.sort((a, b) => {
          const aLevel = difficultyOrder[a.level as keyof typeof difficultyOrder] || 0;
          const bLevel = difficultyOrder[b.level as keyof typeof difficultyOrder] || 0;
          return aLevel - bLevel;
        });
        break;
    }

    return sortedResult;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-background pb-28">
      <Navbar />

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-20 mb-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Master the Future of{" "}
            <span className="text-gradient-primary">
              Food
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn from industry experts and advance your culinary career
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 max-w-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm text-foreground placeholder:text-muted-foreground"
              placeholder="Search courses, instructors, or skills..."
              type="text"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="px-6 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors font-semibold flex items-center gap-2"
            >
              <Filter size={20} />
              <span className="hidden sm:inline">Sort</span>
              <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort Dropdown */}
            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value as typeof sortBy);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors font-medium text-sm ${
                      sortBy === option.value
                        ? "text-primary bg-primary/10 border-l-4 border-primary pl-3"
                        : "text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {searchQuery && (
          <div className="text-sm text-muted-foreground mt-3">
            Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </div>
        )}
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-2 items-center">
          {visibleCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-all text-xs sm:text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-card text-foreground border border-border hover:border-border/80 hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}

          {/* Show More Button */}
          {hasMoreCategories && (
            <button
              onClick={() => setVisibleCategoriesCount(prev => prev + 3)}
              className="px-4 py-2 rounded-full font-semibold text-xs sm:text-sm border-2 border-primary text-primary hover:bg-primary/10 transition-all whitespace-nowrap"
            >
              Show More
            </button>
          )}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-6xl mx-auto px-6">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No courses found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badge */}
                    {course.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          {course.badge}
                        </span>
                      </div>
                    )}

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg font-bold text-primary text-sm shadow-md">
                      {course.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Category */}
                    <span className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
                      {course.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                      {course.instructor.name} · {course.partner}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>⏱️ {course.duration}</span>
                        <span>📊 {course.level}</span>
                      </div>
                      <span className="text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
