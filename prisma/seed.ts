/**
 * Seed script for AtomFoundation.
 * Populates PostgreSQL with all website content (icons stored as lucide name strings).
 * Run with: bun run db:seed
 */
import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding AtomFoundation database...");

  // -----------------------------------------------------------------------
  // Site settings (singleton)
  // -----------------------------------------------------------------------
  await db.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: "Atom Arc Foundation",
      legalName: "Atom Academic Research & Collaboration Foundation",
      tagline: "Building Future-Ready Communities Through Technology & Education",
      vision:
        "Empower every student and woman with future-ready technology skills, enabling sustainable careers and inclusive growth through education, AI, innovation, and community development.",
      mission:
        "To democratize access to future-ready technology education, empower women and underserved communities, and build sustainable careers through AI, software skills, and strong partnerships.",
      email: "info@atomfoundations.org",
      phone: "+91 8508513222",
      address:
        "No.4B, Raja Nagar, 3rd Street, Bharathi Nagar, Ganapathy, Coimbatore - 641006",
      addressShort: "Coimbatore, Tamilnadu, India",
      founded: 2019,
      registration: "Reg. under Societies Act, 80G & 12A approved",
    },
  });
  console.log("  ✓ SiteSetting");

  // -----------------------------------------------------------------------
  // Programs
  // -----------------------------------------------------------------------
  await db.program.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "ai",
        title: "AI Training",
        tagline: "Master the intelligence shaping the future",
        description:
          "A hands-on AI learning track taking learners from prompt engineering fundamentals to building generative AI applications and understanding machine learning.",
        icon: "Sparkles",
        color: "blue",
        duration: "12 weeks",
        level: "Beginner → Advanced",
        audience: "Students & fresh graduates",
        modules: [
          { name: "Prompt Engineering", description: "Crafting effective prompts for LLMs across real use cases.", icon: "Bot" },
          { name: "Generative AI", description: "Building apps with text, image & code generation models.", icon: "Brain" },
          { name: "Machine Learning Basics", description: "Models, data, training & evaluation fundamentals.", icon: "Cpu" },
        ],
        outcomes: [
          "Build & deploy a GenAI powered application",
          "Earn an Atom Arc Foundation AI certificate",
          "Career-ready portfolio with 3 projects",
        ],
        order: 0,
      },
      {
        id: "software",
        title: "Software Development",
        tagline: "From first line of code to production apps",
        description:
          "A full-stack software development track covering web, Python, Java and mobile app development with real projects and industry workflows.",
        icon: "Code2",
        color: "purple",
        duration: "16 weeks",
        level: "Beginner → Intermediate",
        audience: "Students & career switchers",
        modules: [
          { name: "Web Development", description: "HTML, CSS, JavaScript, React & modern frameworks.", icon: "Globe" },
          { name: "Python Programming", description: "Automation, data scripting & backend basics.", icon: "Code2" },
          { name: "Java & Mobile Apps", description: "Object-oriented programming & cross-platform apps.", icon: "Laptop" },
        ],
        outcomes: [
          "Ship 2 full-stack projects to a live portfolio",
          "Git, agile & code-review ready workflows",
          "Internship & placement assistance",
        ],
        order: 1,
      },
      {
        id: "career",
        title: "Career Readiness",
        tagline: "Land the opportunity, not just the skills",
        description:
          "A career accelerator program that builds resumes, aptitude, interview confidence and a strong professional presence for first-time job seekers.",
        icon: "GraduationCap",
        color: "green",
        duration: "6 weeks",
        level: "All levels",
        audience: "Final-year students & graduates",
        modules: [
          { name: "Resume Building", description: "ATS-friendly resumes that get shortlisted.", icon: "Briefcase" },
          { name: "Aptitude & Reasoning", description: "Quant, logic & verbal problem solving.", icon: "Brain" },
          { name: "Interview Skills & LinkedIn", description: "Mock interviews, personal branding & networking.", icon: "Award" },
        ],
        outcomes: [
          "Polished resume + optimized LinkedIn profile",
          "5+ mock interviews with feedback",
          "Access to our hiring partner network",
        ],
        order: 2,
      },
      {
        id: "women",
        title: "Women Empowerment",
        tagline: "Digital confidence for every woman",
        description:
          "A dedicated track for women including housewives, rural women and self-help groups — building digital literacy, entrepreneurship and financial awareness.",
        icon: "HeartHandshake",
        color: "purple",
        duration: "10 weeks",
        level: "Beginner friendly",
        audience: "Women & self-help groups",
        modules: [
          { name: "Digital Literacy", description: "Smartphones, internet safety & online services.", icon: "Laptop" },
          { name: "Entrepreneurship", description: "Turning skills into micro-businesses & online selling.", icon: "Rocket" },
          { name: "AI for Women & Financial Awareness", description: "Using AI tools & managing money confidently.", icon: "TrendingUp" },
        ],
        outcomes: [
          "Digital independence for daily life & work",
          "Micro-entrepreneurship starter kit",
          "Certificate & SHG community access",
        ],
        order: 3,
      },
      {
        id: "school",
        title: "School Programs",
        tagline: "Early coders, tomorrow's innovators",
        description:
          "Engaging school programs introducing kids to coding, STEM workshops and robotics to spark curiosity and computational thinking early.",
        icon: "Users",
        color: "blue",
        duration: "Ongoing",
        level: "Grades 5–12",
        audience: "Schools & students",
        modules: [
          { name: "Coding for Kids", description: "Block-based & introductory programming.", icon: "Code2" },
          { name: "STEM Workshops", description: "Science, tech, engineering & math exploration.", icon: "Lightbulb" },
          { name: "Robotics", description: "Hands-on robotics & automation basics.", icon: "Cpu" },
        ],
        outcomes: [
          "Annual coding & robotics clubs",
          "Inter-school innovation challenges",
          "Teacher capacity-building sessions",
        ],
        order: 4,
      },
    ],
  });
  console.log("  ✓ Programs");

  // -----------------------------------------------------------------------
  // Impact metrics
  // -----------------------------------------------------------------------
  await db.impactMetric.createMany({
    data: [
      { label: "Students Trained", value: 12450, suffix: "+", icon: "GraduationCap", color: "blue", description: "Across 9 states in India", order: 0 },
      { label: "Women Empowered", value: 4200, suffix: "+", icon: "HeartHandshake", color: "purple", description: "Through digital literacy & SHGs", order: 1 },
      { label: "Schools Reached", value: 180, suffix: "+", icon: "Building2", color: "green", description: "Government & private schools", order: 2 },
      { label: "Active Volunteers", value: 320, suffix: "+", icon: "Users", color: "blue", description: "Mentors, trainers & developers", order: 3 },
      { label: "Training Hours", value: 86000, suffix: "+", icon: "BookOpen", color: "purple", description: "Delivered in the last 3 years", order: 4 },
      { label: "Placement Support", value: 68, suffix: "%", icon: "Briefcase", color: "green", description: "Of eligible graduates placed", order: 5 },
      { label: "Partner Organizations", value: 45, suffix: "+", icon: "Handshake", color: "blue", description: "CSR, NGOs, govt & tech partners", order: 6 },
      { label: "Districts Covered", value: 32, suffix: "", icon: "Globe", color: "purple", description: "Rural & semi-urban reach", order: 7 },
    ],
  });
  console.log("  ✓ ImpactMetrics");

  // -----------------------------------------------------------------------
  // SDGs
  // -----------------------------------------------------------------------
  await db.sdg.createMany({
    data: [
      { number: 4, title: "Quality Education", color: "#C5192D", icon: "BookOpen", contribution: "We deliver free and affordable future-ready tech education to students and women who otherwise lack access.", highlights: ["12,450+ students trained", "Free community bootcamps", "Open learning resources"], order: 0 },
      { number: 5, title: "Gender Equality", color: "#FF3A21", icon: "HeartHandshake", contribution: "Dedicated women empowerment tracks build digital confidence and entrepreneurship for women from all backgrounds.", highlights: ["4,200+ women empowered", "Women-only cohorts", "SHG micro-entrepreneurship"], order: 1 },
      { number: 8, title: "Decent Work & Economic Growth", color: "#A21942", icon: "Briefcase", contribution: "Career readiness, placement support and internships connect learners to sustainable, dignified livelihoods.", highlights: ["68% placement rate", "Hiring partner network", "Internship pipeline"], order: 2 },
      { number: 10, title: "Reduced Inequalities", color: "#DD1367", icon: "Scale", contribution: "We reach rural, semi-urban and underserved communities so opportunity is not limited by geography or income.", highlights: ["32 districts covered", "Scholarships for needy", "Regional language support"], order: 3 },
      { number: 9, title: "Industry, Innovation & Infrastructure", color: "#FD6925", icon: "Cpu", contribution: "AI, software and robotics programs build innovation capacity and digital infrastructure in communities.", highlights: ["AI & robotics labs", "Innovation challenges", "Open-source contributions"], order: 4 },
      { number: 17, title: "Partnerships for the Goals", color: "#19486A", icon: "Handshake", contribution: "We work with CSR companies, NGOs, government and tech partners to multiply impact together.", highlights: ["45+ partner orgs", "CSR & govt collaborations", "Joint community programs"], order: 5 },
    ],
  });
  console.log("  ✓ SDGs");

  // -----------------------------------------------------------------------
  // Events
  // -----------------------------------------------------------------------
  await db.eventItem.createMany({
    skipDuplicates: true,
    data: [
      { id: "ev1", title: "Generative AI Bootcamp 2025", type: "AI Bootcamp", date: new Date("2025-02-15"), endDate: new Date("2025-02-17"), location: "Bengaluru + Online", mode: "Hybrid", description: "A 3-day intensive bootcamp on prompt engineering, RAG, and building GenAI apps with no-code tools.", status: "upcoming", seats: 200, registered: 142, order: 0 },
      { id: "ev2", title: "Women in Tech: Digital Literacy Drive", type: "Community Program", date: new Date("2025-02-22"), location: "Tumkur, Karnataka", mode: "Offline", description: "A community outreach program bringing smartphones, internet safety and AI basics to rural women.", status: "upcoming", seats: 120, registered: 58, order: 1 },
      { id: "ev3", title: "Atom Hackathon: Code for Community", type: "Hackathon", date: new Date("2025-03-08"), endDate: new Date("2025-03-09"), location: "Online", mode: "Online", description: "48 hours to build solutions for education, women empowerment and local community challenges.", status: "upcoming", seats: 500, registered: 311, order: 2 },
      { id: "ev4", title: "STEM Robotics Workshop for Schools", type: "Workshop", date: new Date("2025-03-15"), location: "Government High School, Mysuru", mode: "Offline", description: "Hands-on robotics and automation workshop introducing students to sensors, motors and block coding.", status: "upcoming", seats: 80, registered: 40, order: 3 },
      { id: "ev5", title: "Career Readiness Webinar: Cracking Interviews", type: "Webinar", date: new Date("2025-03-21"), location: "Online (YouTube Live)", mode: "Online", description: "Live session with hiring managers on resume building, aptitude and interview strategies.", status: "upcoming", seats: 1000, registered: 620, order: 4 },
      { id: "ev6", title: "AI for Women — Cohort 4 Graduation", type: "Community Program", date: new Date("2024-12-14"), location: "Bengaluru", mode: "Offline", description: "Graduation ceremony celebrating 140 women who completed the digital literacy & entrepreneurship program.", status: "past", order: 5 },
      { id: "ev7", title: "Code for Kids — Winter Coding Camp", type: "Workshop", date: new Date("2024-11-20"), endDate: new Date("2024-11-24"), location: "Hubballi", mode: "Offline", description: "A 5-day camp introducing 90 school students to block-based coding and building simple games.", status: "past", order: 6 },
      { id: "ev8", title: "Software Developer Bootcamp — Cohort 7", type: "AI Bootcamp", date: new Date("2024-10-05"), endDate: new Date("2024-12-20"), location: "Hybrid", mode: "Hybrid", description: "16-week full-stack software development bootcamp graduating 48 students with placement support.", status: "past", order: 7 },
    ],
  });
  console.log("  ✓ Events");

  // -----------------------------------------------------------------------
  // Stories
  // -----------------------------------------------------------------------
  await db.story.createMany({
    skipDuplicates: true,
    data: [
      { id: "s1", name: "Priya Sharma", role: "Junior AI Developer, TechNova", category: "Placement", image: "priya", quote: "Atom Arc Foundation didn't just teach me AI — they showed me I belonged in tech. Today I build GenAI features used by thousands.", journey: "From a tier-3 college with no coding background to a placed AI developer in 9 months.", before: "Final-year student, no coding exposure, unsure about career path.", after: "Placed as Junior AI Developer with a 4.2 LPA package within 3 months of graduation.", order: 0 },
      { id: "s2", name: "Lakshmi Devi", role: "SHG Entrepreneur", category: "Women Entrepreneur", image: "lakshmi", quote: "I learned to use a smartphone, sell online and now run a small tailoring business from home. I am financially independent.", journey: "A rural homemaker who became a micro-entrepreneur through the women empowerment program.", before: "Homemaker in a village, never used a smartphone, fully dependent on family.", after: "Runs a home tailuring business, earns ₹12,000/month, mentors 8 other women.", order: 1 },
      { id: "s3", name: "Arjun Reddy", role: "Full-stack Developer Intern", category: "Student", image: "arjun", quote: "The software development bootcamp was intense and real. I shipped two live projects before I even graduated.", journey: "A curious student who turned into a confident full-stack developer.", before: "Knew basic HTML, struggled with logic and had no portfolio.", after: "Built 2 full-stack apps, comfortable with React & Python, landed a paid internship.", order: 2 },
      { id: "s4", name: "Meera Nair", role: "Volunteer Mentor", category: "Volunteer", image: "meera", quote: "Volunteering as a mentor gave me more than I gave. Watching students grow is the most fulfilling thing I've done.", journey: "A senior engineer who now mentors 15 students every cohort.", before: "Wanted to give back but didn't know how or where.", after: "Mentors 15 students/cohort, ran 3 mock-interview drives, 4 mentees placed.", order: 3 },
      { id: "s5", name: "Fatima Khan", role: "Data Analyst, FinEdge", category: "Placement", image: "fatima", quote: "The career readiness program transformed how I present myself. My first interview after the program — I got the offer.", journey: "From interview anxiety to a confident, placed data analyst.", before: "Strong academically but failed 6 interviews due to nerves and presentation.", after: "Cleared first interview after the program, placed as Data Analyst at 5.5 LPA.", order: 4 },
      { id: "s6", name: "Ravi Kumar", role: "School Coding Club Lead", category: "Student", image: "ravi", quote: "The robotics workshop made science fun. I built my first robot in class 8 and now lead my school's coding club.", journey: "A school student whose curiosity was ignited by STEM programs.", before: "Class 8 student, found science boring, no exposure to coding.", after: "Leads school coding club, built 3 robots, won inter-school innovation challenge.", order: 5 },
    ],
  });
  console.log("  ✓ Stories");

  // -----------------------------------------------------------------------
  // Partners
  // -----------------------------------------------------------------------
  await db.partner.createMany({
    data: [
      { name: "TechNova Solutions", type: "CSR", logoText: "TN", order: 0 },
      { name: "GreenLeaf Corp", type: "CSR", logoText: "GL", order: 1 },
      { name: "Indian Institute of Technology", type: "Educational Institution", logoText: "IIT", order: 2 },
      { name: "National College Bengaluru", type: "Educational Institution", logoText: "NC", order: 3 },
      { name: "Pratham Education NGO", type: "NGO", logoText: "PE", order: 4 },
      { name: "Rural Shine Foundation", type: "NGO", logoText: "RS", order: 5 },
      { name: "Karnataka Skill Development", type: "Government", logoText: "KSD", order: 6 },
      { name: "Digital India Mission", type: "Government", logoText: "DI", order: 7 },
      { name: "OpenAI Edu", type: "Technology", logoText: "OA", order: 8 },
      { name: "CloudForge", type: "Technology", logoText: "CF", order: 9 },
      { name: "DataBridge Labs", type: "Technology", logoText: "DB", order: 10 },
      { name: "MindSpark Systems", type: "CSR", logoText: "MS", order: 11 },
    ],
  });
  console.log("  ✓ Partners");

  // -----------------------------------------------------------------------
  // Team
  // -----------------------------------------------------------------------
  await db.teamMember.createMany({
    data: [
      { name: "Dr. ABC", role: "Founder & President", bio: "Former AI research lead with 18 years in education technology and a passion for equitable access.", initials: "AI", color: "blue", order: 0 },
      { name: "Sneha Kulkarni", role: "Co-Founder & Director of Programs", bio: "Educator and curriculum designer who has scaled skill programs to 12,000+ learners.", initials: "SK", color: "purple", order: 1 },
      { name: "Rahul Verma", role: "Head of Technology", bio: "Full-stack engineer and open-source contributor leading our LMS and learning tools.", initials: "RV", color: "green", order: 2 },
      { name: "Aisha Mohammed", role: "Director, Women Empowerment", bio: "Community organizer driving digital literacy for 4,200+ women across rural Karnataka.", initials: "AM", color: "purple", order: 3 },
      { name: "Vikram Desai", role: "Head of Partnerships", bio: "Builds CSR, government and institutional partnerships that fund and scale our mission.", initials: "VD", color: "blue", order: 4 },
      { name: "Neha Joshi", role: "Lead, Career Readiness", bio: "Career coach running mock interviews, placement drives and hiring partner networks.", initials: "NJ", color: "green", order: 5 },
    ],
  });
  console.log("  ✓ Team");

  // -----------------------------------------------------------------------
  // Advisors
  // -----------------------------------------------------------------------
  await db.advisor.createMany({
    data: [
      { name: "Prof. Rajesh Menon", role: "AI & Education Advisor", org: "IIT Madras", initials: "RM", order: 0 },
      { name: "Dr. Kavita Rao", role: "Women & Community Advisor", org: "NIRM, Bengaluru", initials: "KR", order: 1 },
      { name: "Suresh Bhat", role: "Industry & CSR Advisor", org: "Ex-CFO, GreenLeaf Corp", initials: "SB", order: 2 },
      { name: "Anita Pillai", role: "Policy & Government Advisor", org: "Former Secretary, IT Dept.", initials: "AP", order: 3 },
    ],
  });
  console.log("  ✓ Advisors");

  // -----------------------------------------------------------------------
  // Core values
  // -----------------------------------------------------------------------
  await db.coreValue.createMany({
    data: [
      { title: "Equity First", description: "Opportunity should never be decided by geography, gender or income.", icon: "Scale", color: "blue", order: 0 },
      { title: "Learning by Doing", description: "Real projects, real communities, real outcomes — not just theory.", icon: "Rocket", color: "purple", order: 1 },
      { title: "Community Driven", description: "We grow with the people we serve, led by mentors from within.", icon: "Users", color: "green", order: 2 },
      { title: "Transparency", description: "Open reporting, measurable impact and accountable use of every rupee.", icon: "ShieldCheck", color: "blue", order: 3 },
      { title: "Innovation", description: "We bring the latest in AI and technology to those who need it most.", icon: "Lightbulb", color: "purple", order: 4 },
      { title: "Sustainable Impact", description: "Careers and capabilities that last far beyond a single program.", icon: "TrendingUp", color: "green", order: 5 },
    ],
  });
  console.log("  ✓ CoreValues");

  // -----------------------------------------------------------------------
  // Timeline / Milestones
  // -----------------------------------------------------------------------
  await db.milestone.createMany({
    data: [
      { year: "2019", title: "Atom Arc Foundation is born", description: "Started with a single coding workshop for 30 students in Coimbatore.", order: 0 },
      { year: "2020", title: "Going online during the pandemic", description: "Pivoted to digital delivery, reaching 1,200 students across 4 states.", order: 1 },
      { year: "2021", title: "Women Empowerment track launches", description: "First women-only cohort with 80 SHG members in rural Karnataka.", order: 2 },
      { year: "2022", title: "First AI Training bootcamp", description: "Launched our flagship AI track with 60 students and 3 hiring partners.", order: 3 },
      { year: "2023", title: "10,000 students trained", description: "Crossed 10,000 trained learners with a 65% placement rate.", order: 4 },
      { year: "2024", title: "CSR & government partnerships scale", description: "Signed 12 new CSR and government partnerships, expanded to 32 districts.", order: 5 },
      { year: "2025", title: "Future-ready communities", description: "Launching AI career assistant, LMS and scholarship portal.", order: 6 },
    ],
  });
  console.log("  ✓ Milestones");

  // -----------------------------------------------------------------------
  // Testimonials
  // -----------------------------------------------------------------------
  await db.testimonial.createMany({
    data: [
      { name: "Dr. Sunita Rao", role: "Principal, Government PU College", quote: "Atom Arc Foundation's coding program transformed our students' confidence. We now have a thriving coding club run entirely by students.", initials: "SR", color: "blue", order: 0 },
      { name: "Manish Gupta", role: "CSR Head, GreenLeaf Corp", quote: "Their transparency and measurable outcomes made our CSR investment feel genuinely impactful. Best non-profit partnership we've had.", initials: "MG", color: "purple", order: 1 },
      { name: "Kavya S", role: "Software Engineer, CloudForge", quote: "I mentor through Atom Arc Foundation every weekend. The students' hunger to learn keeps me sharp and grounded.", initials: "KS", color: "green", order: 2 },
    ],
  });
  console.log("  ✓ Testimonials");

  // -----------------------------------------------------------------------
  // Gallery items
  // -----------------------------------------------------------------------
  await db.galleryItem.createMany({
    skipDuplicates: true,
    data: [
      { id: "g1", title: "AI Bootcamp 2024", category: "Events", gradient: "from-blue-500 via-purple-500 to-pink-500", span: true, order: 0 },
      { id: "g2", title: "Women Digital Literacy Drive", category: "Community Outreach", gradient: "from-purple-500 to-pink-500", order: 1 },
      { id: "g3", title: "Robotics Workshop", category: "Training Sessions", gradient: "from-green-500 to-emerald-500", order: 2 },
      { id: "g4", title: "Cohort 7 Graduation", category: "Certificates", gradient: "from-blue-500 to-cyan-500", order: 3 },
      { id: "g5", title: "Code for Kids Camp", category: "Training Sessions", gradient: "from-orange-500 to-red-500", order: 4 },
      { id: "g6", title: "Hackathon 2024 Highlights", category: "Videos", gradient: "from-purple-500 to-blue-500", span: true, order: 5 },
      { id: "g7", title: "Rural Outreach, Tumkur", category: "Community Outreach", gradient: "from-green-500 to-teal-500", order: 6 },
      { id: "g8", title: "Mock Interview Drive", category: "Events", gradient: "from-indigo-500 to-purple-500", order: 7 },
    ],
  });
  console.log("  ✓ GalleryItems");

  // -----------------------------------------------------------------------
  // Volunteer roles
  // -----------------------------------------------------------------------
  await db.volunteerRole.createMany({
    data: [
      { title: "Trainer & Mentor", commitment: "4 hrs/week", description: "Lead sessions or mentor small groups of students in AI, software or career skills.", icon: "GraduationCap", order: 0 },
      { title: "Developer Volunteer", commitment: "6 hrs/week", description: "Build and maintain our LMS, tools and open-source learning resources.", icon: "Code2", order: 1 },
      { title: "Community Organizer", commitment: "3 hrs/week", description: "Coordinate events, outreach drives and partnerships in your region.", icon: "Users", order: 2 },
      { title: "Career Coach", commitment: "2 hrs/week", description: "Run mock interviews, resume reviews and LinkedIn workshops for learners.", icon: "Briefcase", order: 3 },
    ],
  });
  console.log("  ✓ VolunteerRoles");

  // -----------------------------------------------------------------------
  // Volunteer FAQs
  // -----------------------------------------------------------------------
  await db.volunteerFaq.createMany({
    data: [
      { question: "Do I need to be a tech expert to volunteer?", answer: "Not at all. We have roles for trainers, mentors, organizers and coaches. We match your skills to where you can create the most impact.", order: 0 },
      { question: "How much time do I need to commit?", answer: "Most roles need 2–6 hours per week. You can choose a commitment that fits your schedule, and we plan around your availability.", order: 1 },
      { question: "Is volunteering remote-friendly?", answer: "Yes. Many of our mentoring, development and coaching roles are fully remote. Some community outreach roles are on-ground.", order: 2 },
      { question: "Will I get a certificate?", answer: "Yes. Active volunteers receive an Atom Arc Foundation volunteer certificate and a letter of appreciation after each cohort cycle.", order: 3 },
      { question: "Can my company volunteer as a team?", answer: "Absolutely. We run structured corporate volunteering drives — reach out via the contact page and we'll design a program together.", order: 4 },
    ],
  });
  console.log("  ✓ VolunteerFaqs");

  console.log("\n✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
