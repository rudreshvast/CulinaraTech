export interface Opportunity {
  id: string;
  category: 'internship' | 'job' | 'training';
  title: string;
  company: string;
  mode: string;
  type: string;
  location: string;
  timings: string;
  stipend?: string;
  salary?: string;
  about: string[];
  description: string;
  qualification: string[];
  perks: string[];
  startDate?: string;
  endDate?: string;
}

export const CAREER_OPPORTUNITIES: Opportunity[] = [
  // INTERNSHIPS
  {
    id: 'int-1',
    category: 'internship',
    title: 'Dairy Process Engineering Intern',
    company: 'Amul',
    mode: 'On-site',
    type: 'Full-time',
    location: 'Anand, Gujarat',
    timings: '9:00 AM – 5:30 PM',
    stipend: '₹12,000/month',
    about: [
      'Assist in milk pasteurization and homogenization',
      'Monitor dairy production lines',
      'Perform fat and SNF testing',
      'Support automation calibration',
      'Ensure hygiene compliance',
      'Participate in quality audits',
      'Work with process engineers'
    ],
    description: 'Work with dairy production teams to optimize milk processing and maintain quality standards in large-scale manufacturing.',
    qualification: [
      'B.Tech / Diploma in Dairy Technology / Food Technology',
      'Basic understanding of dairy processing',
      'Knowledge of HACCP preferred'
    ],
    perks: [
      'Cab facility available',
      'Free meals',
      'Internship certificate',
      'PPO opportunity'
    ]
  },
  {
    id: 'int-2',
    category: 'internship',
    title: 'Food Safety & QA Intern',
    company: 'Nestlé',
    mode: 'On-site',
    type: 'Full-time',
    location: 'Moga, Punjab',
    timings: '9:30 AM – 6:00 PM',
    stipend: '₹15,000/month',
    about: [
      'Conduct microbiological testing',
      'Maintain QA documentation',
      'Assist in audits',
      'Monitor hygiene standards',
      'Analyze contamination risks',
      'Support compliance reporting',
      'Work with QA teams'
    ],
    description: 'Assist QA teams in maintaining food safety compliance and ensuring high product quality standards.',
    qualification: [
      'B.Sc / B.Tech Food Technology / Microbiology',
      'Knowledge of FSSAI & ISO standards'
    ],
    perks: [
      'Cab available',
      'Industry certification',
      'Hands-on lab experience',
      'Networking opportunities'
    ]
  },
  {
    id: 'int-3',
    category: 'internship',
    title: 'Beverage Production Intern',
    company: 'Coca-Cola',
    mode: 'On-site',
    type: 'Full-time',
    location: 'Pune, Maharashtra',
    timings: 'Rotational shifts',
    stipend: '₹14,000/month',
    about: [
      'Assist in bottling operations',
      'Monitor carbonation levels',
      'Ensure product consistency',
      'Support packaging systems',
      'Learn formulation basics',
      'Work with automation systems',
      'Maintain hygiene protocols'
    ],
    description: 'Hands-on experience in beverage production focusing on efficiency and quality control.',
    qualification: [
      'B.Tech Food / Chemical Engineering',
      'Interest in beverage processing'
    ],
    perks: [
      'Shift allowance',
      'Free refreshments',
      'Certificate',
      'PPO opportunity'
    ]
  },

  // JOBS
  {
    id: 'job-1',
    category: 'job',
    title: 'Food Process Engineer',
    company: 'ITC Foods',
    mode: 'On-site',
    type: 'Full-time',
    location: 'Bangalore',
    timings: '9:00 AM – 6:00 PM',
    salary: '₹6–10 LPA',
    about: [
      'Optimize production lines',
      'Improve processing efficiency',
      'Reduce wastage',
      'Monitor equipment performance',
      'Ensure compliance',
      'Work with cross-functional teams',
      'Implement automation'
    ],
    description: 'Design and improve food processing systems to enhance efficiency, scalability, and product quality.',
    qualification: [
      'B.Tech Food Technology',
      '2+ years experience'
    ],
    perks: [
      'Cab facility',
      'Health insurance',
      'Performance bonus',
      'Paid leaves'
    ]
  },
  {
    id: 'job-2',
    category: 'job',
    title: 'Quality Assurance Manager',
    company: 'Nestlé',
    mode: 'On-site',
    type: 'Full-time',
    location: 'Punjab',
    timings: '9:30 AM – 6:30 PM',
    salary: '₹8–14 LPA',
    about: [
      'Lead QA team',
      'Conduct audits',
      'Ensure compliance',
      'Monitor product quality',
      'Handle documentation',
      'Improve safety standards',
      'Train staff'
    ],
    description: 'Lead QA operations ensuring compliance with global food safety standards and maintaining product quality.',
    qualification: [
      'B.Tech Food Technology',
      '5+ years experience'
    ],
    perks: [
      'Cab facility',
      'Health insurance',
      'Bonus',
      'Career growth'
    ]
  },
  {
    id: 'job-3',
    category: 'job',
    title: 'Beverage Production Manager',
    company: 'Coca-Cola',
    mode: 'On-site',
    type: 'Full-time',
    location: 'Pune',
    timings: '9:00 AM – 6:00 PM',
    salary: '₹10–18 LPA',
    about: [
      'Manage bottling operations',
      'Ensure product consistency',
      'Lead production teams',
      'Optimize efficiency',
      'Maintain quality standards',
      'Oversee packaging',
      'Improve processes'
    ],
    description: 'Lead beverage production operations ensuring efficiency, quality, and compliance.',
    qualification: [
      'B.Tech Chemical / Food Engineering',
      'Experience required'
    ],
    perks: [
      'Cab',
      'Bonus',
      'Insurance',
      'Leadership role'
    ]
  },

  // TRAINING (Workshops & Industrial Visits)
  {
    id: 'train-1',
    category: 'training',
    title: 'Advanced Dairy Processing Workshop',
    company: 'Amul R&D Center',
    mode: 'On-site',
    type: 'Workshop',
    location: 'Anand, Gujarat',
    timings: '10:00 AM – 4:00 PM',
    stipend: '₹2,500',
    startDate: '2025-05-15',
    endDate: '2025-05-15',
    about: [
      'Learn pasteurization techniques',
      'Understand homogenization process',
      'Quality testing methods',
      'Automation systems overview',
      'Hands-on lab demonstrations',
      'Case studies from industry',
      'Certificate upon completion'
    ],
    description: 'Intensive workshop covering modern dairy processing techniques and quality control standards.',
    qualification: [
      'B.Tech / Diploma in Food Technology',
      'Basic science background'
    ],
    perks: [
      'Certificate',
      'Lunch provided',
      'Industry expert trainers',
      'Networking opportunity'
    ]
  },
  {
    id: 'train-2',
    category: 'training',
    title: 'Food Safety & HACCP Training',
    company: 'FSSAI Academy',
    mode: 'On-site',
    type: 'Workshop',
    location: 'Mumbai, Maharashtra',
    timings: '9:00 AM – 5:00 PM',
    stipend: '₹3,500',
    startDate: '2025-05-20',
    endDate: '2025-05-22',
    about: [
      'HACCP principles & application',
      'Food safety regulations',
      'Hazard analysis methods',
      'Critical control points',
      'Documentation & records',
      'Audit preparation',
      'Real-world case studies'
    ],
    description: 'Comprehensive HACCP training aligned with FSSAI standards for food industry professionals.',
    qualification: [
      'Any graduation',
      'Interest in food safety'
    ],
    perks: [
      'FSSAI certification',
      'Training materials',
      'Expert trainers',
      'Job placement assistance'
    ]
  },
  {
    id: 'train-3',
    category: 'training',
    title: 'Beverage Formulation Masterclass',
    company: 'Coca-Cola Academy',
    mode: 'On-site',
    type: 'Workshop',
    location: 'Pune, Maharashtra',
    timings: '9:00 AM – 6:00 PM',
    stipend: '₹4,000',
    startDate: '2025-05-25',
    endDate: '2025-05-26',
    about: [
      'Beverage chemistry basics',
      'Flavor formulation techniques',
      'Carbonation methods',
      'Packaging optimization',
      'Cost optimization',
      'Innovation in beverages',
      'Industry trends analysis'
    ],
    description: 'Master class on beverage product development and formulation by industry experts.',
    qualification: [
      'B.Tech Food / Chemical Engineering',
      'Basic chemistry knowledge'
    ],
    perks: [
      'Certificate',
      'Hands-on practice',
      'Beverage sampling',
      'Industry contacts'
    ]
  },
  {
    id: 'train-4',
    category: 'training',
    title: 'ITC Foods Manufacturing Plant Industrial Visit',
    company: 'ITC Foods',
    mode: 'On-site',
    type: 'Industrial Visit',
    location: 'Bangalore',
    timings: '9:30 AM – 1:30 PM',
    stipend: 'Free',
    startDate: '2025-05-18',
    endDate: '2025-05-18',
    about: [
      'Complete facility tour',
      'Production line observation',
      'Quality control lab tour',
      'Packaging area walkthrough',
      'Sustainability initiatives',
      'Q&A with production managers',
      'Networking with professionals'
    ],
    description: 'Guided industrial visit to state-of-the-art food manufacturing facility.',
    qualification: [
      'Any stream, B.Tech students preferred'
    ],
    perks: [
      'Free entry',
      'Guided tour',
      'Refreshments',
      'Certificate of visit'
    ]
  },
  {
    id: 'train-5',
    category: 'training',
    title: 'Nestlé Quality Assurance Facility Tour',
    company: 'Nestlé',
    mode: 'On-site',
    type: 'Industrial Visit',
    location: 'Moga, Punjab',
    timings: '10:00 AM – 2:00 PM',
    stipend: 'Free',
    startDate: '2025-05-27',
    endDate: '2025-05-27',
    about: [
      'QA lab comprehensive tour',
      'Testing procedures observation',
      'Microbiology lab walkthrough',
      'Compliance documentation',
      'Audit process overview',
      'Discussion with QA team',
      'Product quality standards'
    ],
    description: 'Explore Nestlé\'s world-class quality assurance systems and food safety protocols.',
    qualification: [
      'B.Tech Food Technology / Microbiology students'
    ],
    perks: [
      'Free visit',
      'Expert-led tour',
      'Snacks & beverages',
      'Industry insights'
    ]
  },
  {
    id: 'train-6',
    category: 'training',
    title: 'PepsiCo Bottling Automation Tour',
    company: 'PepsiCo',
    mode: 'On-site',
    type: 'Industrial Visit',
    location: 'Pune, Maharashtra',
    timings: '9:00 AM – 12:30 PM',
    stipend: 'Free',
    about: [
      'Bottling line automation',
      'Robotic systems overview',
      'Production efficiency metrics',
      'Safety protocols demonstration',
      'Supply chain insights',
      'Sustainability practices',
      'Career opportunities discussion'
    ],
    description: 'Visit state-of-the-art beverage bottling facility with advanced automation.',
    qualification: [
      'B.Tech students (all streams)'
    ],
    perks: [
      'Free entry',
      'Safety gear provided',
      'Expert-led tour',
      'Refreshments included'
    ]
  }
];
