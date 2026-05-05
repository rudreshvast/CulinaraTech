export interface ItineraryItem {
  time: string;
  activity: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  college: string;
}

export interface IndustrialVisit {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo: string;
  badge: 'Popular' | 'Rare Access' | 'New' | 'Seasonal' | 'Industry Leader' | 'Advanced';
  category: 'Dairy Processing' | 'Bakery & Snacks' | 'Oils & Fats' | 'Frozen Foods' | 'Beverages' | 'Spices & Condiments';
  coverImage: string;
  visitDate: string;
  reportingTime: string;
  duration: string;
  location: string;
  plantAddress: string;
  mapLink: string;
  fee: string;
  groupSize: string;
  registrationDeadline: string;
  seatsLeft: number;
  transportAvailable: boolean;
  transportFrom?: string;
  overview: string;
  itinerary: ItineraryItem[];
  learningHighlights: string[];
  eligibility: string;
  safetyRequirements: string[];
  includes: string[];
  aboutCompany: string;
  galleryImages: string[];
  registrationLink: string;
  contactEmail: string;
  testimonials: Testimonial[];
  relatedCourses?: string[];
}

export const industrialVisits: IndustrialVisit[] = [
  {
    id: 'iv-001',
    slug: 'mother-dairy-pasteurization-delhi-jun25',
    title: 'Dairy Processing Plant Visit – Mother Dairy',
    company: 'Mother Dairy Fruit & Vegetable Pvt. Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    badge: 'Popular',
    category: 'Dairy Processing',
    coverImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
    visitDate: '2025-06-07',
    reportingTime: '8:30 AM',
    duration: 'Full Day (8 hours)',
    location: 'Patparganj, Delhi',
    plantAddress: 'Plot 5, IP Extension, Patparganj, Delhi – 110092',
    mapLink: 'https://maps.google.com/?q=Mother+Dairy+Patparganj+Delhi',
    fee: '₹1,200/person',
    groupSize: '20–35 participants',
    registrationDeadline: '2025-05-31',
    seatsLeft: 14,
    transportAvailable: true,
    transportFrom: 'Nirman Vihar Metro Station, Delhi (Blue Line)',
    overview:
      "Spend a full day inside one of Delhi's largest integrated dairy processing facilities. Witness live operations across raw milk reception, pasteurization, UHT processing, ghee production, and yoghurt manufacturing lines. Includes a guided QA lab tour and a Q&A session with plant technical managers.",
    itinerary: [
      { time: '8:30 AM', activity: 'Arrival, registration, and safety briefing' },
      { time: '9:00 AM', activity: 'Protective gear fitting: lab coat, hair net, shoe covers' },
      { time: '9:15 AM', activity: 'Welcome presentation: Mother Dairy history, operations, and daily processing capacity' },
      { time: '10:00 AM', activity: 'Plant tour: raw milk reception dock, tanker unloading, chilling, and standardisation section' },
      { time: '11:00 AM', activity: 'Plant tour: HTST pasteurization line and UHT processing section' },
      { time: '12:00 PM', activity: 'Plant tour: ghee clarification plant and yoghurt culture inoculation room' },
      { time: '1:00 PM', activity: 'Lunch at plant canteen' },
      { time: '2:00 PM', activity: 'QA laboratory tour: microbial plating lab, fat analyser, and sensory tasting room' },
      { time: '3:00 PM', activity: 'Q&A session with Plant QA Manager and Production Head' },
      { time: '4:00 PM', activity: 'Debrief, product sampling, visit completion certificate distribution, and departure' },
    ],
    learningHighlights: [
      'See HTST pasteurization and UHT processing equipment in full live operation',
      'Understand how incoming raw milk is graded, chilled, and standardised before processing',
      'Observe microbiological testing procedures in a commercial dairy QA lab',
      'Learn how CIP (Clean-In-Place) systems maintain hygiene between production runs',
      'Interact with experienced plant managers and get direct answers to technical questions',
      'See how ghee is produced through continuous clarification and how yoghurt culture is managed',
    ],
    eligibility: 'Open to food technology students, dairy professionals, and food industry personnel. Minimum age 18. Closed-toe shoes mandatory. No sandals or open footwear permitted inside the plant.',
    safetyRequirements: [
      'Closed-toe shoes or safety shoes mandatory',
      'Hair to be tied back – hair nets provided on site',
      'No jewellery, watches, or loose clothing inside processing areas',
      'No personal cameras or mobile phones on the processing floor',
    ],
    includes: [
      'Full guided plant tour with Mother Dairy technical commentary',
      'Lunch at the plant canteen',
      'Mother Dairy product sampling tray',
      'Printed plant process flow reference diagram',
      'Visit completion certificate issued by Mother Dairy',
    ],
    aboutCompany:
      "Mother Dairy was established in 1974 under Operation Flood as a wholly owned subsidiary of NDDB. Today it is one of India's largest milk processing companies, handling over 3 million litres of milk daily across its Delhi and NCR facilities. It is the market leader in liquid milk in Delhi and produces curd, ghee, paneer, ice cream, and dairy whitener.",
    galleryImages: [
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600',
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600',
    ],
    registrationLink: '#',
    contactEmail: 'visits@foodsite.in',
    testimonials: [
      {
        quote: "Seeing the UHT line in operation finally made everything from my textbook make sense. The QA lab tour was a bonus I didn't expect.",
        name: 'Suresh Nair',
        college: 'NDRI Karnal',
      },
    ],
    relatedCourses: ['milk-pasteurization-fundamentals'],
  },
  {
    id: 'iv-002',
    slug: 'britannia-biscuit-plant-rudrapur-jun25',
    title: 'Biscuit & Snack Manufacturing Line Visit – Britannia Industries',
    company: 'Britannia Industries Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    badge: 'Industry Leader',
    category: 'Bakery & Snacks',
    coverImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
    visitDate: '2025-06-21',
    reportingTime: '9:00 AM',
    duration: 'Full Day (7 hours)',
    location: 'Rudrapur, Uttarakhand',
    plantAddress: 'SIDCUL Industrial Area, Phase 2, Rudrapur, Uttarakhand – 263153',
    mapLink: 'https://maps.google.com/?q=Britannia+Rudrapur+Uttarakhand',
    fee: '₹1,500/person',
    groupSize: '15–25 participants',
    registrationDeadline: '2025-06-14',
    seatsLeft: 10,
    transportAvailable: false,
    overview:
      "Step inside Britannia's Rudrapur manufacturing facility – one of the most automated biscuit plants in South Asia – and observe rotary moulding, wire-cut, and cream sandwich lines producing Good Day, Marie Gold, Bourbon, and NutriChoice biscuits at commercial scale.",
    itinerary: [
      { time: '9:00 AM', activity: 'Welcome, registration, and safety induction briefing' },
      { time: '9:30 AM', activity: 'Protective gear distribution: lab coats, hair nets, beard nets, shoe covers' },
      { time: '9:45 AM', activity: 'Plant overview presentation: automation level, daily capacity, and product brands made at this facility' },
      { time: '10:30 AM', activity: 'Tour: ingredient storage silos, flour handling, and pre-weigh dosing system' },
      { time: '11:15 AM', activity: 'Tour: dough mixing room and sheeting and gauging section' },
      { time: '12:00 PM', activity: 'Tour: rotary moulding and wire-cut lines, and long tunnel oven section' },
      { time: '1:00 PM', activity: 'Lunch break at plant canteen' },
      { time: '2:00 PM', activity: 'Tour: cream manufacturing room and cream sandwich assembly line' },
      { time: '2:45 PM', activity: 'Tour: QC lab – weight check, moisture analysis, and biscuit texture testing' },
      { time: '3:30 PM', activity: 'Tour: automated packaging and secondary packing lines' },
      { time: '4:00 PM', activity: 'Q&A session with plant R&D Technologist and Production Supervisor' },
      { time: '4:30 PM', activity: 'Certificate distribution, product goody bag, and departure' },
    ],
    learningHighlights: [
      'See rotary moulding and wire-cut biscuit forming technology in live commercial production',
      'Understand how tunnel oven temperature zone profiles are set for different biscuit types',
      'Observe how cream filling viscosity, temperature, and moisture are controlled on sandwich lines',
      'Learn how inline weight check and vision inspection systems reject non-conforming products',
      'Understand how biscuit products achieve their declared shelf life through ingredient and packaging choices',
      'See how automated flour silos and dosing systems support consistent large-batch mixing',
    ],
    eligibility:
      'Open to food technology students, bakery professionals, and food entrepreneurs. Minimum age 18. PPE provided on site. Participants must wear closed-toe shoes – safety shoes preferred.',
    safetyRequirements: [
      'Closed-toe shoes mandatory – safety shoes strongly preferred',
      'All PPE (lab coat, hair net, shoe covers) must be worn at all times inside the plant',
      'No jewellery, watches, or rings inside production areas',
      'No mobile phones or cameras on the production floor',
    ],
    includes: [
      'Full guided factory tour with Britannia technical staff commentary',
      'Lunch and refreshments',
      'Britannia product goody bag (assorted biscuits and snacks)',
      'Britannia-certified visit completion letter',
    ],
    aboutCompany:
      "Britannia Industries Limited is one of India's largest food companies with over 100 years of history. Known for brands like Good Day, Marie Gold, Tiger, Bourbon, NutriChoice, and Milk Bikis, Britannia processes over 10 lakh tonnes of biscuits annually across 13 manufacturing facilities. The Rudrapur plant is among the most automated and high-capacity facilities in its network.",
    galleryImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600',
    ],
    registrationLink: '#',
    contactEmail: 'visits@foodsite.in',
    testimonials: [
      {
        quote: 'I never realised how much engineering goes into making a biscuit consistently. Seeing the rotary moulder in action was incredible.',
        name: 'Anjali Kapoor',
        college: 'IIT Kharagpur Food Technology',
      },
    ],
    relatedCourses: ['bakery-and-confectionery-technology'],
  },
  {
    id: 'iv-003',
    slug: 'adani-wilmar-oil-refinery-mundra-jul25',
    title: 'Edible Oil Refinery Visit – Fortune (Adani Wilmar)',
    company: 'Adani Wilmar Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop',
    badge: 'Advanced',
    category: 'Oils & Fats',
    coverImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
    visitDate: '2025-07-12',
    reportingTime: '8:00 AM',
    duration: 'Full Day (9 hours)',
    location: 'Mundra, Gujarat',
    plantAddress: 'Adani Wilmar Refinery, Mundra Port Area, Kutch, Gujarat – 370421',
    mapLink: 'https://maps.google.com/?q=Adani+Wilmar+Mundra+Refinery',
    fee: '₹2,000/person',
    groupSize: '10–20 participants',
    registrationDeadline: '2025-07-05',
    seatsLeft: 8,
    transportAvailable: true,
    transportFrom: 'Bhuj Railway Station (shared vehicle arranged for confirmed participants)',
    overview:
      "Visit the Mundra port-based edible oil refinery – one of Asia's largest – and observe continuous refining operations from crude oil receiving through degumming, neutralization, bleaching, and deodorization, all the way to automated filling and packaging lines for Fortune oil brands.",
    itinerary: [
      { time: '8:00 AM', activity: 'Arrival, registration, and mandatory safety orientation for refinery visitors' },
      { time: '8:45 AM', activity: 'Flame-resistant overalls and PPE fitting for all participants' },
      { time: '9:00 AM', activity: 'Technical presentation: refinery process overview, capacity, and Fortune product portfolio' },
      { time: '10:00 AM', activity: 'Tour: crude oil import berth, tanker unloading station, and crude oil storage tanks' },
      { time: '11:00 AM', activity: 'Tour: degumming section and phosphoric acid dosing system' },
      { time: '12:00 PM', activity: 'Tour: neutralization reactors and soapstock centrifuge section' },
      { time: '1:00 PM', activity: 'Lunch break at plant canteen' },
      { time: '2:00 PM', activity: 'Tour: bleaching section – adsorbent earth dosing, mixing, and filter press' },
      { time: '3:00 PM', activity: 'Tour: deodorization columns – high vacuum, steam stripping, and heat recovery' },
      { time: '4:00 PM', activity: 'Tour: QC laboratory and finished product quality testing' },
      { time: '4:45 PM', activity: 'Tour: automated HDPE jar and pouch filling and carton packing lines' },
      { time: '5:00 PM', activity: 'Q&A with Refinery Process Engineers and certificate distribution' },
    ],
    learningHighlights: [
      'Observe the complete continuous oil refining sequence in a live industrial plant',
      'See deodorization columns in operation and understand vacuum and steam parameters used',
      'Learn how FFA, peroxide value, lovibond colour, and moisture are checked at each refining stage',
      'See DCS (Distributed Control System) automated process control in a large food plant',
      'Understand how port-based refinery import logistics work for crude palm, soybean, and sunflower oil',
      'Watch Fortune oil being filled into HDPE jars on high-speed automated packaging lines',
    ],
    eligibility:
      'Recommended for chemical engineering and food technology students (3rd year and above) and industry professionals. Basic chemistry knowledge preferred. Transport from Bhuj available for confirmed participants on request.',
    safetyRequirements: [
      'Flame-resistant overalls mandatory – provided on site',
      'Safety shoes with steel toecap required',
      'Hard hat to be worn in crude oil storage and process sections',
      'No lighters, matches, or smoking anywhere on refinery premises',
      'Strictly no mobile phones or cameras in process areas',
    ],
    includes: [
      'Full guided refinery tour with process engineer commentary',
      'Flame-resistant PPE (overalls and hard hat) for the duration of the visit',
      'Lunch at the plant canteen',
      'Fortune oil product sampling and goody bag',
      'Completion certificate issued by Adani Wilmar',
    ],
    aboutCompany:
      'Adani Wilmar Limited is a joint venture between the Adani Group and Wilmar International. The company is India\'s largest edible oil company with the Fortune brand as India\'s number one selling cooking oil. The Mundra facility is one of the largest port-based continuous oil refineries in Asia, processing crude palm, soybean, sunflower, and mustard oils.',
    galleryImages: [
      'https://images.unsplash.com/photo-1509483570082-8d9bbe84f191?w=600',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600',
    ],
    registrationLink: '#',
    contactEmail: 'visits@foodsite.in',
    testimonials: [
      {
        quote:
          'The DCS control room walk-through showed me how modern Indian food plants are run – far more automated than I expected. Absolutely worth the trip to Mundra.',
        name: 'Rohit Mehta',
        college: 'ICT Mumbai, Chemical Engineering',
      },
    ],
    relatedCourses: ['edible-oil-refining-and-processing'],
  },
  {
    id: 'iv-004',
    slug: 'mccain-iqf-frozen-mehsana-jul25',
    title: 'Frozen Food & IQF Processing Visit – McCain Foods',
    company: 'McCain Foods India Pvt. Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    badge: 'Rare Access',
    category: 'Frozen Foods',
    coverImage: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800',
    visitDate: '2025-07-26',
    reportingTime: '9:00 AM',
    duration: 'Full Day (7 hours)',
    location: 'Mehsana, Gujarat',
    plantAddress: 'McCain Foods India, GIDC Industrial Estate, Mehsana, Gujarat – 384001',
    mapLink: 'https://maps.google.com/?q=McCain+Foods+Mehsana+Gujarat',
    fee: '₹1,800/person',
    groupSize: '15–30 participants',
    registrationDeadline: '2025-07-19',
    seatsLeft: 12,
    transportAvailable: true,
    transportFrom: 'Mehsana Railway Station (10-minute drive, shared cab arranged)',
    overview:
      'Get rare access to McCain India\'s Mehsana potato processing facility and observe IQF fluidized bed tunnel operations, blast freezing rooms, and automated RTC product lines producing French fries, aloo tikki, and wedges for India\'s QSR chains and modern retail.',
    itinerary: [
      { time: '9:00 AM', activity: 'Arrival, registration, and safety induction briefing' },
      { time: '9:30 AM', activity: 'PPE fitting: cold storage suit, safety shoes, hair nets, gloves' },
      { time: '9:45 AM', activity: "Presentation: McCain's global operations and Mehsana plant capacity and product range" },
      { time: '10:30 AM', activity: 'Tour: potato reception platform, bulk washing, and grading table' },
      { time: '11:00 AM', activity: 'Tour: mechanical peeling, cutting, and size classification section' },
      { time: '11:30 AM', activity: 'Tour: blanching line, drying tunnel, and par-frying oil bath' },
      { time: '12:00 PM', activity: 'Tour: IQF fluidized bed tunnel freezer (operating at -35°C)' },
      { time: '1:00 PM', activity: 'Lunch break at plant canteen' },
      { time: '2:00 PM', activity: 'Tour: blast freezing room (-22°C) and finished product cold storage (-18°C)' },
      { time: '3:00 PM', activity: 'Tour: inline metal detector, checkweigher, and carton packing section' },
      { time: '3:45 PM', activity: 'Tour: cold store dispatch bay and temperature-controlled truck loading dock' },
      { time: '4:00 PM', activity: 'Q&A with Production Manager and QA team; certificate and product pack distribution' },
    ],
    learningHighlights: [
      'See IQF fluidized bed tunnel freezers in full commercial operation at -35°C',
      'Understand the par-frying and freezing sequence that gives French fries their texture',
      'Experience the cold store at -18°C with proper protective gear – a genuine sensory experience',
      'Observe how inline metal detection and automated checkweighers ensure product quality',
      'Understand the cold chain logistics from plant freezer to QSR distribution centre',
      'See how blanching parameters are set to preserve potato colour and texture before freezing',
    ],
    eligibility:
      'Open to food technology students, supply chain professionals, and frozen food entrepreneurs. Minimum age 18. Warm clothing recommended – cold store visit is at -18°C. Closed-toe shoes mandatory.',
    safetyRequirements: [
      'Closed-toe shoes with good grip mandatory',
      'Warm underlayer recommended for cold store visit (temperature -18°C)',
      'Cold storage suit and gloves provided on site',
      'Hair net and beard net required throughout plant areas',
      'No mobile phones or cameras inside production and storage areas',
    ],
    includes: [
      'Full guided plant and cold store tour with McCain technical guides',
      'Cold storage suit and gloves for the cold store section of the visit',
      'Lunch at the plant canteen',
      'McCain product pack (French fries and aloo tikki)',
      'Visit completion certificate issued by McCain Foods India',
    ],
    aboutCompany:
      "McCain Foods India Pvt. Ltd. is a subsidiary of McCain Foods Limited, the world's largest manufacturer of frozen potato products with operations in 160+ countries. The Mehsana facility is one of McCain's primary processing plants in India, supplying French fries, wedges, and RTC snacks to McDonald's, Domino's, KFC, and major modern retail chains.",
    galleryImages: [
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600',
      'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600',
    ],
    registrationLink: '#',
    contactEmail: 'visits@foodsite.in',
    testimonials: [
      {
        quote:
          "Walking through the -18°C cold store was an experience I'll never forget. The IQF tunnel explanation was crystal clear – pun intended!",
        name: 'Tanya Bhatt',
        college: 'NIFTEM Kundli',
      },
    ],
    relatedCourses: ['frozen-food-technology'],
  },
  {
    id: 'iv-005',
    slug: 'varun-beverages-pepsi-noida-aug25',
    title: 'Carbonated Beverage Bottling Plant Visit – Varun Beverages (PepsiCo)',
    company: 'Varun Beverages Ltd. (PepsiCo India Franchise)',
    companyLogo: 'https://images.unsplash.com/photo-1554774853-d50f9c681ae2?w=200&h=200&fit=crop',
    badge: 'Popular',
    category: 'Beverages',
    coverImage: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800',
    visitDate: '2025-08-09',
    reportingTime: '10:00 AM',
    duration: 'Half Day (4 hours)',
    location: 'Greater Noida, Uttar Pradesh',
    plantAddress: 'Varun Beverages Ltd., Plot No. 1, NOIDA Special Economic Zone, Greater Noida, UP – 201306',
    mapLink: 'https://maps.google.com/?q=Varun+Beverages+Greater+Noida',
    fee: '₹800/person',
    groupSize: '20–40 participants',
    registrationDeadline: '2025-08-03',
    seatsLeft: 22,
    transportAvailable: false,
    overview:
      'A half-day visit to Varun Beverages\' Greater Noida bottling plant – one of the most modern high-speed CSD facilities in North India – producing Pepsi, 7Up, Mirinda, Mountain Dew, and Tropicana juice products for the Delhi NCR market.',
    itinerary: [
      { time: '10:00 AM', activity: 'Welcome, registration, and 15-minute safety and hygiene briefing' },
      { time: '10:20 AM', activity: 'Overview presentation: plant capacity, PepsiCo brand portfolio, and quality standards' },
      { time: '10:50 AM', activity: 'Tour: water treatment plant – raw water intake, sand filtration, and RO system' },
      { time: '11:20 AM', activity: 'Tour: syrup room – concentrate receiving, syrup preparation, and proportioner system' },
      { time: '11:50 AM', activity: 'Tour: PET preform blow moulding integrated with filling line' },
      { time: '12:10 PM', activity: 'Tour: CSD filling and crowning section – high-speed line running 36,000 bph' },
      { time: '12:40 PM', activity: 'Tour: online QC station – Brix check, CO₂ volume, fill level, and cap torque testing' },
      { time: '1:10 PM', activity: 'Product sampling, Q&A with Plant QC Manager, and certificate distribution' },
    ],
    learningHighlights: [
      'See PET bottle blow moulding integrated directly into a high-speed CSD filling line',
      'Understand how syrup proportioning and CO₂ dosing are controlled to achieve consistent product quality',
      'Observe in-line Brix, carbonation volume, and fill level checks performed at line speed',
      'Learn how a world-class beverage plant achieves 36,000 bottles per hour on a single line',
      'Understand the water treatment journey from raw bore well water to beverage-grade RO water',
      'See how flavour concentrates are handled, diluted, and blended into finished syrup',
    ],
    eligibility:
      'Open to all food technology and chemical engineering students and professionals. Minimum age 18. Closed-toe footwear required – no sandals or flip-flops permitted.',
    safetyRequirements: [
      'Closed-toe shoes mandatory',
      'Hair nets provided and must be worn inside production areas',
      'No jewellery or loose accessories in production zones',
      'No food or drink to be carried onto the production floor',
    ],
    includes: [
      'Guided plant tour with Varun Beverages technical staff',
      'PepsiCo product sampling (assorted beverages)',
      'Visit completion certificate',
      'Refreshments post-visit',
    ],
    aboutCompany:
      'Varun Beverages Limited is one of the largest bottlers of PepsiCo products in the world outside the United States and is the largest PepsiCo franchise in India. Varun Beverages operates 27 manufacturing plants in India producing CSD, juice, and water products under the PepsiCo license.',
    galleryImages: [
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600',
    ],
    registrationLink: '#',
    contactEmail: 'visits@foodsite.in',
    testimonials: [
      {
        quote:
          'The syrup room explanation and the in-line Brix check demo were brilliant. I finally understand how CSD quality is controlled at scale.',
        name: 'Deepak Yadav',
        college: 'HBTU Kanpur, Food Technology',
      },
    ],
    relatedCourses: ['beverage-processing-and-packaging'],
  },
  {
    id: 'iv-006',
    slug: 'everest-masala-spice-processing-vasai-aug25',
    title: 'Spice Processing & Masala Blending Visit – Everest Masala',
    company: 'Everest Food Products Pvt. Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop',
    badge: 'New',
    category: 'Spices & Condiments',
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800',
    visitDate: '2025-08-23',
    reportingTime: '9:30 AM',
    duration: 'Half Day (4.5 hours)',
    location: 'Vasai, Maharashtra',
    plantAddress: 'Everest Food Products, MIDC Industrial Area, Vasai East, Maharashtra – 401208',
    mapLink: 'https://maps.google.com/?q=Everest+Masala+Vasai+MIDC',
    fee: '₹700/person',
    groupSize: '15–30 participants',
    registrationDeadline: '2025-08-16',
    seatsLeft: 18,
    transportAvailable: true,
    transportFrom: 'Vasai Road Railway Station, Western Line (10-minute drive)',
    overview:
      "Visit Everest Masala's Vasai manufacturing facility and observe the full spice processing chain – incoming quality testing, optical sorting, steam sterilization tunnels, cryogenic grinding mills, masala blending rooms, and automated sachet and jar filling packaging lines.",
    itinerary: [
      { time: '9:30 AM', activity: 'Arrival, registration, and safety induction' },
      { time: '10:00 AM', activity: "Presentation: Everest's sourcing philosophy, quality assurance systems, and brand portfolio" },
      { time: '10:30 AM', activity: 'Tour: incoming spice QC laboratory – moisture, volatile oil, colour, and adulteration tests' },
      { time: '11:00 AM', activity: 'Tour: optical colour sorter and electronic cleaning equipment' },
      { time: '11:25 AM', activity: 'Tour: steam sterilization tunnel – continuous belt sterilizer for pathogen control' },
      { time: '11:50 AM', activity: 'Tour: cryogenic grinding mill room – liquid nitrogen-assisted low-temperature grinding' },
      { time: '12:15 PM', activity: 'Tour: masala blending room and flavour matching laboratory' },
      { time: '12:45 PM', activity: 'Tour: automated sachet filling line and jar filling and sealing line' },
      { time: '1:15 PM', activity: "Hands-on spice sensory session led by Everest's QC flavour team" },
      { time: '2:00 PM', activity: 'Q&A with QC Manager, certificate distribution, and spice gift pack' },
    ],
    learningHighlights: [
      'See cryogenic grinding in action – how liquid nitrogen preserves spice aroma during milling',
      'Understand how steam sterilization eliminates Salmonella and E. coli without chemical fumigants',
      'Learn how masala blends are standardised for consistent colour, aroma, and pungency at scale',
      'Observe high-speed sachet filling with integrated checkweigher and seal integrity testing',
      "Participate in a guided spice sensory session with Everest's trained QC panel",
      'See how optical sorters identify and reject discoloured and contaminated spice particles',
    ],
    eligibility:
      'Open to food technology students, spice industry professionals, and food entrepreneurs. No prior experience required. Minimum age 18.',
    safetyRequirements: [
      'Closed-toe shoes mandatory',
      'Hair nets and beard nets provided and must be worn inside processing areas',
      'Dust masks provided for the grinding mill section',
      'No loose clothing or jewellery inside processing areas',
    ],
    includes: [
      'Guided plant tour with Everest technical team commentary',
      'Hands-on spice sensory session',
      'Everest masala product gift pack (assorted spice range)',
      'Refreshments post-visit',
      'Visit completion certificate issued by Everest Food Products',
    ],
    aboutCompany:
      "Everest Food Products Pvt. Ltd. is India's largest branded spice company by retail value, operating since 1966. With over 50 spice and masala products sold across India and in 50+ export markets, Everest processes several thousand tonnes of spices monthly at its Vasai facility. The company is known for its ISO-certified quality systems and its pioneering use of steam sterilization.",
    galleryImages: [
      'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600',
    ],
    registrationLink: '#',
    contactEmail: 'visits@foodsite.in',
    testimonials: [
      {
        quote:
          'The cryogenic grinding room was a revelation. I could smell the difference in aroma intensity between regular and cryo-ground spices immediately.',
        name: 'Fatima Sheikh',
        college: 'ICT Mumbai, Food Engineering',
      },
    ],
    relatedCourses: ['spice-processing-and-export-standards'],
  },
];
