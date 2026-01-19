# University CMS

A simple CMS for university research team with landing page and people directory.

## Tech Stack

- **Astro** - Static site generator
- **Keystatic** - Git-based CMS with visual admin panel
- **TypeScript** - Type safety

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:4321
- **Admin Panel**: http://localhost:4321/keystatic

### 3. Add Content

1. Go to http://localhost:4321/keystatic
2. Click "People" in the sidebar
3. Click "Create entry"
4. Fill in the form (name, role, email, bio)
5. Upload an avatar image (optional)
6. Click "Save"

The content is saved as Markdown files in `src/content/people/`

## Project Structure

```
university-cms/
├── src/
│   ├── content/
│   │   └── people/           # People markdown files (managed by Keystatic)
│   ├── layouts/
│   │   └── Layout.astro      # Main layout with nav/footer
│   ├── pages/
│   │   ├── index.astro       # Landing page
│   │   └── people.astro      # People listing page
│   └── styles/
│       └── global.css        # Global styles
├── public/
│   └── images/
│       └── people/           # Uploaded avatars
├── keystatic.config.tsx      # Keystatic CMS configuration
└── astro.config.mjs          # Astro configuration
```

## Deployment Process

### Understanding the Workflow

**Local Development → Git → Build → Deploy to University Server**

```
1. Edit content via /keystatic admin panel
   ↓
2. Content saved as .mdoc files in src/content/people/
   ↓
3. Commit changes to Git
   ↓
4. Build static site (npm run build)
   ↓
5. Upload dist/ folder to university server
```

### Step-by-Step Deployment

#### A. Deploy to GitHub (for version control)

```bash
# Initialize git (already done)
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/university-cms.git
git push -u origin main
```

#### B. Build for Production

```bash
# Create static build
npm run build

# Test production build locally
npm run preview
```

This creates a `dist/` folder with:
- All HTML pages (static)
- CSS and JavaScript
- Images
- No server required!

#### C. Deploy to University Server

**Option 1: Manual Upload**
1. Build the site: `npm run build`
2. Upload the entire `dist/` folder to university server
3. Configure web server to serve files from `dist/`

**Option 2: GitHub Actions Auto-Build**
1. Push changes to GitHub
2. GitHub Actions builds the site automatically
3. Download the build artifacts
4. Upload to university server

**Option 3: Direct Server Build**
1. SSH into university server
2. Clone repository: `git clone https://github.com/YOUR_USERNAME/university-cms.git`
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Point web server to `dist/` folder

### University Server Requirements

**Minimum:**
- Web server (Apache, Nginx, or IIS)
- Ability to serve static files
- No Node.js runtime needed for the built site
- No database needed

**Web Server Configuration:**

**Apache (.htaccess):**
```apache
# Redirect all requests to index.html for client-side routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
server {
    listen 80;
    server_name yoursite.edu;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Protecting the Admin Panel

Since the admin panel (`/keystatic`) should only be accessible to authorized users:

**Option 1: Remove /keystatic from production build**
- Admin panel only used locally
- Editors work on their own computers
- Push changes to Git
- Production build doesn't include admin

**Option 2: Basic HTTP Authentication (via web server)**

**Apache (.htaccess in dist/keystatic/):**
```apache
AuthType Basic
AuthName "Admin Area"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

**Nginx:**
```nginx
location /keystatic {
    auth_basic "Admin Area";
    auth_basic_user_file /path/to/.htpasswd;
}
```

## How Content Updates Work

### Current Setup (Local Editing):

1. **Editor** opens project on their computer
2. Runs `npm run dev`
3. Visits `localhost:4321/keystatic`
4. Edits content via visual admin panel
5. Content saved to `src/content/people/*.mdoc`
6. Commits changes: `git add . && git commit -m "Updated team"`
7. Pushes to GitHub: `git push`
8. **You** pull changes, build, and deploy to university server

### Alternative: Cloud Editing (More Complex)

1. Use GitHub Codespaces or similar
2. Editor opens project in browser
3. Makes changes via Keystatic
4. GitHub Actions auto-builds
5. Download and deploy

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Installs dependencies |
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Next Steps

1. **Test locally**: Run `npm run dev` and visit the admin panel
2. **Add real content**: Replace sample people with your team
3. **Push to GitHub**: Create repository and push code
4. **Build**: Run `npm run build` to create production files
5. **Deploy**: Upload `dist/` folder to university server

## Notes

- Content is stored in Git (version controlled)
- No database needed
- Admin panel works offline
- Static site = fast and secure
- Easy to backup (just commit to Git)

