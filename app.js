/* ===================================================
   DevNest – app.js
   Main application logic: data, rendering, filtering,
   search, dark mode, forms, animations.
=================================================== */

// ── MONETIZATION & AFFILIATE CONFIGURATION ──────────────────────────────────────
// Replace these placeholders with your actual affiliate IDs or referral tokens.
const MONETIZATION_CONFIG = {
  enabled: true,
  // Add your tracking parameters for each platform
  parameters: {
    coursera: { utm_source: 'devnest', utm_medium: 'affiliate' },
    udemy: { utm_source: 'devnest', utm_medium: 'affiliate' },
    oreilly: { utm_source: 'devnest', utm_medium: 'affiliate' },
    cbtnuggets: { utm_source: 'devnest' },
    amazon: { tag: 'devnest-20' }
  },
  // Custom redirect wrapper if using an ad-network or link-cloaker (optional)
  customWrapper: null
};

/**
 * Wraps a standard course URL with tracking/affiliate parameters if configured.
 * @param {string} urlStr - The destination URL
 * @returns {string} The updated affiliate URL
 */
function getAffiliateUrl(urlStr) {
  if (!MONETIZATION_CONFIG.enabled || !urlStr) return urlStr;
  try {
    const url = new URL(urlStr);
    const host = url.hostname.toLowerCase();
    
    // Check match for specific platforms and append parameters
    for (const [platform, params] of Object.entries(MONETIZATION_CONFIG.parameters)) {
      if (host.includes(platform)) {
        for (const [key, val] of Object.entries(params)) {
          if (val) url.searchParams.set(key, val);
        }
        break;
      }
    }
    
    if (typeof MONETIZATION_CONFIG.customWrapper === 'function') {
      return MONETIZATION_CONFIG.customWrapper(url.toString());
    }
    
    return url.toString();
  } catch (e) {
    return urlStr;
  }
}

const CATEGORIES = [
  { 
    id: 'software-dev', 
    name: 'Software Development', 
    emoji: '💻',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line><line x1="12" y1="16" x2="12" y2="20"></line><polyline points="9 8 7 10 9 12"></polyline><polyline points="15 8 17 10 15 12"></polyline></svg>`, 
    color: '#6366f1' 
  },
  { 
    id: 'devops',  
    name: 'Cloud and IT',    
    emoji: '☁️',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`, 
    color: '#f59e0b' 
  },
  { 
    id: 'security',
    name: 'Cybersecurity',     
    emoji: '🔒',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`, 
    color: '#ff4a4a' 
  },
  { 
    id: 'networking',  
    name: 'Networking',          
    emoji: '📡',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><rect x="9" y="2" width="6" height="6" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path><line x1="12" y1="8" x2="12" y2="12"></line></svg>`, 
    color: '#38bdf8' 
  },
];

// ── TUTORIALS DATA ───────────────────────────────────────────────────────────
const TUTORIALS_DATA = [
  {
    id: -17, category: 'networking', freeTrial: true, trialLabel: '10-Day Free Trial',
    title: "O'Reilly Learning – Books, Videos & Live Training",
    description: "Access 60,000+ tech books, expert-led video courses, and interactive coding labs with a free 10-day trial. Students will build hands-on skills in programming, cloud computing, networking, and security.",
    url: 'https://www.oreilly.com/start-trial/?type=individual',
    source: "O'Reilly Media", author: "O'Reilly Team",
    level: 'Beginner', type: 'Course',
    tags: ['books', 'video-courses', 'cloud', 'programming', 'networking', 'ai', 'cybersecurity'],
    date: '2026-06-20', views: 21000,
  },
  {
    id: 0, category: 'networking', featured: true, badge: '🎥 FREE',
    title: "Jeremy's IT Lab – Free CCNA & CCNP Courses",
    description: "Highly rated free Cisco CCNA and CCNP certification preparation courses on YouTube. Students will gain practical skills through hands-on Packet Tracer labs and regular review quizzes.",
    url: 'https://www.youtube.com/@JeremysITLab/playlists',
    source: "YouTube – Jeremy's IT Lab", author: 'Jeremy McDowall',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'cisco', 'networking', 'packet-tracer', 'certification'],
    date: '2026-06-20', views: 12000,
  },
  {
    id: -2, category: 'networking', badge: '💳 PAID',
    title: 'NetworkLessons – Cisco & Networking Courses',
    description: "Structured networking lessons explaining complex Cisco CCNA and CCNP topics in plain English. Students will master networking concepts through clear diagrams and configuration examples.",
    url: 'https://networklessons.com/courses',
    source: 'NetworkLessons', author: 'Rene Molenaar',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 7200,
  },
  {
    id: -1, category: 'networking', freeTrial: true, trialLabel: '7-Day Free Trial',
    title: 'CBT Nuggets – IT Certification Training',
    description: "Expert-led video training for IT certifications including Cisco, CompTIA, and AWS. Students will practice real-world scenarios using integrated virtual labs and practice exams.",
    url: 'https://www.cbtnuggets.com/free-week',
    source: 'CBT Nuggets', author: 'CBT Nuggets Team',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'comptia', 'cisco', 'aws', 'certification', 'it-training'],
    date: '2026-06-20', views: 9500,
  },
  {
    id: -37, category: 'networking', badge: '🎥 FREE',
    title: 'Keith Barker – Free CCNA & Networking Playlists',
    description: "Fun, interactive Cisco CCNA tutorials and exam review playlists hosted by an expert CCIE instructor. Students will master core networking concepts and test their knowledge with quizzes.",
    url: 'https://www.youtube.com/@KeithBarker/playlists',
    source: 'YouTube – Keith Barker', author: 'Keith Barker',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'cisco', 'networking', 'subnetting', 'video-courses'],
    date: '2026-06-24', views: 8900,
  },
  {
    id: -4, category: 'security', badge: '🏅 FREE + CERT',
    title: 'Fortinet Training Institute – Free Cybersecurity Courses',
    description: "Official self-paced network security and firewall training covering Fortinet products. Students will learn threat protection strategies and prepare for official certification exams.",
    url: 'https://www.fortinet.com/training/cybersecurity-professionals',
    source: 'Fortinet', author: 'Fortinet Training Team',
    level: 'Beginner', type: 'Course',
    tags: ['cybersecurity', 'firewalls', 'fortinet', 'network-security', 'certification'],
    date: '2026-06-20', views: 8900,
  },
  {
    id: -18, category: 'networking', badge: '🎥 FREE',
    title: 'Kevin Wallace – Free Cisco Courses on YouTube',
    description: "Clear, structured Cisco CCNA and CCNP certification video courses taught by a double-CCIE veteran on YouTube. Students will learn practical configuration steps and exam preparation techniques.",
    url: 'https://www.youtube.com/@kwallaceccie/playlists',
    source: 'YouTube – Kevin Wallace', author: 'Kevin Wallace',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification', 'ccie'],
    date: '2026-06-20', views: 5800,
  },
  {
    id: -19, category: 'networking', badge: '🎥 FREE',
    title: 'thinQtank Learning – Cisco & CISSP Certification Courses',
    description: "Free Cisco CCNA, CCNP, and CISSP certification training playlists on YouTube. Students will learn advanced networking and security principles while configuring custom EVE-NG labs.",
    url: 'https://www.youtube.com/@thinQtankS/playlists',
    source: 'YouTube – thinQtank Learning', author: 'thinQtank Learning',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cissp', 'networking', 'cisco', 'certification'],
    date: '2026-06-20', views: 4700,
  },
  {
    id: -21, category: 'networking', badge: '🏅 FREE + CERT',
    title: 'Cisco Networking Academy – Free IT & Networking Courses',
    description: "Official free courses from Cisco covering networking, cybersecurity, Linux, and Python. Students will gain hands-on practice and earn digital badges to showcase their skills.",
    url: 'https://www.netacad.com/catalogs/learn',
    source: 'Cisco NetAcad', author: 'Cisco Systems',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'networking', 'cybersecurity', 'python', 'linux', 'cisco', 'iot'],
    date: '2026-06-20', views: 19500,
  },
  {
    id: -22, category: 'networking', badge: '🎥 FREE',
    title: "Rob Riker's Tech Channel – Cisco CCNA, CCNP & CCIE Courses",
    description: "In-depth Cisco CCNA, CCNP, and CCIE training videos focused on practical network design. Students will learn step-by-step troubleshooting workflows and EVE-NG lab configurations.",
    url: 'https://www.youtube.com/@RobRikerTechChannel/playlists',
    source: 'YouTube – Rob Riker', author: 'Rob Riker',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'encor', 'enarsi', 'cisco', 'networking', 'eve-ng'],
    date: '2026-06-20', views: 5100,
  },
  {
    id: -25, category: 'networking', badge: '🎥 FREE',
    title: 'PowerCert Animated Videos – Visual IT & Networking Courses',
    description: "Visual, animation-based tutorials explaining hardware, computer networking, and cybersecurity concepts. Students will build a solid foundation for CompTIA A+ and Network+ exams.",
    url: 'https://www.youtube.com/@PowerCertAnimatedVideos/playlists',
    source: 'YouTube – PowerCert', author: 'PowerCert Team',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'comptia', 'security', 'cybersecurity', 'a-plus', 'network-plus'],
    date: '2026-06-20', views: 18400,
  },
  {
    id: -26, category: 'networking', badge: '🎥 FREE',
    title: 'CBT Nuggets – Free IT & Networking Tutorials on YouTube',
    description: "Bite-sized IT and networking tutorials covering CCNA, Network+, cybersecurity, and Linux basics. Students will quickly grasp challenging technical concepts through focused explanations.",
    url: 'https://www.youtube.com/@cbtnuggets/courses',
    source: 'YouTube – CBT Nuggets', author: 'CBT Nuggets Instructors',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'networking', 'comptia', 'security', 'cybersecurity', 'cloud', 'linux'],
    date: '2026-06-20', views: 12500,
  },
  {
    id: -6, category: 'devops', badge: '🎥 FREE',
    title: 'TechWorld with Nana – DevOps & Cloud Tutorials',
    description: "Hands-on DevOps tutorials on YouTube covering Docker, Kubernetes, CI/CD, and Terraform. Students will build actual deployment pipelines and manage cloud-native infrastructure.",
    url: 'https://www.youtube.com/@TechWorldwithNana/playlists',
    source: 'YouTube – TechWorld with Nana', author: 'Nana Janashia',
    level: 'Beginner', type: 'Video',
    tags: ['devops', 'kubernetes', 'docker', 'ci-cd', 'cloud', 'terraform'],
    date: '2026-06-20', views: 9800,
  },
  {
    id: -10, category: 'networking', badge: '🔑 FREE',
    title: 'NetworkAcademy.io – Free IT & Networking Courses',
    description: "Interactive visual guides and animated diagrams for CCNA prep and Python network automation. Students will learn how network protocols operate and write scripts to automate configurations.",
    url: 'https://www.networkacademy.io/courses',
    source: 'NetworkAcademy.io', author: 'NetworkAcademy Team',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccie', 'networking', 'automation', 'python'],
    date: '2026-06-20', views: 7600,
  },
  {
    id: -106, category: 'networking', badge: '🎥 FREE',
    title: 'Practical Networking – Free IT & Networking Courses',
    description: "Clear, highly-visual explanations of subnetting, routing, switching, and fundamental network protocols. Students will master network operations through step-by-step technical walk-throughs.",
    url: 'https://www.youtube.com/@PracticalNetworking/playlists',
    source: 'YouTube – Practical Networking', author: 'Ed Harmoush',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'subnetting', 'routing', 'switching', 'firewall'],
    date: '2026-06-22', views: 8500,
  },
  {
    id: -16, category: 'networking', badge: '💳 PAID',
    title: 'Boson – Cisco & CompTIA Certification Exam Prep',
    description: "Top-tier practice exams and network simulators for Cisco CCNA, CCNP, and CompTIA certifications. Students will test their exam readiness and build custom topologies in a virtual lab.",
    url: 'https://www.boson.com',
    source: 'Boson', author: 'Boson Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['ccna', 'ccnp', 'comptia', 'networking', 'practice-exams', 'certification'],
    date: '2026-06-20', views: 8300,
  },
  {
    id: -24, category: 'networking', badge: '🎥 FREE',
    title: 'INE – Free IT & Networking Playlists on YouTube',
    description: "Free training webinars and video playlists covering CCNA, CCNP, CCIE, and cloud security on YouTube. Students will build deep technical knowledge to prepare for vendor certifications.",
    url: 'https://www.youtube.com/@INEtraining/playlists',
    source: 'YouTube – INE', author: 'INE (Internetwork Expert)',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cybersecurity', 'cloud', 'networking', 'certification'],
    date: '2026-06-20', views: 6100,
  },
  {
    id: -14, category: 'software-dev', badge: '🎓 FREE',
    title: 'The Odin Project – Full-Stack Web Development',
    description: "Free, project-based full-stack developer curriculum utilizing real developer tools and workflows. Students will build portfolio-ready applications in JavaScript, Node.js, and databases.",
    url: 'https://www.theodinproject.com/',
    source: 'The Odin Project', author: 'Odin Project Contributors',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'node', 'git', 'full-stack', 'html-css', 'web-dev', 'open-source'],
    date: '2026-06-20', views: 22000,
  },
  {
    id: -15, category: 'devops', badge: '🎥 FREE',
    title: 'Simplilearn – Free IT & Cybersecurity Courses',
    description: "Free IT, cloud computing, and cybersecurity training courses on YouTube. Students will explore basic network security concepts, threat intelligence, and compliance frameworks.",
    url: 'https://www.youtube.com/@SimplilearnOfficial/courses',
    source: 'YouTube – Simplilearn', author: 'Simplilearn Team',
    level: 'Beginner', type: 'Video',
    tags: ['security', 'cybersecurity', 'cryptography', 'firewalls', 'threats', 'cloud', 'it-training'],
    date: '2026-06-20', views: 9200,
  },
  {
    id: -29, category: 'software-dev', badge: '🎓 FREE',
    title: "web.dev – Google's Official Web Dev Learn Paths",
    description: "Google's official guides and structured courses for modern web standards and best practices. Students will learn HTML, CSS, JavaScript, web accessibility, and performance optimization.",
    url: 'https://web.dev/learn',
    source: 'web.dev', author: 'Google Chrome Team',
    level: 'Beginner', type: 'Article',
    tags: ['html', 'css', 'javascript', 'accessibility', 'performance', 'pwa', 'web-standards', 'google'],
    date: '2026-06-21', views: 15000,
  },
  {
    id: -32, category: 'security', badge: '🔑 FREE',
    title: 'TryHackMe – Guided Hands-On Cybersecurity Learning',
    description: "Gamified, browser-based cybersecurity labs covering pentesting, security tools, and Linux. Students will build practical offensive and defensive skills without needing local virtual machines.",
    url: 'https://tryhackme.com/',
    source: 'TryHackMe', author: 'TryHackMe Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['cybersecurity', 'ethical-hacking', 'pentesting', 'linux', 'ctf', 'blue-team', 'guided-paths', 'browser-based'],
    date: '2026-06-21', views: 24000,
  },
  {
    id: -35, category: 'devops', badge: '🔑 FREE',
    title: 'AWS Skill Builder – Official Free AWS Training',
    description: "Official AWS training center offering free self-paced courses for Amazon Web Services. Students will study cloud architecture and prepare for certifications from Practitioner to Solutions Architect.",
    url: 'https://skillbuilder.aws/',
    source: 'AWS', author: 'AWS Training Team',
    level: 'Beginner', type: 'Course',
    tags: ['aws', 'cloud', 'amazon', 'ec2', 'lambda', 's3', 'solutions-architect', 'cloud-practitioner', 'certification'],
    date: '2026-06-21', views: 20000,
  },
  {
    id: -36, category: 'software-dev', badge: '🎓 FREE',
    title: 'SQLBolt – Interactive SQL Lessons',
    description: "Learn database querying quickly with interactive SQL lessons directly in your browser. Students will write queries in real time and master SELECT statements, JOINs, and aggregates.",
    url: 'https://sqlbolt.com/',
    source: 'SQLBolt', author: 'SQLBolt Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['sql', 'database', 'select', 'joins', 'aggregates', 'interactive'],
    date: '2026-06-21', views: 17000,
  },
  {
    id: 100, category: 'software-dev', badge: '🎥 FREE', title: 'freeCodeCamp – YouTube Playlists',
    description: "Access thousands of free, in-depth technical video courses and playlists covering coding, databases, and DevOps. Students will build skills at their own pace through structured technical guides.",
    url: 'https://www.youtube.com/@freecodecamp/playlists',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Video',
    tags: ['programming', 'networking', 'security', 'devops', 'video-courses'], date: '2026-06-24', views: 9800,
  },
  {
    id: -42, category: 'software-dev', badge: '🎓 FREE',
    title: 'Android Basics with Compose',
    description: "Official Google course for building modern Android apps with Kotlin and Jetpack Compose. Students will learn Kotlin programming fundamentals and design declarative user interfaces.",
    url: 'https://developer.android.com/courses/android-basics-compose',
    source: 'Android Developers', author: 'Google Developer Team',
    level: 'Beginner', type: 'Course',
    tags: ['android', 'jetpack-compose', 'kotlin', 'mobile-dev', 'google'],
    date: '2026-06-21', views: 24000,
  },
  {
    id: -11, category: 'software-dev', badge: '🎓 FREE',
    title: 'Harvard CS50x – Introduction to Computer Science',
    description: "Harvard's premier introduction to computer science, covering C, Python, SQL, and algorithms. Students will build problem-solving skills and complete challenging programming projects.",
    url: 'https://cs50.harvard.edu/x/',
    source: 'Harvard University', author: 'David J. Malan',
    level: 'Beginner', type: 'Course',
    tags: ['c', 'python', 'sql', 'html-css', 'javascript', 'algorithms', 'cs-fundamentals'],
    date: '2026-06-25', views: 32000,
  },
  {
    id: -107, category: 'software-dev', badge: '🛠️ FREE TOOL',
    title: 'roadmap.sh – Developer Roadmaps & Learning Paths',
    description: "Interactive learning paths, career roadmaps, and visual guides for modern technology roles. Students will discover recommended technologies and plan their study roadmaps.",
    url: 'https://roadmap.sh',
    source: 'roadmap.sh', author: 'roadmap.sh Team',
    level: 'Beginner', type: 'Tool',
    tags: ['roadmaps', 'developer-path', 'frontend', 'backend', 'devops', 'guides', 'career', 'computer-science'],
    date: '2026-06-26', views: 28000,
  },
  {
    id: -108, category: 'devops', badge: '🎥 FREE',
    title: 'IBM Technology – Free IT & Cloud Architecture Playlists',
    description: "Visually engaging whiteboard videos explaining cloud computing, containers, and IT infrastructure. Students will learn core architectural concepts and modern system designs from IBM engineers.",
    url: 'https://www.youtube.com/@IBMTechnology/playlists',
    source: 'YouTube – IBM Technology', author: 'IBM Technology Team',
    level: 'Beginner', type: 'Video',
    tags: ['cloud', 'devops', 'kubernetes', 'architecture', 'containers', 'it-fundamentals'],
    date: '2026-06-26', views: 24000,
  },
  {
    id: -109, category: 'devops', badge: '🎥 FREE',
    title: "John Savill's Technical Training – Free Azure & DevOps Courses",
    description: "Deep-dive video lessons and comprehensive certification prep for Microsoft Azure and cloud architecture on YouTube. Students will prepare for official Azure exams with structured design walkthroughs.",
    url: 'https://www.youtube.com/@NTFAQGuy/playlists',
    source: "YouTube – John Savill's Technical Training", author: 'John Savill',
    level: 'Beginner', type: 'Video',
    tags: ['azure', 'cloud', 'devops', 'infrastructure', 'certification', 'microsoft'],
    date: '2026-06-26', views: 26000,
  },
  {
    id: -111, category: 'software-dev', badge: '🏅 FREE + CERT',
    title: 'freeCodeCamp – Interactive Web & Programming Curriculum',
    description: "Interactive web development and coding curriculum offering free certifications. Students will build responsive web designs, master JavaScript algorithms, and learn frontend frameworks.",
    url: 'https://www.freecodecamp.org/learn',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'python', 'html-css', 'data-science', 'machine-learning', 'full-stack', 'certification', 'responsive-design', 'web-dev'],
    date: '2026-06-26', views: 35000,
  },
  {
    id: -110, category: 'networking', badge: '🎥 FREE',
    title: 'Telecom Tech Explained – Mobile Network & 5G Architecture Playlists',
    description: "Specialized video tutorials on 4G/5G mobile network architecture and cellular protocols on YouTube. Students will learn how cellular signals are routed and managed across wireless infrastructures.",
    url: 'https://www.youtube.com/@telecomTech.explained/playlists',
    source: 'YouTube – Telecom Tech Explained', author: 'Telecom Tech Explained Team',
    level: 'Intermediate', type: 'Video',
    tags: ['networking', '5g', 'lte', 'telecommunications', 'cellular', 'architecture'],
    date: '2026-06-26', views: 18000,
  },
  {
    id: -43, category: 'devops', freeTrial: true, trialLabel: '7-Day Free Trial',
    title: 'Coursera – Popular Courses & Professional Certificates',
    description: "Access thousands of online online courses, professional certificates, and degrees from leading universities and companies. Students will learn flexible, in-demand skills in software development, cloud computing, and cybersecurity at their own pace.",
    url: 'https://www.coursera.org/explore/most-popular-courses',
    source: 'Coursera', author: 'University & Industry Partners',
    level: 'Beginner', type: 'Course',
    tags: ['courses', 'certifications', 'google-certificates', 'degree-paths', 'data-science', 'programming'],
    date: '2026-06-27', views: 12500,
  },
];
// ── APP STATE ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 9;
let state = {
  search: '',
  category: 'all',
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

// ── SEO & URL SYNCHRONIZATION HELPERS ──────────────────────────────────────────
function updateMetaFromState() {
  if (window.location.pathname.includes('/blog/')) return;
  let title = 'DevNest – Curated Tech Resources';
  let desc = 'DevNest is your curated directory of the best tech resources across web dev, AI/ML, DevOps, mobile, and more. Discover, filter, and browse top-quality learning resources from across the web.';

  if (state.category && state.category !== 'all') {
    const catObj = getCategoryById(state.category);
    if (catObj) {
      title = `DevNest – Curated ${catObj.name} Resources`;
      desc = `Browse the best hand-picked ${catObj.name} resources on DevNest. Discover top-quality tutorial resources and learn ${catObj.name} today.`;
    }
  } else if (state.search && state.search.trim() !== '') {
    title = `DevNest – Search results for "${state.search.trim()}"`;
    desc = `Search results for "${state.search.trim()}" on DevNest. Find the best resources matching your query.`;
  }

  document.title = title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', desc);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', desc);
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', title);
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', desc);

  // Dynamically update canonical link and og:url based on current state
  const currentUrl = window.location.href;
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) canonicalLink.setAttribute('href', currentUrl);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', currentUrl);
}

function syncUrlFromState() {
  if (window.location.pathname.includes('/blog/')) return;
  const url = new URL(window.location.href);
  const params = new URLSearchParams();

  if (state.category && state.category !== 'all') {
    params.set('category', state.category);
  }
  if (state.search && state.search.trim() !== '') {
    params.set('search', state.search.trim());
  }

  const newQuery = params.toString();
  const newRelativePathQuery = window.location.pathname + (newQuery ? '?' + newQuery : '');

  if (window.location.search !== (newQuery ? '?' + newQuery : '')) {
    history.replaceState(null, '', newRelativePathQuery);
  }

  updateMetaFromState();
}

function loadStateFromUrl() {
  const params = new URLSearchParams(window.location.search);

  if (params.has('category')) {
    state.category = params.get('category');
  }
  if (params.has('search')) {
    const searchVal = params.get('search');
    state.search = searchVal;
    const searchInput = $('#search-input');
    if (searchInput) searchInput.value = searchVal;
  }

  updateCatFilter();
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
          html: `<span>${cat.name}</span>`
        });
      }
    }
  });

  // 2. Tags
  const allTags = new Set();
  TUTORIALS_DATA.forEach(t => t.tags.forEach(tag => allTags.add(tag)));
  Array.from(allTags).forEach(tag => {
    if (tag.toLowerCase().includes(qClean)) {
      const term = tag;
      if (!seenTerms.has(term)) {
        seenTerms.add(term);
        suggestions.push({
          type: 'tag',
          term: term,
          html: `<span>${tag}</span>`
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
          html: `<span>${t.title}</span>`
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
    if (t.id === -17 || t.id === -1) return false;
    const matchSearch = !q || [t.title, t.description, t.source, t.author].some(s => s.toLowerCase().includes(q)) || t.tags.some(tag => tag.toLowerCase().includes(qClean));
    const matchCat = state.category === 'all' || t.category === state.category;
    return matchSearch && matchCat;
  });

  list.sort((a, b) => new Date(b.date) - new Date(a.date));
  return list;
}

// ── RENDER: CATEGORIES ─────────────────────────────────────────────────────────
function renderCategories() {
  const grid = $('#category-grid');
  if (!grid) return;
  const counts = {};
  TUTORIALS_DATA.forEach(t => {
    if (t.id !== -17 && t.id !== -1) {
      counts[t.category] = (counts[t.category] || 0) + 1;
    }
  });

  const sortedCategories = [...CATEGORIES].sort((a, b) => {
    const countA = counts[a.id] || 0;
    const countB = counts[b.id] || 0;
    if (countB !== countA) return countB - countA;
    return a.name.localeCompare(b.name);
  });

  grid.innerHTML = sortedCategories.map(cat => `
    <a href="?category=${state.category === cat.id ? 'all' : cat.id}"
       class="cat-card animate-in ${state.category === cat.id ? 'active' : ''}"
       data-catid="${cat.id}"
       role="button" tabindex="0"
       aria-label="Filter by ${cat.name}"
       aria-pressed="${state.category === cat.id ? 'true' : 'false'}"
       style="--cat-color: ${cat.color}">
      <span class="cat-emoji" aria-hidden="true">${cat.icon}</span>
      <span class="cat-name">${cat.name}</span>
      <span class="cat-count">${counts[cat.id] || 0} resources</span>
    </a>
  `).join('');

  grid.querySelectorAll('.cat-card').forEach(card => {
    const handler = (e) => {
      if (e) e.preventDefault();
      const id = card.dataset.catid;
      const isSelecting = (state.category !== id);
      state.category = isSelecting ? id : 'all';
      state.page = 1;
      updateCatFilter();
      renderCategories();
      renderTutorials();
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(e); });
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

  // Card 1: Featured Card (span 3)
  const featuredHtml = `
    <div class="bento-card featured animate-in" style="--i:0">
      <div class="bento-featured-content" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span class="featured-badge" style="position: static; margin-bottom: 1rem; display: inline-block; padding: 0.3rem 0.7rem; border-radius: 100px; font-size: 0.72rem; font-weight: 700; background: var(--gradient); color: #fff; letter-spacing: 0.05em;"><span aria-hidden="true">⭐</span> Featured</span>
          <div class="featured-category" style="font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary-light); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;"><span class="featured-category-icon">${cat?.icon || ''}</span> ${cat?.name || featured.category}</div>
          <h3 class="featured-title" style="font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem; line-height: 1.3;">${featured.title}</h3>
          <p class="featured-desc" style="font-size: 0.92rem; color: var(--text2); line-height: 1.65; margin-bottom: 1.5rem;">${featured.description}</p>
        </div>
        <div class="featured-footer" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <span class="featured-author" style="font-size: 0.82rem; color: var(--text3);">by ${featured.author} · ${featured.source}</span>
          <a href="${getAffiliateUrl(featured.url)}" target="_blank" rel="noopener noreferrer" class="btn-featured">
            Start Learning <span>→</span>
          </a>
        </div>
      </div>
    </div>
  `;

  // Fetch trials
  const oreilly = TUTORIALS_DATA.find(t => t.id === -17);
  const cbt = TUTORIALS_DATA.find(t => t.id === -1);

  let trialsHtml = '';
  if (oreilly) {
    trialsHtml += `
      <div class="bento-card trial trial-o-reilly animate-in" style="--i:1">
        <div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.6rem; flex-wrap: wrap;">
            <span class="trial-badge" style="margin-bottom: 0;">${cleanText(oreilly.trialLabel)}</span>
            <span style="font-size: 0.72rem; font-weight: 700; background: rgba(255,255,255,0.06); color: var(--text2); padding: 0.28rem 0.75rem; border-radius: 100px; border: 1px solid var(--border); letter-spacing: 0.04em;">No Credit Card Required</span>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text); margin-bottom: 0.5rem; line-height: 1.3;">${oreilly.title}</h3>
          <p style="font-size: 0.88rem; color: var(--text2); line-height: 1.5; margin-bottom: 1.5rem;">${oreilly.description}</p>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <span style="font-size: 0.8rem; color: var(--text3);">by ${oreilly.author}</span>
          <a href="${getAffiliateUrl(oreilly.url)}" target="_blank" rel="noopener noreferrer" class="btn-featured" style="background: linear-gradient(135deg, #ffaa00, #ff6b00); color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            Start Trial <span>→</span>
          </a>
        </div>
      </div>
    `;
  }

  if (cbt) {
    trialsHtml += `
      <div class="bento-card trial trial-cbt-nuggets animate-in" style="--i:2">
        <div>
          <span class="trial-badge">${cleanText(cbt.trialLabel)}</span>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text); margin-bottom: 0.5rem; line-height: 1.3;">${cbt.title}</h3>
          <p style="font-size: 0.88rem; color: var(--text2); line-height: 1.5; margin-bottom: 1.5rem;">${cbt.description}</p>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <span style="font-size: 0.8rem; color: var(--text3);">by ${cbt.author}</span>
          <a href="${getAffiliateUrl(cbt.url)}" target="_blank" rel="noopener noreferrer" class="btn-featured" style="background: linear-gradient(135deg, #ffaa00, #ff6b00); color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            Start Trial <span>→</span>
          </a>
        </div>
      </div>
    `;
  }

  grid.innerHTML = featuredHtml + trialsHtml;

  observeAnimations();
}

// ── RENDER: TUTORIALS GRID ─────────────────────────────────────────────────────
function renderTutorials(reset = true) {
  if (reset) state.page = 1;
  const filtered = applyFilters();
  syncUrlFromState();
  const slice = filtered.slice(0, state.page * PAGE_SIZE);
  const grid = $('#tutorials-grid');
  const countEl = $('#results-count');
  const noResults = $('#no-results');
  const loadMore = $('#load-more-wrapper');

  if (countEl) {
    countEl.textContent = `Showing ${Math.min(slice.length, filtered.length)} of ${filtered.length} resource${filtered.length !== 1 ? 's' : ''}`;
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

function cleanText(str) {
  if (!str) return '';
  return str.replace(/[^\x00-\x7F]/g, "").trim();
}

function renderTutorialCard(t) {
  const cat = getCategoryById(t.category);
  const trialBadge = t.freeTrial
    ? `<span class="trial-badge">${cleanText(t.trialLabel || 'Free Trial')}</span>`
    : (t.freeAccount
      ? `<span class="free-account-badge">Free Account Available</span>`
      : (t.badge
        ? `<span class="free-account-badge">${cleanText(t.badge)}</span>`
        : ''));
  const linkLabel = t.freeTrial ? `Start Free Trial <span>→</span>` : `Open <span>↗</span>`;
  const linkClass = t.freeTrial ? 'tut-link tut-link-trial' : 'tut-link';
  return `
  <article class="tut-card animate-in ${t.freeTrial ? 'tut-card-trial' : ''}" id="tut-${t.id}" style="--cat-color: ${cat?.color || '#7c5cff'}">
    <div class="tut-card-accent"></div>
    <div class="tut-card-body">
      <div class="tut-card-top">
        <span class="tut-cat-badge chip">
          <span class="tut-card-cat-icon" aria-hidden="true">${cat?.icon || ''}</span> ${cat?.name || t.category}
        </span>
      </div>
      ${trialBadge}
      <h3 class="tut-title">${t.title}</h3>
      <p class="tut-desc">${t.description}</p>
    </div>
    <div class="tut-card-footer">
      <span class="tut-source"><span aria-hidden="true">🔗</span> ${t.source}</span>
      <a href="${getAffiliateUrl(t.url)}" target="_blank" rel="noopener noreferrer" class="${linkClass}" id="open-tut-${t.id}">
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

  const totalTutorials = TUTORIALS_DATA.filter(t => t.id !== -17 && t.id !== -1).length;
  const totalCategories = CATEGORIES.length;
  const totalSources = new Set(TUTORIALS_DATA.filter(t => t.id !== -17 && t.id !== -1).map(t => t.source)).size;

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
      state.page = 1;
      const catF = $('#cat-filter');
      if (catF) catF.value = 'all';
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
  const resetFiltersBtn = $('#reset-filters');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      state.category = 'all'; state.search = '';
      if (searchInput) searchInput.value = '';
      if (catFilter) catFilter.value = 'all';
      state.page = 1;
      renderCategories();
      renderTutorials();
    });
  }

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
  loadStateFromUrl();
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

  // Animate hero entrance staggered
  setTimeout(() => {
    $$('.hero-content > *').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
      el.classList.add('visible');
    });
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);
