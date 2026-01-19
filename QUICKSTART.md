# Quick Start Guide

## What You Have

✅ **Landing page** - Simple homepage for your research team
✅ **People page** - Team member directory  
✅ **Admin panel** - Visual interface to add/edit team members (at `/keystatic`)
✅ **No database** - All content stored as Markdown files in Git
✅ **TypeScript + Astro** - Modern, fast, maintainable

---

## 🚀 Try It Now (5 minutes)

### 1. Start the Development Server

```bash
cd university-cms
npm run dev
```

Visit: **http://localhost:4321**

### 2. Use the Admin Panel

1. Go to: **http://localhost:4321/keystatic**
2. Click **"People"** in sidebar
3. Click **"Create entry"**
4. Fill in:
   - Name
   - Role (e.g., "Research Lead")
   - Email
   - Biography
   - Upload avatar image
5. Click **"Save"**
6. Visit **http://localhost:4321/people** to see your changes!

### 3. See Where Content is Stored

Check: `src/content/people/` - Your entries are saved as `.mdoc` files!

---

## 📦 What This Means for Deployment

### The Key Understanding:

This setup uses **Keystatic with local Git storage**, which means:

1. **Admin panel works locally** (on your computer during development)
2. **Content is saved to files** (not a database)
3. **Files are committed to Git** (version control)
4. **You build the site** (`npm run build`)
5. **Deploy the built files** to university server

---

## 🔄 The Complete Workflow

### For Development & Content Editing:

```
Developer/Editor Computer:
1. npm run dev
2. Visit /keystatic admin panel
3. Add/edit content
4. Content saved to src/content/people/*.mdoc
5. Commit to Git: git add . && git commit -m "Added person"
6. Push to GitHub: git push
```

### For Deployment to University:

**IMPORTANT: This build creates a Node.js application, not pure static files!**

```bash
# Build the application
npm run build

# This creates dist/ folder with:
# - dist/server/ (Node.js server code)
# - dist/client/ (static assets)
```

---

## ⚠️ Important Realization About University Deployment

### The Challenge:

Keystatic's admin panel **requires a server runtime** (Node.js) because it needs:
- API routes for Git operations
- Server-side rendering for the admin UI
- File system access to save content

### Your Options:

#### **Option 1: Two-Part Deployment** (Recommended)

**What you do:**
- Keep admin panel for LOCAL editing only
- Build produces a **Node.js app** that runs on university server
- University IT needs to support Node.js

**University Server Requirements:**
- ✅ Node.js v18+
- ✅ File write permissions
- ✅ Process manager (PM2 or similar)

**How to deploy:**
```bash
# On university server:
npm install
npm run build
node dist/server/entry.mjs
```

OR use PM2:
```bash
pm2 start dist/server/entry.mjs --name university-cms
```

---

#### **Option 2: Remove Admin Panel from Production** (Simpler for IT)

Modify the build to make admin LOCAL-ONLY:

**Benefits:**
- Pure static site for production
- No Node.js required on university server
- Editors work locally, commit to Git
- You rebuild & redeploy when content changes

**How:**
1. Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  integrations: [
    react(),
    markdoc(),
    // Only include Keystatic in development
    process.env.NODE_ENV !== 'production' && keystatic()
  ].filter(Boolean),
  // Can use static output if no Keystatic in production
  output: process.env.NODE_ENV === 'production' ? 'static' : 'server',
});
```

2. Build produces ONLY static files
3. Upload `dist/` to any web server (no Node.js needed)

---

## 🤔 Which Option Should You Choose?

### Choose **Option 1** (Node.js on university server) if:
- ✅ University IT can run Node.js applications
- ✅ You want non-technical users to edit via web interface
- ✅ You're okay with server runtime (but still no database!)

### Choose **Option 2** (Static only) if:
- ✅ University only allows static file hosting
- ✅ Content editors can work locally (with `npm run dev`)
- ✅ You're comfortable doing periodic rebuilds/deployments
- ✅ Simplest possible deployment

---

## 📝 Next Steps - Discuss with Your Team

**Questions to answer:**

1. **Can university IT run Node.js applications?**
   - If YES → Use current setup (Option 1)
   - If NO → Need to modify for static-only (Option 2)

2. **Who will edit content?**
   - Technical users → Can work locally, commit to Git
   - Non-technical users → Need web-based admin panel (requires Option 1)

3. **How often will content change?**
   - Frequently → Option 1 (live admin panel)
   - Occasionally → Option 2 (rebuild when needed)

---

## 🔧 Current Setup Summary

**What's built:**
- ✅ Astro website with landing + people pages
- ✅ Keystatic CMS for content management
- ✅ Git-based storage (no database)
- ✅ Admin panel at `/keystatic`
- ✅ Sample content included

**Build output:**
- Server-rendered application (requires Node.js)
- Location: `dist/` folder
- Run with: `node dist/server/entry.mjs`

**To convert to pure static:**
- See Option 2 instructions above
- Removes admin panel from production
- Results in HTML/CSS/JS files only

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **DEPLOYMENT.md** - Detailed deployment guide
- **This file (QUICKSTART.md)** - You are here!

---

## Need Help?

1. Test locally: `npm run dev`
2. Check the README.md for detailed docs
3. Read DEPLOYMENT.md for server options
4. Decide: Node.js runtime or static-only?

**The site is ready to use! Try the admin panel now.**
