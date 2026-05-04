export type Course = {
  slug: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  image: string;
  instructor: string;
  partner: string;
  overview: string;
};

export const courses: Course[] = [
  {
    slug: "industrial-dairy-processing",
    title: "Industrial Dairy Processing",
    category: "Dairy Tech",
    level: "Advanced",
    duration: "8 Weeks",
    price: "₹24,999",
    originalPrice: "₹29,999",
    badge: "Hot",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_aT18QJfF3RPsBPwyVZ88oGmiIevdOFBcVfcYeGRVNUvxphP4NI47_K05QZyukyuJ7iMMOEdFuFzvx48nD-CLtBJytu0jRfRzMDJO8J6lh210qq8KPi7z1JwKJqDUCKi9GlBk8af2cEf8DFC__yEYfizPYn9VzKNc8kY1AcF27avQtkYFLvjZ_qh5Z0CIcRJWCNPqlSCaEcQ1FskjniOn-uroAbsD3M9W52iWQ4RpS9Lbq8agGgNIkeMKXMrpQrfherEdW28tQrU",
    instructor: "Dr. Arjun Mehta",
    partner: "Global Foods Corp",
    overview:
      "Learn modern dairy processing pipelines, hygiene automation, and smart quality systems used in large-scale production facilities.",
  },
  {
    slug: "haccp-implementation",
    title: "HACCP Implementation",
    category: "Food Safety",
    level: "Intermediate",
    duration: "4 Weeks",
    price: "₹12,499",
    originalPrice: "₹15,999",
    badge: "New",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQdBq9AITl5rHhkEf4cXs8Spgwnk-yyFobAUQqsMJKwyPZp3vFqW6t-wxrU4_8QrVZt4w8uJL6N6UiDIcN_NfKUgQXLwzTMjvttn9U73LPHICot7JEZKS-_fi0-GWiw9RHzhHrHWS8L1UoM073iOfHuFwv8xKMCztaXwQncXrPlIT-ynGfFlgMeXTQr9T9YmTAMnqFezqQgIvEmUQNIxiRbcSrSXUPzzoKHouedMvRTykX0iP8a1Tj0APdYRQWBS6ZaY3gb6yBWvo",
    instructor: "Sarah Jenkins",
    partner: "Safe-Food Intl",
    overview:
      "Build practical HACCP plans, risk controls, and compliance workflows for Indian and global food operations.",
  },
  {
    slug: "ai-food-supply-chain",
    title: "AI in Food Supply Chain",
    category: "Automation",
    level: "Beginner",
    duration: "2 Weeks",
    price: "Free",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9kQhd6o6XS-EtxOk5xtZTrR_CsA5tRF5d-tLQDLAE12uc2EbKoh2-Sc6u8vHdK6eR5ztOcrxF9rqmyG5O-mddJDZEmf1T0GqLnR66Xm-JqauUXrmdu_2R0NMS4ijQs4jbMU0VOvvpJ_ErFlYLqf-mLMjNpUjPrIMadn45P8xElRQ0mx1BwI9398sI6BHD5bz5iOa-MNvEa6M2WHVEBkRKmYabyH0I6bpwq9IulyRKUuV3QJzA2bU2iu1QVasIJ0ZfGW5_2QiLfQw",
    instructor: "Marc Chen",
    partner: "TechLogix AI",
    overview:
      "Explore forecasting, traceability, and AI-assisted logistics to build more resilient food distribution systems.",
  },
  {
    slug: "microbiological-analysis",
    title: "Microbiological Analysis",
    category: "Quality Control",
    level: "Advanced",
    duration: "6 Weeks",
    price: "₹16,999",
    originalPrice: "₹20,499",
    badge: "New",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-KTpqFf8a2criuLb4pUeCwv7VoBa2A_y8bfSj2O8aykTJHhFSq1oLsqVHdBATB0ZgH-dd4DfW_ZElxKJhweRl0yGJDqBV-54iT1HUxiHPsGHNqBOwjk3sPnmduvu9q7I8sFb_7cGTipwMhjqQGzkJUZ9kGchwC8dUkB6zBS3Zuoydx3GUKa8JHDF3sZz5WsxADGwiCafBJg2lfz9gYaDHGLopKn9-DvPOjgW7AL3OhIHz-Z-m3fqY-MrY7rKDY5eVegBveIPTCL8",
    instructor: "Lisa Ray",
    partner: "BioTech Lab",
    overview:
      "Master microbial testing workflows and contamination response methods for high-compliance food manufacturing.",
  },
];

export const featuredCourseSlug = "haccp-implementation";
