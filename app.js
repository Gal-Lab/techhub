/* ===================================================
   TechHub – app.js
   Main application logic: data, rendering, filtering,
   search, dark mode, forms, animations.
=================================================== */

const CATEGORIES = [
  { id: 'software-dev', name: 'Software Development', emoji: '💻', color: '#7c5cff' },
  { id: 'devops',  name: 'DevOps & Cloud',    emoji: '☁️', color: '#00e5a0' },
  { id: 'security',name: 'Cybersecurity',     emoji: '🔒', color: '#ff6b9d' },
  { id: 'networking',  name: 'Networking',          emoji: '📡', color: '#38bdf8' },
];

// ── TUTORIALS DATA ───────────────────────────────────────────────────────────
const TUTORIALS_DATA = [
  {
    id: -17, category: 'software-dev', freeTrial: true, trialLabel: '10-Day Free Trial',
    title: "O'Reilly Learning – Books, Videos & Live Training",
    description: "One of the world's most comprehensive tech learning platforms. Access 60,000+ books, video courses, live online training, and interactive labs covering software development, networking, cybersecurity, data science, AI, cloud, and more. Start a free 10-day individual trial — no commitment.",
    url: 'https://www.oreilly.com/start-trial/?type=individual',
    source: "O'Reilly Media", author: "O'Reilly Team",
    level: 'Beginner', type: 'Course',
    tags: ['books', 'video-courses', 'cloud', 'programming', 'networking', 'ai', 'cybersecurity'],
    date: '2026-06-20', views: 21000,
  },
  {
    id: -101, category: 'networking', badge: '💻 FREE',
    title: "Cisco DevNet Collaboration Sandboxes",
    description: "Get free, 24/7 access to live Cisco Collaboration sandboxes. Practice configuring Cisco Unified Communications Manager (CUCM), Cisco Unity Connection, Expressway, and Webex integrations in a real, pre-configured enterprise lab environment.",
    url: 'https://developer.cisco.com/site/collaboration/',
    source: "Cisco DevNet", author: "Cisco Systems",
    level: 'Intermediate', type: 'Interactive',
    tags: ['cisco', 'collaboration', 'cucm', 'sandbox', 'networking', 'voip'],
    date: '2026-06-22', views: 4500,
  },
  {
    id: -103, category: 'networking', badge: '🎥 FREE',
    title: "Kevin Wallace Training – Cisco CLCOR 350-801 Cert Prep",
    description: "Expert-led video lessons covering Cisco Collaboration core technologies (CLCOR). Master collaboration infrastructure, Cisco Unified Communications Manager (CUCM) protocols, Webex cloud integrations, and SIP endpoints.",
    url: 'https://www.youtube.com/@kwallaceccie',
    source: "YouTube – Kevin Wallace", author: "Kevin Wallace",
    level: 'Intermediate', type: 'Video',
    tags: ['clcor', 'cisco', 'collaboration', 'ccnp', 'voip'],
    date: '2026-06-22', views: 5100,
  },
  {
    id: -104, category: 'networking', badge: '🎥 FREE',
    title: "Cisco Collaboration Technical Marketing",
    description: "Official Cisco technical marketing channel focusing on product demonstrations, integration tutorials, and design guidance for Cisco Webex, hybrid calling, enterprise video endpoints, and contact center solutions.",
    url: 'https://www.youtube.com/@cisocollabtechmarketing',
    source: "Cisco Collab Tech Marketing", author: "Cisco Systems",
    level: 'Advanced', type: 'Video',
    tags: ['cisco', 'webex', 'collaboration', 'hybrid-calling', 'expressway'],
    date: '2026-06-22', views: 2800,
  },
  {
    id: -105, category: 'networking', badge: '🎥 FREE',
    title: "David Bombal – CCNA 200-301 Full Course",
    description: "A comprehensive, highly practical, and hands-on CCNA course covering routing, switching, IP connectivity, IP services, security fundamentals, and automation with Packet Tracer labs.",
    url: 'https://www.youtube.com/playlist?list=PLCDpf1W6pOhpTrxS1nFEWc8gcm8QKPPKC',
    source: "YouTube – David Bombal", author: "David Bombal",
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'cisco', 'networking', 'packet-tracer', 'certification'],
    date: '2026-06-22', views: 9800,
  },
  {
    id: -106, category: 'networking', badge: '🎓 FREE',
    title: "Practical Networking – Subnetting Mastery",
    description: "The ultimate free video guide to mastering IPv4 subnetting. Learn the math, binary patterns, and shortcuts to solve any subnetting problem in seconds, paired with interactive practice at SubnetIPv4.com.",
    url: 'https://www.practicalnetworking.net/learning-resources/subnetting-mastery/',
    source: "Practical Networking", author: "Ed Harmoush",
    level: 'Beginner', type: 'Course',
    tags: ['subnetting', 'ip-addressing', 'networking', 'routing'],
    date: '2026-06-22', views: 8500,
  },
  {
    id: 0, category: 'networking', featured: true, badge: '🎥 FREE',
    title: "Jeremy's IT Lab – Free CCNA 200-301 Complete Course",
    description:
      "The most recommended free CCNA course on YouTube. Jeremy covers every topic in the Cisco 200-301 exam syllabus in a structured \"Day-by-Day\" format — IP addressing, VLANs, STP, OSPF, ACLs, NAT, security, and automation. Includes Packet Tracer labs, Anki flashcards, and end-of-video quizzes.",
    url: 'https://www.youtube.com/@JeremysITLab',
    source: "YouTube – Jeremy's IT Lab",
    author: 'Jeremy McDowall',
    level: 'Beginner',
    type: 'Video',
    tags: ['ccna', 'cisco', 'networking', 'packet-tracer', 'certification'],
    date: '2026-06-20',
    views: 12000,
  },
  {
    id: -2, category: 'networking', badge: '💳 PAID',
    title: 'NetworkLessons – Cisco & Networking Courses',
    description: "NetworkLessons.com offers in-depth, structured courses for CCNA, CCNP, and other Cisco certifications written by instructor Rene Molenaar. Sign up for a free account to access the first part of every course (300+ free lessons, no credit card needed), or unlock full access with a paid membership.",
    url: 'https://networklessons.com',
    source: 'NetworkLessons', author: 'Rene Molenaar',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 7200,
  },
  {
    id: -3, category: 'networking', badge: '💳 PAID',
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
    tags: ['ccna', 'comptia', 'cisco', 'aws', 'certification', 'it-training'],
    date: '2026-06-20', views: 9500,
  },
  {
    id: -4, category: 'security', badge: '🎓 FREE',
    title: 'Fortinet Training Institute – Free Cybersecurity Courses',
    description: "Fortinet's official training academy offers free, self-paced courses for industry certifications like Fortinet Certified Associate (FCA) and Fortinet Certified Professional (FCP). Study network security, cloud security, firewalls, and threat detection directly from the global leader.",
    url: 'https://training.fortinet.com',
    source: 'Fortinet', author: 'Fortinet Training Team',
    level: 'Beginner', type: 'Course',
    tags: ['cybersecurity', 'firewalls', 'fortinet', 'network-security', 'certification'],
    date: '2026-06-20', views: 8900,
  },
  {
    id: -5, category: 'networking', badge: '💳 PAID',
    title: 'Kevin Wallace Training – Cisco Certifications',
    description: "Led by dual CCIE Kevin Wallace, this training offers structured preparation for Cisco certifications like CCNA, CCNP, and ENCOR. Features high-quality YouTube tutorials, exam-prep blueprints, and an All-Access Pass for in-depth premium courses.",
    url: 'https://kwtrain.com',
    source: 'Kevin Wallace Training', author: 'Kevin Wallace',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 6500,
  },
  {
    id: -18, category: 'networking', badge: '🎥 FREE',
    title: 'Kevin Wallace – Free Cisco Courses on YouTube',
    description: "Dual CCIE Kevin Wallace shares free Cisco certification courses directly on YouTube. Covers CCNA, CCNP, and related topics with clear, structured video lessons — ideal for self-study without a paid subscription.",
    url: 'https://www.youtube.com/@kwallaceccie/courses',
    source: 'YouTube – Kevin Wallace', author: 'Kevin Wallace',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification', 'ccie'],
    date: '2026-06-20', views: 5800,
  },
  {
    id: -19, category: 'networking', badge: '🎥 FREE',
    title: 'thinQtank Learning – Cisco & CISSP Certification Courses',
    description: "Boot camp-style Cisco certification training on YouTube covering CCNA, CCNP (ENCOR, ENARSI, SCOR), CCIE Enterprise Infrastructure, and CISSP. Features long-form structured lessons, live session archives, and hands-on labs with GNS3, EVE-NG, and Wireshark.",
    url: 'https://www.youtube.com/@thinQtankS/courses',
    source: 'YouTube – thinQtank Learning', author: 'thinQtank Learning',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cissp', 'networking', 'cisco', 'certification'],
    date: '2026-06-20', views: 4700,
  },
  {
    id: -20, category: 'networking', badge: '🎥 FREE',
    title: 'KishSquared – Cisco Networking Courses by Jeff Kish',
    description: "Free Cisco networking courses by Jeff Kish, a dual-CCIE (R&S and Data Center) instructor at CBT Nuggets. Covers CCNA, CCNP ENCOR, OSPF, Spanning-Tree, LISP/VXLAN, and enterprise network design with clear, expert-led sessions.",
    url: 'https://www.youtube.com/@KishSquared/courses',
    source: 'YouTube – KishSquared', author: 'Jeff Kish',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'encor', 'cisco', 'networking', 'ccie', 'ospf'],
    date: '2026-06-20', views: 4200,
  },
  {
    id: -21, category: 'networking', badge: '🎓 FREE',
    title: 'Cisco Networking Academy – Free IT & Networking Courses',
    description: "Cisco's official learning platform offering free, self-paced courses with digital badges upon completion. Covers networking (CCNA prep, Networking Basics), cybersecurity (Ethical Hacker, Endpoint Security), Python, Linux, IoT, and DevNet. No cost to enroll — just create an account.",
    url: 'https://www.netacad.com/',
    source: 'Cisco NetAcad', author: 'Cisco Systems',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'networking', 'cybersecurity', 'python', 'linux', 'cisco', 'iot'],
    date: '2026-06-20', views: 19500,
  },
  {
    id: -22, category: 'networking', badge: '🎥 FREE',
    title: "Rob Riker's Tech Channel – Cisco CCNA, CCNP & CCIE Courses",
    description: "In-depth Cisco networking education covering CCNA, CCNP (ENCOR/ENARSI), and CCIE Enterprise Infrastructure. Features the Cisco Enterprise Series with free video lessons, practical EVE-NG lab walkthroughs, and workbook solutions — ideal for serious certification candidates.",
    url: 'https://www.youtube.com/@RobRikerTechChannel/courses',
    source: 'YouTube – Rob Riker', author: 'Rob Riker',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'encor', 'enarsi', 'cisco', 'networking', 'eve-ng'],
    date: '2026-06-20', views: 5100,
  },
  {
    id: -25, category: 'networking', badge: '🎥 FREE',
    title: 'PowerCert Animated Videos – Visual IT & Networking Courses',
    description: "Extremely popular animation-based training channel specializing in computer networking, cybersecurity, and hardware fundamentals. Ideal for visual learners studying for CompTIA A+, Network+, or Security+ certifications who prefer clear, animated diagrams over textbook lectures.",
    url: 'https://www.youtube.com/@PowerCertAnimatedVideos',
    source: 'YouTube – PowerCert', author: 'PowerCert Team',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'comptia', 'security', 'cybersecurity', 'a-plus', 'network-plus'],
    date: '2026-06-20', views: 18400,
  },
  {
    id: -26, category: 'networking', badge: '🎥 FREE',
    title: 'CBT Nuggets – Free IT & Networking Tutorials on YouTube',
    description: "Free introductory IT and networking courses from CBT Nuggets on YouTube. Covers foundational topics in networking (CCNA, Network+), cybersecurity, Linux, virtualization, and career guidance, alongside short, highly-focused 'MicroNuggets' for specific technologies.",
    url: 'https://www.youtube.com/@cbtnuggets/courses',
    source: 'YouTube – CBT Nuggets', author: 'CBT Nuggets Instructors',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'networking', 'comptia', 'security', 'cybersecurity', 'cloud', 'linux'],
    date: '2026-06-20', views: 12500,
  },
  {
    id: -6, category: 'devops', badge: '💳 PAID',
    title: 'TechWorld with Nana – DevOps & Cloud Training',
    description: "Nana Janashia provides some of the web's best DevOps and Cloud Computing training. Access comprehensive, structured premium bootcamps and certification prep for Docker, Kubernetes, CI/CD, and Terraform.",
    url: 'https://www.techworld-with-nana.com/',
    source: 'TechWorld with Nana', author: 'Nana Janashia',
    level: 'Beginner', type: 'Course',
    tags: ['devops', 'kubernetes', 'docker', 'ci-cd', 'cloud', 'terraform'],
    date: '2026-06-20', views: 9800,
  },
  {
    id: -7, category: 'networking', badge: '🎥 FREE',
    title: 'NetworkChuck – Free CCNA 200-301 Complete Course',
    description: "An energetic, highly practical CCNA training course. NetworkChuck covers networking fundamentals, subnetting, routers, switches, IPv6, security, and automation with hands-on labs you can build along in GNS3 or Packet Tracer.",
    url: 'https://www.youtube.com/playlist?list=PLIhvC56v63IJVXjvsaC47JqH1w_L8v1Y4',
    source: 'YouTube – NetworkChuck', author: 'Chuck Keith',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'cisco', 'networking', 'subnetting', 'certification'],
    date: '2026-06-20', views: 15400,
  },
  {
    id: -8, category: 'networking', badge: '🎥 FREE',
    title: "Jeremy's IT Lab – Free CCNP ENCOR 350-401 Course",
    description: "Prepare for your CCNP Enterprise certification with the web's most structured free CCNP ENCOR series. Covers enterprise routing, switching, wireless, security, virtualization, and network automation, with free Anki flashcards and downloadable labs.",
    url: 'https://www.youtube.com/@JeremysITLab/search?query=CCNP+ENCOR',
    source: "YouTube – Jeremy's IT Lab", author: 'Jeremy McDowall',
    level: 'Intermediate', type: 'Video',
    tags: ['ccnp', 'encor', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 8700,
  },
  {
    id: -10, category: 'networking', badge: '🎓 FREE',
    title: 'NetworkAcademy.io – Visual Networking Tutorials',
    description: "An independent e-learning platform featuring high-quality visual guides, animated diagrams, and interactive illustrations. Offers free study paths and beginner-friendly tutorials for CCNA, CCIE, and Python network automation.",
    url: 'https://www.networkacademy.io',
    source: 'NetworkAcademy.io', author: 'NetworkAcademy Team',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccie', 'networking', 'automation', 'python'],
    date: '2026-06-20', views: 7600,
  },
  {
    id: -23, category: 'networking', badge: '🎓 FREE',
    title: 'Running Cisco Modeling Labs (CML) on Hyper-V',
    description: "A complete step-by-step technical guide to running Cisco Modeling Labs (CML) on Windows Hyper-V. Explains VM creation (Gen 2), nested virtualization setup via PowerShell, MAC spoofing, and initial networking setup to run CML labs without VMware.",
    url: 'https://www.networkacademy.io/ccna/network-fundamentals/cml-on-hyperv',
    source: 'NetworkAcademy.io', author: 'NetworkAcademy Team',
    level: 'Intermediate', type: 'Article',
    tags: ['cml', 'hyper-v', 'networking', 'cisco', 'virtualization', 'labs'],
    date: '2026-06-20', views: 3200,
  },
  {
    id: -16, category: 'networking', badge: '💳 PAID',
    title: 'Boson – Cisco & CompTIA Certification Exam Prep',
    description: "Boson is an industry-leading exam prep platform offering ExSim-Max practice exams and the NetSim network simulator for Cisco (CCNA, CCNP) and CompTIA (Network+, Security+) certifications. Known for realistic exam simulations and detailed answer explanations. Demo versions available; full access via paid subscription.",
    url: 'https://www.boson.com',
    source: 'Boson', author: 'Boson Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['ccna', 'ccnp', 'comptia', 'networking', 'practice-exams', 'certification'],
    date: '2026-06-20', views: 8300,
  },
  {
    id: -24, category: 'networking', badge: '🎥 FREE',
    title: 'INE – Free IT & Networking Playlists on YouTube',
    description: "Free video training playlists provided by INE (Internetwork Expert). Includes structured playlists on networking (CCNA/CCIE prep), cybersecurity concepts, cloud computing, and webinar archives — a great starting point for deep-dive certification study.",
    url: 'https://www.youtube.com/@INEtraining/playlists',
    source: 'YouTube – INE', author: 'INE (Internetwork Expert)',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cybersecurity', 'cloud', 'networking', 'certification'],
    date: '2026-06-20', views: 6100,
  },
  {
    id: -12, category: 'networking', badge: '🎥 FREE',
    title: 'freeCodeCamp – Computer Networking Complete Course',
    description: "A comprehensive foundational course covering how the Internet works, network models (OSI/TCP-IP), IP addressing, subnetting, routing protocols, and network security concepts. Students will practice configuring network topologies and analyzing traffic to build key troubleshooting skills. This in-depth preparation establishes a solid foundation for major industry certifications like the Cisco CCNA.",
    url: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'ccna', 'dns', 'ip-addressing', 'subnetting'],
    date: '2026-06-20', views: 18200,
  },
  {
    id: -13, category: 'devops', badge: '🎥 FREE',
    title: 'freeCodeCamp – Linux Command Line for Beginners',
    description: "Go from absolute beginner to a proficient Linux user. Covers terminal navigation, filesystem structures, package managers, user permissions, and basic bash scripting. Learners will gain hands-on experience executing essential shell commands and automating routine system administration tasks. This course builds the core command-line skills required for backend development, devops engineering, and systems administration.",
    url: 'https://www.youtube.com/watch?v=s02x-5FfH3M',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Video',
    tags: ['linux', 'command-line', 'bash', 'devops', 'terminal'],
    date: '2026-06-20', views: 14500,
  },
  {
    id: -14, category: 'software-dev', badge: '🎓 FREE',
    title: 'The Odin Project – Full-Stack Web Development',
    description: "An outstanding, project-based web development curriculum. Guides you through setting up a professional local environment, Git/GitHub, HTML/CSS, JavaScript, Node.js, and databases. Students work through real-world, portfolio-worthy projects to solidify their understanding of front-end and back-end architectures. By the end of the course, learners will have the practical skills and confidence needed to build and deploy complex full-stack web applications.",
    url: 'https://www.theodinproject.com/',
    source: 'The Odin Project', author: 'Odin Project Contributors',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'node', 'git', 'full-stack', 'html-css'],
    date: '2026-06-20', views: 22000,
  },
  {
    id: -15, category: 'security', badge: '🎥 FREE',
    title: 'Simplilearn – Cyber Security Full Courses',
    description: "A solid introductory course covering cybersecurity core fundamentals, cryptography, firewalls, network monitoring, vulnerability assessment, and threat detection. Learners explore the methodologies behind security policies, incident response, and risk management. This curriculum provides the theoretical baseline and practical insights needed to begin a career in security analysis or network defense.",
    url: 'https://www.youtube.com/@SimplilearnOfficial/search?query=cyber+security+full+course',
    source: 'Simplilearn', author: 'Simplilearn Team',
    level: 'Beginner', type: 'Video',
    tags: ['security', 'cybersecurity', 'cryptography', 'firewalls', 'threats'],
    date: '2026-06-20', views: 9200,
  },
  {
    id: -27, category: 'software-dev', badge: '🎓 FREE',
    title: 'freeCodeCamp – Full Curriculum & Certifications',
    description: "The gold-standard free coding curriculum — 3,000+ hours of interactive, project-based learning covering JavaScript, Python, React, Node.js, and data visualization. Earn verified, free certifications by building real projects. Perfect for motivated self-learners who want to build a portfolio without spending a cent.",
    url: 'https://www.freecodecamp.org/learn',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'html-css', 'python', 'react', 'node', 'full-stack', 'certifications', 'project-based'],
    date: '2026-06-21', views: 25000,
  },
  {
    id: -28, category: 'software-dev', badge: '🎓 FREE',
    title: 'Scrimba – Learn JavaScript & React Interactively',
    description: "Scrimba's unique format lets you pause any video tutorial and edit the instructor's code in real time — right in the browser. Their free \"Learn JavaScript\" and \"Learn React\" courses are consistently rated best-in-class for hands-on frontend learning. Stop watching and start building — the Scrimba way.",
    url: 'https://scrimba.com/learn/javascript',
    source: 'Scrimba', author: 'Bob Ziroll',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'react', 'html-css', 'interactive', 'frontend', 'hands-on', 'free-courses'],
    date: '2026-06-21', views: 18000,
  },
  {
    id: -29, category: 'software-dev', badge: '🎓 FREE',
    title: "web.dev – Google's Official Web Dev Learn Paths",
    description: "Google's official web development learning hub — written by the Chrome team and kept rigorously up-to-date with modern web standards. Free structured courses on HTML, CSS, JavaScript, Accessibility, Performance, and PWAs. Your go-to reference for understanding not just what to build, but why it matters.",
    url: 'https://web.dev/learn',
    source: 'web.dev', author: 'Google Chrome Team',
    level: 'Beginner', type: 'Article',
    tags: ['html', 'css', 'javascript', 'accessibility', 'performance', 'pwa', 'web-standards', 'google'],
    date: '2026-06-21', views: 15000,
  },
  {
    id: -30, category: 'software-dev', badge: '🎓 FREE',
    title: 'DeepLearning.AI – Free Short Courses by Andrew Ng',
    description: "Andrew Ng's DeepLearning.AI offers a library of free, focused short courses on the most in-demand AI topics: LLMs, generative AI, RAG, prompt engineering, and AI agents — often built in partnership with OpenAI, Google, and LangChain. Start with any 1–2 hour course and go deeper. The gold standard for practical AI education.",
    url: 'https://www.deeplearning.ai/courses/',
    source: 'DeepLearning.AI', author: 'Andrew Ng',
    level: 'Beginner', type: 'Course',
    tags: ['ai', 'machine-learning', 'llm', 'generative-ai', 'prompt-engineering', 'agents', 'andrew-ng', 'python'],
    date: '2026-06-21', views: 22000,
  },
  {
    id: -31, category: 'software-dev', badge: '🎓 FREE',
    title: 'Kaggle Learn – Free ML & Data Science Micro-Courses',
    description: "Kaggle's free micro-courses take you from Python basics to ML, deep learning, NLP, and computer vision — all in an interactive notebook environment, no setup required. With over 32 million community members and free certificates, it's the best practice ground for aspiring data scientists and ML engineers.",
    url: 'https://www.kaggle.com/learn',
    source: 'Kaggle', author: 'Kaggle Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['machine-learning', 'python', 'pandas', 'deep-learning', 'nlp', 'computer-vision', 'data-science', 'competitions'],
    date: '2026-06-21', views: 16000,
  },
  {
    id: -32, category: 'security', badge: '🔑 FREE',
    title: 'TryHackMe – Guided Hands-On Cybersecurity Learning',
    description: "The #1 platform for hands-on cybersecurity beginners. TryHackMe's guided \"rooms\" walk you through Linux, networking, web hacking, OSINT, and CTF challenges in a fully browser-based environment — no setup required. Build real skills through gamified paths, with hundreds of free rooms and over 4 million learners in the community.",
    url: 'https://tryhackme.com/',
    source: 'TryHackMe', author: 'TryHackMe Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['cybersecurity', 'ethical-hacking', 'pentesting', 'linux', 'ctf', 'blue-team', 'guided-paths', 'browser-based'],
    date: '2026-06-21', views: 24000,
  },
  {
    id: -33, category: 'security', badge: '🔑 FREE',
    title: 'PortSwigger Web Security Academy',
    description: "The definitive free resource for web application security — created by the makers of Burp Suite and The Web Application Hacker's Handbook. Covers every major vulnerability class (SQLi, XSS, CSRF, OAuth, API security) with hands-on browser-based labs graded Apprentice → Practitioner → Expert. 100% free. No paywalls. The tool used by real pentesters, every day.",
    url: 'https://portswigger.net/web-security',
    source: 'PortSwigger', author: 'PortSwigger Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['web-security', 'sql-injection', 'xss', 'csrf', 'oauth', 'api-security', 'burp-suite', 'pentesting', 'owasp'],
    date: '2026-06-21', views: 28000,
  },
  {
    id: -34, category: 'devops', badge: '🛠️ FREE TOOL',
    title: 'Killercoda – Free Browser-Based DevOps Labs',
    description: "Killercoda gives you a real Linux or Kubernetes environment — running in your browser, in seconds, for free. Practice Docker, Kubernetes, Terraform, Helm, and more without installing anything. Widely used for CKA/CKAD certification prep, with guided scenarios for every skill level and an open playground for free experimentation.",
    url: 'https://killercoda.com/',
    source: 'Killercoda', author: 'Killercoda Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['kubernetes', 'docker', 'linux', 'terraform', 'helm', 'cka', 'ckad', 'devops', 'browser-based', 'labs'],
    date: '2026-06-21', views: 19000,
  },
  {
    id: -35, category: 'devops', badge: '🔑 FREE',
    title: 'AWS Skill Builder – Official Free AWS Training',
    description: "Amazon's official training hub — 600+ free, self-paced digital courses covering every AWS service, certification domain, and cloud role. From Cloud Practitioner to Solutions Architect, learn directly from the source with no paywalls on the core catalog. The essential companion for anyone building AWS cloud skills or preparing for certification.",
    url: 'https://skillbuilder.aws/',
    source: 'AWS', author: 'AWS Training Team',
    level: 'Beginner', type: 'Course',
    tags: ['aws', 'cloud', 'amazon', 'ec2', 'lambda', 's3', 'solutions-architect', 'cloud-practitioner', 'certification'],
    date: '2026-06-21', views: 20000,
  },
  {
    id: -36, category: 'software-dev', badge: '🎓 FREE',
    title: 'SQLBolt – Interactive SQL Lessons',
    description: "The fastest, friendliest way to start writing SQL — 18 interactive lessons in your browser, no signup required. SQLBolt covers SELECT queries, JOINs, aggregates, subqueries, and basic table management with immediate feedback on every exercise. The perfect starting point for any developer who needs to learn database querying from scratch.",
    url: 'https://sqlbolt.com/',
    source: 'SQLBolt', author: 'SQLBolt Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['sql', 'database', 'select', 'joins', 'aggregates', 'beginner', 'no-signup', 'interactive'],
    date: '2026-06-21', views: 17000,
  },

  {
    id: 2, category: 'software-dev', badge: '🎓 FREE', title: 'Practical Deep Learning for Coders',
    description: "Fast.ai's legendary course covering deep learning with PyTorch — image classification, NLP, tabular data, and deployment. A must-have for any ML practitioner.",
    url: 'https://course.fast.ai/',
    source: 'fast.ai', author: 'Jeremy Howard', featured: true,
    level: 'Intermediate', type: 'Course',
    tags: ['pytorch', 'neural-networks', 'python'], date: '2024-01-20', views: 7800,
  },
  {
    id: 3, category: 'devops', badge: '💳 PAID', title: 'Docker & Kubernetes: The Complete Guide',
    description: 'Master containerisation from scratch — build Docker images, write compose files, orchestrate with Kubernetes, and deploy to the cloud. You will learn to manage complex container setups, configure networking, and implement scaling strategies in production-like environments. By completing hands-on exercises, you will design robust CI/CD workflows and multi-container deployments.',
    url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
    source: 'Udemy', author: 'Stephen Grider',
    level: 'Intermediate', type: 'Course',
    tags: ['docker', 'kubernetes', 'devops'], date: '2024-02-05', views: 5100,
  },
  {
    id: 4, category: 'software-dev', badge: '🎥 FREE', title: 'TypeScript Full Course for Beginners',
    description: 'Zero to hero with TypeScript — types, interfaces, generics, decorators, and integrating with React. 8 hours of hands-on learning.',
    url: 'https://www.youtube.com/watch?v=fU90yG_1K-c',
    source: 'freeCodeCamp', author: 'Dave Gray',
    level: 'Beginner', type: 'Video',
    tags: ['typescript', 'javascript', 'types'], date: '2024-04-12', views: 3300,
  },
  {
    id: 6, category: 'aiml', badge: '🎥 FREE', title: 'LangChain Crash Course: Build LLM Apps',
    description: 'Learn to chain language models, use agents and tools, build RAG pipelines, and deploy conversational AI apps with Python and LangChain in under 2 hours.',
    url: 'https://www.youtube.com/watch?v=LbT1yp6quS8',
    source: 'Patrick Loeber', author: 'Patrick Loeber',
    level: 'Intermediate', type: 'Video',
    tags: ['langchain', 'llm', 'python', 'rag'], date: '2024-03-18', views: 4800,
  },
  {
    id: 7, category: 'software-dev', badge: '🎓 FREE', title: 'Building REST APIs with Node, Express & MongoDB',
    description: 'A practical guide to designing and building production-ready REST APIs using Node.js, Express, Mongoose, and MongoDB Atlas.',
    url: 'https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/',
    source: 'freeCodeCamp', author: 'Nishant Kumar',
    level: 'Beginner', type: 'Article',
    tags: ['node', 'express', 'mongodb', 'rest', 'api'], date: '2024-02-28', views: 2900,
  },
  {
    id: 8, category: 'software-dev', badge: '💳 PAID', title: 'Flutter & Dart – The Complete Guide',
    description: 'Go from zero to a multi-screen mobile app with Flutter. Widgets, state management, animations, Firebase, and publishing to app stores.',
    url: 'https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/',
    source: 'Udemy', author: 'Maximilian Schwarzmüller',
    level: 'Beginner', type: 'Course',
    tags: ['flutter', 'dart', 'mobile', 'ios', 'android'], date: '2024-04-01', views: 3700,
  },
  {
    id: 9, category: 'devops', badge: '🛠️ FREE TOOL', title: 'Terraform in Practice',
    description: 'Infrastructure as code with Terraform — provision cloud resources on AWS, GCP, and Azure. Modules, workspaces, remote state, and CI/CD integration. Students will learn to structure configuration files, manage state safely across teams, and automate infrastructure deployments. This course equips you with the skills to orchestrate scalable and reproducible cloud environments.',
    url: 'https://developer.hashicorp.com/terraform/tutorials',
    source: 'HashiCorp', author: 'HashiCorp Team',
    level: 'Advanced', type: 'Interactive',
    tags: ['terraform', 'iac', 'aws', 'cloud'], date: '2024-03-25', views: 3100,
  },
  {
    id: 10, category: 'software-dev', badge: '🎓 FREE', title: 'Apache Kafka for Beginners',
    description: 'Understand distributed event streaming — Kafka topics, partitions, consumers, producers, and connecting it all to real-time data pipelines.',
    url: 'https://www.conduktor.io/kafka/what-is-apache-kafka/',
    source: 'Conduktor', author: 'Conduktor Team',
    level: 'Beginner', type: 'Article',
    tags: ['kafka', 'streaming', 'data'], date: '2024-01-15', views: 2400,
  },
  {
    id: 11, category: 'security', badge: '🎓 FREE', title: 'Web Security: OWASP Top 10 Explained',
    description: 'An essential primer on the 10 most critical web application security risks including SQL injection, XSS, CSRF, and broken auth — with mitigation strategies.',
    url: 'https://owasp.org/www-project-top-ten/',
    source: 'OWASP', author: 'OWASP Foundation',
    level: 'Intermediate', type: 'Article',
    tags: ['security', 'owasp', 'xss', 'sql-injection'], date: '2024-02-10', views: 4500,
  },
  {
    id: 12, category: 'software-dev', badge: '🎥 FREE', title: 'Next.js 14 App Router Deep Dive',
    description: 'Master the new App Router in Next.js 14 — server components, streaming, loading states, parallel routes, caching strategies, and full-stack data fetching patterns.',
    url: 'https://www.youtube.com/watch?v=vOP6G41J_p4',
    source: 'Lama Dev', author: 'Safak',
    level: 'Advanced', type: 'Video',
    tags: ['nextjs', 'react', 'app-router', 'server-components'], date: '2024-04-20', views: 5600,
  },
  {
    id: 13, category: 'software-dev', badge: '🎓 FREE', title: 'PostgreSQL Tutorial — Full Beginner Course',
    description: 'Learn PostgreSQL from scratch — SQL syntax, joins, indexes, transactions, constraints, views, and stored procedures with real-world exercises.',
    url: 'https://www.postgresqltutorial.com/',
    source: 'PostgreSQL Tutorial', author: 'PostgreSQL Tutorial Team',
    level: 'Beginner', type: 'Article',
    tags: ['postgresql', 'sql', 'database'], date: '2024-01-05', views: 3800,
  },
  {
    id: 14, category: 'software-dev', badge: '🎓 FREE', title: 'Hugging Face NLP Course',
    description: 'Learn NLP with Transformers from the creators of Hugging Face — tokenizers, fine-tuning BERT & GPT, datasets, and pushing models to the Hub.',
    url: 'https://huggingface.co/learn/nlp-course',
    source: 'Hugging Face', author: 'Hugging Face Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['nlp', 'transformers', 'python', 'bert'], date: '2024-02-20', views: 6100,
  },
  {
    id: 16, category: 'software-dev', badge: '🎓 FREE', title: 'FastAPI: Modern Python API Development',
    description: 'Build production-grade APIs with FastAPI — async endpoints, Pydantic models, automatic OpenAPI docs, OAuth2, and PostgreSQL with SQLAlchemy.',
    url: 'https://fastapi.tiangolo.com/tutorial/',
    source: 'FastAPI Docs', author: 'Sebastián Ramírez',
    level: 'Intermediate', type: 'Article',
    tags: ['fastapi', 'python', 'api', 'async'], date: '2024-04-08', views: 4200,
  },
  {
    id: 17, category: 'software-dev', badge: '🎓 FREE', title: 'Git & GitHub Masterclass',
    description: 'Become a Git power user — branching strategies, rebasing, cherry-picking, GitHub Actions for CI/CD, pull requests, and monorepo workflows.',
    url: 'https://www.atlassian.com/git/tutorials',
    source: 'Atlassian', author: 'Atlassian Team',
    level: 'Beginner', type: 'Article',
    tags: ['git', 'github', 'version-control'], date: '2024-01-25', views: 5300,
  },
  {
    id: 18, category: 'software-dev', badge: '🎓 FREE', title: 'React Native: Build Native Apps with JavaScript',
    description: 'Full React Native course covering navigation, state management with Redux Toolkit, native device APIs, Expo, and publishing to App Store & Google Play.',
    url: 'https://reactnative.dev/docs/getting-started',
    source: 'React Native Docs', author: 'Meta Open Source',
    level: 'Intermediate', type: 'Article',
    tags: ['react-native', 'javascript', 'mobile'], date: '2024-03-30', views: 3400,
  },
  {
    id: 20, category: 'software-dev', badge: '🎓 FREE', title: 'dbt (data build tool) Crash Course',
    description: 'Transform your data warehouse with dbt — models, tests, documentation, incremental materializations, and deploying analytics engineering pipelines.',
    url: 'https://courses.getdbt.com/courses/fundamentals',
    source: 'dbt Labs', author: 'dbt Labs Team',
    level: 'Intermediate', type: 'Course',
    tags: ['dbt', 'sql', 'analytics', 'data-engineering'], date: '2024-04-15', views: 2100,
  },
  {
    id: 21, category: 'security', badge: '🎥 FREE', title: 'Ethical Hacking Full Course – Network Penetration Testing',
    description: 'Learn penetration testing legally — recon, scanning, exploitation with Metasploit, web hacking, privilege escalation, and writing professional reports.',
    url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE',
    source: 'freeCodeCamp', author: 'Heath Adams (The Cyber Mentor)',
    level: 'Advanced', type: 'Video',
    tags: ['ethical-hacking', 'pentesting', 'security'], date: '2024-01-08', views: 4700,
  },
  {
    id: 22, category: 'devops', badge: '🎓 FREE', title: 'GitHub Actions: CI/CD from Zero to Hero',
    description: 'Automate everything with GitHub Actions — build, test, and deploy pipelines, matrix builds, caching, reusable workflows, and self-hosted runners.',
    url: 'https://docs.github.com/en/actions/learn-github-actions',
    source: 'GitHub Docs', author: 'GitHub Team',
    level: 'Beginner', type: 'Article',
    tags: ['github-actions', 'ci-cd', 'devops'], date: '2024-04-22', views: 3600,
  },
  {
    id: 23, category: 'software-dev', badge: '🔑 FREE', title: 'Redis: The Complete Developer Guide',
    description: 'Master Redis data structures — strings, hashes, lists, sorted sets, streams. Caching patterns, pub/sub, distributed locks, and Redis Cluster.',
    url: 'https://redis.io/learn/',
    source: 'Redis University', author: 'Redis Team',
    level: 'Intermediate', type: 'Course',
    tags: ['redis', 'caching', 'nosql'], date: '2024-03-02', views: 2800,
  },
  {
    id: 24, category: 'software-dev', badge: '🎓 FREE', title: 'CSS Grid & Flexbox Mastery',
    description: 'Build any layout imaginable with CSS Grid and Flexbox. Interactive exercises, real-world projects, and techniques for responsive, accessible designs.',
    url: 'https://cssgrid.io/',
    source: 'Wes Bos', author: 'Wes Bos',
    level: 'Beginner', type: 'Interactive',
    tags: ['css', 'grid', 'flexbox', 'responsive'], date: '2024-04-18', views: 4100,
  },
  {
    id: 25, category: 'software-dev', badge: '🎥 FREE', title: 'Neovim from Scratch',
    description: 'Transform Neovim into a full-featured IDE — plugin ecosystem with lazy.nvim, LSP configuration, Treesitter, telescope, and custom Lua configs.',
    url: 'https://www.youtube.com/watch?v=m8C0Cq9Uv9o',
    source: 'TJ DeVries', author: 'TJ DeVries',
    level: 'Advanced', type: 'Video',
    tags: ['neovim', 'vim', 'editor', 'lua'], date: '2024-02-25', views: 2300,
  },
  {
    id: -37, category: 'software-dev', badge: '🎓 FREE',
    title: 'MySQL for Developers',
    description: 'A comprehensive, free video course on MySQL design and optimization. Learn indexing strategies, schema design, query tuning, and database scaling principles from industry experts to build highly performant applications.',
    url: 'https://planetscale.com/courses/mysql-for-developers',
    source: 'PlanetScale', author: 'Aaron Francis',
    level: 'Intermediate', type: 'Course',
    tags: ['mysql', 'database-design', 'indexing', 'performance', 'sql'],
    date: '2026-06-21', views: 15000,
  },
  {
    id: -38, category: 'software-dev', badge: '🔑 FREE',
    title: 'MongoDB University',
    description: 'The official learning portal for MongoDB. Learn document database principles, CRUD operations, aggregation pipelines, indexing, and schema design through self-paced courses and labs.',
    url: 'https://learn.mongodb.com/',
    source: 'MongoDB', author: 'MongoDB Team',
    level: 'Beginner', type: 'Course',
    tags: ['mongodb', 'nosql', 'document-database', 'mql', 'aggregation'],
    date: '2026-06-21', views: 12000,
  },
  {
    id: -39, category: 'software-dev', badge: '🎓 FREE',
    title: 'Data Engineering Zoomcamp',
    description: 'A comprehensive, free, hands-on bootcamp for modern data engineering. Learn Docker, Terraform, PostgreSQL, Airflow, Spark, Kafka, and BigQuery by building end-to-end data pipelines.',
    url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp',
    source: 'DataTalks.Club', author: 'DataTalksClub Team',
    level: 'Intermediate', type: 'Course',
    tags: ['docker', 'terraform', 'postgresql', 'airflow', 'spark', 'kafka', 'bigquery'],
    date: '2026-06-21', views: 18000,
  },
  {
    id: -40, category: 'software-dev', badge: '🎓 FREE',
    title: 'The Missing Semester of Your CS Education',
    description: "MIT's legendary class on the practical tools of software engineering. Master the command-line, shell scripting, Vim, Git, SSH, security, and build systems to boost your daily developer productivity.",
    url: 'https://missing.csail.mit.edu/',
    source: 'MIT', author: 'MIT CSAIL Team',
    level: 'Beginner', type: 'Course',
    tags: ['shell', 'command-line', 'vim', 'git', 'ssh', 'data-wrangling'],
    date: '2026-06-21', views: 22000,
  },
  {
    id: -41, category: 'software-dev', badge: '🎓 FREE',
    title: 'Learn Git Branching',
    description: 'An interactive, visual simulation game for learning Git commands. Practice branching, merging, rebasing, cherry-picking, and remote repository operations with immediate visual feedback.',
    url: 'https://learngitbranching.js.org/',
    source: 'Learn Git Branching', author: 'Peter Cottle',
    level: 'Beginner', type: 'Interactive',
    tags: ['git', 'version-control', 'git-branching', 'git-rebase', 'interactive-game'],
    date: '2026-06-21', views: 16000,
  },
  {
    id: -42, category: 'software-dev', badge: '🎓 FREE',
    title: 'Android Basics with Compose',
    description: 'Build native Android apps from scratch with Google\'s official, self-paced Jetpack Compose course. Learn Kotlin fundamentals, design modern declarative UIs, manage state, and build a collection of portfolio-ready apps.',
    url: 'https://developer.android.com/courses/android-basics-compose/course',
    source: 'Android Developers', author: 'Google Developer Team',
    level: 'Beginner', type: 'Course',
    tags: ['android', 'jetpack-compose', 'kotlin', 'mobile-dev', 'google'],
    date: '2026-06-21', views: 24000,
  },
  {
    id: -43, category: 'software-dev', badge: '🎓 FREE',
    title: '100 Days of SwiftUI',
    description: 'The most recommended free path to mastering iOS app development. Learn Swift programming, build 15+ real-world SwiftUI apps, and test your skills with daily coding challenges under the guidance of Paul Hudson.',
    url: 'https://www.hackingwithswift.com/100/swiftui',
    source: 'Hacking with Swift', author: 'Paul Hudson',
    level: 'Beginner', type: 'Course',
    tags: ['ios', 'swiftui', 'swift', 'mobile-dev', 'hacking-with-swift'],
    date: '2026-06-21', views: 26000,
  },
  {
    id: -44, category: 'software-dev', badge: '🛠️ FREE TOOL',
    title: 'Rustlings',
    description: 'Master Rust by fixing small, broken exercises that guide you through syntax, types, borrow checker constraints, and common compiler errors. Perfect for hands-on learners looking to transition to systems programming.',
    url: 'https://github.com/rust-lang/rustlings',
    source: 'GitHub', author: 'Rustlings Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['rust', 'systems-programming', 'compiler-errors', 'interactive', 'git-repository'],
    date: '2026-06-21', views: 22000,
  },
  {
    id: -45, category: 'software-dev', badge: '🎓 FREE',
    title: 'Gophercises',
    description: 'Bridge the gap between knowing Go syntax and writing real applications. Build 20 diverse mini-projects, including quiz games, URL shorteners, and CLI tools, accompanied by step-by-step video walkthroughs.',
    url: 'https://gophercises.com',
    source: 'Calhoun.io', author: 'Jon Calhoun',
    level: 'Intermediate', type: 'Interactive',
    tags: ['go', 'golang', 'backend-development', 'project-based', 'gopher'],
    date: '2026-06-21', views: 18000,
  },
  {
    id: -46, category: 'software-dev', badge: '🎓 FREE',
    title: 'Astro Build a Blog Tutorial',
    description: 'Learn to build blazing fast, content-driven websites with the official Astro blog tutorial. Set up components, configure layouts, import Markdown, and master modern performance-focused web development from scratch.',
    url: 'https://docs.astro.build/en/tutorial/0-introduction/',
    source: 'Astro Docs', author: 'Astro Contributors',
    level: 'Beginner', type: 'Course',
    tags: ['astro', 'frontend', 'static-site-generator', 'islands-architecture', 'web-performance'],
    date: '2026-06-21', views: 15000,
  },
];
// ── APP STATE ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 9;
let state = {
  search: '',
  category: 'all',
  level: 'all',
  type: 'all',
  duration: 'all',
  sort: 'newest',
  page: 1,
  tutorials: [...TUTORIALS_DATA],
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function getCategoryById(id) { return CATEGORIES.find(c => c.id === id); }

function levelClass(l) { return `level-${l.toLowerCase()}`; }
function typeClass(t) { return `type-${t.toLowerCase()}`; }

// Estimate duration in minutes if not explicitly defined on the tutorial
function getDurationMinutes(t) {
  if (t.duration) return t.duration;
  switch (t.type) {
    case 'Video': return 45;
    case 'Article': return 15;
    case 'Course': return 1200; // 20 hours
    case 'Interactive': return 90;
    default: return 30;
  }
}

// Format duration label from minutes
function getDurationLabel(minutes) {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

let toastTimeout = null;
function showToast(msg, dur = 2500) {
  const el = $('#toast');
  if (el) {
    el.textContent = msg;
    el.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      el.classList.remove('show');
      toastTimeout = null;
    }, dur);
  }
}


// ── SEARCH AUTOCOMPLETE SUGGESTIONS ───────────────────────────────────────────
let currentSuggestions = [];
let highlightedIndex = -1;

function getSuggestions(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const qClean = q.startsWith('#') ? q.substring(1) : q;

  const suggestions = [];
  const seenTerms = new Set();

  // 1. Categories
  CATEGORIES.forEach(cat => {
    if (cat.name.toLowerCase().includes(qClean)) {
      const term = cat.name;
      if (!seenTerms.has(term)) {
        seenTerms.add(term);
        suggestions.push({
          type: 'category',
          term: term,
          html: `<span class="search-icon">${cat.emoji || '🌐'}</span> <span>${cat.name}</span>`
        });
      }
    }
  });

  // 2. Tags
  const allTags = new Set();
  TUTORIALS_DATA.forEach(t => t.tags.forEach(tag => allTags.add(tag)));
  Array.from(allTags).forEach(tag => {
    if (tag.toLowerCase().includes(qClean)) {
      const term = '#' + tag;
      if (!seenTerms.has(term)) {
        seenTerms.add(term);
        suggestions.push({
          type: 'tag',
          term: term,
          html: `<span class="search-icon">🏷️</span> <span>#${tag}</span>`
        });
      }
    }
  });

  // 3. Titles
  TUTORIALS_DATA.forEach(t => {
    if (t.title.toLowerCase().includes(qClean)) {
      const term = t.title;
      if (!seenTerms.has(term)) {
        seenTerms.add(term);
        suggestions.push({
          type: 'title',
          term: term,
          html: `<span class="search-icon">📝</span> <span>${t.title}</span>`
        });
      }
    }
  });

  return suggestions.slice(0, 7); // Limit suggestions to 7 items
}

function renderSuggestions(suggestions) {
  const container = $('#search-suggestions');
  if (!container) return;

  const searchInput = $('#search-input');

  if (suggestions.length === 0) {
    container.innerHTML = '';
    container.classList.add('hidden');
    if (searchInput) searchInput.setAttribute('aria-expanded', 'false');
    return;
  }

  container.innerHTML = suggestions.map((s, idx) => `
    <div class="suggestion-item" data-term="${s.term.replace(/"/g, '&quot;')}" role="option" id="suggestion-item-${idx}">
      ${s.html}
    </div>
  `).join('');

  container.classList.remove('hidden');
  if (searchInput) searchInput.setAttribute('aria-expanded', 'true');

  container.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const term = item.dataset.term;
      selectSuggestion(term);
    });
  });
}

function selectSuggestion(term) {
  const searchInput = $('#search-input');
  if (searchInput) {
    searchInput.value = term;
  }
  state.search = term;
  state.page = 1;
  hideSuggestions();
  renderTutorials();
  
  const tutSec = document.getElementById('tutorials');
  if (tutSec) {
    tutSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function hideSuggestions() {
  const container = $('#search-suggestions');
  if (container) {
    container.classList.add('hidden');
    container.innerHTML = '';
  }
  const searchInput = $('#search-input');
  if (searchInput) {
    searchInput.setAttribute('aria-expanded', 'false');
    searchInput.removeAttribute('aria-activedescendant');
  }
  currentSuggestions = [];
  highlightedIndex = -1;
}

function updateHighlight() {
  const container = $('#search-suggestions');
  if (!container) return;
  const items = container.querySelectorAll('.suggestion-item');
  const searchInput = $('#search-input');
  items.forEach((item, idx) => {
    if (idx === highlightedIndex) {
      item.classList.add('active');
      item.setAttribute('aria-selected', 'true');
      item.scrollIntoView({ block: 'nearest' });
      if (searchInput) {
        searchInput.setAttribute('aria-activedescendant', `suggestion-item-${idx}`);
      }
    } else {
      item.classList.remove('active');
      item.removeAttribute('aria-selected');
    }
  });
  if (highlightedIndex === -1 && searchInput) {
    searchInput.removeAttribute('aria-activedescendant');
  }
}

// ── FILTER + SORT LOGIC ───────────────────────────────────────────────────────
function applyFilters() {
  const q = state.search.toLowerCase().trim();
  const qClean = q.startsWith('#') ? q.substring(1) : q;
  let list = TUTORIALS_DATA.filter(t => {
    const matchSearch = !q || [t.title, t.description, t.source, t.author].some(s => s.toLowerCase().includes(q)) || t.tags.some(tag => tag.toLowerCase().includes(qClean));
    const matchCat = state.category === 'all' || t.category === state.category;
    const matchLevel = state.level === 'all' || t.level === state.level;
    const matchType = state.type === 'all' || t.type === state.type;
    const matchDuration = (() => {
      if (state.duration === 'all') return true;
      const mins = getDurationMinutes(t);
      if (state.duration === 'quick') return mins < 30;
      if (state.duration === 'medium') return mins >= 30 && mins <= 120;
      if (state.duration === 'deep') return mins > 120;
      return true;
    })();
    return matchSearch && matchCat && matchLevel && matchType && matchDuration;
  });

  if (state.sort === 'newest') list.sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (state.sort === 'popular') list.sort((a, b) => b.views - a.views);
  else if (state.sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));

  return list;
}

// ── RENDER: CATEGORIES ─────────────────────────────────────────────────────────
function renderCategories() {
  const grid = $('#category-grid');
  if (!grid) return;
  const counts = {};
  TUTORIALS_DATA.forEach(t => { counts[t.category] = (counts[t.category] || 0) + 1; });

  const sortedCategories = [...CATEGORIES].sort((a, b) => {
    const countA = counts[a.id] || 0;
    const countB = counts[b.id] || 0;
    if (countB !== countA) return countB - countA;
    return a.name.localeCompare(b.name);
  });

  grid.innerHTML = sortedCategories.map(cat => `
    <div class="cat-card animate-in ${state.category === cat.id ? 'active' : ''}"
         data-catid="${cat.id}"
         role="button" tabindex="0"
         aria-label="Filter by ${cat.name}"
         aria-pressed="${state.category === cat.id ? 'true' : 'false'}"
         style="--cat-color: ${cat.color}">
      <span class="cat-emoji" aria-hidden="true">${cat.emoji}</span>
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
      const tutSec = document.getElementById('tutorials');
      if (tutSec) tutSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
  });

  observeAnimations();
}

function updateCatFilter() {
  const sel = $('#cat-filter');
  if (sel) sel.value = state.category;
}

// ── RENDER: FEATURED ───────────────────────────────────────────────────────────
function renderFeatured() {
  const grid = $('#featured-grid');
  if (!grid) return;

  const featured = TUTORIALS_DATA.find(t => t.featured) || TUTORIALS_DATA[0];
  const cat = getCategoryById(featured.category);

  // Card 1: Featured Card (span 2, row span 2)
  const featuredHtml = `
    <div class="bento-card featured animate-in" style="--i:0">
      <div class="featured-card-glow" style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; border-radius: 50%; opacity: 0.05; pointer-events: none; background:radial-gradient(circle,${cat?.color || '#7c5cff'}40,transparent)"></div>
      <div class="bento-featured-content" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span class="featured-badge" style="position: static; margin-bottom: 1rem; display: inline-block; padding: 0.3rem 0.7rem; border-radius: 100px; font-size: 0.72rem; font-weight: 700; background: var(--gradient); color: #fff; letter-spacing: 0.05em;"><span aria-hidden="true">⭐</span> Featured</span>
          <div class="featured-category" style="font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary-light); margin-bottom: 0.5rem;">${cat?.emoji || ''} ${cat?.name || featured.category}</div>
          <h3 class="featured-title" style="font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem; line-height: 1.3;">${featured.title}</h3>
          <p class="featured-desc" style="font-size: 0.92rem; color: var(--text2); line-height: 1.65; margin-bottom: 1.5rem;">${featured.description}</p>
        </div>
        <div class="featured-footer" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <span class="featured-author" style="font-size: 0.82rem; color: var(--text3);">by ${featured.author} · ${featured.source}</span>
          <a href="${featured.url}" target="_blank" rel="noopener noreferrer" class="btn-featured">
            Start Learning <span>→</span>
          </a>
        </div>
      </div>
    </div>
  `;

  // Card 2: Quick Stats (span 3, row span 1)
  const totalTutorials = TUTORIALS_DATA.length;
  const totalCategories = CATEGORIES.length;
  const totalSources = new Set(TUTORIALS_DATA.map(t => t.source)).size;

  const statsHtml = `
    <div class="bento-card quick-stats animate-in" style="--i:1; display: flex; flex-direction: row; align-items: center; justify-content: space-around; gap: 2rem; padding: 1.5rem 2rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span aria-hidden="true" style="font-size: 2rem;">🌐</span>
        <div>
          <span style="font-family: var(--mono); font-size: 1.75rem; font-weight: 800; color: var(--accent); display: block; line-height: 1.1;" class="bento-stat-num">${totalTutorials}</span>
          <span style="font-size: 0.72rem; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.05em;">Curated Tutorials</span>
        </div>
      </div>
      <div style="width: 1px; height: 30px; background: var(--border);"></div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span aria-hidden="true" style="font-size: 2rem;">⬡</span>
        <div>
          <span style="font-family: var(--mono); font-size: 1.75rem; font-weight: 800; color: var(--primary-light); display: block; line-height: 1.1;" class="bento-stat-num">${totalCategories}</span>
          <span style="font-size: 0.72rem; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.05em;">Categories</span>
        </div>
      </div>
      <div style="width: 1px; height: 30px; background: var(--border);"></div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span aria-hidden="true" style="font-size: 2rem;">🔗</span>
        <div>
          <span style="font-family: var(--mono); font-size: 1.75rem; font-weight: 800; color: var(--accent3); display: block; line-height: 1.1;" class="bento-stat-num">${totalSources}</span>
          <span style="font-size: 0.72rem; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.05em;">Vetted Sources</span>
        </div>
      </div>
    </div>
  `;

  grid.innerHTML = `
    ${featuredHtml}
    ${statsHtml}
  `;

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

  if (countEl) {
    countEl.textContent = `Showing ${Math.min(slice.length, filtered.length)} of ${filtered.length} tutorial${filtered.length !== 1 ? 's' : ''}`;
  }

  if (filtered.length === 0) {
    if (grid) grid.innerHTML = '';
    if (noResults) noResults.classList.remove('hidden');
    if (loadMore) loadMore.classList.add('hidden');
    updateScrollButtons();
    return;
  }
  if (noResults) noResults.classList.add('hidden');

  if (grid) {
    if (reset) {
      grid.innerHTML = slice.map(t => renderTutorialCard(t)).join('');
    } else {
      const currentCount = grid.querySelectorAll('.tut-card').length;
      const newItems = slice.slice(currentCount);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newItems.map(t => renderTutorialCard(t)).join('');
      
      while (tempDiv.firstChild) {
        grid.appendChild(tempDiv.firstChild);
      }
    }
  }
  if (loadMore) {
    loadMore.classList.toggle('hidden', slice.length >= filtered.length);
  }
  
  const loadMoreBtn = $('#load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.dataset.total = filtered.length;
  }

  observeAnimations();
  updateScrollButtons();
}

function renderTutorialCard(t) {
  const cat = getCategoryById(t.category);
  const trialBadge = t.freeTrial
    ? `<span class="trial-badge"><span aria-hidden="true">🎁</span> ${t.trialLabel || 'Free Trial'}</span>`
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
          <span aria-hidden="true">${cat?.emoji || ''}</span> ${cat?.name || t.category}
        </span>
      </div>
      ${trialBadge}
      <h3 class="tut-title">${t.title}</h3>
      <p class="tut-desc">${t.description}</p>
      <div class="tut-chips">
        <span class="chip ${levelClass(t.level)}">${t.level}</span>
        <span class="chip ${typeClass(t.type)}"><span aria-hidden="true">${t.type === 'Video' ? '▶' : t.type === 'Article' ? '📄' : t.type === 'Course' ? '🎓' : '⚡'}</span> ${t.type}</span>
        <span class="chip duration-chip"><span aria-hidden="true">⏱️</span> ${getDurationLabel(getDurationMinutes(t))}</span>
      </div>
      <div class="tut-tags">
        ${t.tags.map(tag => `<span class="tut-tag">#${tag}</span>`).join('')}
      </div>
    </div>
    <div class="tut-card-footer">
      <span class="tut-source"><span aria-hidden="true">🔗</span> ${t.source}</span>
      <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="${linkClass}" id="open-tut-${t.id}">
        ${linkLabel}
      </a>
    </div>
  </article>`;
}



// ── UPDATE STATS TARGETS DYNAMICALLY ───────────────────────────────────────────
function updateStatsTargets() {
  const tutorialsEl = $('#stat-tutorials');
  const categoriesEl = $('#stat-categories');
  const sourcesEl = $('#stat-sources');
  const heroBadge = $('#hero-badge-count');

  const totalTutorials = TUTORIALS_DATA.length;
  const totalCategories = CATEGORIES.length;
  const totalSources = new Set(TUTORIALS_DATA.map(t => t.source)).size;

  if (tutorialsEl) {
    tutorialsEl.dataset.target = totalTutorials;
    tutorialsEl.dataset.suffix = '';
  }
  if (categoriesEl) {
    categoriesEl.dataset.target = totalCategories;
    categoriesEl.dataset.suffix = '';
  }
  if (sourcesEl) {
    sourcesEl.dataset.target = totalSources;
    sourcesEl.dataset.suffix = '';
  }
  if (heroBadge) {
    heroBadge.textContent = `${totalTutorials} Curated Resources`;
  }
}

// ── POPULATE SELECTS ───────────────────────────────────────────────────────────
function populateSelects() {
  const catFilter = $('#cat-filter');
  if (catFilter) {
    CATEGORIES.forEach(cat => {
      const opt = `<option value="${cat.id}">${cat.emoji} ${cat.name}</option>`;
      catFilter.insertAdjacentHTML('beforeend', opt);
    });
  }
}

// ── STATS COUNTER ANIMATION ────────────────────────────────────────────────────
function animateCounters() {
  $$('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '+';
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
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counterDone) {
    counterDone = true;
    animateCounters();
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });

const animationsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animationsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeAnimations() {
  $$('.animate-in:not(.visible)').forEach(el => animationsObserver.observe(el));
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

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollButtons();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateScrollButtons, { passive: true });
  
  // Run once initially to set correct state
  setTimeout(updateScrollButtons, 150);

  const btnTop = $('#back-to-top');
  const btnBottom = $('#scroll-to-bottom');
  if (btnTop) {
    btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  if (btnBottom) {
    btnBottom.addEventListener('click', () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    });
  }

  // ── Mobile menu
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    $$('.mobile-link, .mobile-cta').forEach(el => el.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  // ── Dark / Light mode
  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    const updateThemeLabel = () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    };
    
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-mode');
      const isLight = document.documentElement.classList.contains('light-mode');
      themeBtn.textContent = isLight ? '☀️' : '🌙';
      updateThemeLabel();
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    // restore
    if (document.documentElement.classList.contains('light-mode')) {
      themeBtn.textContent = '☀️';
    }
    updateThemeLabel();
  }

  // ── Search
  const searchInput = $('#search-input');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      const val = searchInput.value;
      if (!val.trim()) {
        hideSuggestions();
      } else {
        currentSuggestions = getSuggestions(val);
        highlightedIndex = -1;
        renderSuggestions(currentSuggestions);
      }

      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.search = searchInput.value;
        state.page = 1;
        renderTutorials();
      }, 280);
    });

    searchInput.addEventListener('focus', () => {
      const val = searchInput.value;
      if (val.trim()) {
        currentSuggestions = getSuggestions(val);
        highlightedIndex = -1;
        renderSuggestions(currentSuggestions);
      }
    });

    searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        hideSuggestions();
      }, 200);
    });

    const searchBtn = $('#search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        state.search = searchInput.value;
        state.page = 1;
        hideSuggestions();
        renderTutorials();
        const tutSec = document.getElementById('tutorials');
        if (tutSec) tutSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    searchInput.addEventListener('keydown', e => {
      const container = $('#search-suggestions');
      const isSuggestionsVisible = container && !container.classList.contains('hidden');

      if (isSuggestionsVisible && currentSuggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          highlightedIndex = (highlightedIndex + 1) % currentSuggestions.length;
          updateHighlight();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          highlightedIndex = highlightedIndex <= 0 ? currentSuggestions.length - 1 : highlightedIndex - 1;
          updateHighlight();
        } else if (e.key === 'Enter') {
          if (highlightedIndex >= 0 && highlightedIndex < currentSuggestions.length) {
            e.preventDefault();
            selectSuggestion(currentSuggestions[highlightedIndex].term);
          } else {
            state.search = searchInput.value;
            hideSuggestions();
            renderTutorials();
            const tutSec = document.getElementById('tutorials');
            if (tutSec) tutSec.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          hideSuggestions();
        }
      } else {
        if (e.key === 'Enter') {
          state.search = searchInput.value;
          renderTutorials();
          const tutSec = document.getElementById('tutorials');
          if (tutSec) tutSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // ── Click outside search suggestions
  document.addEventListener('click', e => {
    const container = $('#search-suggestions');
    const inputEl = $('#search-input');
    const searchWrapper = $('#search-wrapper');
    if (container && inputEl) {
      const clickedInside = inputEl.contains(e.target) || container.contains(e.target) || (searchWrapper && searchWrapper.contains(e.target));
      if (!clickedInside) {
        hideSuggestions();
      }
    }
  });

  // ── Clear search
  const clearSearchBtn = $('#clear-search');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      state.search = '';
      if (searchInput) searchInput.value = '';
      state.category = 'all';
      state.level = 'all';
      state.type = 'all';
      state.duration = 'all';
      state.page = 1;
      const catF = $('#cat-filter');
      if (catF) catF.value = 'all';
      const diffF = $('#diff-filter');
      if (diffF) diffF.value = 'all';
      const typeF = $('#type-filter');
      if (typeF) typeF.value = 'all';
      const durF = $('#duration-filter');
      if (durF) durF.value = 'all';
      renderCategories();
      renderTutorials();
    });
  }

  // ── Filters
  const catFilter = $('#cat-filter');
  if (catFilter) {
    catFilter.addEventListener('change', e => {
      state.category = e.target.value;
      state.page = 1;
      renderCategories();
      renderTutorials();
    });
  }
  const diffFilter = $('#diff-filter');
  if (diffFilter) {
    diffFilter.addEventListener('change', e => { state.level = e.target.value; state.page = 1; renderTutorials(); });
  }
  const typeFilter = $('#type-filter');
  if (typeFilter) {
    typeFilter.addEventListener('change', e => { state.type = e.target.value; state.page = 1; renderTutorials(); });
  }
  const durationFilter = $('#duration-filter');
  if (durationFilter) {
    durationFilter.addEventListener('change', e => {
      state.duration = e.target.value;
      state.page = 1;
      renderTutorials();
    });
  }
  const resetFiltersBtn = $('#reset-filters');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      state.category = 'all'; state.level = 'all'; state.type = 'all'; state.duration = 'all'; state.search = '';
      if (searchInput) searchInput.value = '';
      if (catFilter) catFilter.value = 'all';
      if (diffFilter) diffFilter.value = 'all';
      if (typeFilter) typeFilter.value = 'all';
      const durFilter = $('#duration-filter');
      if (durFilter) durFilter.value = 'all';
      state.page = 1;
      renderCategories();
      renderTutorials();
    });
  }

  // ── Sort
  $$('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.sort-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      state.sort = btn.dataset.sort;
      state.page = 1;
      renderTutorials();
    });
  });

  // ── Load more
  const loadMoreBtn = $('#load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.page++;
      renderTutorials(false);
    });
  }

}

// ── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  updateStatsTargets();
  populateSelects();
  renderCategories();
  renderFeatured();
  renderTutorials();
  bindEvents();
  observeAnimations();

  // Connect statsObserver once
  const stats = $('.hero-stats');
  if (stats) statsObserver.observe(stats);

  // Set initial aria-pressed on sort buttons
  $$('.sort-btn').forEach(btn => {
    const isActive = btn.classList.contains('active');
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Animate hero entrance staggered
  setTimeout(() => {
    $$('.hero-content > *').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
      el.classList.add('visible');
    });
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);
