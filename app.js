/* ===================================================
   TechHub – app.js
   Main application logic: data, rendering, filtering,
   search, dark mode, forms, animations.
=================================================== */

// ── CATEGORIES DATA ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'webdev',  name: 'Web Development',  emoji: '🌐', color: '#7c5cff' },
  { id: 'aiml',    name: 'AI / ML',           emoji: '🤖', color: '#00d4ff' },
  { id: 'devops',  name: 'DevOps & Cloud',    emoji: '☁️', color: '#00e5a0' },
  { id: 'mobile',  name: 'Mobile Dev',        emoji: '📱', color: '#ff6b9d' },
  { id: 'backend', name: 'Backend / APIs',    emoji: '⚙️', color: '#ffaa00' },
  { id: 'systems', name: 'Systems & Low-Level',emoji: '🔩', color: '#ff6b6b' },
  { id: 'data',    name: 'Data Engineering',  emoji: '📊', color: '#a888ff' },
  { id: 'security',name: 'Cybersecurity',     emoji: '🔒', color: '#ff6b9d' },
  { id: 'tools',   name: 'Dev Tools',         emoji: '🛠️', color: '#00e5a0' },
  { id: 'databases',   name: 'Databases',         emoji: '🗄️', color: '#ffaa00' },
  { id: 'blockchain',  name: 'Web3 / Blockchain',  emoji: '⛓️', color: '#7c5cff' },
  { id: 'networking',  name: 'Networking',          emoji: '🌐🔗', color: '#38bdf8' },
];

// ── TUTORIALS DATA ───────────────────────────────────────────────────────────
const TUTORIALS_DATA = [
  {
    id: -17, category: 'tools', freeTrial: true, trialLabel: '10-Day Free Trial',
    title: "O'Reilly Learning – Books, Videos & Live Training",
    description: "One of the world's most comprehensive tech learning platforms. Access 60,000+ books, video courses, live online training, and interactive labs covering software development, networking, cybersecurity, data science, AI, cloud, and more. Start a free 10-day individual trial — no commitment.",
    url: 'https://www.oreilly.com/start-trial/?type=individual',
    source: "O'Reilly Media", author: "O'Reilly Team",
    level: 'Beginner', type: 'Course',
    tags: ['books', 'video courses', 'cloud', 'programming', 'networking', 'ai', 'cybersecurity'],
    date: '2026-06-20', views: 21000,
  },
  {
    id: 0, category: 'networking', featured: true,
    title: "Jeremy's IT Lab – Free CCNA 200-301 Complete Course",
    description:
      "The most recommended free CCNA course on YouTube. Jeremy covers every topic in the Cisco 200-301 exam syllabus in a structured \"Day-by-Day\" format — IP addressing, VLANs, STP, OSPF, ACLs, NAT, security, and automation. Includes Packet Tracer labs, Anki flashcards, and end-of-video quizzes.",
    url: 'https://www.youtube.com/@JeremysITLab',
    source: "YouTube – Jeremy's IT Lab",
    author: 'Jeremy McDowall',
    level: 'Beginner',
    type: 'Video',
    tags: ['ccna', 'cisco', 'networking', 'packet tracer', 'certification'],
    date: '2026-06-20',
    views: 12000,
  },
  {
    id: -2, category: 'networking', freeAccount: true,
    title: 'NetworkLessons – Cisco & Networking Courses',
    description: "NetworkLessons.com offers in-depth, structured courses for CCNA, CCNP, and other Cisco certifications written by instructor Rene Molenaar. Sign up for a free account to access the first part of every course (300+ free lessons, no credit card needed), or unlock full access with a paid membership.",
    url: 'https://networklessons.com',
    source: 'NetworkLessons', author: 'Rene Molenaar',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 7200,
  },
  {
    id: -3, category: 'networking',
    title: 'INE – Networking & Cybersecurity Training',
    description: "INE is a premium platform for IT certification training covering Networking (CCNA, CCNP), Cybersecurity, Cloud, and Data Science. Offers structured learning paths, hands-on labs, and live sessions. Paid subscription required for full access — plans include INE Fundamentals and INE Premium.",
    url: 'https://ine.com/pages/networking',
    source: 'INE', author: 'INE Team',
    level: 'Intermediate', type: 'Course',
    tags: ['ccna', 'ccnp', 'cybersecurity', 'networking', 'labs', 'certification'],
    date: '2026-06-20', views: 8100,
  },
  {
    id: -1, category: 'networking', freeTrial: true, trialLabel: '7-Day Free Trial',
    title: 'CBT Nuggets – IT Certification Training',
    description: "CBT Nuggets offers expert-led video training for IT certifications including Cisco (CCNA, CCNP), CompTIA (A+, Security+, Network+), Microsoft, AWS, and more. Full access includes virtual labs, practice exams, and a personal coach. Start with a free 7-day trial — no commitment required.",
    url: 'https://www.cbtnuggets.com/free-week',
    source: 'CBT Nuggets', author: 'CBT Nuggets Team',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'comptia', 'cisco', 'aws', 'certification', 'it training'],
    date: '2026-06-20', views: 9500,
  },
  {
    id: -4, category: 'security', badge: '🎓 Free Self-Paced Courses',
    title: 'Fortinet Training Institute – Free Cybersecurity Courses',
    description: "Fortinet's official training academy offers free, self-paced courses for industry certifications like Fortinet Certified Associate (FCA) and Fortinet Certified Professional (FCP). Study network security, cloud security, firewalls, and threat detection directly from the global leader.",
    url: 'https://training.fortinet.com',
    source: 'Fortinet', author: 'Fortinet Training Team',
    level: 'Beginner', type: 'Course',
    tags: ['cybersecurity', 'firewalls', 'fortinet', 'network security', 'certification'],
    date: '2026-06-20', views: 8900,
  },
  {
    id: -5, category: 'networking', badge: '🔑 Free Resources',
    title: 'Kevin Wallace Training – Cisco Certifications',
    description: "Led by dual CCIE Kevin Wallace, this training offers structured preparation for Cisco certifications like CCNA, CCNP, and ENCOR. Features high-quality YouTube tutorials, exam-prep blueprints, and an All-Access Pass for in-depth premium courses.",
    url: 'https://kwtrain.com',
    source: 'Kevin Wallace Training', author: 'Kevin Wallace',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 6500,
  },
  {
    id: -18, category: 'networking', badge: '🎥 Free YouTube Courses',
    title: 'Kevin Wallace – Free Cisco Courses on YouTube',
    description: "Dual CCIE Kevin Wallace shares free Cisco certification courses directly on YouTube. Covers CCNA, CCNP, and related topics with clear, structured video lessons — ideal for self-study without a paid subscription.",
    url: 'https://www.youtube.com/@kwallaceccie/courses',
    source: 'YouTube – Kevin Wallace', author: 'Kevin Wallace',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification', 'ccie'],
    date: '2026-06-20', views: 5800,
  },
  {
    id: -19, category: 'networking', badge: '🎥 Free YouTube Courses',
    title: 'thinQtank Learning – Cisco & CISSP Certification Courses',
    description: "Boot camp-style Cisco certification training on YouTube covering CCNA, CCNP (ENCOR, ENARSI, SCOR), CCIE Enterprise Infrastructure, and CISSP. Features long-form structured lessons, live session archives, and hands-on labs with GNS3, EVE-NG, and Wireshark.",
    url: 'https://www.youtube.com/@thinQtankS/courses',
    source: 'YouTube – thinQtank Learning', author: 'thinQtank Learning',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cissp', 'networking', 'cisco', 'certification'],
    date: '2026-06-20', views: 4700,
  },
  {
    id: -20, category: 'networking', badge: '🎥 Free YouTube Courses',
    title: 'KishSquared – Cisco Networking Courses by Jeff Kish',
    description: "Free Cisco networking courses by Jeff Kish, a dual-CCIE (R&S and Data Center) instructor at CBT Nuggets. Covers CCNA, CCNP ENCOR, OSPF, Spanning-Tree, LISP/VXLAN, and enterprise network design with clear, expert-led sessions.",
    url: 'https://www.youtube.com/@KishSquared/courses',
    source: 'YouTube – KishSquared', author: 'Jeff Kish',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'encor', 'cisco', 'networking', 'ccie', 'ospf'],
    date: '2026-06-20', views: 4200,
  },
  {
    id: -21, category: 'networking', badge: '🎓 Free Courses & Badges',
    title: 'Cisco Networking Academy – Free IT & Networking Courses',
    description: "Cisco's official learning platform offering free, self-paced courses with digital badges upon completion. Covers networking (CCNA prep, Networking Basics), cybersecurity (Ethical Hacker, Endpoint Security), Python, Linux, IoT, and DevNet. No cost to enroll — just create an account.",
    url: 'https://www.netacad.com/',
    source: 'Cisco NetAcad', author: 'Cisco Systems',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'networking', 'cybersecurity', 'python', 'linux', 'cisco', 'iot'],
    date: '2026-06-20', views: 19500,
  },
  {
    id: -22, category: 'networking', badge: '🎥 Free YouTube Courses',
    title: "Rob Riker's Tech Channel – Cisco CCNA, CCNP & CCIE Courses",
    description: "In-depth Cisco networking education covering CCNA, CCNP (ENCOR/ENARSI), and CCIE Enterprise Infrastructure. Features the Cisco Enterprise Series with free video lessons, practical EVE-NG lab walkthroughs, and workbook solutions — ideal for serious certification candidates.",
    url: 'https://www.youtube.com/@RobRikerTechChannel/courses',
    source: 'YouTube – Rob Riker', author: 'Rob Riker',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'encor', 'enarsi', 'cisco', 'networking', 'eve-ng'],
    date: '2026-06-20', views: 5100,
  },
  {
    id: -25, category: 'networking', badge: '🎥 Free Animated Courses',
    title: 'PowerCert Animated Videos – Visual IT & Networking Courses',
    description: "Extremely popular animation-based training channel specializing in computer networking, cybersecurity, and hardware fundamentals. Ideal for visual learners studying for CompTIA A+, Network+, or Security+ certifications who prefer clear, animated diagrams over textbook lectures.",
    url: 'https://www.youtube.com/@PowerCertAnimatedVideos',
    source: 'YouTube – PowerCert', author: 'PowerCert Team',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'comptia', 'security', 'cybersecurity', 'a-plus', 'network-plus'],
    date: '2026-06-20', views: 18400,
  },
  {
    id: -26, category: 'networking', badge: '🎥 Free Intro Courses',
    title: 'CBT Nuggets – Free IT & Networking Tutorials on YouTube',
    description: "Free introductory IT and networking courses from CBT Nuggets on YouTube. Covers foundational topics in networking (CCNA, Network+), cybersecurity, Linux, virtualization, and career guidance, alongside short, highly-focused 'MicroNuggets' for specific technologies.",
    url: 'https://www.youtube.com/@cbtnuggets/courses',
    source: 'YouTube – CBT Nuggets', author: 'CBT Nuggets Instructors',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'networking', 'comptia', 'security', 'cybersecurity', 'cloud', 'linux'],
    date: '2026-06-20', views: 12500,
  },
  {
    id: -6, category: 'devops', badge: '🔑 Free Video Tutorials',
    title: 'TechWorld with Nana – DevOps & Cloud Training',
    description: "Nana Janashia provides some of the web's best DevOps and Cloud Computing training. Explore high-quality free video tutorials on Docker, Kubernetes, CI/CD, and Terraform, alongside structured premium bootcamps and certification prep.",
    url: 'https://www.techworld-with-nana.com/',
    source: 'TechWorld with Nana', author: 'Nana Janashia',
    level: 'Beginner', type: 'Course',
    tags: ['devops', 'kubernetes', 'docker', 'ci-cd', 'cloud', 'terraform'],
    date: '2026-06-20', views: 9800,
  },
  {
    id: -7, category: 'networking', badge: '🎥 Free YouTube Course',
    title: 'NetworkChuck – Free CCNA 200-301 Complete Course',
    description: "An energetic, highly practical CCNA training course. NetworkChuck covers networking fundamentals, subnetting, routers, switches, IPv6, security, and automation with hands-on labs you can build along in GNS3 or Packet Tracer.",
    url: 'https://www.youtube.com/playlist?list=PLIhvC56v63IJVXjvsaC47JqH1w_L8v1Y4',
    source: 'YouTube – NetworkChuck', author: 'Chuck Keith',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'cisco', 'networking', 'subnetting', 'certification'],
    date: '2026-06-20', views: 15400,
  },
  {
    id: -8, category: 'networking', badge: '🎥 Free YouTube Course',
    title: "Jeremy's IT Lab – Free CCNP ENCOR 350-401 Course",
    description: "Prepare for your CCNP Enterprise certification with the web's most structured free CCNP ENCOR series. Covers enterprise routing, switching, wireless, security, virtualization, and network automation, with free Anki flashcards and downloadable labs.",
    url: 'https://www.youtube.com/@JeremysITLab/search?query=CCNP+ENCOR',
    source: "YouTube – Jeremy's IT Lab", author: 'Jeremy McDowall',
    level: 'Intermediate', type: 'Video',
    tags: ['ccnp', 'encor', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 8700,
  },
  {
    id: -10, category: 'networking', badge: '🎓 Free Courses Available',
    title: 'NetworkAcademy.io – Visual Networking Tutorials',
    description: "An independent e-learning platform featuring high-quality visual guides, animated diagrams, and interactive illustrations. Offers free study paths and beginner-friendly tutorials for CCNA, CCIE, and Python network automation.",
    url: 'https://www.networkacademy.io',
    source: 'NetworkAcademy.io', author: 'NetworkAcademy Team',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccie', 'networking', 'automation', 'python'],
    date: '2026-06-20', views: 7600,
  },
  {
    id: -23, category: 'networking', badge: '📝 Step-by-Step Guide',
    title: 'Running Cisco Modeling Labs (CML) on Hyper-V',
    description: "A complete step-by-step technical guide to running Cisco Modeling Labs (CML) on Windows Hyper-V. Explains VM creation (Gen 2), nested virtualization setup via PowerShell, MAC spoofing, and initial networking setup to run CML labs without VMware.",
    url: 'https://www.networkacademy.io/ccna/network-fundamentals/cml-on-hyperv',
    source: 'NetworkAcademy.io', author: 'NetworkAcademy Team',
    level: 'Intermediate', type: 'Article',
    tags: ['cml', 'hyper-v', 'networking', 'cisco', 'virtualization', 'labs'],
    date: '2026-06-20', views: 3200,
  },
  {
    id: -16, category: 'networking',
    title: 'Boson – Cisco & CompTIA Certification Exam Prep',
    description: "Boson is an industry-leading exam prep platform offering ExSim-Max practice exams and the NetSim network simulator for Cisco (CCNA, CCNP) and CompTIA (Network+, Security+) certifications. Known for realistic exam simulations and detailed answer explanations. Demo versions available; full access via paid subscription.",
    url: 'https://www.boson.com',
    source: 'Boson', author: 'Boson Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['ccna', 'ccnp', 'comptia', 'networking', 'practice exams', 'certification'],
    date: '2026-06-20', views: 8300,
  },
  {
    id: -24, category: 'networking', badge: '🎥 Free Playlists',
    title: 'INE – Free IT & Networking Playlists on YouTube',
    description: "Free video training playlists provided by INE (Internetwork Expert). Includes structured playlists on networking (CCNA/CCIE prep), cybersecurity concepts, cloud computing, and webinar archives — a great starting point for deep-dive certification study.",
    url: 'https://www.youtube.com/@INEtraining/playlists',
    source: 'YouTube – INE', author: 'INE (Internetwork Expert)',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cybersecurity', 'cloud', 'networking', 'certification'],
    date: '2026-06-20', views: 6100,
  },
  {
    id: -11, category: 'systems', badge: '🎓 Free Ivy League Course',
    title: 'Harvard CS50 – Introduction to Computer Science',
    description: "The world's most famous entry-level computer science course from Harvard University. Introduces programming, algorithms, data structures, and memory management using C, Python, SQL, and HTML/CSS.",
    url: 'https://cs50.harvard.edu/x/',
    source: 'Harvard University', author: 'David J. Malan',
    level: 'Beginner', type: 'Course',
    tags: ['computer science', 'c', 'python', 'sql', 'algorithms'],
    date: '2026-06-20', views: 25000,
  },
  {
    id: -12, category: 'networking', badge: '🎥 Free 9-Hour Course',
    title: 'freeCodeCamp – Computer Networking Complete Course',
    description: "A comprehensive foundational course covering how the Internet works, network models (OSI/TCP-IP), IP addressing, subnetting, routing protocols, and network security concepts.",
    url: 'https://www.youtube.com/watch?v=IPvYjXCsTg8',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'ccna', 'dns', 'ip addressing', 'subnetting'],
    date: '2026-06-20', views: 18200,
  },
  {
    id: -13, category: 'devops', badge: '🎥 Free 7-Hour Course',
    title: 'freeCodeCamp – Linux Command Line for Beginners',
    description: "Go from absolute beginner to a proficient Linux user. Covers terminal navigation, filesystem structures, package managers, user permissions, and basic bash scripting.",
    url: 'https://www.youtube.com/watch?v=wBp0Rb-ZJak',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Video',
    tags: ['linux', 'command line', 'bash', 'devops', 'terminal'],
    date: '2026-06-20', views: 14500,
  },
  {
    id: -14, category: 'webdev', badge: '🎓 Free Full-Stack Track',
    title: 'The Odin Project – Full-Stack Web Development',
    description: "An outstanding, project-based web development curriculum. Guides you through setting up a professional local environment, Git/GitHub, HTML/CSS, JavaScript, Node.js, and databases.",
    url: 'https://www.theodinproject.com/',
    source: 'The Odin Project', author: 'Odin Project Contributors',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'node', 'git', 'full stack', 'html-css'],
    date: '2026-06-20', views: 22000,
  },
  {
    id: -15, category: 'security', badge: '🎥 Free Full Courses',
    title: 'Simplilearn – Cyber Security Full Courses',
    description: "A solid introductory course covering cybersecurity core fundamentals, cryptography, firewalls, network monitoring, vulnerability assessment, and threat detection.",
    url: 'https://www.youtube.com/@SimplilearnOfficial/search?query=cyber+security+full+course',
    source: 'Simplilearn', author: 'Simplilearn Team',
    level: 'Beginner', type: 'Video',
    tags: ['security', 'cybersecurity', 'cryptography', 'firewalls', 'threats'],
    date: '2026-06-20', views: 9200,
  },
  {
    id: 1, category: 'webdev', title: 'React in 100 Seconds', featured: true, featuredLarge: true,

    description: 'A rapid-fire visual overview of React — components, hooks, JSX, and the virtual DOM explained with stunning animations. Perfect as a starting point before diving deeper.',
    url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
    source: 'Fireship', author: 'Jeff Delaney',
    level: 'Beginner', type: 'Video',
    tags: ['react', 'javascript', 'frontend'], date: '2024-03-10', views: 4200,
  },
  {
    id: 2, category: 'aiml', title: 'Practical Deep Learning for Coders',
    description: "Fast.ai's legendary course covering deep learning with PyTorch — image classification, NLP, tabular data, and deployment. A must-have for any ML practitioner.",
    url: 'https://course.fast.ai/',
    source: 'fast.ai', author: 'Jeremy Howard', featured: true,
    level: 'Intermediate', type: 'Course',
    tags: ['pytorch', 'neural networks', 'python'], date: '2024-01-20', views: 7800,
  },
  {
    id: 3, category: 'devops', title: 'Docker & Kubernetes: The Complete Guide',
    description: 'Master containerisation from scratch — build Docker images, write compose files, orchestrate with Kubernetes, and deploy to the cloud.',
    url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
    source: 'Udemy', author: 'Stephen Grider',
    level: 'Intermediate', type: 'Course',
    tags: ['docker', 'kubernetes', 'devops'], date: '2024-02-05', views: 5100,
  },
  {
    id: 4, category: 'webdev', title: 'TypeScript Full Course for Beginners',
    description: 'Zero to hero with TypeScript — types, interfaces, generics, decorators, and integrating with React. 8 hours of hands-on learning.',
    url: 'https://www.youtube.com/watch?v=30LWjhZzg50',
    source: 'freeCodeCamp', author: 'Dave Gray',
    level: 'Beginner', type: 'Video',
    tags: ['typescript', 'javascript', 'types'], date: '2024-04-12', views: 3300,
  },
  {
    id: 5, category: 'systems', title: 'The Rust Programming Language',
    description: 'The official "Rust Book" online — an authoritative, deeply detailed introduction to Rust with ownership, lifetimes, concurrency, and crates ecosystem.',
    url: 'https://doc.rust-lang.org/book/',
    source: 'rust-lang.org', author: 'Steve Klabnik',
    level: 'Intermediate', type: 'Article',
    tags: ['rust', 'systems', 'memory safety'], date: '2024-01-30', views: 6200,
  },
  {
    id: 6, category: 'aiml', title: 'LangChain Crash Course: Build LLM Apps',
    description: 'Learn to chain language models, use agents and tools, build RAG pipelines, and deploy conversational AI apps with Python and LangChain in under 2 hours.',
    url: 'https://www.youtube.com/watch?v=LbT1yp6quS8',
    source: 'Patrick Loeber', author: 'Patrick Loeber',
    level: 'Intermediate', type: 'Video',
    tags: ['langchain', 'llm', 'python', 'rag'], date: '2024-03-18', views: 4800,
  },
  {
    id: 7, category: 'backend', title: 'Building REST APIs with Node & Express',
    description: 'A practical guide to designing and building production-ready REST APIs using Node.js, Express, JWT authentication, and MongoDB — deployed on AWS.',
    url: 'https://www.freecodecamp.org/news/rest-api-tutorial/',
    source: 'freeCodeCamp', author: 'Kolade Chris',
    level: 'Beginner', type: 'Article',
    tags: ['node', 'express', 'rest', 'api'], date: '2024-02-28', views: 2900,
  },
  {
    id: 8, category: 'mobile', title: 'Flutter & Dart – The Complete Guide',
    description: 'Go from zero to a multi-screen mobile app with Flutter. Widgets, state management, animations, Firebase, and publishing to app stores.',
    url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/',
    source: 'Udemy', author: 'Maximilian Schwarzmüller',
    level: 'Beginner', type: 'Course',
    tags: ['flutter', 'dart', 'mobile', 'ios', 'android'], date: '2024-04-01', views: 3700,
  },
  {
    id: 9, category: 'devops', title: 'Terraform in Practice',
    description: 'Infrastructure as code with Terraform — provision cloud resources on AWS, GCP, and Azure. Modules, workspaces, remote state, and CI/CD integration.',
    url: 'https://developer.hashicorp.com/terraform/tutorials',
    source: 'HashiCorp', author: 'HashiCorp Team',
    level: 'Advanced', type: 'Interactive',
    tags: ['terraform', 'iac', 'aws', 'cloud'], date: '2024-03-25', views: 3100,
  },
  {
    id: 10, category: 'data', title: 'Apache Kafka for Beginners',
    description: 'Understand distributed event streaming — Kafka topics, partitions, consumers, producers, and connecting it all to real-time data pipelines.',
    url: 'https://www.conduktor.io/kafka/what-is-apache-kafka/',
    source: 'Conduktor', author: 'Conduktor Team',
    level: 'Beginner', type: 'Article',
    tags: ['kafka', 'streaming', 'data'], date: '2024-01-15', views: 2400,
  },
  {
    id: 11, category: 'security', title: 'Web Security: OWASP Top 10 Explained',
    description: 'An essential primer on the 10 most critical web application security risks including SQL injection, XSS, CSRF, and broken auth — with mitigation strategies.',
    url: 'https://owasp.org/www-project-top-ten/',
    source: 'OWASP', author: 'OWASP Foundation',
    level: 'Intermediate', type: 'Article',
    tags: ['security', 'owasp', 'xss', 'sql injection'], date: '2024-02-10', views: 4500,
  },
  {
    id: 12, category: 'webdev', title: 'Next.js 14 App Router Deep Dive',
    description: 'Master the new App Router in Next.js 14 — server components, streaming, loading states, parallel routes, caching strategies, and full-stack data fetching patterns.',
    url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
    source: 'Lama Dev', author: 'Safak',
    level: 'Advanced', type: 'Video',
    tags: ['nextjs', 'react', 'app router', 'server components'], date: '2024-04-20', views: 5600,
  },
  {
    id: 13, category: 'databases', title: 'PostgreSQL Tutorial — Full Beginner Course',
    description: 'Learn PostgreSQL from scratch — SQL syntax, joins, indexes, transactions, constraints, views, and stored procedures with real-world exercises.',
    url: 'https://www.postgresqltutorial.com/',
    source: 'PostgreSQL Tutorial', author: 'PostgreSQL Tutorial Team',
    level: 'Beginner', type: 'Article',
    tags: ['postgresql', 'sql', 'database'], date: '2024-01-05', views: 3800,
  },
  {
    id: 14, category: 'aiml', title: 'Hugging Face NLP Course',
    description: 'Learn NLP with Transformers from the creators of Hugging Face — tokenizers, fine-tuning BERT & GPT, datasets, and pushing models to the Hub.',
    url: 'https://huggingface.co/learn/nlp-course',
    source: 'Hugging Face', author: 'Hugging Face Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['nlp', 'transformers', 'python', 'bert'], date: '2024-02-20', views: 6100,
  },
  {
    id: 16, category: 'backend', title: 'FastAPI: Modern Python API Development',
    description: 'Build production-grade APIs with FastAPI — async endpoints, Pydantic models, automatic OpenAPI docs, OAuth2, and PostgreSQL with SQLAlchemy.',
    url: 'https://fastapi.tiangolo.com/tutorial/',
    source: 'FastAPI Docs', author: 'Sebastián Ramírez',
    level: 'Intermediate', type: 'Article',
    tags: ['fastapi', 'python', 'api', 'async'], date: '2024-04-08', views: 4200,
  },
  {
    id: 17, category: 'tools', title: 'Git & GitHub Masterclass',
    description: 'Become a Git power user — branching strategies, rebasing, cherry-picking, GitHub Actions for CI/CD, pull requests, and monorepo workflows.',
    url: 'https://www.atlassian.com/git/tutorials',
    source: 'Atlassian', author: 'Atlassian Team',
    level: 'Beginner', type: 'Article',
    tags: ['git', 'github', 'version control'], date: '2024-01-25', views: 5300,
  },
  {
    id: 18, category: 'mobile', title: 'React Native: Build Native Apps with JavaScript',
    description: 'Full React Native course covering navigation, state management with Redux Toolkit, native device APIs, Expo, and publishing to App Store & Google Play.',
    url: 'https://reactnative.dev/docs/getting-started',
    source: 'React Native Docs', author: 'Meta Open Source',
    level: 'Intermediate', type: 'Article',
    tags: ['react native', 'javascript', 'mobile'], date: '2024-03-30', views: 3400,
  },
  {
    id: 19, category: 'blockchain', title: 'Solidity & Smart Contracts — Full Course',
    description: 'Write, test, and deploy Ethereum smart contracts with Solidity. ERC-20 tokens, DeFi primitives, security vulnerabilities, and Hardhat testing framework.',
    url: 'https://www.youtube.com/watch?v=umepbfKp5rI',
    source: 'freeCodeCamp', author: 'Patrick Collins',
    level: 'Intermediate', type: 'Video',
    tags: ['solidity', 'ethereum', 'web3', 'smart contracts'], date: '2024-02-15', views: 3900,
  },
  {
    id: 20, category: 'data', title: 'dbt (data build tool) Crash Course',
    description: 'Transform your data warehouse with dbt — models, tests, documentation, incremental materializations, and deploying analytics engineering pipelines.',
    url: 'https://courses.getdbt.com/courses/fundamentals',
    source: 'dbt Labs', author: 'dbt Labs Team',
    level: 'Intermediate', type: 'Course',
    tags: ['dbt', 'sql', 'analytics', 'data engineering'], date: '2024-04-15', views: 2100,
  },
  {
    id: 21, category: 'security', title: 'Ethical Hacking Full Course',
    description: 'Learn penetration testing legally — recon, scanning, exploitation with Metasploit, web hacking, privilege escalation, and writing professional reports.',
    url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE',
    source: 'HackerSploit', author: 'HackerSploit',
    level: 'Advanced', type: 'Video',
    tags: ['ethical hacking', 'pentesting', 'security'], date: '2024-01-08', views: 4700,
  },
  {
    id: 22, category: 'devops', title: 'GitHub Actions: CI/CD from Zero to Hero',
    description: 'Automate everything with GitHub Actions — build, test, and deploy pipelines, matrix builds, caching, reusable workflows, and self-hosted runners.',
    url: 'https://docs.github.com/en/actions/learn-github-actions',
    source: 'GitHub Docs', author: 'GitHub Team',
    level: 'Beginner', type: 'Article',
    tags: ['github actions', 'ci/cd', 'devops'], date: '2024-04-22', views: 3600,
  },
  {
    id: 23, category: 'databases', title: 'Redis: The Complete Developer Guide',
    description: 'Master Redis data structures — strings, hashes, lists, sorted sets, streams. Caching patterns, pub/sub, distributed locks, and Redis Cluster.',
    url: 'https://redis.io/learn/',
    source: 'Redis University', author: 'Redis Team',
    level: 'Intermediate', type: 'Course',
    tags: ['redis', 'caching', 'nosql'], date: '2024-03-02', views: 2800,
  },
  {
    id: 24, category: 'webdev', title: 'CSS Grid & Flexbox Mastery',
    description: 'Build any layout imaginable with CSS Grid and Flexbox. Interactive exercises, real-world projects, and techniques for responsive, accessible designs.',
    url: 'https://cssgrid.io/',
    source: 'Wes Bos', author: 'Wes Bos',
    level: 'Beginner', type: 'Interactive',
    tags: ['css', 'grid', 'flexbox', 'responsive'], date: '2024-04-18', views: 4100,
  },
  {
    id: 25, category: 'tools', title: 'Neovim from Scratch',
    description: 'Transform Neovim into a full-featured IDE — plugin ecosystem with lazy.nvim, LSP configuration, Treesitter, telescope, and custom Lua configs.',
    url: 'https://www.youtube.com/watch?v=m8C0Cq9Uv9o',
    source: 'TJ DeVries', author: 'TJ DeVries',
    level: 'Advanced', type: 'Video',
    tags: ['neovim', 'vim', 'editor', 'lua'], date: '2024-02-25', views: 2300,
  },
];

// ── APP STATE ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 9;
let state = {
  search: '',
  category: 'all',
  level: 'all',
  type: 'all',
  sort: 'newest',
  page: 1,
  savedIds: new Set(JSON.parse(localStorage.getItem('saved') || '[]')),
  tutorials: [...TUTORIALS_DATA],
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function getCategoryById(id) { return CATEGORIES.find(c => c.id === id); }
function getCategoryByName(name) { return CATEGORIES.find(c => c.name === name) || CATEGORIES[0]; }

function levelClass(l) { return `level-${l.toLowerCase()}`; }
function typeClass(t) { return `type-${t.toLowerCase()}`; }

function showToast(msg, dur = 2500) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), dur);
}

function saveFavourites() {
  localStorage.setItem('saved', JSON.stringify([...state.savedIds]));
}

// ── FILTER + SORT LOGIC ───────────────────────────────────────────────────────
function applyFilters() {
  const q = state.search.toLowerCase().trim();
  let list = TUTORIALS_DATA.filter(t => {
    const matchSearch = !q || [t.title, t.description, t.source, t.author, ...t.tags]
      .some(s => s.toLowerCase().includes(q));
    const matchCat = state.category === 'all' || t.category === state.category;
    const matchLevel = state.level === 'all' || t.level === state.level;
    const matchType = state.type === 'all' || t.type === state.type;
    return matchSearch && matchCat && matchLevel && matchType;
  });

  if (state.sort === 'newest') list.sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (state.sort === 'popular') list.sort((a, b) => b.views - a.views);
  else if (state.sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));

  return list;
}

// ── RENDER: CATEGORIES ─────────────────────────────────────────────────────────
function renderCategories() {
  const grid = $('#category-grid');
  const counts = {};
  TUTORIALS_DATA.forEach(t => { counts[t.category] = (counts[t.category] || 0) + 1; });

  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="cat-card animate-in ${state.category === cat.id ? 'active' : ''}"
         data-catid="${cat.id}"
         role="button" tabindex="0"
         aria-label="Filter by ${cat.name}"
         style="--cat-color: ${cat.color}">
      <span class="cat-emoji">${cat.emoji}</span>
      <span class="cat-name">${cat.name}</span>
      <span class="cat-count">${counts[cat.id] || 0} tutorials</span>
    </div>
  `).join('');

  grid.querySelectorAll('.cat-card').forEach(card => {
    const handler = () => {
      const id = card.dataset.catid;
      state.category = (state.category === id) ? 'all' : id;
      state.page = 1;
      updateCatFilter();
      renderCategories();
      renderTutorials();
      document.getElementById('tutorials').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
  });

  observeAnimations();
}

function updateCatFilter() {
  const sel = $('#cat-filter');
  sel.value = state.category;
}

// ── RENDER: FEATURED ───────────────────────────────────────────────────────────
function renderFeatured() {
  const grid = $('#featured-grid');
  if (!grid) return; // section removed from DOM

  const featured = TUTORIALS_DATA.filter(t => t.featured);

  grid.innerHTML = featured.map((t, i) => {
    const cat = getCategoryById(t.category);
    const isLarge = t.featuredLarge;
    return `
    <div class="featured-card animate-in ${isLarge ? 'large' : ''}" style="--i:${i}">
      <div class="featured-card-glow" style="background:radial-gradient(circle,${cat?.color || '#7c5cff'}40,transparent)"></div>
      <span class="featured-badge">⭐ Featured</span>
      <div class="featured-body">
        <div class="featured-category">${cat?.emoji || ''} ${cat?.name || t.category}</div>
        <div class="featured-title">${t.title}</div>
        <div class="featured-desc">${t.description}</div>
        <div class="featured-meta">
          <span class="chip ${levelClass(t.level)}">${t.level}</span>
          <span class="chip ${typeClass(t.type)}">${t.type === 'Video' ? '▶' : t.type === 'Article' ? '📄' : t.type === 'Course' ? '🎓' : '⚡'} ${t.type}</span>
        </div>
        <div class="featured-footer">
          <span class="featured-author">by ${t.author} · ${t.source}</span>
          <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="btn-featured">
            Open Tutorial <span>→</span>
          </a>
        </div>
      </div>
    </div>`;
  }).join('');

  observeAnimations();
}

// ── RENDER: TUTORIALS GRID ─────────────────────────────────────────────────────
function renderTutorials(reset = true) {
  if (reset) state.page = 1;
  const filtered = applyFilters();
  const slice = filtered.slice(0, state.page * PAGE_SIZE);
  const grid = $('#tutorials-grid');
  const countEl = $('#results-count');
  const noResults = $('#no-results');
  const loadMore = $('#load-more-wrapper');

  countEl.textContent = `Showing ${Math.min(slice.length, filtered.length)} of ${filtered.length} tutorial${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    loadMore.classList.add('hidden');
    updateScrollButtons();
    return;
  }
  noResults.classList.add('hidden');

  grid.innerHTML = slice.map(t => renderTutorialCard(t)).join('');
  loadMore.classList.toggle('hidden', slice.length >= filtered.length);
  $('#load-more-btn').dataset.total = filtered.length;

  // Bind bookmark clicks
  grid.querySelectorAll('.tut-bookmark').forEach(btn => {
    const id = Number(btn.dataset.id);
    btn.addEventListener('click', () => toggleSave(id, btn));
  });

  observeAnimations();
  updateScrollButtons();
}

function renderTutorialCard(t) {
  const cat = getCategoryById(t.category);
  const saved = state.savedIds.has(t.id);
  const trialBadge = t.freeTrial
    ? `<span class="trial-badge">🎁 ${t.trialLabel || 'Free Trial'}</span>`
    : (t.freeAccount
      ? `<span class="free-account-badge">🔑 Free Account Available</span>`
      : (t.badge
        ? `<span class="free-account-badge">${t.badge}</span>`
        : ''));
  const linkLabel = t.freeTrial ? `Start Free Trial <span>→</span>` : `Open <span>↗</span>`;
  const linkClass = t.freeTrial ? 'tut-link tut-link-trial' : 'tut-link';
  return `
  <article class="tut-card animate-in ${t.freeTrial ? 'tut-card-trial' : ''}" id="tut-${t.id}">
    <div class="tut-card-accent"></div>
    <div class="tut-card-body">
      <div class="tut-card-top">
        <span class="tut-cat-badge chip" style="background:${cat?.color || '#7c5cff'}22;border-color:${cat?.color || '#7c5cff'}44;color:${cat?.color || '#7c5cff'}">
          ${cat?.emoji || ''} ${cat?.name || t.category}
        </span>
        <button class="tut-bookmark ${saved ? 'saved' : ''}" data-id="${t.id}" aria-label="${saved ? 'Remove bookmark' : 'Bookmark tutorial'}" title="${saved ? 'Remove bookmark' : 'Bookmark'}">
          ${saved ? '🔖' : '🏷️'}
        </button>
      </div>
      ${trialBadge}
      <h3 class="tut-title">${t.title}</h3>
      <p class="tut-desc">${t.description}</p>
      <div class="tut-chips">
        <span class="chip ${levelClass(t.level)}">${t.level}</span>
        <span class="chip ${typeClass(t.type)}">${t.type === 'Video' ? '▶' : t.type === 'Article' ? '📄' : t.type === 'Course' ? '🎓' : '⚡'} ${t.type}</span>
      </div>
      <div class="tut-tags">
        ${t.tags.map(tag => `<span class="tut-tag">#${tag}</span>`).join('')}
      </div>
    </div>
    <div class="tut-card-footer">
      <span class="tut-source">🔗 ${t.source}</span>
      <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="${linkClass}" id="open-tut-${t.id}">
        ${linkLabel}
      </a>
    </div>
  </article>`;
}

function toggleSave(id, btn) {
  if (state.savedIds.has(id)) {
    state.savedIds.delete(id);
    btn.classList.remove('saved');
    btn.textContent = '🏷️';
    showToast('Bookmark removed');
  } else {
    state.savedIds.add(id);
    btn.classList.add('saved');
    btn.textContent = '🔖';
    showToast('Tutorial bookmarked! 🔖');
  }
  saveFavourites();
}

// ── POPULATE SELECTS ───────────────────────────────────────────────────────────
function populateSelects() {
  const catFilter = $('#cat-filter');
  CATEGORIES.forEach(cat => {
    const opt = `<option value="${cat.id}">${cat.emoji} ${cat.name}</option>`;
    catFilter.insertAdjacentHTML('beforeend', opt);
  });
}

// ── STATS COUNTER ANIMATION ────────────────────────────────────────────────────
function animateCounters() {
  $$('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '+';
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = start + (start >= target ? suffix : '');
      if (start >= target) clearInterval(timer);
    }, 25);
  });
}

// ── INTERSECTION OBSERVER (entrance anims + counter) ──────────────────────────
let counterDone = false;
function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.animate-in:not(.visible)').forEach(el => observer.observe(el));

  // Hero counter
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counterDone) {
      counterDone = true;
      animateCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  const stats = $('.hero-stats');
  if (stats) statsObserver.observe(stats);
}

function updateScrollButtons() {
  const y = window.scrollY;
  const nav = $('#navbar');
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (nav) nav.classList.toggle('scrolled', y > 20);

  const btnTop = $('#back-to-top');
  const btnBottom = $('#scroll-to-bottom');

  const atTop    = y < 300;
  const atBottom = maxScroll > 0 && y >= maxScroll - 300;

  // Down arrow: only at the top of the page
  if (btnBottom) btnBottom.classList.toggle('visible', atTop);
  // Up arrow: only at the bottom of the page
  if (btnTop)    btnTop.classList.toggle('visible', atBottom);
}

// ── EVENT BINDINGS ─────────────────────────────────────────────────────────────
function bindEvents() {

  window.addEventListener('scroll', updateScrollButtons, { passive: true });
  window.addEventListener('resize', updateScrollButtons, { passive: true });
  
  // Run once initially to set correct state
  setTimeout(updateScrollButtons, 150);

  $('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  $('#scroll-to-bottom').addEventListener('click', () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  });

  // ── Mobile menu
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  $$('.mobile-link, .mobile-cta').forEach(el => el.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // ── Dark / Light mode
  const themeBtn = $('#theme-toggle');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  // restore
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.textContent = '☀️';
  }

  // ── Search
  const searchInput = $('#search-input');
  let debounce;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.search = searchInput.value;
      state.page = 1;
      renderTutorials();
    }, 280);
  });

  $('#search-btn').addEventListener('click', () => {
    state.search = searchInput.value;
    state.page = 1;
    renderTutorials();
    document.getElementById('tutorials').scrollIntoView({ behavior: 'smooth' });
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      state.search = searchInput.value;
      renderTutorials();
      document.getElementById('tutorials').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ── Quick search tags
  $$('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.dataset.query;
      searchInput.value = q;
      state.search = q;
      state.page = 1;
      renderTutorials();
      document.getElementById('tutorials').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Clear search
  $('#clear-search').addEventListener('click', () => {
    state.search = '';
    searchInput.value = '';
    state.category = 'all';
    state.level = 'all';
    state.type = 'all';
    state.page = 1;
    $('#cat-filter').value = 'all';
    $('#diff-filter').value = 'all';
    $('#type-filter').value = 'all';
    renderCategories();
    renderTutorials();
  });

  // ── Filters
  $('#cat-filter').addEventListener('change', e => {
    state.category = e.target.value;
    state.page = 1;
    renderCategories();
    renderTutorials();
  });
  $('#diff-filter').addEventListener('change', e => { state.level = e.target.value; state.page = 1; renderTutorials(); });
  $('#type-filter').addEventListener('change', e => { state.type = e.target.value; state.page = 1; renderTutorials(); });
  $('#reset-filters').addEventListener('click', () => {
    state.category = 'all'; state.level = 'all'; state.type = 'all'; state.search = '';
    searchInput.value = '';
    $('#cat-filter').value = 'all'; $('#diff-filter').value = 'all'; $('#type-filter').value = 'all';
    state.page = 1;
    renderCategories();
    renderTutorials();
  });

  // ── Sort
  $$('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.sort = btn.dataset.sort;
      state.page = 1;
      renderTutorials();
    });
  });

  // ── Load more
  $('#load-more-btn').addEventListener('click', () => {
    state.page++;
    renderTutorials(false);
  });

}

// ── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  populateSelects();
  renderCategories();
  renderFeatured();
  renderTutorials();
  bindEvents();
  observeAnimations();

  // Animate hero entrance staggered
  setTimeout(() => {
    $$('.hero-content > *').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
      el.classList.add('visible');
    });
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);
