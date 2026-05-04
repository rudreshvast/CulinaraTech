"use client";

import { useState } from "react";

const jobsData = [
  {
    id: 1,
    title: "QA Apprentice",
    company: "Amul",
    location: "Anand, Gujarat",
    salary: "₹25,000 - ₹30,000",
    type: "apprenticeship",
  },
  {
    id: 2,
    title: "Line Automation Trainee",
    company: "Nestle India",
    location: "Moga, Punjab",
    salary: "₹35,000 - ₹45,000",
    type: "fulltime",
  },
  {
    id: 3,
    title: "Food Safety Intern",
    company: "Global Foods",
    location: "Bengaluru, KA",
    salary: "₹15,000 - ₹18,000",
    type: "internship",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Apprenticeships", value: "apprenticeship" },
  { label: "Full-time", value: "fulltime" },
  { label: "Internships", value: "internship" },
];

export default function JobsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredJobs =
    activeFilter === "all"
      ? jobsData
      : jobsData.filter((job) => job.type === activeFilter);

  return (
    <main className="p-6 pt-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Career Launchpad</h1>
      <p className="text-gray-500 mb-4">
        Find your next leap in FoodTech.
      </p>

      {/* Search */}
      <input
        placeholder="Search roles or companies..."
        className="w-full p-3 rounded-lg border mb-4"
      />

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === f.value
                ? "bg-purple-600 text-white"
                : "bg-white border"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-purple-600 font-medium">
              {job.company}
            </p>

            <div className="flex gap-2 mt-2 text-sm text-gray-500">
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.salary}</span>
            </div>

            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg">
              Apply Now
            </button>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500">
            No jobs found
          </p>
        )}
      </div>
    </main>
  );
}