export interface CurriculumItem {
  id: number;
  title: string;
  items?: string[];
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  categoryIcon: string;
  duration: string;
  level: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  badge?: string;
  badgeVariant?: "hot" | "new" | "industry";
  image: string;
  heroImage?: string;
  enrolled?: string;
  instructor: string;
  instructorOrg: string;
  instructorTitle?: string;
  instructorBio?: string;
  instructorImage?: string;
  instructorOrgLogo?: string;
  partner?: string;
  partnerIcon?: string;
  overview?: string;
  curriculum?: CurriculumItem[];
}

export const courses: Course[] = [
  {
    slug: "advanced-food-safety-biosecurity",
    title: "Advanced Food Safety & Biosecurity",
    category: "Food Safety",
    categoryIcon: "verified_user",
    duration: "12 Weeks",
    level: "Advanced",
    price: "₹14,999",
    originalPrice: "₹18,749",
    discount: "20% OFF",
    badge: "Industry Led",
    badgeVariant: "industry",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApIVFtp_h8j2sqZKpaqjgmI7TYl1auD9Hx8hV390IgAPQZX9EUzrr-Cjbv8VKoiVkWmkjh9SuQiIdSVJOWrzdlbVWJkIHTRPUPd2wFAUsfGp5FZQSxNu_t7kfmmfMRVe40Q40HnLbbPkuraEOmIuSY55tBQDlwHvlSq4r45AEEv7E9RZHPPZFJwdfVbYWpzB39BQqo63NnXg2RxbE9s9Xpc-aLuROURN4xppTaWGFeikxgkdLXk1AlieRm05Ztoy2qAoWYIg6Cdcs",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB7bMLhzeTG_dct4Llqqo_qWF8vLPjzHWXtRdhZWSY3hyk9yV_u6YF4oYVcgzrWVXSiG_v9qqgo0BVLDECsQhmf4kGPrDWZ5rWF0uammFBqeFMOG7PTrxUxT6tD4Pdfn1SknXQIX5kPAH3R25DQ7-W3owD09qa1WYgY_e34wPEMWRtjuj-EzmBSyFF8pvCeOTZRD5cqa58QFKMFP_sqkBfgMQ5VOVhYT1p4218QnakgzpicWQPgafciqTjueunJonMJ8CBuZ-uXnc",
    enrolled: "500+",
    instructor: "Dr. Sarah Jenkins",
    instructorOrg: "Safe-Food Intl",
    instructorTitle: "Head of Quality at Safe-Food Intl",
    instructorBio:
      "20+ years of experience in global biosecurity standards and crisis management for multinational food brands.",
    instructorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChFclTYynUZFp3mU-bIXxPEFkD7tYQ7I6Up-lEUISpnH0aQeuu6YwVFqvTEUcsFWanboqYW-LRV5xTZRL7jTdUOBF7sR5UGAX5lyyJNMRTs0Cvuk5pki9eFTjA1eNpGL_T4hnbsYPthdiz7yL-0CIVcloBsPtmRYvpaCDx2Tjn_d9lVVJ-g2157NIMYkqa0h3qAOlkQeNgnP7e8v3yxOph6uH7sszcu1os00DNdk3hu4RIjztZQ4VogCJfz9bQ3a3lvPbXxxKxkDM",
    instructorOrgLogo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANUdpx-hczl07FcfIym5uaTTQIspXb69Ls63a4sY8-9q82W7UQyYhzLjQdSVeO52HqdzyveMwewh5ZU-2P9QxtY7PyXwbwREqD3KqxoapWij6UyB4NNmynpkxNdJahTMY-b4DPypsg_rhggfc9e5bHbhFRTQYv5S5KVvbwakGTaBB2paxwCuEWCzLQYOE1-V4TUwrf3H5jodYu8ASO74rebwm8wHL8nCJGZ6bFvAxh1Y825p2NPr23-RbBe3Bb95zexQXooROCYso",
    partner: "Safe-Food Intl",
    partnerIcon: "security",
    overview:
      "In the rapidly evolving landscape of the Indian food industry, mastering biosecurity protocols is no longer optional—it's critical. This course bridges the gap between traditional quality control and futuristic automated safety systems. Graduates gain a massive edge in employability, qualifying for senior QA roles in global food tech firms and high-scale manufacturing units.",
    curriculum: [
      { id: 1, title: "Introduction to Food Safety" },
      { id: 2, title: "Microbiological Risks & Control" },
      {
        id: 3,
        title: "Automation in Quality Assurance",
        items: [
          "AI-driven contamination detection",
          "Robotic sampling in high-risk zones",
          "Blockchain for supply chain transparency",
        ],
      },
      { id: 4, title: "Industrial Case Studies" },
    ],
  },
  {
    slug: "dairy-processing-automation",
    title: "Dairy Processing Automation",
    category: "Dairy Tech",
    categoryIcon: "school",
    duration: "8 Weeks",
    level: "Intermediate",
    price: "₹12,499",
    badge: "Industry Led",
    badgeVariant: "industry",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlAXxEkk02V8VGFfDr3Hptt-uULUfr5ThKnclmweoH6aFzIJV_Iwxwb6b0xDJNNFtO5SzmjTU76N3DYC9OoSe88zRz5w1gmRh7pFbduM3QpiEh-ju3G6jCDBigLq3fJXqTOwLMWCZaOgJLz0CKpXfM4e0742GS3n6H8K1G_fPJ9MyW5uxy3WazHaIaizPHQtiPgBF_AB0rzI3071ZOTWlizIjVwA2gxOwty0zlH-4814AAT0lDvcCEEuh-fi3k0lJSGf0htkQTCn8",
    instructor: "Dr. Arjun Mehta",
    instructorOrg: "Global Foods Corp",
  },
  {
    slug: "alternative-protein-synthesis",
    title: "Alternative Protein Synthesis",
    category: "Food Science",
    categoryIcon: "biotech",
    duration: "16 Weeks",
    level: "Expert",
    price: "₹18,999",
    badge: "Industry Led",
    badgeVariant: "industry",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDX-uHoHsQKjnULWJtelz26_yRMKIaKRRAW7_8K00KLT-fB27ZiyX4W1PhGeeZqghxpSJtunKZz07ZIw6x_LMC3bQlZMR0BKIEGrUN4fN4VVYbqC4cJS0aFe2vTByg4snzUmBNxW9Px5UGGrqQIsb6R6Fyg0UaudzKkgkcaAGc1SI4mqf00y9mem3xGQbvoVY5cRUXxwbImV6EVEIktU7W-CwYyX4dDHe8lgCSLdgrvgzfXsWC0EGT7i3GtL2fDA4taTJEVTcHQ1Q",
    instructor: "Dr. Priya Nair",
    instructorOrg: "AgriTech Solutions",
  },
  {
    slug: "industrial-dairy-processing",
    title: "Industrial Dairy Processing",
    category: "Dairy Tech",
    categoryIcon: "school",
    duration: "8 Weeks",
    level: "Advanced",
    price: "$299",
    badge: "Hot",
    badgeVariant: "hot",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_aT18QJfF3RPsBPwyVZ88oGmiIevdOFBcVfcYeGRVNUvxphP4NI47_K05QZyukyuJ7iMMOEdFuFzvx48nD-CLtBJytu0jRfRzMDJO8J6lh210qq8KPi7z1JwKJqDUCKi9GlBk8af2cEf8DFC__yEYfizPYn9VzKNc8kY1AcF27avQtkYFLvjZ_qh5Z0CIcRJWCNPqlSCaEcQ1FskjniOn-uroAbsD3M9W52iWQ4RpS9Lbq8agGgNIkeMKXMrpQrfherEdW28tQrU",
    instructor: "Dr. Arjun Mehta",
    instructorOrg: "Global Foods Corp",
    instructorOrgLogo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEw8OjYi6CjKAEs0KqOWrONoLMGY9L_TT_rVwSjF5lMSjJQ8hD0zCLyTCn4C7taO_UAF_DCpQg35xkSE43kBhgU0xnXiRcKvny0_8JKQbMISUrvXKhML8mmjVfrCqNG3C2p5N09n5eWOa4w08E8g3sVbmm9WMUgcxENBaVkiRG0wJKzG23vx2vK300qt82naD_l79EqiQwWoiQlZNsL0uJUrvlrKuatkBMcbKOrAwzefJqyxgOsSM27xWk7A7Tf3fy05j5Mfj5Slo",
  },
  {
    slug: "haccp-implementation",
    title: "HACCP Implementation",
    category: "Food Safety",
    categoryIcon: "verified_user",
    duration: "4 Weeks",
    level: "Intermediate",
    price: "$149",
    badge: "New",
    badgeVariant: "new",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQdBq9AITl5rHhkEf4cXs8Spgwnk-yyFobAUQqsMJKwyPZp3vFqW6t-wxrU4_8QrVZt4w8uJL6N6UiDIcN_NfKUgQXLwzTMjvttn9U73LPHICot7JEZKS-_fi0-GWiw9RHzhHrHWS8L1UoM073iOfHuFwv8xKMCztaXwQncXrPlIT-ynGfFlgMeXTQr9T9YmTAMnqFezqQgIvEmUQNIxiRbcSrSXUPzzoKHouedMvRTykX0iP8a1Tj0APdYRQWBS6ZaY3gb6yBWvo",
    instructor: "Sarah Jenkins",
    instructorOrg: "Safe-Food Intl",
    instructorOrgLogo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANUdpx-hczl07FcfIym5uaTTQIspXb69Ls63a4sY8-9q82W7UQyYhzLjQdSVeO52HqdzyveMwewh5ZU-2P9QxtY7PyXwbwREqD3KqxoapWij6UyB4NNmynpkxNdJahTMY-b4DPypsg_rhggfc9e5bHbhFRTQYv5S5KVvbwakGTaBB2paxwCuEWCzLQYOE1-V4TUwrf3H5jodYu8ASO74rebwm8wHL8nCJGZ6bFvAxh1Y825p2NPr23-RbBe3Bb95zexQXooROCYso",
  },
  {
    slug: "ai-food-supply-chain",
    title: "AI in Food Supply Chain",
    category: "Automation",
    categoryIcon: "settings_input_component",
    duration: "2 Weeks",
    level: "Beginner",
    price: "Free",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9kQhd6o6XS-EtxOk5xtZTrR_CsA5tRF5d-tLQDLAE12uc2EbKoh2-Sc6u8vHdK6eR5ztOcrxF9rqmyG5O-mddJDZEmf1T0GqLnR66Xm-JqauUXrmdu_2R0NMS4ijQs4jbMU0VOvvpJ_ErFlYLqf-mLMjNpUjPrIMadn45P8xElRQ0mx1BwI9398sI6BHD5bz5iOa-MNvEa6M2WHVEBkRKmYabyH0I6bpwq9IulyRKUuV3QJzA2bU2iu1QVasIJ0ZfGW5_2QiLfQw",
    instructor: "Marc Chen",
    instructorOrg: "TechLogix AI",
    instructorOrgLogo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX98aw8M7RIEVo3AItwU8T832ZV5S6W0xiEzK8Unc6wNAFEq4n7RaipZF44tFDmOiHnjlrx9-oYzYPkrU-beLOyiF8jyFtJ2mcRU6f3nRtpTQQFnCgUJQV2lc4x3kkprKJMHNIaEf1B8CS6vI2JZEmzx6HZ1MA380GbYn-dSFwf2-XQJMWx1FTLQkDDzl-RqTYM66bWN3rKsOv7GeigNXzCZL5wiPUGytmT0jnYvZTsyFZoDxpMk-c5afjecE3C2iQrRBCl5BiMbo",
  },
  {
    slug: "microbiological-analysis",
    title: "Microbiological Analysis",
    category: "Quality Control",
    categoryIcon: "biotech",
    duration: "6 Weeks",
    level: "Advanced",
    price: "$199",
    badge: "New",
    badgeVariant: "new",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-KTpqFf8a2criuLb4pUeCwv7VoBa2A_y8bfSj2O8aykTJHhFSq1oLsqVHdBATB0ZgH-dd4DfW_ZElxKJhweRl0yGJDqBV-54iT1HUxiHPsGHNqBOwjk3sPnmduvu9q7I8sFb_7cGTipwMhjqQGzkJUZ9kGchwC8dUkB6zBS3Zuoydx3GUKa8JHDF3sZz5WsxADGwiCafBJg2lfz9gYaDHGLopKn9-DvPOjgW7AL3OhIHz-Z-m3fqY-MrY7rKDY5eVegBveIPTCL8",
    instructor: "Lisa Ray",
    instructorOrg: "BioTech Lab",
    instructorOrgLogo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDsNdT9bBWeIYYwCNsbKjO1N10aer1jxbFemXN2PMzkBRtoABsR8KDr79Cw23KPdIIJNVZcgRtOnzqIClz_Ews-LpNw-S4Ouv_hCrqH5PoIy2nG5zIiNpWaOeFhvadAhx2B_AQ6_M7pgZ0zTgP4vqFlGX4XBR_whbXdk8ZLpZL8olhSSMZ-QHBTytoCHpIzgN6qjzOLd_cATWDexkp7gXC45ErXh1lGTNOpaUk6XZ7IGxy7baVUKuaAbiyGYiiEgexbmBTbm6fKRo",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
