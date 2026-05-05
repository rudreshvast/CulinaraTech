export type Lesson = {
  name: string;
  duration: string;
};
 
export type Section = {
  sectionNumber: number;
  title: string;
  overview: string;
  totalDuration: string;
  lessons: Lesson[];
};
 
export type Instructor = {
  slug: string;
  name: string;
  title: string;
  picture: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
  bio: string;
};
 
export type Course = {
  slug: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  image: string;
  instructor: Instructor;
  partner: string;
  overview: string;
  whatYouWillLearn: string[];
  requirements: string[];
  description: string;
  whoThisCourseIsFor: string[];
  sections: Section[];
};
 
export const courses: Course[] = [
  {
    "slug": "milk-pasteurization-fundamentals",
    "title": "Milk Pasteurization Fundamentals",
    "category": "Dairy Tech",
    "level": "Beginner",
    "duration": "4 Weeks",
    "price": "₹9,999",
    "originalPrice": "₹14,999",
    "badge": "Popular",
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800",
    "partner": "Nestlé India",
    "overview": "Understand the science and industrial techniques behind milk pasteurization, HTST and UHT processing, and dairy safety compliance for food-grade operations.",
    "whatYouWillLearn": [
      "Understand the microbiology behind milk spoilage and pathogen control",
      "Operate and troubleshoot HTST pasteurization equipment",
      "Design and manage UHT and aseptic processing lines",
      "Perform phosphatase tests and microbial verification checks",
      "Apply FSSAI and AGMARK compliance standards in a dairy plant",
      "Implement CIP (Clean-In-Place) protocols effectively",
      "Interpret time-temperature curves for safe pasteurization",
      "Understand Tetra Pak and other aseptic packaging systems"
    ],
    "requirements": [
      "Basic understanding of food science or biology (Class 12 level)",
      "No prior dairy industry experience required",
      "Access to a laptop or smartphone for video content",
      "Willingness to complete lab-simulation exercises"
    ],
    "description": "This beginner-friendly course takes you from the basics of why milk needs to be pasteurized all the way to operating industrial HTST and UHT processing lines. You will explore the microbiology of raw milk, learn how different heat treatment methods work, and understand the engineering behind large-scale dairy equipment. The course is structured around real plant scenarios and compliance checklists used by leading dairy companies in India. By the end, you will be confident reading flow diagrams, understanding critical control points, and preparing for roles in dairy QA, production, or technical sales.",
    "whoThisCourseIsFor": [
      "Food science or dairy technology students seeking industry exposure",
      "Fresh graduates joining dairy processing companies",
      "Quality control technicians in milk collection and chilling centres",
      "Entrepreneurs setting up small-to-mid-scale dairy processing units",
      "Sales and marketing professionals in dairy equipment companies"
    ],
    "instructor": {
      "slug": "dr-priya-nair",
      "name": "Dr. Priya Nair",
      "title": "Dairy Scientist & Processing Expert",
      "picture": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
      "rating": 4.7,
      "reviews": 12840,
      "students": 54320,
      "courses": 3,
      "bio": "Dr. Priya Nair is a dairy scientist with over 18 years of experience in milk processing, UHT technology, and food safety systems. She holds a PhD in Dairy Technology from NDRI Karnal and has worked with Nestlé India, Mother Dairy, and FSSAI as a technical consultant. Her research on low-temperature pasteurization was published in the Journal of Dairy Science, and she has trained over 2,000 dairy professionals across India. Known for breaking down complex thermodynamics into practical plant-floor knowledge, Dr. Nair brings real factory walk-throughs and regulatory case studies into every lesson."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Introduction to Dairy Safety",
        "overview": "History of milk-borne diseases, the science behind pasteurization, and why temperature control matters in dairy supply chains.",
        "totalDuration": "75 mins",
        "lessons": [
          { "name": "Why raw milk is dangerous", "duration": "25 mins" },
          { "name": "Louis Pasteur and the origins of pasteurization", "duration": "20 mins" },
          { "name": "Global dairy safety regulations overview", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "HTST Processing Systems",
        "overview": "Hands-on breakdown of High Temperature Short Time equipment, flow diagrams, and industrial setups used in mid-scale dairy plants.",
        "totalDuration": "150 mins",
        "lessons": [
          { "name": "HTST equipment components and flow", "duration": "45 mins" },
          { "name": "Temperature and time parameters", "duration": "35 mins" },
          { "name": "Cleaning-in-place (CIP) protocols", "duration": "40 mins" },
          { "name": "Troubleshooting HTST line faults", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "UHT and Aseptic Processing",
        "overview": "Ultra-High Temperature processing for extended shelf life, packaging compatibility, and aseptic filling line operations.",
        "totalDuration": "125 mins",
        "lessons": [
          { "name": "Principles of UHT sterilization", "duration": "40 mins" },
          { "name": "Direct vs indirect UHT heating", "duration": "35 mins" },
          { "name": "Aseptic packaging and Tetra Pak systems", "duration": "50 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Quality Testing and Compliance",
        "overview": "Laboratory methods for pasteurization verification, microbial testing, and FSSAI/AGMARK documentation requirements.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Phosphatase test and its significance", "duration": "30 mins" },
          { "name": "Microbial plate count methods", "duration": "35 mins" },
          { "name": "FSSAI licensing and audit preparation", "duration": "40 mins" }
        ]
      }
    ]
  },
  {
    "slug": "food-quality-control-and-haccp",
    "title": "Food Quality Control & HACCP",
    "category": "Food Safety",
    "level": "Intermediate",
    "duration": "6 Weeks",
    "price": "₹14,999",
    "originalPrice": "₹19,999",
    "badge": "Trending",
    "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
    "partner": "ITC Foods",
    "overview": "Master HACCP principles, GMP auditing, and regulatory compliance frameworks essential for quality assurance roles in processed food manufacturing.",
    "whatYouWillLearn": [
      "Apply all 7 HACCP principles to real food manufacturing processes",
      "Conduct internal GMP and GHP audits with confidence",
      "Write non-conformance reports and CAPA documents",
      "Differentiate between ISO 22000, FSSC 22000, and BRC standards",
      "Perform root cause analysis using 5-Why and fishbone diagrams",
      "Design HACCP plans for new product launches",
      "Manage customer complaint workflows and trend analysis",
      "Prepare your facility for third-party certification audits"
    ],
    "requirements": [
      "Basic knowledge of food processing or manufacturing operations",
      "Familiarity with Indian food regulations is helpful but not mandatory",
      "Ability to read and interpret simple process flow diagrams",
      "Minimum 6 months of work experience in food industry preferred"
    ],
    "description": "Food safety is not optional — it is the foundation of every successful food business. This intermediate-level course gives you a thorough grounding in HACCP methodology, GMP auditing, and the compliance frameworks that govern food production in India and globally. You will work through real-world case studies from ITC Foods, complete practical HACCP plan exercises, and learn to write the documents that auditors and certifying bodies expect to see. Whether you are preparing for an ISO 22000 audit or trying to build a more robust quality culture in your plant, this course gives you the tools and language to make it happen.",
    "whoThisCourseIsFor": [
      "Quality assurance and quality control executives in food companies",
      "Production supervisors wanting to understand food safety systems",
      "Food safety consultants and third-party auditors",
      "Students pursuing careers in food technology or food law",
      "Restaurant and catering managers seeking HACCP certification"
    ],
    "instructor": {
      "slug": "dr-rajeev-sharma",
      "name": "Dr. Rajeev Sharma",
      "title": "Food Safety Auditor & HACCP Specialist",
      "picture": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      "rating": 4.8,
      "reviews": 21450,
      "students": 89760,
      "courses": 5,
      "bio": "Dr. Rajeev Sharma is one of India's most respected food safety educators, with 22 years spanning quality management at ITC Foods, third-party auditing for BRC and FSSC 22000, and faculty positions at CFTRI Mysore. He has led over 400 plant audits across India, Bangladesh, and Sri Lanka, and helped 80+ food companies achieve their first ISO 22000 certification. His no-jargon approach to HACCP and his library of real non-conformance reports and corrective action templates have made his courses the go-to resource for QA professionals in South Asia."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Foundations of Food Safety Management",
        "overview": "Core concepts of food safety systems, prerequisite programs, and the regulatory landscape in India and globally.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Food safety management systems overview", "duration": "30 mins" },
          { "name": "GMP and GHP as prerequisite programs", "duration": "35 mins" },
          { "name": "ISO 22000 vs FSSC 22000 vs BRC", "duration": "40 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "HACCP Principles in Depth",
        "overview": "Step-by-step application of all 7 HACCP principles with real food industry case studies and CCP identification exercises.",
        "totalDuration": "175 mins",
        "lessons": [
          { "name": "Hazard analysis: biological, chemical, physical", "duration": "45 mins" },
          { "name": "Determining critical control points (CCPs)", "duration": "40 mins" },
          { "name": "Setting critical limits and monitoring procedures", "duration": "35 mins" },
          { "name": "Corrective actions and verification", "duration": "30 mins" },
          { "name": "Record keeping and documentation", "duration": "25 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Internal Auditing and Non-Conformance",
        "overview": "Practical audit techniques, checklist design, root cause analysis, and CAPA writing for quality assurance teams.",
        "totalDuration": "155 mins",
        "lessons": [
          { "name": "Planning and conducting internal audits", "duration": "50 mins" },
          { "name": "Writing non-conformance reports (NCRs)", "duration": "35 mins" },
          { "name": "Root cause analysis tools: 5-Why, fishbone", "duration": "40 mins" },
          { "name": "CAPA documentation and closure", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Customer Complaints and Continuous Improvement",
        "overview": "Complaint handling workflows, trend analysis, and embedding a culture of continuous improvement in food manufacturing.",
        "totalDuration": "90 mins",
        "lessons": [
          { "name": "Complaint categorization and severity grading", "duration": "25 mins" },
          { "name": "Trend analysis using QC dashboards", "duration": "35 mins" },
          { "name": "Building a continuous improvement culture", "duration": "30 mins" }
        ]
      }
    ]
  },
  {
    "slug": "bakery-and-confectionery-technology",
    "title": "Bakery & Confectionery Technology",
    "category": "Baked Goods",
    "level": "Intermediate",
    "duration": "5 Weeks",
    "price": "₹12,499",
    "originalPrice": "₹17,999",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800",
    "partner": "Britannia Industries",
    "overview": "Explore industrial formulation of breads, cakes, chocolates, and sugar confections with a focus on scaling production and ingredient optimization.",
    "whatYouWillLearn": [
      "Understand the functional role of each bakery ingredient at industrial scale",
      "Operate continuous dough mixing systems and proofing chambers",
      "Set tunnel oven profiles for consistent bake quality",
      "Manufacture hard and soft dough biscuits using rotary moulding",
      "Temper, mould, and enrobe chocolate at production speeds",
      "Formulate sugar confections using boiling stage control",
      "Apply shelf-life extension strategies for baked goods",
      "Optimize cream filling formulations for sandwiched products"
    ],
    "requirements": [
      "Basic interest in food or baking — no formal qualifications required",
      "Familiarity with common baking ingredients (flour, sugar, butter) is helpful",
      "No industrial machinery experience needed",
      "Access to a device for video playback and downloadable resources"
    ],
    "description": "The Indian bakery and confectionery industry is one of the fastest-growing segments in food processing. This course bridges the gap between home baking and industrial production, giving you a deep understanding of ingredient science, processing machinery, and quality control in bakery lines. Developed in collaboration with Britannia Industries, the course covers bread, biscuits, cakes, chocolate, and sugar confections — all through the lens of large-scale manufacturing. You will learn how formulations change when you scale from kilograms to tonnes, and how to work with the automated systems that modern bakeries rely on.",
    "whoThisCourseIsFor": [
      "Bakery production operators and supervisors seeking formal knowledge",
      "Food technologists moving into the baked goods sector",
      "Entrepreneurs planning to launch a bakery or confectionery brand",
      "Culinary students interested in industrial food production",
      "Ingredient and equipment sales professionals in the bakery sector"
    ],
    "instructor": {
      "slug": "chef-ananya-bose",
      "name": "Chef Ananya Bose",
      "title": "Industrial Bakery Technologist",
      "picture": "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=400&fit=crop&crop=face",
      "rating": 4.6,
      "reviews": 9870,
      "students": 41200,
      "courses": 4,
      "bio": "Chef Ananya Bose bridges the world of artisan baking and industrial food science with a rare combination of culinary training from Le Cordon Bleu Paris and a Masters in Food Technology from IIT Kharagpur. After a decade in product development at Britannia Industries — where she led the launch of NutriChoice and Jim Jam reformulations — she transitioned to full-time education. Her courses are celebrated for their ingredient-level depth, practical formulation worksheets, and honest coverage of how factory constraints shape product decisions that home bakers never have to think about."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Ingredient Science for Baked Goods",
        "overview": "Functional roles of flour, sugar, fats, leavening agents, and emulsifiers in large-scale bakery formulations.",
        "totalDuration": "130 mins",
        "lessons": [
          { "name": "Flour types and gluten functionality", "duration": "40 mins" },
          { "name": "Sugar and sweetener technology", "duration": "30 mins" },
          { "name": "Fats and shortening in texture development", "duration": "35 mins" },
          { "name": "Chemical leaveners: baking soda and baking powder", "duration": "25 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "Industrial Bread Production",
        "overview": "Continuous dough mixing systems, proofing chambers, tunnel ovens, and slicing/packaging automation for bread lines.",
        "totalDuration": "170 mins",
        "lessons": [
          { "name": "Continuous vs batch mixing systems", "duration": "45 mins" },
          { "name": "Fermentation control and proofing technology", "duration": "40 mins" },
          { "name": "Tunnel oven profiles and bake control", "duration": "50 mins" },
          { "name": "Slicing, wrapping, and shelf-life extension", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Biscuit and Cookie Manufacturing",
        "overview": "Hard and soft dough processing, rotary moulding, wire-cut machines, and cream sandwich assembly systems.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Hard dough vs soft dough processing", "duration": "40 mins" },
          { "name": "Rotary moulding and wire-cut technology", "duration": "35 mins" },
          { "name": "Cream manufacturing and sandwiching", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Chocolate and Sugar Confections",
        "overview": "Cocoa bean processing, conching, tempering, moulding, and sugar boiling techniques for industrial candy production.",
        "totalDuration": "155 mins",
        "lessons": [
          { "name": "Cocoa processing: roasting to liquor", "duration": "40 mins" },
          { "name": "Conching, tempering, and moulding chocolate", "duration": "50 mins" },
          { "name": "Sugar boiling stages and candy types", "duration": "35 mins" },
          { "name": "Enrobing and coating technologies", "duration": "30 mins" }
        ]
      }
    ]
  },
  {
    "slug": "beverage-processing-and-packaging",
    "title": "Beverage Processing & Packaging",
    "category": "Beverages",
    "level": "Intermediate",
    "duration": "6 Weeks",
    "price": "₹13,999",
    "originalPrice": "₹18,999",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800",
    "partner": "Coca-Cola India",
    "overview": "Learn carbonation, aseptic filling, Tetra Pak systems, and beverage shelf-life engineering for soft drinks, juices, and functional beverages at scale.",
    "whatYouWillLearn": [
      "Design and manage water treatment systems for beverage plants",
      "Operate carbonation and syrup proportioning equipment",
      "Manage high-speed filling lines for PET, glass, and can formats",
      "Process NFC and concentrate-based juices with pasteurization",
      "Understand aseptic filling and cold-fill packaging technologies",
      "Measure and improve line OEE and reduce changeover losses",
      "Ensure CO₂ purity and carbonation consistency",
      "Apply beverage-specific HACCP and shelf-life strategies"
    ],
    "requirements": [
      "Basic understanding of food or chemical processing concepts",
      "No prior beverage industry experience needed",
      "Comfort with reading basic engineering diagrams is helpful",
      "Recommended for those with at least some science background (Class 12+)"
    ],
    "description": "Beverages are among the most technically complex products in food manufacturing. From water quality to carbonation precision to high-speed filling at thousands of units per hour, every variable matters. This course, developed with Coca-Cola India's technical knowledge base, covers the full breadth of beverage production — soft drinks, juices, nectars, and functional drinks. You will learn the engineering behind water treatment, syrup rooms, carbonation systems, and aseptic packaging, along with how to measure and improve production efficiency. Ideal for anyone targeting a technical, production, or quality role in the beverage industry.",
    "whoThisCourseIsFor": [
      "Production operators and engineers in beverage manufacturing plants",
      "Quality technicians managing in-line checks on beverage lines",
      "Food technology graduates seeking roles in the drinks industry",
      "Entrepreneurs setting up a juice, soda, or RTD beverage brand",
      "Packaging and procurement professionals in beverage companies"
    ],
    "instructor": {
      "slug": "mr-sanjay-kulkarni",
      "name": "Mr. Sanjay Kulkarni",
      "title": "Beverage Manufacturing & Packaging Engineer",
      "picture": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      "rating": 4.5,
      "reviews": 7630,
      "students": 33480,
      "courses": 3,
      "bio": "Sanjay Kulkarni spent 19 years at Coca-Cola India, rising from a process engineer on the filling line to Senior Technical Manager overseeing 6 bottling plants across Maharashtra and Karnataka. His hands-on expertise covers carbonation systems, aseptic cold-fill technology, PET preform manufacturing, and OEE improvement programmes. After taking voluntary retirement, he founded BevTech Academy and began teaching the technical foundations of beverage manufacturing that most university programmes skip entirely."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Water Treatment and Utility Systems",
        "overview": "Water quality standards, filtration, softening, and RO systems critical to beverage production at scale.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Water quality parameters for beverages", "duration": "30 mins" },
          { "name": "Filtration and reverse osmosis systems", "duration": "40 mins" },
          { "name": "CO₂ production and purity standards", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "Carbonated Soft Drink Manufacturing",
        "overview": "Syrup preparation, carbonation mixing, proportioning systems, and high-speed filling line operations.",
        "totalDuration": "160 mins",
        "lessons": [
          { "name": "Syrup room design and concentrate handling", "duration": "40 mins" },
          { "name": "Proportioning and blending systems", "duration": "35 mins" },
          { "name": "Carbonation principles and CO₂ dosing", "duration": "40 mins" },
          { "name": "High-speed filling and crowning", "duration": "45 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Juice and Nectar Processing",
        "overview": "Fruit reception, extraction, pasteurization, and aseptic filling for NFC and concentrate-based juice products.",
        "totalDuration": "140 mins",
        "lessons": [
          { "name": "Fruit reception, washing, and sorting", "duration": "30 mins" },
          { "name": "Extraction methods: cold press vs centrifugal", "duration": "35 mins" },
          { "name": "Pasteurization and de-aeration", "duration": "40 mins" },
          { "name": "Aseptic filling and cold storage", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Packaging Materials and Line Efficiency",
        "overview": "PET, glass, can, and carton packaging selection, line OEE, changeover management, and waste reduction.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "PET bottle blowing and inspection", "duration": "40 mins" },
          { "name": "Labelling, coding, and secondary packaging", "duration": "30 mins" },
          { "name": "OEE measurement and line loss analysis", "duration": "35 mins" }
        ]
      }
    ]
  },
  {
    "slug": "meat-and-poultry-processing",
    "title": "Meat & Poultry Processing",
    "category": "Protein Processing",
    "level": "Advanced",
    "duration": "8 Weeks",
    "price": "₹22,999",
    "originalPrice": "₹28,999",
    "badge": "Expert",
    "image": "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=800",
    "partner": "Venky's India",
    "overview": "Deep-dive into slaughter hygiene, cold chain logistics, marination technology, and regulatory standards for red meat and poultry product manufacturing.",
    "whatYouWillLearn": [
      "Apply ante-mortem and post-mortem inspection protocols",
      "Operate stunning, bleeding, scalding, and evisceration lines",
      "Manage immersion and air chilling systems for carcasses",
      "Formulate and process marinated and injected meat products",
      "Set up breading, battering, and frying lines for RTC products",
      "Design cold chain logistics for domestic and export markets",
      "Navigate FSSAI, APEDA, and halal/kosher certification",
      "Implement HACCP in a meat processing environment"
    ],
    "requirements": [
      "Prior knowledge of food science, microbiology, or animal science recommended",
      "Comfort with topics related to animal slaughter and processing",
      "Understanding of basic food safety and hygiene principles",
      "Suitable for professionals with at least 1 year of food industry experience"
    ],
    "description": "Meat and poultry processing is one of the most regulated and technically demanding sectors in the food industry. This advanced course provides a comprehensive view of the entire processing chain — from lairage and slaughter to further processing, packaging, and export certification. Developed with Venky's India, a leading poultry brand, the course blends veterinary science, food engineering, and regulatory knowledge. You will gain hands-on understanding of stunning technologies, chilling systems, marination and value-addition techniques, and the compliance requirements for domestic sale as well as international export.",
    "whoThisCourseIsFor": [
      "Veterinary graduates and meat inspection officers",
      "Production managers in poultry and red meat processing plants",
      "Food technologists specialising in ready-to-cook protein products",
      "Export managers handling meat shipments to Middle East, Europe, or Southeast Asia",
      "Entrepreneurs setting up halal-certified meat processing units"
    ],
    "instructor": {
      "slug": "dr-vivek-rao",
      "name": "Dr. Vivek Rao",
      "title": "Meat Science & Protein Processing Expert",
      "picture": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
      "rating": 4.9,
      "reviews": 6210,
      "students": 18940,
      "courses": 2,
      "bio": "Dr. Vivek Rao holds a PhD in Meat Science from Kansas State University and returned to India to build one of the country's first dedicated meat processing training programmes at NIFTEM. He has consulted for Venky's, Suguna Foods, and Al Kabeer Exports on setting up HACCP systems, halal-certified slaughter lines, and RTC product development. His expertise extends to export market compliance for the GCC, EU, and Southeast Asia — knowledge that is rarely taught in Indian classrooms."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Ante and Post-Mortem Inspection",
        "overview": "Veterinary inspection protocols, lairage management, and post-slaughter carcass grading systems.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Lairage design and animal welfare standards", "duration": "35 mins" },
          { "name": "Ante-mortem inspection procedures", "duration": "30 mins" },
          { "name": "Post-mortem inspection and grading", "duration": "40 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "Slaughter and Primary Processing",
        "overview": "Stunning methods, bleeding, scalding, defeathering, and evisceration line operations for poultry and red meat.",
        "totalDuration": "160 mins",
        "lessons": [
          { "name": "Stunning technologies: electrical vs gas", "duration": "40 mins" },
          { "name": "Bleeding, scalding, and defeathering", "duration": "45 mins" },
          { "name": "Evisceration and carcass washing", "duration": "40 mins" },
          { "name": "Chilling systems: air vs immersion chill", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Further Processing and Value Addition",
        "overview": "Marination, injection, tumbling, forming, and breading technologies for ready-to-cook meat products.",
        "totalDuration": "150 mins",
        "lessons": [
          { "name": "Brine injection and tumbling technology", "duration": "40 mins" },
          { "name": "Forming, moulding, and portioning", "duration": "35 mins" },
          { "name": "Breading and battering systems", "duration": "30 mins" },
          { "name": "Cook-chill and sous vide applications", "duration": "45 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Cold Chain and Regulatory Compliance",
        "overview": "Temperature monitoring, FSSAI meat regulations, export certification, and halal/kosher accreditation processes.",
        "totalDuration": "140 mins",
        "lessons": [
          { "name": "Cold chain monitoring and IoT sensors", "duration": "35 mins" },
          { "name": "FSSAI meat processing regulations", "duration": "40 mins" },
          { "name": "Export certification: APEDA and EIC", "duration": "35 mins" },
          { "name": "Halal and kosher certification processes", "duration": "30 mins" }
        ]
      }
    ]
  },
  {
    "slug": "food-packaging-materials-and-design",
    "title": "Food Packaging Materials & Design",
    "category": "Packaging",
    "level": "Beginner",
    "duration": "3 Weeks",
    "price": "₹7,999",
    "originalPrice": "₹11,999",
    "badge": "Quick",
    "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
    "partner": "Uflex Limited",
    "overview": "Survey the landscape of food-grade packaging polymers, barrier films, labelling regulations, and sustainable packaging innovations in the FMCG sector.",
    "whatYouWillLearn": [
      "Identify and compare glass, metal, paper, and plastic packaging materials",
      "Understand barrier properties: oxygen and moisture transmission rates",
      "Read and specify multilayer flexible film structures",
      "Apply FSSAI labelling rules for nutritional declarations and allergens",
      "Evaluate sustainable packaging alternatives and recyclability",
      "Select appropriate packaging for different food categories",
      "Understand MAP and vacuum skin packaging technologies",
      "Assess packaging cost vs performance trade-offs"
    ],
    "requirements": [
      "No prior packaging or food science knowledge required",
      "Basic English reading ability for regulatory documents",
      "Curiosity about materials science and product design",
      "Suitable for complete beginners and career switchers"
    ],
    "description": "Packaging is the silent salesperson — it protects, communicates, and preserves your product all at once. This beginner-level course gives you a thorough grounding in food packaging materials, from the most traditional (glass, tin) to the most advanced (high-barrier multilayer films and active packaging). Developed with Uflex Limited, one of India's largest flexible packaging companies, the course covers material science, shelf-life engineering, sustainable packaging trends, and India's FSSAI labelling requirements. Whether you are in marketing, procurement, product development, or operations, understanding packaging will make you a stronger professional in the food industry.",
    "whoThisCourseIsFor": [
      "Product development and R&D executives in FMCG companies",
      "Procurement and sourcing managers buying packaging materials",
      "Marketing professionals involved in pack design decisions",
      "Entrepreneurs launching a packaged food brand",
      "Students in food technology, design, or supply chain programmes"
    ],
    "instructor": {
      "slug": "ms-divya-joshi",
      "name": "Ms. Divya Joshi",
      "title": "Packaging Materials & Regulatory Consultant",
      "picture": "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&h=400&fit=crop&crop=face",
      "rating": 4.6,
      "reviews": 5490,
      "students": 28650,
      "courses": 3,
      "bio": "Divya Joshi is a packaging professional with 14 years of experience spanning flexible film development at Uflex, packaging compliance consulting for FMCG brands, and regulatory advisory for FSSAI's labelling reform initiatives. She holds a Masters in Polymer Science from ICT Mumbai and has helped over 50 brands — from startups to listed companies — navigate India's evolving food labelling laws. Her courses are praised for making dry regulatory material genuinely engaging, with real packaging samples, label audits, and cost-per-unit calculations that product managers and procurement teams find immediately useful."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Packaging Materials Science",
        "overview": "Properties of glass, metal, paper, and polymer packaging materials and their suitability for different food categories.",
        "totalDuration": "90 mins",
        "lessons": [
          { "name": "Glass and metal packaging properties", "duration": "30 mins" },
          { "name": "Paper, paperboard, and corrugated packaging", "duration": "25 mins" },
          { "name": "Plastics: PE, PP, PET, PVC overview", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "Flexible and Barrier Films",
        "overview": "Multilayer film structures, barrier coatings, modified atmosphere packaging, and vacuum skin packaging.",
        "totalDuration": "115 mins",
        "lessons": [
          { "name": "Multilayer film extrusion and lamination", "duration": "40 mins" },
          { "name": "Barrier properties: oxygen and moisture transmission", "duration": "35 mins" },
          { "name": "MAP and vacuum skin packaging", "duration": "40 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Labelling Laws and Regulations",
        "overview": "FSSAI labelling requirements, nutritional facts declaration, allergen warnings, and front-of-pack labelling norms.",
        "totalDuration": "95 mins",
        "lessons": [
          { "name": "FSSAI packaging and labelling regulations", "duration": "40 mins" },
          { "name": "Nutritional information and serving size rules", "duration": "30 mins" },
          { "name": "Allergen declaration and traceability codes", "duration": "25 mins" }
        ]
      }
    ]
  },
  {
    "slug": "edible-oil-refining-and-processing",
    "title": "Edible Oil Refining & Processing",
    "category": "Oils & Fats",
    "level": "Advanced",
    "duration": "7 Weeks",
    "price": "₹19,999",
    "originalPrice": "₹25,999",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
    "partner": "Adani Wilmar",
    "overview": "Cover degumming, neutralization, bleaching, deodorization, and hydrogenation processes used in large-scale vegetable oil and vanaspati production plants.",
    "whatYouWillLearn": [
      "Identify and grade oilseeds for solvent and mechanical extraction",
      "Operate expeller presses and solvent extraction plants safely",
      "Perform degumming, neutralization, bleaching, and deodorization",
      "Manage hydrogenation reactors and understand catalyst handling",
      "Apply dry and wet fractionation techniques for palm oil",
      "Understand chemical and enzymatic interesterification",
      "Reduce trans-fat content and meet regulatory limits",
      "Perform quality tests: FFA, peroxide value, colour, smoke point"
    ],
    "requirements": [
      "Background in chemistry, chemical engineering, or food technology recommended",
      "Comfort with process flow diagrams and basic unit operations",
      "Prior exposure to industrial food or chemical processing is beneficial",
      "Minimum 1–2 years of industry experience preferred for advanced sections"
    ],
    "description": "Edible oils touch every kitchen in India, yet few professionals understand the complex refining journey from raw oilseed to crystal-clear, shelf-stable cooking oil. This advanced course, developed in collaboration with Adani Wilmar (Fortune brand), walks you through the complete processing chain — from oilseed preparation and extraction through every refining unit operation to modification technologies like hydrogenation and interesterification. You will learn the chemistry behind each step, the equipment used at industrial scale, and the quality parameters that determine whether a batch meets specification.",
    "whoThisCourseIsFor": [
      "Chemical and food engineers working in oil refinery plants",
      "Quality managers in edible oil manufacturing companies",
      "R&D professionals developing specialty fats and margarines",
      "Supply chain and procurement managers sourcing oilseeds",
      "Graduates in chemical engineering or food technology seeking edible oil careers"
    ],
    "instructor": {
      "slug": "dr-suresh-patel",
      "name": "Dr. Suresh Patel",
      "title": "Edible Oil Refining Technologist",
      "picture": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
      "rating": 4.7,
      "reviews": 4820,
      "students": 21300,
      "courses": 2,
      "bio": "Dr. Suresh Patel is a chemical engineer turned edible oil specialist with 24 years of experience in refinery operations, process optimisation, and trans-fat reduction at Adani Wilmar (Fortune), Ruchi Soya, and Cargill India. He completed his doctoral research on enzymatic interesterification at ICT Mumbai and has filed two patents on low-energy deodorisation systems. Dr. Patel is one of the few educators in India who can explain the chemistry of oil refining and the engineering of the plant in the same breath."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Oilseed Reception and Preparation",
        "overview": "Cleaning, drying, dehulling, and conditioning of oilseeds before extraction, with seed-specific considerations.",
        "totalDuration": "95 mins",
        "lessons": [
          { "name": "Oilseed quality parameters and grading", "duration": "30 mins" },
          { "name": "Cleaning, drying, and dehulling operations", "duration": "35 mins" },
          { "name": "Conditioning and flaking for extraction", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "Oil Extraction Methods",
        "overview": "Mechanical pressing, solvent extraction with hexane, and emerging cold-press and aqueous extraction technologies.",
        "totalDuration": "130 mins",
        "lessons": [
          { "name": "Expeller and screw press technology", "duration": "40 mins" },
          { "name": "Solvent extraction with hexane: principles and safety", "duration": "50 mins" },
          { "name": "Desolventizing, toasting, and meal handling", "duration": "40 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Refining Unit Operations",
        "overview": "Degumming, neutralization, bleaching, and deodorization steps with process parameters and quality checkpoints.",
        "totalDuration": "160 mins",
        "lessons": [
          { "name": "Degumming: water and acid degumming", "duration": "40 mins" },
          { "name": "Neutralization and soapstock handling", "duration": "35 mins" },
          { "name": "Bleaching: adsorbent selection and filtration", "duration": "40 mins" },
          { "name": "Deodorization: temperature, vacuum, and steam", "duration": "45 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Hydrogenation, Fractionation, and Interesterification",
        "overview": "Modification technologies for vanaspati, margarine, and specialty fat production, with trans-fat reduction strategies.",
        "totalDuration": "160 mins",
        "lessons": [
          { "name": "Hydrogenation: partial vs full, catalyst types", "duration": "45 mins" },
          { "name": "Dry and wet fractionation of palm oil", "duration": "40 mins" },
          { "name": "Chemical and enzymatic interesterification", "duration": "40 mins" },
          { "name": "Trans-fat reduction and regulatory limits", "duration": "35 mins" }
        ]
      }
    ]
  },
  {
    "slug": "spice-processing-and-export-standards",
    "title": "Spice Processing & Export Standards",
    "category": "Spices & Condiments",
    "level": "Intermediate",
    "duration": "5 Weeks",
    "price": "₹11,999",
    "originalPrice": "₹16,499",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800",
    "partner": "Everest Masala",
    "overview": "Study cleaning, sterilization, grinding, and blending of spices with emphasis on APEDA/FSSAI export compliance, fumigation, and moisture control.",
    "whatYouWillLearn": [
      "Assess and grade incoming spice raw materials for quality",
      "Use optical sorters and electronic colour sorters effectively",
      "Apply steam sterilization as an ETO-free decontamination method",
      "Select and operate grinding equipment for different spice types",
      "Formulate standardised masala blends for consistent flavour",
      "Manage moisture control and packaging for extended shelf life",
      "Prepare APEDA export documentation and phytosanitary certificates",
      "Meet EU, US, and Japanese pesticide residue and contamination limits"
    ],
    "requirements": [
      "Basic knowledge of food processing or agriculture is helpful",
      "No prior spice industry experience required",
      "Interest in Indian food culture and export trade is an advantage",
      "Ability to work with spreadsheet-based quality logs preferred"
    ],
    "description": "India is the world's largest producer, consumer, and exporter of spices — and the standards expected by global buyers have never been higher. This course, created with Everest Masala, covers the entire spice processing chain from farm gate to export container. You will learn how to evaluate incoming spice quality, apply the right sterilization method, choose grinding and sieving equipment, and formulate masala blends that hit flavour targets consistently. The second half focuses heavily on export compliance — the paperwork, the pesticide limits, and the certification bodies that separate successful exporters from those who have shipments rejected at port.",
    "whoThisCourseIsFor": [
      "Spice processing unit operators and production supervisors",
      "Export managers at spice trading and processing companies",
      "Quality officers managing APEDA and FSSAI compliance",
      "Agronomists and procurement officers sourcing raw spices",
      "Entrepreneurs launching a spice brand for domestic or export markets"
    ],
    "instructor": {
      "slug": "ms-kavitha-menon",
      "name": "Ms. Kavitha Menon",
      "title": "Spice Processing & Export Compliance Specialist",
      "picture": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
      "rating": 4.5,
      "reviews": 6750,
      "students": 29870,
      "courses": 4,
      "bio": "Kavitha Menon grew up in a spice-trading family in Kozhikode and built her career at the intersection of traditional spice knowledge and modern food technology. After a decade in quality and export operations at Everest Masala and Eastern Condiments, she completed her PG Diploma in Food Laws and Regulations from NIFTEM and began teaching. She has personally handled APEDA audits, EU pesticide residue rejections, and the switch from ETO to steam sterilisation for three processing units."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Spice Procurement and Incoming Quality",
        "overview": "Sourcing best practices, moisture content testing, adulteration detection, and supplier qualification for spices.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Spice sourcing regions and variety selection", "duration": "30 mins" },
          { "name": "Moisture, volatile oil, and pungency testing", "duration": "35 mins" },
          { "name": "Adulteration detection methods", "duration": "40 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "Cleaning, Sterilization, and Grinding",
        "overview": "Optical sorters, steam sterilization, ETO alternatives, grinding technology, and particle size control.",
        "totalDuration": "150 mins",
        "lessons": [
          { "name": "Optical and electronic sorting equipment", "duration": "35 mins" },
          { "name": "Steam sterilization vs ETO treatment", "duration": "40 mins" },
          { "name": "Grinding: pin mills, hammer mills, and cryogenic", "duration": "45 mins" },
          { "name": "Particle size analysis and blending", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Blending, Packaging, and Storage",
        "overview": "Masala blend formulation, flavour consistency, packaging material selection, and warehouse hygiene for spices.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Masala formulation and standardization", "duration": "40 mins" },
          { "name": "Flavour stability and packaging selection", "duration": "35 mins" },
          { "name": "Warehouse hygiene and pest management", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Export Compliance and Certification",
        "overview": "APEDA registration, ASTA quality grades, phytosanitary certificates, and key importing country requirements.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "APEDA registration and export documentation", "duration": "35 mins" },
          { "name": "ASTA cleanliness specs and grading", "duration": "30 mins" },
          { "name": "EU, US, and Japan import requirements", "duration": "40 mins" }
        ]
      }
    ]
  },
  {
    "slug": "frozen-food-technology",
    "title": "Frozen Food Technology",
    "category": "Cold Chain",
    "level": "Intermediate",
    "duration": "6 Weeks",
    "price": "₹15,999",
    "originalPrice": "₹20,999",
    "badge": "Trending",
    "image": "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800",
    "partner": "McCain Foods India",
    "overview": "Understand IQF tunnels, blast freezing, cold chain infrastructure, and product development strategies for ready-to-cook and ready-to-eat frozen food lines.",
    "whatYouWillLearn": [
      "Explain the thermodynamics of freezing and ice crystal formation",
      "Design freezing profiles for vegetables, meat, seafood, and prepared foods",
      "Operate IQF fluidized bed and belt tunnel freezers",
      "Run blast freezing rooms for bulk and retail-portioned products",
      "Develop ready-to-cook frozen products including parathas, nuggets, and momos",
      "Manage cold chain logistics and temperature excursion response",
      "Conduct accelerated shelf-life testing for frozen products",
      "Apply FSSAI and CODEX standards for frozen food labelling"
    ],
    "requirements": [
      "Basic food science or engineering background recommended",
      "Understanding of heat transfer concepts is beneficial",
      "No prior cold chain or refrigeration experience needed",
      "Suitable for professionals transitioning into frozen food roles"
    ],
    "description": "India's frozen food market is growing at over 15% annually, driven by urbanisation, dual-income households, and modern retail expansion. This course gives you a rigorous technical foundation in frozen food processing — from the physics of ice crystal formation to the engineering of IQF tunnels, blast freezers, and cryogenic systems. Developed with McCain Foods India, the content is deeply practical and product-focused. You will learn how to develop frozen parathas, nuggets, vegetables, and seafood products, manage cold chain logistics, and conduct shelf-life testing that satisfies regulatory and retail customer requirements.",
    "whoThisCourseIsFor": [
      "Product developers in frozen food and ready-to-cook brands",
      "Production engineers in cold storage and IQF processing facilities",
      "Logistics and supply chain professionals managing frozen goods",
      "Quality managers responsible for frozen food shelf-life claims",
      "Entrepreneurs launching a frozen food brand in India"
    ],
    "instructor": {
      "slug": "dr-arun-iyer",
      "name": "Dr. Arun Iyer",
      "title": "Frozen Food Technologist & Cold Chain Expert",
      "picture": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      "rating": 4.8,
      "reviews": 8430,
      "students": 36540,
      "courses": 3,
      "bio": "Dr. Arun Iyer is a food engineer with a PhD in Low-Temperature Food Processing from Wageningen University and 17 years of product development and plant commissioning experience at McCain Foods, ITC's frozen food division, and Godrej Tyson. He has commissioned IQF lines for potato, peas, seafood, and ready-to-cook products and has worked with cold chain logistics partners across India's modern retail supply chain."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Principles of Freezing and Ice Crystal Formation",
        "overview": "Thermodynamics of freezing, zone of maximum ice crystal formation, and their impact on texture and cell structure.",
        "totalDuration": "100 mins",
        "lessons": [
          { "name": "Water activity and freezing point depression", "duration": "35 mins" },
          { "name": "Zone of maximum ice crystal formation", "duration": "30 mins" },
          { "name": "Cryoprotectants and freeze-thaw stability", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "IQF and Blast Freezing Technology",
        "overview": "Individual quick freezing tunnel design, airflow management, blast room operations, and product-specific freezing profiles.",
        "totalDuration": "160 mins",
        "lessons": [
          { "name": "IQF tunnel types: fluidized bed vs belt", "duration": "45 mins" },
          { "name": "Blast freezer design and air circulation", "duration": "40 mins" },
          { "name": "Freezing profiles for vegetables, seafood, and meat", "duration": "40 mins" },
          { "name": "Cryogenic freezing with liquid nitrogen", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Ready-to-Cook Product Development",
        "overview": "Formulation of frozen parathas, nuggets, momos, and vegetables with focus on cook-from-frozen performance.",
        "totalDuration": "115 mins",
        "lessons": [
          { "name": "Frozen paratha and bread product development", "duration": "40 mins" },
          { "name": "Coated and battered frozen snack products", "duration": "40 mins" },
          { "name": "Frozen vegetable processing: blanching and IQF", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Cold Chain Logistics and Shelf-Life Management",
        "overview": "Refrigerated transport norms, temperature excursion impact, frozen shelf-life testing, and -18°C compliance.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Cold chain infrastructure: warehousing and transport", "duration": "40 mins" },
          { "name": "Temperature excursion monitoring and data loggers", "duration": "30 mins" },
          { "name": "Accelerated shelf-life testing for frozen foods", "duration": "35 mins" }
        ]
      }
    ]
  },
  {
    "slug": "nutraceuticals-and-functional-foods",
    "title": "Nutraceuticals & Functional Foods",
    "category": "Health Foods",
    "level": "Advanced",
    "duration": "9 Weeks",
    "price": "₹27,999",
    "originalPrice": "₹34,999",
    "badge": "Premium",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800",
    "partner": "Himalaya Wellness",
    "overview": "Explore bioactive ingredient extraction, clinical substantiation requirements, FSSAI nutraceutical regulations, and product positioning for wellness-driven food brands.",
    "whatYouWillLearn": [
      "Differentiate nutraceuticals, dietary supplements, and functional foods under Indian law",
      "Extract and characterise bioactive compounds using HPLC and GC-MS",
      "Apply microencapsulation and nanoencapsulation for bioactive delivery",
      "Fortify food matrices like dairy, beverages, and cereals with functional ingredients",
      "Design and interpret clinical and in-vitro efficacy studies",
      "Navigate FSSAI health supplement and health claims approval processes",
      "Develop probiotic products with viability and stability guarantees",
      "Build a nutraceutical brand strategy for D2C, pharmacy, and e-commerce channels"
    ],
    "requirements": [
      "Strong background in food science, biochemistry, or pharmacy required",
      "Familiarity with basic analytical chemistry techniques",
      "Understanding of Indian food regulations (FSSAI) is highly recommended",
      "Minimum 2 years of industry or research experience strongly preferred"
    ],
    "description": "The global nutraceuticals market is projected to exceed $700 billion by 2030, and India is rapidly emerging as both a major producer and consumer of functional health products. This premium advanced course, developed with Himalaya Wellness, takes you deep into the science and business of nutraceuticals. From the extraction and characterisation of bioactive ingredients to the formulation of encapsulated delivery systems, clinical study design, and brand positioning — this course covers every dimension a food scientist, product developer, or health brand founder needs to succeed.",
    "whoThisCourseIsFor": [
      "R&D scientists developing health supplements and functional foods",
      "Regulatory affairs executives managing FSSAI nutraceutical approvals",
      "Pharmaceutical professionals transitioning into the food-nutraceutical space",
      "Entrepreneurs building a health food or supplement brand",
      "Investors and business development professionals evaluating nutraceutical startups"
    ],
    "instructor": {
      "slug": "dr-meera-gupta",
      "name": "Dr. Meera Gupta",
      "title": "Nutraceuticals Scientist & Functional Food Innovator",
      "picture": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      "rating": 4.9,
      "reviews": 11280,
      "students": 47650,
      "courses": 5,
      "bio": "Dr. Meera Gupta is India's foremost educator in nutraceuticals and functional food science, with a PhD in Nutritional Biochemistry from AIIMS Delhi and postdoctoral research at the Nestlé Research Centre in Lausanne. She has led R&D at Himalaya Wellness, Dabur Research Foundation, and GNC India, filing 8 patents on bioactive delivery systems and probiotic formulations. She has published over 40 peer-reviewed papers and serves on the FSSAI Scientific Panel for nutraceuticals regulation."
    },
    "sections": [
      {
        "sectionNumber": 1,
        "title": "Introduction to Nutraceuticals and Regulations",
        "overview": "Defining nutraceuticals vs pharmaceuticals, FSSAI health supplement regulations, and global market overview.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Nutraceuticals, dietary supplements, and functional foods defined", "duration": "35 mins" },
          { "name": "FSSAI regulations for health supplements", "duration": "40 mins" },
          { "name": "Global nutraceutical market and trends", "duration": "30 mins" }
        ]
      },
      {
        "sectionNumber": 2,
        "title": "Bioactive Ingredient Extraction and Characterization",
        "overview": "Extraction techniques for polyphenols, carotenoids, omega-3s, probiotics, and plant-based bioactives.",
        "totalDuration": "175 mins",
        "lessons": [
          { "name": "Solvent extraction and supercritical CO₂ extraction", "duration": "50 mins" },
          { "name": "Standardization of botanical extracts", "duration": "40 mins" },
          { "name": "Characterization: HPLC, GC-MS, and bioassays", "duration": "45 mins" },
          { "name": "Probiotic isolation and viability testing", "duration": "40 mins" }
        ]
      },
      {
        "sectionNumber": 3,
        "title": "Formulation and Delivery Systems",
        "overview": "Encapsulation, emulsification, and matrix technologies that protect and deliver bioactive ingredients effectively.",
        "totalDuration": "170 mins",
        "lessons": [
          { "name": "Microencapsulation: spray drying and coacervation", "duration": "50 mins" },
          { "name": "Nanoencapsulation and liposomal delivery", "duration": "45 mins" },
          { "name": "Fortification of foods: beverages, dairy, cereals", "duration": "40 mins" },
          { "name": "Stability testing of encapsulated actives", "duration": "35 mins" }
        ]
      },
      {
        "sectionNumber": 4,
        "title": "Clinical Substantiation and Health Claims",
        "overview": "Designing efficacy studies, evidence hierarchy for health claims, and FSSAI/EFSA claim substantiation requirements.",
        "totalDuration": "125 mins",
        "lessons": [
          { "name": "Types of health claims: structure-function vs disease risk reduction", "duration": "35 mins" },
          { "name": "Designing clinical and in-vitro efficacy studies", "duration": "50 mins" },
          { "name": "FSSAI health claim approval process", "duration": "40 mins" }
        ]
      },
      {
        "sectionNumber": 5,
        "title": "Product Launch and Market Positioning",
        "overview": "Consumer insight research, pricing strategy, labelling claims, and channel strategy for nutraceutical brands in India.",
        "totalDuration": "105 mins",
        "lessons": [
          { "name": "Consumer segmentation for wellness products", "duration": "35 mins" },
          { "name": "Pricing and positioning in the Indian market", "duration": "30 mins" },
          { "name": "Building a nutraceutical brand: D2C vs pharmacy", "duration": "40 mins" }
        ]
      }
    ]
  }
];

export const featuredCourseSlug = "food-quality-control-and-haccp";
