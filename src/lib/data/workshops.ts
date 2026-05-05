export interface AgendaItem {
  day: string;
  title: string;
  topics: string[];
}

export interface Facilitator {
  name: string;
  designation: string;
  experience: string;
  picture: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

export interface Certificate {
  name: string;
  issuedBy: string;
  recognizedBy: string;
}

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  organizerLogo: string;
  organizerWebsite: string;
  badge: 'Certified' | 'Closing Soon' | 'New' | 'Govt. Certified' | 'Popular' | 'Hybrid';
  category: 'Food Safety' | 'Product Development' | 'Packaging' | 'Export & Trade' | 'Cold Chain' | 'Nutraceuticals';
  level: 'Beginner' | 'Beginner to Intermediate' | 'Intermediate' | 'Advanced' | 'All Levels';
  coverImage: string;
  date: string;
  endDate: string;
  duration: string;
  location: string;
  venue: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  fee: string;
  earlyBirdFee?: string;
  feeIncludes: string[];
  seats: number;
  seatsLeft: number;
  registrationDeadline: string;
  overview: string;
  agenda: AgendaItem[];
  learningOutcomes: string[];
  whoShouldAttend: string[];
  prerequisites?: string[];
  includes: string[];
  certificate: Certificate;
  facilitators: Facilitator[];
  testimonials: Testimonial[];
  registrationLink: string;
  contactEmail: string;
  contactPhone: string;
  brochureLink: string;
  relatedCourses?: string[];
}

export const workshops: Workshop[] = [
  {
    id: 'ws-001',
    slug: 'haccp-masterclass-niftem-jun25',
    title: 'HACCP Implementation Masterclass',
    organizer: 'National Institute of Food Technology Entrepreneurship and Management (NIFTEM)',
    organizerLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop',
    organizerWebsite: 'https://www.niftem.ac.in',
    badge: 'Certified',
    category: 'Food Safety',
    level: 'Intermediate',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    date: '2025-06-14',
    endDate: '2025-06-16',
    duration: '3 Days',
    location: 'Kundli, Haryana',
    venue: 'NIFTEM Training Block, Sector 44, Kundli',
    mode: 'Offline',
    fee: '₹8,500',
    earlyBirdFee: '₹7,000 (before June 1)',
    feeIncludes: [
      'Workshop materials and HACCP template toolkit',
      'Lunch and refreshments all 3 days',
      'NIFTEM participation certificate',
      '30-day post-workshop email support',
    ],
    seats: 30,
    seatsLeft: 11,
    registrationDeadline: '2025-06-07',
    overview:
      "A hands-on 3-day HACCP implementation workshop for food industry professionals who want to build or upgrade their plant's food safety management system. Includes live exercises using real factory process flows and a take-home HACCP plan template validated against BRC and ISO 22000 requirements.",
    agenda: [
      {
        day: 'Day 1',
        title: 'Foundations & Hazard Analysis',
        topics: [
          'Food safety legislation: FSSAI Act 2006 and recent amendments',
          'Prerequisite programmes: GMP, GHP, SSOP design and verification',
          'Hazard identification categories: biological, chemical, physical, allergenic',
          'Preliminary steps: product description, intended use, and process flow diagrams',
          'Hands-on exercise: hazard analysis worksheet for a pasteurized dairy product line',
        ],
      },
      {
        day: 'Day 2',
        title: 'CCP Determination & Critical Limits',
        topics: [
          'CCP decision tree application using Codex Alimentarius methodology',
          'Setting scientifically justified critical limits for thermal processes',
          'Monitoring procedures: frequency, responsibility, and measurement systems',
          'Operational prerequisite programmes (OPRPs) vs CCPs: when to use each',
          'Hands-on exercise: CCP determination for a biscuit manufacturing line',
        ],
      },
      {
        day: 'Day 3',
        title: 'Verification, Documentation & Audit Readiness',
        topics: [
          'Corrective action procedures and deviation handling',
          'Verification activities: validation vs verification vs monitoring',
          'HACCP record-keeping standards acceptable to BRC, ISO 22000, and FSSC 22000',
          'Preparing your facility for third-party food safety certification audits',
          'Mock audit exercise: delegates act as auditee and auditor in pairs',
        ],
      },
    ],
    learningOutcomes: [
      'Build a complete HACCP plan from scratch for any food product category',
      'Identify and justify CCPs using the Codex Alimentarius decision tree',
      'Write compliant HACCP documentation accepted by BRC and ISO 22000 certification bodies',
      'Design monitoring procedures with appropriate frequency and measurement tools',
      'Prepare your facility and team for a third-party food safety audit',
      'Distinguish between CCPs, OPRPs, and prerequisite programmes correctly',
    ],
    whoShouldAttend: [
      'QA and QC managers and executives in food manufacturing companies',
      'Production managers taking on food safety responsibilities',
      'Food safety consultants preparing client facilities for certification',
      'Entrepreneurs preparing their processing unit for FSSAI and buyer audits',
    ],
    prerequisites: [
      'Basic understanding of food processing operations (any category)',
      'Familiarity with concepts of contamination and food spoilage',
    ],
    includes: [
      'Printed HACCP implementation workbook (100+ pages)',
      'Editable HACCP plan templates (Word and Excel formats)',
      'CCP decision tree laminated reference card',
      'Lunch and tea/coffee breaks all 3 days',
      'NIFTEM-certified completion certificate',
      '30 days of post-workshop email support from facilitators',
    ],
    certificate: {
      name: 'HACCP Practitioner Certificate',
      issuedBy: 'NIFTEM (National Institute of Food Technology Entrepreneurship and Management)',
      recognizedBy: 'FSSAI, Ministry of Food Processing Industries',
    },
    facilitators: [
      {
        name: 'Dr. S.K. Jha',
        designation: 'Professor, Food Safety & Technology, NIFTEM',
        experience: '24 years',
        picture: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
      },
      {
        name: 'Ms. Ritu Kapoor',
        designation: 'Lead Auditor – BRC & ISO 22000 Certified, Former ITC Foods',
        experience: '16 years',
        picture: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face',
      },
    ],
    testimonials: [
      {
        quote:
          'The mock audit on Day 3 was the most valuable part. I found 12 gaps in our existing HACCP plan after attending.',
        name: 'Manish Trivedi',
        company: 'Parle Products',
      },
      {
        quote:
          "Dr. Jha's explanation of OPRPs vs CCPs finally cleared a confusion I had for years. Highly recommended for QA professionals.",
        name: 'Priya Nambiar',
        company: 'Amul Dairy',
      },
    ],
    registrationLink: '#',
    contactEmail: 'training@niftem.ac.in',
    contactPhone: '+91-130-2281150',
    brochureLink: '#',
    relatedCourses: ['food-quality-control-and-haccp'],
  },
  {
    id: 'ws-002',
    slug: 'sensory-evaluation-cftri-jun25',
    title: 'Sensory Evaluation Techniques for Food Product Development',
    organizer: 'Central Food Technological Research Institute (CFTRI)',
    organizerLogo: 'https://images.unsplash.com/photo-1527689638836-411945a2b57c?w=200&h=200&fit=crop',
    organizerWebsite: 'https://www.cftri.res.in',
    badge: 'Closing Soon',
    category: 'Product Development',
    level: 'Beginner to Intermediate',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    date: '2025-06-21',
    endDate: '2025-06-22',
    duration: '2 Days',
    location: 'Mysore, Karnataka',
    venue: 'CFTRI Main Campus, Cheluvamba Mansion, Mysore',
    mode: 'Offline',
    fee: '₹6,000',
    earlyBirdFee: '₹5,000 (before June 10)',
    feeIncludes: ['Sensory evaluation kit', 'CFTRI certificate', 'Lunch both days', 'Lab access during workshop'],
    seats: 25,
    seatsLeft: 8,
    registrationDeadline: '2025-06-14',
    overview:
      'Learn to design and conduct professional sensory panels for food product evaluation. This workshop covers affective, discriminative, and descriptive testing methods used by food companies to guide R&D decisions, quality benchmarking, and market research for food product development.',
    agenda: [
      {
        day: 'Day 1',
        title: 'Sensory Science Fundamentals & Affective Testing',
        topics: [
          'Human senses and psychophysics of food perception',
          'Sensory lab design: environment, booths, and panel management',
          'Hedonic testing: 9-point scale, JAR scale, and CATA methodology',
          'Panel selection, screening, and training protocols',
          'Hands-on: designing and conducting a consumer preference test on snack products',
        ],
      },
      {
        day: 'Day 2',
        title: 'Discriminative & Descriptive Testing',
        topics: [
          'Threshold tests and detection limits for off-flavours in processed foods',
          'Triangle test, duo-trio, and same-different discriminative protocols',
          'Quantitative Descriptive Analysis (QDA) and texture profile analysis',
          'Basic statistical interpretation: t-test, ANOVA, and principal component analysis for sensory data',
          'Hands-on: blind competitive benchmarking of biscuit products using QDA',
        ],
      },
    ],
    learningOutcomes: [
      'Design affective, discriminative, and descriptive sensory test protocols for food products',
      'Set up a functional sensory evaluation booth in a food manufacturing or R&D facility',
      'Select and screen sensory panellists for trained and consumer panels',
      'Analyse sensory data using appropriate statistical methods including ANOVA and PCA',
      'Apply sensory tools to guide product reformulation, renovation, and shelf-life decisions',
      'Conduct objective competitive benchmarking of food products',
    ],
    whoShouldAttend: [
      'Food technologists working in R&D and product development roles',
      'QA professionals involved in product quality benchmarking and complaint investigation',
      'Marketing and brand managers overseeing product renovation or relaunch projects',
      'Students and researchers in food science and technology programmes',
    ],
    prerequisites: ['Basic food science background (undergraduate level)', 'No sensory evaluation experience required'],
    includes: [
      'Personal sensory evaluation kit (tasting cups, reference standards, evaluation sheets)',
      'Printed protocol templates for triangle, QDA, and hedonic tests',
      'CFTRI participation certificate',
      "Access to CFTRI's purpose-built sensory evaluation lab during the workshop",
      'Lunch and tea breaks both days',
    ],
    certificate: {
      name: 'Sensory Evaluation Practitioner Certificate',
      issuedBy: 'Central Food Technological Research Institute (CFTRI)',
      recognizedBy: 'Ministry of Food Processing Industries, CSIR',
    },
    facilitators: [
      {
        name: 'Dr. Anupama Singh',
        designation: 'Senior Scientist, Sensory Science Division, CFTRI',
        experience: '19 years',
        picture: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=200&h=200&fit=crop&crop=face',
      },
    ],
    testimonials: [
      {
        quote:
          'The hands-on competitive benchmarking session gave me a methodology I immediately applied to our biscuit renovation project.',
        name: 'Shalini Menon',
        company: 'Britannia Industries',
      },
    ],
    registrationLink: '#',
    contactEmail: 'training@cftri.res.in',
    contactPhone: '+91-821-2517760',
    brochureLink: '#',
    relatedCourses: ['bakery-and-confectionery-technology'],
  },
  {
    id: 'ws-003',
    slug: 'food-packaging-innovation-iip-jul25',
    title: 'Food Packaging Innovation & Sustainability Workshop',
    organizer: 'Indian Institute of Packaging (IIP)',
    organizerLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',
    organizerWebsite: 'https://www.iip-in.com',
    badge: 'New',
    category: 'Packaging',
    level: 'All Levels',
    coverImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
    date: '2025-07-05',
    endDate: '2025-07-06',
    duration: '2 Days',
    location: 'Mumbai, Maharashtra',
    venue: 'IIP Conference Hall, E-2, MIDC Area, Andheri East, Mumbai',
    mode: 'Offline',
    fee: '₹9,500',
    earlyBirdFee: '₹8,000 (before June 20)',
    feeIncludes: [
      'Packaging materials sample kit',
      'IIP certificate',
      'Regulatory compliance checklist',
      'Networking dinner Day 1',
      'Lunch both days',
    ],
    seats: 35,
    seatsLeft: 22,
    registrationDeadline: '2025-06-28',
    overview:
      "A two-day deep dive into sustainable food packaging solutions, barrier film technology, material selection, and India's evolving packaging regulations. Includes case studies from leading FMCG brands and a hands-on materials testing session using IIP's testing facility.",
    agenda: [
      {
        day: 'Day 1',
        title: 'Packaging Materials & Barrier Technology',
        topics: [
          'Food-grade plastics: PE, PP, PET, EVOH – properties and applications',
          'Multilayer flexible film design: barrier layer selection and lamination structures',
          'Active and intelligent packaging systems: oxygen scavengers, freshness indicators',
          'Modified atmosphere packaging (MAP) and vacuum skin packaging for shelf-life extension',
          'Hands-on: barrier property testing – OTR and WVTR measurement on sample films',
        ],
      },
      {
        day: 'Day 2',
        title: 'Sustainability, Regulations & Cost Optimisation',
        topics: [
          'India\'s EPR (Extended Producer Responsibility) regulations and compliance timeline',
          'Single-use plastic phase-out: what food companies must do by 2026',
          'Bio-based and compostable packaging: current performance vs conventional materials',
          'FSSAI labelling compliance 2024 update: nutritional declaration and front-of-pack rules',
          'Packaging cost-performance matrix: making the business case for sustainable switches',
        ],
      },
    ],
    learningOutcomes: [
      'Select the right packaging material and structure for different food categories and target shelf lives',
      'Design multilayer flexible film specifications with appropriate barrier properties',
      "Understand and plan for India's EPR regulations and plastic reduction obligations",
      'Evaluate sustainable packaging alternatives without compromising food safety or shelf life',
      'Review and approve product labels for full FSSAI compliance including 2024 updates',
    ],
    whoShouldAttend: [
      'Packaging development engineers and managers in food companies',
      'Procurement professionals sourcing packaging materials from suppliers',
      'R&D and product development teams planning new product launches',
      'Marketing professionals involved in packaging design and label approval decisions',
    ],
    prerequisites: ['No prior packaging knowledge required', 'Basic familiarity with packaged food products is sufficient'],
    includes: [
      'Packaging materials sample kit (12 film samples with specifications)',
      'IIP workshop completion certificate',
      'FSSAI labelling regulatory compliance checklist (printed take-home)',
      'Lunch and refreshments both days',
      'Industry networking dinner on evening of Day 1',
    ],
    certificate: {
      name: 'Food Packaging Professional Certificate',
      issuedBy: 'Indian Institute of Packaging (IIP)',
      recognizedBy: 'Ministry of Commerce & Industry, FSSAI',
    },
    facilitators: [
      {
        name: 'Mr. Rajesh Nambiar',
        designation: 'Director – Technical Services, Indian Institute of Packaging',
        experience: '27 years',
        picture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      },
      {
        name: 'Ms. Preeti Shah',
        designation: 'Head of Sustainability, Uflex Limited',
        experience: '14 years',
        picture: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face',
      },
    ],
    testimonials: [
      {
        quote:
          'The barrier film session completely changed how our procurement team evaluates flexible packaging suppliers. Money well spent.',
        name: 'Kiran Desai',
        company: 'Marico Industries',
      },
    ],
    registrationLink: '#',
    contactEmail: 'workshops@iip-in.com',
    contactPhone: '+91-22-28361800',
    brochureLink: '#',
    relatedCourses: ['food-packaging-materials-and-design'],
  },
  {
    id: 'ws-004',
    slug: 'spice-export-compliance-spicesboard-jul25',
    title: 'Spice Processing & Export Compliance Workshop',
    organizer: 'Spices Board India',
    organizerLogo: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop',
    organizerWebsite: 'https://www.spicesboard.gov.in',
    badge: 'Govt. Certified',
    category: 'Export & Trade',
    level: 'Intermediate',
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800',
    date: '2025-07-18',
    endDate: '2025-07-19',
    duration: '2 Days',
    location: 'Kochi, Kerala',
    venue: 'Spices Board India Headquarters, Sugandha Bhavan, Kochi',
    mode: 'Offline',
    fee: '₹5,500',
    earlyBirdFee: '₹4,500 (before July 5)',
    feeIncludes: [
      'Spices Board India certificate',
      'Export documentation template pack',
      'EU/US/Japan MRL handbook',
      'Lunch both days',
    ],
    seats: 40,
    seatsLeft: 27,
    registrationDeadline: '2025-07-12',
    overview:
      'A government-backed workshop conducted by Spices Board India, equipping spice processors and exporters with the knowledge to comply with international food safety standards, pass APEDA inspections, and meet the strict pesticide residue limits of European and US importers.',
    agenda: [
      {
        day: 'Day 1',
        title: 'Quality Systems in Spice Processing',
        topics: [
          'Incoming spice quality assessment: moisture content, volatile oil, pungency, and adulteration tests',
          'Steam sterilization vs ETO treatment: regulatory acceptability and buyer preferences',
          'Optical and electronic sorting: equipment selection and rejection rate benchmarks',
          'GMP implementation in spice cleaning, grinding, and blending units',
          'Microbial limits for spices: Salmonella, E. coli, TPC – testing and corrective actions',
        ],
      },
      {
        day: 'Day 2',
        title: 'Export Documentation & Buyer Compliance',
        topics: [
          'APEDA registration, renewal, and export inspection procedures',
          'EU Regulation EC 396/2005: MRL requirements for major spice categories',
          'ASTA cleanliness specifications and grading standards for export',
          'Phytosanitary certification: obtaining and maintaining validity',
          'Halal and kosher certification: documentation requirements for GCC and US markets',
          'Case study: managing a EU pesticide residue rejection and requalification process',
        ],
      },
    ],
    learningOutcomes: [
      'Set up a steam sterilization protocol that meets EU and GCC buyer requirements',
      'Prepare complete APEDA export documentation to avoid shipment rejections',
      'Test incoming spices for pesticide residues and adulteration using approved methods',
      'Build a GMP programme that satisfies international auditor requirements',
      'Understand EU, US, and Japanese MRL limits for the top 20 spice categories',
    ],
    whoShouldAttend: [
      'Spice processors and traders who export or plan to export to international markets',
      'Quality managers at spice grinding, blending, and packaging units',
      'Procurement officers at spice export companies sourcing from farmers',
      'Entrepreneurs setting up spice processing units for domestic or export sale',
    ],
    prerequisites: [
      'Basic knowledge of spice processing operations',
      'Familiarity with FSSAI food business operator requirements',
    ],
    includes: [
      'Spices Board India participation and completion certificate',
      'Comprehensive export documentation template pack (12 templates)',
      'EU, US, and Japan MRL reference handbook for spices (printed)',
      'Tea, coffee, and lunch both days',
    ],
    certificate: {
      name: 'Spice Export Compliance Certificate',
      issuedBy: 'Spices Board India (Ministry of Commerce & Industry)',
      recognizedBy: 'APEDA, FSSAI, Ministry of Commerce & Industry',
    },
    facilitators: [
      {
        name: 'Mr. Thomas Varghese',
        designation: 'Deputy Director – Quality, Spices Board India',
        experience: '21 years',
        picture: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face',
      },
      {
        name: 'Dr. Latha Krishnan',
        designation: 'Food Safety Consultant, formerly APEDA Regulatory Affairs',
        experience: '17 years',
        picture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
      },
    ],
    testimonials: [
      {
        quote:
          'After attending this workshop, our last EU shipment passed MRL checks without a single query. The MRL handbook alone is worth the fee.',
        name: 'Ramesh Pillai',
        company: 'Kerala Spices Exports Pvt. Ltd.',
      },
    ],
    registrationLink: '#',
    contactEmail: 'training@spicesboard.gov.in',
    contactPhone: '+91-484-2333610',
    brochureLink: '#',
    relatedCourses: ['spice-processing-and-export-standards'],
  },
  {
    id: 'ws-005',
    slug: 'cold-chain-frozen-food-icfa-aug25',
    title: 'Cold Chain Management & Frozen Food Technology Workshop',
    organizer: 'Indian Chamber of Food and Agriculture (ICFA)',
    organizerLogo: 'https://images.unsplash.com/photo-1565061974064-d9b4f5b6d3d2?w=200&h=200&fit=crop',
    organizerWebsite: 'https://www.icfa.org.in',
    badge: 'Hybrid',
    category: 'Cold Chain',
    level: 'All Levels',
    coverImage: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800',
    date: '2025-08-02',
    endDate: '2025-08-02',
    duration: '1 Day',
    location: 'Delhi NCR',
    venue: 'India Habitat Centre, Lodhi Road, New Delhi (+ Online stream)',
    mode: 'Hybrid',
    fee: '₹4,200',
    earlyBirdFee: '₹3,500 (before July 20)',
    feeIncludes: [
      'ICFA certificate',
      'Cold chain design toolkit (digital)',
      'Lunch for offline participants',
      'Recording access for online attendees',
    ],
    seats: 60,
    seatsLeft: 38,
    registrationDeadline: '2025-07-28',
    overview:
      'A one-day intensive workshop on cold chain logistics and frozen food processing in India, featuring industry case studies from McCain Foods and Snowman Logistics. Covers thermodynamics, IQF technology, cold store design, and temperature monitoring solutions.',
    agenda: [
      {
        day: 'Day 1',
        title: 'Cold Chain Science to Commercial Operations',
        topics: [
          'Physics of freezing: ice crystal formation, zone of maximum crystallization, and food texture impact',
          'IQF technology: fluidized bed vs belt tunnel freezer selection and process optimisation',
          'Blast freezing room design: airflow, pull-down time, and load calculations',
          'Cold chain infrastructure: pre-cooling facilities, refrigerated transport, and cold store design',
          'Temperature monitoring: data loggers, IoT sensors, and excursion response protocols',
          'FSSAI and CODEX cold chain compliance requirements for frozen food businesses',
          'Panel discussion: India\'s cold chain investment landscape and opportunities',
        ],
      },
    ],
    learningOutcomes: [
      'Understand the science behind IQF and blast freezing and their effect on food quality',
      'Design a temperature monitoring and cold chain compliance programme',
      'Select appropriate IQF or blast freezing technology for your product category',
      'Identify gaps in your existing cold chain and prioritise investment decisions',
      'Apply FSSAI and CODEX requirements for frozen food storage and distribution',
    ],
    whoShouldAttend: [
      'Supply chain and logistics professionals in food processing companies',
      'Entrepreneurs planning frozen food or cold chain infrastructure businesses',
      'Product developers working on frozen ready-to-cook products',
      'Government officials and policymakers in food and agriculture ministries',
    ],
    prerequisites: ['No prior cold chain knowledge required', 'General food industry background is helpful'],
    includes: [
      'ICFA workshop participation certificate',
      'Cold chain programme design toolkit (digital PDF)',
      'Post-workshop access to recorded session (online attendees and hybrid participants)',
      'Networking lunch for offline participants',
      'Speaker panel Q&A session',
    ],
    certificate: {
      name: 'Cold Chain & Frozen Food Technology Certificate',
      issuedBy: 'Indian Chamber of Food and Agriculture (ICFA)',
      recognizedBy: 'Ministry of Food Processing Industries',
    },
    facilitators: [
      {
        name: 'Mr. Vivek Sharma',
        designation: 'VP – Operations, Snowman Logistics Ltd.',
        experience: '22 years',
        picture: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face',
      },
      {
        name: 'Dr. Padmini Iyer',
        designation: 'Head of Product Development, McCain Foods India',
        experience: '15 years',
        picture: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face',
      },
    ],
    testimonials: [
      {
        quote:
          "The panel discussion on India's cold chain gaps was a frank and refreshing conversation. Learned more in one day than from months of reading.",
        name: 'Aditya Bose',
        company: 'Godrej Tyson Foods',
      },
    ],
    registrationLink: '#',
    contactEmail: 'events@icfa.org.in',
    contactPhone: '+91-11-43520543',
    brochureLink: '#',
    relatedCourses: ['frozen-food-technology'],
  },
  {
    id: 'ws-006',
    slug: 'nutraceutical-formulation-afsti-aug25',
    title: 'Nutraceutical Formulation & FSSAI Regulatory Workshop',
    organizer: 'Association of Food Scientists & Technologists India (AFSTI)',
    organizerLogo: 'https://images.unsplash.com/photo-1576671414121-aa2d60f93703?w=200&h=200&fit=crop',
    organizerWebsite: 'https://www.afsti.org',
    badge: 'Popular',
    category: 'Nutraceuticals',
    level: 'Advanced',
    coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
    date: '2025-08-20',
    endDate: '2025-08-22',
    duration: '3 Days',
    location: 'Bengaluru, Karnataka',
    venue: 'AFSTI Karnataka Chapter Centre, Rajajinagar, Bengaluru',
    mode: 'Offline',
    fee: '₹12,000',
    earlyBirdFee: '₹10,500 (before August 5)',
    feeIncludes: [
      'Workshop handbook and FSSAI regulatory guide',
      'AFSTI certificate',
      'FSSAI dossier template kit',
      'All meals and refreshments',
      '30-day regulatory helpdesk access',
    ],
    seats: 20,
    seatsLeft: 9,
    registrationDeadline: '2025-08-13',
    overview:
      "An advanced 3-day workshop for food scientists and regulatory professionals in India's fast-growing nutraceuticals sector. Covers bioactive extraction, encapsulation formulation, clinical evidence review, and the full FSSAI product approval pathway for health supplements.",
    agenda: [
      {
        day: 'Day 1',
        title: 'Bioactive Science & Extraction',
        topics: [
          'Bioactive categories: polyphenols, carotenoids, omega-3s, probiotics, plant extracts',
          'Extraction methods: solvent, supercritical CO₂, aqueous enzymatic extraction',
          'Standardisation and characterisation of botanical extracts by HPLC',
          'Probiotic science: strain selection, viability requirements, and CFU stability',
          'Hands-on: evaluating standardisation certificates for five commercial botanical extracts',
        ],
      },
      {
        day: 'Day 2',
        title: 'Formulation, Encapsulation & Stability',
        topics: [
          'Microencapsulation by spray drying and coacervation: process and equipment',
          'Nanoencapsulation and liposomal delivery systems for sensitive bioactives',
          'Food matrix selection for fortification: beverages, dairy, cereals, and confections',
          'Stability testing protocols: ICH-adapted guidelines for nutraceutical ingredients',
          'Hands-on: designing a stability test plan for an omega-3 fortified product',
        ],
      },
      {
        day: 'Day 3',
        title: 'FSSAI Regulations & Health Claims',
        topics: [
          'FSS (Health Supplements, Nutraceuticals, and Special Dietary Foods) Regulations 2022',
          'Health claim categories: structure-function claims vs disease risk reduction claims',
          'Evidence hierarchy for health claim substantiation: systematic reviews, RCTs, observational data',
          'FSSAI product approval dossier walkthrough: documents, format, and timelines',
          'Case study: taking a probiotic functional food from concept to FSSAI approval',
        ],
      },
    ],
    learningOutcomes: [
      'Select and validate bioactive extraction and standardisation methods',
      'Design microencapsulation systems appropriate for unstable bioactives',
      'Prepare an FSSAI product registration dossier for a health supplement',
      'Understand the evidence standards required for structure-function health claims in India',
      'Build a stability testing programme for nutraceutical products aligned with regulatory expectations',
    ],
    whoShouldAttend: [
      'R&D scientists in nutraceutical and functional food companies',
      'Regulatory affairs managers responsible for FSSAI filings and product approvals',
      'Pharmaceutical professionals transitioning into the food-nutraceuticals space',
      'Entrepreneurs building health food or dietary supplement brands in India',
    ],
    prerequisites: [
      'M.Sc. or M.Tech in Food Science, Biochemistry, Pharmacy, or related discipline',
      'Basic knowledge of FSSAI food regulations',
      'Familiarity with nutraceutical ingredients and product categories',
    ],
    includes: [
      'Comprehensive workshop handbook with regulatory texts (200+ pages)',
      'FSSAI product dossier template kit (10 editable documents)',
      'AFSTI completion certificate',
      'All meals and refreshments across 3 days',
      '30-day regulatory question helpdesk access post-workshop',
    ],
    certificate: {
      name: 'Nutraceutical Formulation & Regulatory Affairs Certificate',
      issuedBy: 'Association of Food Scientists & Technologists India (AFSTI)',
      recognizedBy: 'Ministry of Food Processing Industries, FSSAI',
    },
    facilitators: [
      {
        name: 'Dr. Meera Gupta',
        designation: 'Nutraceuticals Scientist, formerly Head R&D, Himalaya Wellness',
        experience: '20 years',
        picture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
      },
      {
        name: 'Mr. Harish Tiwari',
        designation: 'Head – Regulatory Affairs, GNC India',
        experience: '13 years',
        picture: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&h=200&fit=crop&crop=face',
      },
    ],
    testimonials: [
      {
        quote:
          'The Day 3 dossier walkthrough was exactly what we needed. We filed our first FSSAI health supplement application within a month of attending.',
        name: 'Neha Sharma',
        company: 'OZiva',
      },
    ],
    registrationLink: '#',
    contactEmail: 'workshops@afsti.org',
    contactPhone: '+91-80-23601839',
    brochureLink: '#',
    relatedCourses: ['nutraceuticals-and-functional-foods'],
  },
];
