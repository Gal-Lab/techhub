# DevNest (TechHub)

A modern, curated repository of high-quality technology learning resources, video courses, and interactive tutorials across Software Development, Cloud & IT, Cybersecurity, and Networking.

---

## 🚀 Quick Start (Local Development)

### Option 1: One-Click Launch (Windows)
Double-click `start-dev.bat` in this folder. It will start the local Python server and open your browser automatically.

### Option 2: Command Line
```powershell
python serve.py
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 📁 Project Structure

```
devnest/
├── index.html           # Main landing page, search bar, hero section, bento grid
├── app.js               # Application logic, TUTORIALS_DATA dataset, filtering & search
├── style.css            # Responsive modern styling, dark mode, animations
├── blog/                # Blog posts and articles
├── netlify.toml         # Production hosting & cache header configuration
├── serve.py             # Lightweight local development server
├── start-dev.bat        # Windows 1-click startup script
├── .gitignore           # Git ignore file for editor and OS temp files
└── .agents/             # Antigravity agent configuration and skill definitions
    ├── AGENTS.md        # Agent behavioral rules & safety constraints
    └── skills/          # Specialized agent skills (Curator, Blogger, QA, SEO, etc.)
```

---

## 📚 Adding or Updating Tutorials

All tutorials and courses are stored in the `TUTORIALS_DATA` array inside [`app.js`](app.js).

Example tutorial schema:
```javascript
{
  id: -115,
  category: 'software-dev', // 'software-dev' | 'devops' | 'security' | 'networking'
  badge: '🎥 FREE',        // '🎥 FREE' | '💳 PAID' | '🔑 FREE'
  title: 'Tutorial Title',
  description: 'A 2-3 sentence overview describing what students will learn.',
  url: 'https://...',
  source: 'Platform Name (e.g. YouTube, Coursera)',
  author: 'Instructor or Organization Name',
  level: 'Beginner',        // 'Beginner' | 'Intermediate' | 'Advanced'
  type: 'Video',            // 'Video' | 'Course' | 'Article'
  tags: ['tag1', 'tag2', 'tag3'],
  date: 'YYYY-MM-DD',
  views: 5000
}
```

> **Note**: Free trial promotions (such as O'Reilly Media `id: -17` and CBT Nuggets `id: -1`) have dedicated layout slots in the hero bento cards.

---

## 🤖 Antigravity Agent Skills

This repository includes preconfigured skills in `.agents/skills/`:
- **`content_curator`**: Formats, tags, and validates new learning resources.
- **`content_blogger`**: Writes and styles educational blog posts.
- **`qa_engineer`**: Tests link integrity, responsiveness, and dark mode.
- **`seo_auditor`**: Optimizes metadata, schema, OpenGraph tags, and sitemaps.
- **`monetization_expert`**: Manages affiliate link tracking parameters.
- **`design_architect`**: Guides UI/UX standards and theme consistency.

---

## 🌐 Git & Deployment

- **Remote repository**: `https://github.com/Gal-Lab/techhub.git`
- **Hosting**: Netlify
- To pull latest updates:
  ```powershell
  git pull origin main
  ```
- To commit and push changes:
  ```powershell
  git add .
  git commit -m "Your descriptive message"
  git push origin main
  ```
