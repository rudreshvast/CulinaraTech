// Re-export courses from course-data
export { courses, type Course, type Instructor, type Section, type Lesson } from './course-data';

// Internship types and data
export type Internship = {
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  locationType: 'Remote' | 'Onsite' | 'Hybrid';
  duration: string;
  stipend: number;
  featured: boolean;
  badge?: 'Urgent' | 'Hot' | 'New' | 'Closing Soon';
  description: string;
  skills: string[];
  openings: number;
  lastDate: string;
  category?: 'Quality & Safety' | 'R&D' | 'Production' | 'Supply Chain' | 'Regulatory Affairs';
  postedDate?: string;
};

export const internships: Internship[] = [
  {
    slug: 'nestlé-dairy-intern',
    title: 'Dairy Processing Intern',
    company: 'Nestlé India',
    companyLogo: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    location: 'Bangalore, Karnataka',
    locationType: 'Onsite',
    duration: '3 months',
    stipend: 18000,
    featured: true,
    badge: 'Hot',
    description: 'Join our dairy processing team to learn HTST and UHT processing, quality control, and plant operations.',
    skills: ['Dairy Tech', 'Quality Control', 'HACCP', 'Food Safety'],
    openings: 5,
    lastDate: '2025-06-15',
    category: 'Production',
    postedDate: '2025-05-03',
  },
  {
    slug: 'itc-quality-intern',
    title: 'Quality Assurance Intern',
    company: 'ITC Foods',
    companyLogo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    location: 'Kolkata, West Bengal',
    locationType: 'Onsite',
    duration: '4 months',
    stipend: 15000,
    featured: true,
    badge: 'New',
    description: 'Learn HACCP principles, conduct internal audits, and manage quality systems in food manufacturing.',
    skills: ['HACCP', 'Auditing', 'Documentation', 'Process Control'],
    openings: 3,
    lastDate: '2025-07-01',
    category: 'Quality & Safety',
    postedDate: '2025-05-02',
  },
  {
    slug: 'britannia-bakery-intern',
    title: 'Bakery Operations Intern',
    company: 'Britannia Industries',
    companyLogo: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400',
    location: 'Delhi, India',
    locationType: 'Onsite',
    duration: '3 months',
    stipend: 16000,
    featured: true,
    badge: 'Closing Soon',
    description: 'Experience industrial bakery production, tunnel ovens, and product quality optimization.',
    skills: ['Bakery Tech', 'Production', 'Quality', 'Equipment Operation'],
    openings: 2,
    lastDate: '2025-05-20',
    category: 'Production',
    postedDate: '2025-04-28',
  },
  {
    slug: 'coca-cola-beverage-intern',
    title: 'Beverage Production Intern',
    company: 'Coca-Cola India',
    companyLogo: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    location: 'Mumbai, Maharashtra',
    locationType: 'Onsite',
    duration: '3 months',
    stipend: 17000,
    featured: false,
    description: 'Learn carbonation systems, filling line operations, and beverage shelf-life management.',
    skills: ['Beverages', 'Packaging', 'OEE', 'Process Optimization'],
    openings: 4,
    lastDate: '2025-06-30',
    category: 'Production',
    postedDate: '2025-05-01',
  },
  {
    slug: 'adani-wilmar-oil-intern',
    title: 'Oil Refining Intern',
    company: 'Adani Wilmar',
    companyLogo: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    location: 'Gujarat, India',
    locationType: 'Onsite',
    duration: '4 months',
    stipend: 19000,
    featured: false,
    badge: 'Hot',
    description: 'Work on oil refining unit operations, quality testing, and process optimization.',
    skills: ['Oil Refining', 'Chemical Engineering', 'Quality', 'Process'],
    openings: 6,
    lastDate: '2025-07-10',
    category: 'Production',
    postedDate: '2025-04-30',
  },
  {
    slug: 'godrej-frozen-intern',
    title: 'Frozen Food Development Intern',
    company: 'Godrej Tyson Foods',
    companyLogo: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400',
    location: 'Bangalore, Karnataka',
    locationType: 'Hybrid',
    duration: '3 months',
    stipend: 16500,
    featured: false,
    description: 'Develop and test frozen food products with focus on IQF technology and cold chain.',
    skills: ['Frozen Foods', 'Product Dev', 'Cold Chain', 'Testing'],
    openings: 3,
    lastDate: '2025-06-25',
    category: 'R&D',
    postedDate: '2025-05-04',
  },
];

// Workshop types and data
export type Workshop = {
  slug: string;
  title: string;
  organizer: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  date: string;
  endDate: string;
  fee: number;
  earlyBirdFee?: number;
  seatsLeft: number;
  image: string;
  description: string;
  topics: string[];
  instructor: string;
  testimonials?: Array<{
    quote: string;
    author: string;
    college?: string;
  }>;
};

export const workshops: Workshop[] = [
  {
    slug: 'haccp-masterclass-jun',
    title: 'HACCP Masterclass for Food Manufacturers',
    organizer: 'CulinaraTech Academy',
    mode: 'Offline',
    date: '2025-06-14',
    endDate: '2025-06-16',
    fee: 4999,
    earlyBirdFee: 3999,
    seatsLeft: 12,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    description: '3-day intensive workshop on implementing HACCP in food processing plants.',
    topics: ['HACCP Principles', 'CCP Identification', 'Documentation', 'Auditing'],
    instructor: 'Dr. Rajeev Sharma',
    testimonials: [
      {
        quote: 'This workshop transformed how our team approaches food safety. Highly practical!',
        author: 'Ramesh Kumar',
        college: 'Food Safety Manager, ABC Foods',
      },
      {
        quote: 'Dr. Rajeev brings real plant experience to every lesson. Best training investment we made.',
        author: 'Priya Singh',
        college: 'Quality Executive, XYZ Industries',
      },
    ],
  },
  {
    slug: 'iqf-technology-jul',
    title: 'IQF Technology & Frozen Food Operations',
    organizer: 'CulinaraTech Academy',
    mode: 'Hybrid',
    date: '2025-07-10',
    endDate: '2025-07-12',
    fee: 5999,
    earlyBirdFee: 4999,
    seatsLeft: 8,
    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400',
    description: 'Learn IQF tunnel operations, freezing profiles, and cold chain management.',
    topics: ['IQF Systems', 'Blast Freezing', 'Cold Chain', 'Product Development'],
    instructor: 'Dr. Arun Iyer',
    testimonials: [
      {
        quote: 'Understanding ice crystal formation finally makes sense now!',
        author: 'Vikram Patel',
        college: 'Production Engineer, Frozen Foods Ltd',
      },
    ],
  },
  {
    slug: 'spice-export-compliance-jun',
    title: 'Spice Export & APEDA Compliance Workshop',
    organizer: 'Indian Spice Board',
    mode: 'Online',
    date: '2025-06-20',
    endDate: '2025-06-22',
    fee: 2999,
    seatsLeft: 25,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
    description: 'Master APEDA regulations, export documentation, and quality standards for spices.',
    topics: ['APEDA Compliance', 'Export Documentation', 'Quality Standards', 'Certification'],
    instructor: 'Ms. Kavitha Menon',
  },
  {
    slug: 'beverage-filling-aug',
    title: 'High-Speed Beverage Filling Line Operations',
    organizer: 'CulinaraTech Academy',
    mode: 'Offline',
    date: '2025-08-05',
    endDate: '2025-08-07',
    fee: 6999,
    earlyBirdFee: 5999,
    seatsLeft: 5,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    description: 'Hands-on training on beverage filling, capping, and line OEE optimization.',
    topics: ['Filling Lines', 'Capping', 'OEE', 'Maintenance', 'Troubleshooting'],
    instructor: 'Mr. Sanjay Kulkarni',
  },
];

// Industrial Visit types and data
export type IndustrialVisit = {
  slug: string;
  title: string;
  company: string;
  facility: string;
  facility_type: 'Dairy' | 'Beverage' | 'Bakery' | 'Oils & Fats' | 'Spices' | 'Frozen Foods' | 'Meat Processing';
  visitDate: string;
  duration: string;
  fee: number;
  capacity: number;
  groupSize: number;
  transportAvailable: boolean;
  image: string;
  description: string;
  highlights: string[];
  testimonials?: Array<{
    quote: string;
    author: string;
    company?: string;
  }>;
};

export const industrialVisits: IndustrialVisit[] = [
  {
    slug: 'nestle-dairy-plant-visit',
    title: 'Milk Processing & UHT Technology Tour',
    company: 'Nestlé India',
    facility: 'Bangalore Dairy Plant',
    facility_type: 'Dairy',
    visitDate: '2025-06-18',
    duration: '4 hours',
    fee: 1499,
    capacity: 30,
    groupSize: 28,
    transportAvailable: true,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    description: 'Tour the HTST and UHT processing lines, quality labs, and packaging facility at Nestlé\'s Bangalore plant.',
    highlights: [
      'HTST pasteurization equipment demonstration',
      'UHT and aseptic packaging line walkthrough',
      'In-plant quality control lab visit',
      'CIP system overview',
    ],
    testimonials: [
      {
        quote: 'Seeing the machinery in action made all the concepts click. Worth every rupee!',
        author: 'Anjali Verma',
        company: 'Food Science Student',
      },
    ],
  },
  {
    slug: 'britannia-bakery-visit',
    title: 'Modern Bakery Production Facility Tour',
    company: 'Britannia Industries',
    facility: 'Delhi Bakery Complex',
    facility_type: 'Bakery',
    visitDate: '2025-07-02',
    duration: '3.5 hours',
    fee: 1299,
    capacity: 25,
    groupSize: 22,
    transportAvailable: true,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400',
    description: 'Experience industrial baking at scale: continuous mixers, tunnel ovens, and automated packaging.',
    highlights: [
      'Dough mixing and fermentation systems',
      'Tunnel oven baking process',
      'Cream filling and sandwich assembly',
      'Quality checks and packaging',
    ],
    testimonials: [
      {
        quote: 'The scale of production here is mind-blowing. It completely changed my understanding of industrial baking.',
        author: 'Rohan Singh',
        company: 'Culinary Student',
      },
    ],
  },
  {
    slug: 'coca-cola-beverage-plant',
    title: 'Carbonated Soft Drink Manufacturing Tour',
    company: 'Coca-Cola India',
    facility: 'Mumbai Bottling Plant',
    facility_type: 'Beverage',
    visitDate: '2025-06-25',
    duration: '3 hours',
    fee: 999,
    capacity: 40,
    groupSize: 38,
    transportAvailable: false,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    description: 'Witness high-speed filling lines, carbonation systems, and quality testing in action.',
    highlights: [
      'Water treatment facility',
      'Syrup proportioning systems',
      'Carbonation and blending',
      'High-speed filling and labeling',
      'Casing and palletization',
    ],
  },
  {
    slug: 'adani-wilmar-oil-refinery',
    title: 'Edible Oil Refinery Process Tour',
    company: 'Adani Wilmar',
    facility: 'Gujarat Oil Refinery',
    facility_type: 'Oils & Fats',
    visitDate: '2025-07-08',
    duration: '4 hours',
    fee: 1799,
    capacity: 20,
    groupSize: 18,
    transportAvailable: true,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    description: 'Complete tour of oil refining: from oilseed preparation through degumming, bleaching, and deodorization.',
    highlights: [
      'Oilseed reception and preparation',
      'Solvent extraction systems',
      'Degumming and neutralization',
      'Bleaching and deodorization',
      'Testing labs and quality control',
    ],
  },
  {
    slug: 'godrej-tyson-frozen-foods',
    title: 'Frozen Food & IQF Technology Tour',
    company: 'Godrej Tyson Foods',
    facility: 'Bangalore Food Processing Facility',
    facility_type: 'Frozen Foods',
    visitDate: '2025-07-15',
    duration: '3.5 hours',
    fee: 1399,
    capacity: 30,
    groupSize: 25,
    transportAvailable: true,
    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400',
    description: 'Tour IQF tunnels, blast freezers, and cold chain infrastructure for frozen ready-to-cook products.',
    highlights: [
      'Raw material reception and prep',
      'IQF tunnel operations',
      'Blast freezing facilities',
      'Packaging and labeling',
      'Cold storage management',
    ],
  },
  {
    slug: 'everest-spice-processing',
    title: 'Spice Processing & Export Standards Tour',
    company: 'Everest Masala',
    facility: 'Nashik Spice Processing Unit',
    facility_type: 'Spices',
    visitDate: '2025-06-30',
    duration: '3 hours',
    fee: 899,
    capacity: 35,
    groupSize: 32,
    transportAvailable: true,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
    description: 'Learn spice cleaning, optical sorting, grinding, and blending for export-quality masala production.',
    highlights: [
      'Raw spice grading and assessment',
      'Optical sorting systems',
      'Steam sterilization process',
      'Grinding and particle sizing',
      'Masala blending and testing',
      'Packaging for export',
    ],
  },
];

// Job types and data
export type Job = {
  slug: string;
  title: string;
  company: string;
  companyType: string;
  companyLogo: string;
  location: string;
  experience: string;
  employmentType: 'Full-time' | 'Contract' | 'Permanent';
  salaryMin: number;
  salaryMax: number;
  salaryNegotiable: boolean;
  featured: boolean;
  badge?: string;
  description: string;
  skills: string[];
  openings: number;
  postedDaysAgo: number;
  lastDate: string;
};

export const jobs: Job[] = [
  {
    slug: 'nestlé-production-manager',
    title: 'Production Manager - Dairy Operations',
    company: 'Nestlé India',
    companyType: 'MNC - FMCG',
    companyLogo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    location: 'Bangalore, Karnataka',
    experience: '5-8 years',
    employmentType: 'Permanent',
    salaryMin: 850000,
    salaryMax: 1200000,
    salaryNegotiable: true,
    featured: true,
    badge: 'Trending',
    description: 'Lead production teams, oversee HTST/UHT operations, and ensure compliance with food safety standards.',
    skills: ['Production Management', 'HTST/UHT', 'HACCP', 'Team Leadership', 'Food Safety'],
    openings: 2,
    postedDaysAgo: 3,
    lastDate: '2025-06-20',
  },
  {
    slug: 'itc-qa-manager',
    title: 'Quality Assurance Manager',
    company: 'ITC Foods',
    companyType: 'Multinational',
    companyLogo: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
    location: 'Kolkata, West Bengal',
    experience: '6-10 years',
    employmentType: 'Permanent',
    salaryMin: 900000,
    salaryMax: 1400000,
    salaryNegotiable: true,
    featured: true,
    badge: 'Hot',
    description: 'Manage quality systems, conduct audits, and drive continuous improvement in food manufacturing.',
    skills: ['HACCP', 'ISO 22000', 'Auditing', 'QMS', 'Food Safety Regulations'],
    openings: 1,
    postedDaysAgo: 5,
    lastDate: '2025-06-30',
  },
  {
    slug: 'britannia-product-dev',
    title: 'Product Development Engineer - Bakery',
    company: 'Britannia Industries',
    companyType: 'Multinational',
    companyLogo: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    location: 'Delhi, India',
    experience: '4-7 years',
    employmentType: 'Permanent',
    salaryMin: 700000,
    salaryMax: 1100000,
    salaryNegotiable: false,
    featured: false,
    description: 'Develop new bakery products, optimize formulations, and manage pilot scale-ups.',
    skills: ['Product Development', 'Food Science', 'Formulation', 'Sensory Analysis', 'Testing'],
    openings: 3,
    postedDaysAgo: 7,
    lastDate: '2025-07-15',
  },
  {
    slug: 'coca-cola-process-engineer',
    title: 'Process Engineer - Beverage Filling',
    company: 'Coca-Cola India',
    companyType: 'Multinational',
    companyLogo: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    location: 'Mumbai, Maharashtra',
    experience: '3-6 years',
    employmentType: 'Permanent',
    salaryMin: 650000,
    salaryMax: 1000000,
    salaryNegotiable: true,
    featured: false,
    description: 'Optimize filling line performance, reduce OEE losses, and manage equipment maintenance.',
    skills: ['Process Engineering', 'Filling Lines', 'OEE', 'Troubleshooting', 'Maintenance'],
    openings: 4,
    postedDaysAgo: 2,
    lastDate: '2025-07-10',
  },
  {
    slug: 'adani-wilmar-refinery-manager',
    title: 'Refinery Operations Manager',
    company: 'Adani Wilmar',
    companyType: 'Indian Conglomerate',
    companyLogo: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    location: 'Surat, Gujarat',
    experience: '7-12 years',
    employmentType: 'Permanent',
    salaryMin: 1000000,
    salaryMax: 1600000,
    salaryNegotiable: true,
    featured: true,
    description: 'Manage oil refining operations, oversee quality, and drive efficiency improvements.',
    skills: ['Refining Operations', 'Chemical Engineering', 'Quality Control', 'Process Optimization'],
    openings: 1,
    postedDaysAgo: 1,
    lastDate: '2025-07-05',
  },
  {
    slug: 'himalaya-wellness-rd',
    title: 'R&D Scientist - Nutraceuticals',
    company: 'Himalaya Wellness',
    companyType: 'Health & Wellness',
    companyLogo: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400',
    location: 'Bangalore, Karnataka',
    experience: '5-9 years',
    employmentType: 'Permanent',
    salaryMin: 800000,
    salaryMax: 1300000,
    salaryNegotiable: true,
    featured: false,
    description: 'Develop nutraceutical products, conduct bioavailability studies, and manage regulatory submissions.',
    skills: ['R&D', 'Nutraceuticals', 'Bioassays', 'FSSAI Regulations', 'Product Development'],
    openings: 2,
    postedDaysAgo: 4,
    lastDate: '2025-07-20',
  },
];
