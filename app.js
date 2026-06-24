/* ===================================================
   TechHub – app.js
   Main application logic: data, rendering, filtering,
   search, dark mode, forms, animations.
=================================================== */

const CATEGORIES = [
  { id: 'software-dev', name: 'Software Development', emoji: '💻', color: '#7c5cff' },
  { id: 'devops',  name: 'Cloud and IT',    emoji: '☁️', color: '#00e5a0' },
  { id: 'security',name: 'Cybersecurity',     emoji: '🔒', color: '#ff4a4a' },
  { id: 'networking',  name: 'Networking',          emoji: '📡', color: '#38bdf8' },
];

// ── TUTORIALS DATA ───────────────────────────────────────────────────────────
const TUTORIALS_DATA = [
  {
    id: -17, category: 'networking', freeTrial: true, trialLabel: '10-Day Free Trial',
    title: "O'Reilly Learning – Books, Videos & Live Training",
    description: "Access 60,000+ tech books, video courses, live training, and interactive labs with a free 10-day trial.",
    url: 'https://www.oreilly.com/start-trial/?type=individual',
    source: "O'Reilly Media", author: "O'Reilly Team",
    level: 'Beginner', type: 'Course',
    tags: ['books', 'video-courses', 'cloud', 'programming', 'networking', 'ai', 'cybersecurity'],
    date: '2026-06-20', views: 21000,
  },
  {
    id: 0, category: 'networking', featured: true, badge: '▶️ FREE',
    title: "Jeremy's IT Lab – Free CCNA & CCNP Courses",
    description:
      "Free, highly recommended Cisco certification courses on YouTube, featuring CCNA and CCNP video lessons, Packet Tracer labs, and quizzes.",
    url: 'https://www.youtube.com/@JeremysITLab/playlists',
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
    description: "Offers in-depth, structured courses for CCNA, CCNP, and other Cisco certifications by Rene Molenaar. Access 300+ lessons for free.",
    url: 'https://networklessons.com/courses',
    source: 'NetworkLessons', author: 'Rene Molenaar',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification'],
    date: '2026-06-20', views: 7200,
  },
  {
    id: -1, category: 'networking', freeTrial: true, trialLabel: '7-Day Free Trial',
    title: 'CBT Nuggets – IT Certification Training',
    description: "Expert-led video training for IT certifications like Cisco, CompTIA, and AWS. Includes virtual labs, practice exams, and a free 7-day trial.",
    url: 'https://www.cbtnuggets.com/free-week',
    source: 'CBT Nuggets', author: 'CBT Nuggets Team',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'comptia', 'cisco', 'aws', 'certification', 'it-training'],
    date: '2026-06-20', views: 9500,
  },
  {
    id: -4, category: 'security', badge: '🎓 FREE',
    title: 'Fortinet Training Institute – Free Cybersecurity Courses',
    description: "Free, self-paced courses for Fortinet certifications (FCA, FCP). Learn network security, firewalls, and threat detection from the global leader.",
    url: 'https://www.fortinet.com/training/cybersecurity-professionals',
    source: 'Fortinet', author: 'Fortinet Training Team',
    level: 'Beginner', type: 'Course',
    tags: ['cybersecurity', 'firewalls', 'fortinet', 'network-security', 'certification'],
    date: '2026-06-20', views: 8900,
  },
  {
    id: -18, category: 'networking', badge: '▶️ FREE',
    title: 'Kevin Wallace – Free Cisco Courses on YouTube',
    description: "Dual CCIE Kevin Wallace shares free Cisco CCNA and CCNP certification courses directly on YouTube with clear, structured lessons.",
    url: 'https://www.youtube.com/@kwallaceccie/playlists',
    source: 'YouTube – Kevin Wallace', author: 'Kevin Wallace',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'ccnp', 'cisco', 'networking', 'certification', 'ccie'],
    date: '2026-06-20', views: 5800,
  },
  {
    id: -19, category: 'networking', badge: '▶️ FREE',
    title: 'thinQtank Learning – Cisco & CISSP Certification Courses',
    description: "Cisco and CISSP certification training covering CCNA, CCNP, CCIE, and CISSP. Features structured lessons and GNS3/EVE-NG lab guides.",
    url: 'https://www.youtube.com/@thinQtankS/playlists',
    source: 'YouTube – thinQtank Learning', author: 'thinQtank Learning',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cissp', 'networking', 'cisco', 'certification'],
    date: '2026-06-20', views: 4700,
  },
  {
    id: -21, category: 'networking', badge: '🎓 FREE',
    title: 'Cisco Networking Academy – Free IT & Networking Courses',
    description: "Cisco's official platform for free self-paced courses. Learn networking, cybersecurity, Python, Linux, and IoT with free digital badges.",
    url: 'https://www.netacad.com/catalogs/learn',
    source: 'Cisco NetAcad', author: 'Cisco Systems',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'networking', 'cybersecurity', 'python', 'linux', 'cisco', 'iot'],
    date: '2026-06-20', views: 19500,
  },
  {
    id: -22, category: 'networking', badge: '▶️ FREE',
    title: "Rob Riker's Tech Channel – Cisco CCNA, CCNP & CCIE Courses",
    description: "In-depth Cisco networking training covering CCNA, CCNP, and CCIE with free video lessons, practical EVE-NG labs, and workbook solutions.",
    url: 'https://www.youtube.com/@RobRikerTechChannel/playlists',
    source: 'YouTube – Rob Riker', author: 'Rob Riker',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'encor', 'enarsi', 'cisco', 'networking', 'eve-ng'],
    date: '2026-06-20', views: 5100,
  },
  {
    id: -25, category: 'networking', badge: '▶️ FREE',
    title: 'PowerCert Animated Videos – Visual IT & Networking Courses',
    description: "Animation-based training channel specializing in networking, security, and hardware. Ideal for CompTIA A+, Network+, and Security+ prep.",
    url: 'https://www.youtube.com/@PowerCertAnimatedVideos/playlists',
    source: 'YouTube – PowerCert', author: 'PowerCert Team',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'comptia', 'security', 'cybersecurity', 'a-plus', 'network-plus'],
    date: '2026-06-20', views: 18400,
  },
  {
    id: -26, category: 'networking', badge: '▶️ FREE',
    title: 'CBT Nuggets – Free IT & Networking Tutorials on YouTube',
    description: "Free introductory IT and networking courses on CCNA, Network+, cybersecurity, Linux, and virtualization, featuring focused MicroNuggets.",
    url: 'https://www.youtube.com/@cbtnuggets/courses',
    source: 'YouTube – CBT Nuggets', author: 'CBT Nuggets Instructors',
    level: 'Beginner', type: 'Video',
    tags: ['ccna', 'networking', 'comptia', 'security', 'cybersecurity', 'cloud', 'linux'],
    date: '2026-06-20', views: 12500,
  },
  {
    id: -6, category: 'devops', badge: '▶️ FREE',
    title: 'TechWorld with Nana – DevOps & Cloud Tutorials',
    description: "Free DevOps and cloud computing tutorials on YouTube, featuring hands-on guides for Docker, Kubernetes, CI/CD, and Terraform.",
    url: 'https://www.youtube.com/@TechWorldwithNana/playlists',
    source: 'YouTube – TechWorld with Nana', author: 'Nana Janashia',
    level: 'Beginner', type: 'Video',
    tags: ['devops', 'kubernetes', 'docker', 'ci-cd', 'cloud', 'terraform'],
    date: '2026-06-20', views: 9800,
  },
  {
    id: -10, category: 'networking', badge: '🎓 FREE',
    title: 'NetworkAcademy.io – Free IT & Networking Courses',
    description: "High-quality visual guides, animated diagrams, and courses for Cisco CCNA and Python network automation.",
    url: 'https://www.networkacademy.io/courses',
    source: 'NetworkAcademy.io', author: 'NetworkAcademy Team',
    level: 'Beginner', type: 'Course',
    tags: ['ccna', 'ccie', 'networking', 'automation', 'python'],
    date: '2026-06-20', views: 7600,
  },
  {
    id: -106, category: 'networking', badge: '▶️ FREE',
    title: 'Practical Networking – Free IT & Networking Courses',
    description: "Free, high-quality computer networking tutorials on YouTube covering subnetting, routing, switching, and firewall concepts.",
    url: 'https://www.youtube.com/@PracticalNetworking/playlists',
    source: 'YouTube – Practical Networking', author: 'Ed Harmoush',
    level: 'Beginner', type: 'Video',
    tags: ['networking', 'subnetting', 'routing', 'switching', 'firewall'],
    date: '2026-06-22', views: 8500,
  },
  {
    id: -16, category: 'networking', badge: '💳 PAID',
    title: 'Boson – Cisco & CompTIA Certification Exam Prep',
    description: "Industry-leading CCNA, CCNP, and CompTIA practice exams and network simulators with detailed explanations and realistic scenarios.",
    url: 'https://www.boson.com',
    source: 'Boson', author: 'Boson Team',
    level: 'Intermediate', type: 'Interactive',
    tags: ['ccna', 'ccnp', 'comptia', 'networking', 'practice-exams', 'certification'],
    date: '2026-06-20', views: 8300,
  },
  {
    id: -24, category: 'networking', badge: '▶️ FREE',
    title: 'INE – Free IT & Networking Playlists on YouTube',
    description: "Free training playlists by INE covering CCNA, CCIE, cloud computing, cybersecurity, and webinar archives for certification prep.",
    url: 'https://www.youtube.com/@INEtraining/playlists',
    source: 'YouTube – INE', author: 'INE (Internetwork Expert)',
    level: 'Intermediate', type: 'Video',
    tags: ['ccna', 'ccnp', 'ccie', 'cybersecurity', 'cloud', 'networking', 'certification'],
    date: '2026-06-20', views: 6100,
  },

  {
    id: -14, category: 'software-dev', badge: '🎓 FREE',
    title: 'The Odin Project – Full-Stack Web Development',
    description: "Free, project-based full-stack curriculum covering Git, HTML/CSS, JavaScript, Node.js, and databases with portfolio-ready projects.",
    url: 'https://www.theodinproject.com/',
    source: 'The Odin Project', author: 'Odin Project Contributors',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'node', 'git', 'full-stack', 'html-css'],
    date: '2026-06-20', views: 22000,
  },
  {
    id: -15, category: 'devops', badge: '▶️ FREE',
    title: 'Simplilearn – Free IT & Cybersecurity Courses',
    description: "Free IT, cloud computing, and cybersecurity courses on YouTube, covering fundamentals, risk management, and professional certifications.",
    url: 'https://www.youtube.com/@SimplilearnOfficial/courses',
    source: 'YouTube – Simplilearn', author: 'Simplilearn Team',
    level: 'Beginner', type: 'Video',
    tags: ['security', 'cybersecurity', 'cryptography', 'firewalls', 'threats'],
    date: '2026-06-20', views: 9200,
  },

  {
    id: -28, category: 'software-dev', badge: '🎓 FREE',
    title: 'Scrimba – Learn JavaScript & React Interactively',
    description: "Pause any video tutorial and edit the instructor's code in real time inside the browser. High-quality interactive frontend learning.",
    url: 'https://scrimba.com/learn/javascript',
    source: 'Scrimba', author: 'Bob Ziroll',
    level: 'Beginner', type: 'Interactive',
    tags: ['javascript', 'react', 'html-css', 'interactive', 'frontend', 'hands-on', 'free-courses'],
    date: '2026-06-21', views: 18000,
  },
  {
    id: -29, category: 'software-dev', badge: '🎓 FREE',
    title: "web.dev – Google's Official Web Dev Learn Paths",
    description: "Google's official hub for web development. Free structured courses on modern HTML, CSS, JS, accessibility, performance, and PWAs.",
    url: 'https://web.dev/learn',
    source: 'web.dev', author: 'Google Chrome Team',
    level: 'Beginner', type: 'Article',
    tags: ['html', 'css', 'javascript', 'accessibility', 'performance', 'pwa', 'web-standards', 'google'],
    date: '2026-06-21', views: 15000,
  },
  {
    id: -32, category: 'security', badge: '🔑 FREE',
    title: 'TryHackMe – Guided Hands-On Cybersecurity Learning',
    description: "Hands-on cybersecurity platform. Guided browser rooms cover Linux, networking, web hacking, CTF, and Blue Team skills without setup.",
    url: 'https://tryhackme.com/',
    source: 'TryHackMe', author: 'TryHackMe Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['cybersecurity', 'ethical-hacking', 'pentesting', 'linux', 'ctf', 'blue-team', 'guided-paths', 'browser-based'],
    date: '2026-06-21', views: 24000,
  },

  {
    id: -35, category: 'devops', badge: '🔑 FREE',
    title: 'AWS Skill Builder – Official Free AWS Training',
    description: "Official AWS training hub with 600+ free courses. Study cloud roles and certifications from Cloud Practitioner to Solutions Architect.",
    url: 'https://skillbuilder.aws/',
    source: 'AWS', author: 'AWS Training Team',
    level: 'Beginner', type: 'Course',
    tags: ['aws', 'cloud', 'amazon', 'ec2', 'lambda', 's3', 'solutions-architect', 'cloud-practitioner', 'certification'],
    date: '2026-06-21', views: 20000,
  },
  {
    id: -36, category: 'software-dev', badge: '🎓 FREE',
    title: 'SQLBolt – Interactive SQL Lessons',
    description: "Interactive SQL lessons in the browser with immediate feedback. Covers SELECT queries, JOINs, and aggregates with no signup needed.",
    url: 'https://sqlbolt.com/',
    source: 'SQLBolt', author: 'SQLBolt Team',
    level: 'Beginner', type: 'Interactive',
    tags: ['sql', 'database', 'select', 'joins', 'aggregates', 'beginner', 'no-signup', 'interactive'],
    date: '2026-06-21', views: 17000,
  },







  {
    id: 100, category: 'software-dev', badge: '🎓 FREE', title: 'freeCodeCamp – YouTube Playlists',
    description: 'Access thousands of free, comprehensive video courses and playlists covering software development, DevOps, cybersecurity, networking, and databases.',
    url: 'https://www.youtube.com/@freecodecamp/playlists',
    source: 'freeCodeCamp', author: 'freeCodeCamp Team',
    level: 'Beginner', type: 'Course',
    tags: ['programming', 'networking', 'security', 'devops', 'video-courses'], date: '2026-06-24', views: 9800,
  },

  {
    id: -37, category: 'software-dev', badge: '🎓 FREE',
    title: 'MySQL for Developers',
    description: 'Free course on MySQL design, indexing strategies, query tuning, and database scaling to build highly performant applications.',
    url: 'https://planetscale.com/courses/mysql-for-developers',
    source: 'PlanetScale', author: 'Aaron Francis',
    level: 'Intermediate', type: 'Course',
    tags: ['mysql', 'database-design', 'indexing', 'performance', 'sql'],
    date: '2026-06-21', views: 15000,
  },
  {
    id: -41, category: 'software-dev', badge: '🎓 FREE',
    title: 'Learn Git Branching',
    description: 'Interactive, visual simulation game for learning Git branching, merging, rebasing, and remote operations with immediate feedback.',
    url: 'https://learngitbranching.js.org/',
    source: 'Learn Git Branching', author: 'Peter Cottle',
    level: 'Beginner', type: 'Interactive',
    tags: ['git', 'version-control', 'git-branching', 'git-rebase', 'interactive-game'],
    date: '2026-06-21', views: 16000,
  },
  {
    id: -42, category: 'software-dev', badge: '🎓 FREE',
    title: 'Android Basics with Compose',
    description: 'Official Jetpack Compose course. Learn Kotlin fundamentals, state management, and build native Android apps with declarative UIs.',
    url: 'https://developer.android.com/courses/android-basics-compose/course',
    source: 'Android Developers', author: 'Google Developer Team',
    level: 'Beginner', type: 'Course',
    tags: ['android', 'jetpack-compose', 'kotlin', 'mobile-dev', 'google'],
    date: '2026-06-21', views: 24000,
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
  grid.innerHTML = featuredHtml;

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
  <article class="tut-card animate-in ${t.freeTrial ? 'tut-card-trial' : ''}" id="tut-${t.id}" style="--cat-color: ${cat?.color || '#7c5cff'}">
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
