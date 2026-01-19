# Deployment Instructions

## Quick Overview

This project is built with:
- **Astro** (static site generator)
- **Keystatic** (content management system)
- **No database or server runtime required**

The built site is 100% static HTML/CSS/JS files that can be hosted on any web server.

---

## Deployment Options

### Option 1: Deploy to GitHub Pages (Recommended for Testing)

**Steps:**

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/university-cms.git
git push -u origin main
```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The `.github/workflows/build.yml` will auto-deploy

3. **Visit your site**
   - `https://YOUR_USERNAME.github.io/university-cms/`

**Pros:** Free, automatic deployments, SSL included
**Cons:** Public repository required (unless paid GitHub)

---

### Option 2: Manual Deployment to University Server

**What to deliver to IT:**

1. **Built Files** (the `dist/` folder)
   ```bash
   npm run build
   # This creates a dist/ folder
   ```

2. **Web Server Configuration**
   - Apache: Copy `.htaccess` to `dist/`
   - Nginx: Provide config snippet

3. **Deployment Steps for IT:**
   ```
   1. Upload dist/ folder to web root (e.g., /var/www/html)
   2. Set proper permissions (readable by web server)
   3. Configure virtual host (if needed)
   4. Done!
   ```

**Requirements for University Server:**
- ✅ Web server (Apache/Nginx/IIS)
- ✅ Ability to serve static files
- ❌ No Node.js needed
- ❌ No database needed
- ❌ No special runtime

---

### Option 3: Automated Deployment via GitHub Actions

**How it works:**
1. You push changes to GitHub
2. GitHub Actions automatically builds the site
3. IT downloads the build artifact from GitHub
4. IT uploads to university server

**Setup:**

1. Push to GitHub (already configured with `.github/workflows/build.yml`)

2. After each push:
   - Go to repository → Actions tab
   - Click on latest workflow run
   - Download "dist" artifact (zip file)
   - Unzip and upload to server

**Pros:** Automated builds, easy to track changes
**Cons:** Manual upload step still needed

---

## Content Management Workflow

### For Content Editors (Your Team)

**Scenario A: Local Editing (Simplest)**

1. Install project on your computer:
   ```bash
   git clone https://github.com/YOUR_USERNAME/university-cms.git
   cd university-cms
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open admin panel: `http://localhost:4321/keystatic`

4. Add/edit team members

5. Commit changes:
   ```bash
   git add .
   git commit -m "Added new team member"
   git push
   ```

6. You rebuild and redeploy

**Scenario B: Using GitHub Codespaces (More Advanced)**

1. Open repository in GitHub Codespaces
2. Run `npm run dev`
3. Edit via Keystatic admin panel
4. Commit and push
5. GitHub Actions auto-builds
6. Download and deploy

---

## University Server Configuration Examples

### Apache (.htaccess)

Create this file in your `dist/` folder before uploading:

```apache
# Enable rewrite engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect to index.html for client-side routing
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Optional: Protect admin panel
<IfModule mod_auth.c>
  <FilesMatch "keystatic">
    AuthType Basic
    AuthName "Admin Access"
    AuthUserFile /path/to/.htpasswd
    Require valid-user
  </FilesMatch>
</IfModule>
```

### Nginx

```nginx
server {
    listen 80;
    server_name yourteam.university.edu;
    
    root /var/www/university-cms/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Protect admin panel
    location /keystatic {
        auth_basic "Admin Access";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

---

## Security: Protecting the Admin Panel

The admin panel (`/keystatic`) should be protected in production.

### Option 1: Don't Deploy Admin Panel (Recommended)

**How:**
- Admin panel only runs locally (`npm run dev`)
- Production build can exclude it
- Editors work locally, push changes to Git

**Modify astro.config.mjs to exclude /keystatic in production:**
```javascript
export default defineConfig({
  integrations: [
    react(),
    markdoc(),
    // Only include Keystatic in development
    process.env.NODE_ENV !== 'production' && keystatic()
  ].filter(Boolean),
  output: 'hybrid',
});
```

### Option 2: Password Protection via Web Server

**Apache:**
```bash
# Create password file
htpasswd -c .htpasswd admin
# Enter password when prompted

# Upload .htpasswd to server
# Configure .htaccess (see above)
```

**Nginx:**
```bash
# Create password file
htpasswd -c .htpasswd admin

# Upload to /etc/nginx/.htpasswd
# Configure nginx.conf (see above)
```

---

## Testing Before Deployment

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Preview production build:**
   ```bash
   npm run preview
   ```

3. **Test all pages:**
   - Landing page: http://localhost:4321
   - People page: http://localhost:4321/people
   - Admin panel: http://localhost:4321/keystatic

4. **Verify images load correctly**

5. **Check mobile responsiveness**

---

## Checklist for University IT

When handing off to IT, provide:

- [ ] Zipped `dist/` folder (built files)
- [ ] This deployment guide
- [ ] Web server config (.htaccess or nginx.conf)
- [ ] Desired domain name
- [ ] Admin panel protection preference
- [ ] Contact information for issues

---

## Ongoing Maintenance

**To update content:**
1. Edit via Keystatic admin panel (locally)
2. Commit changes to Git
3. Rebuild: `npm run build`
4. Upload new `dist/` folder

**To update design/functionality:**
1. Modify Astro components
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy new `dist/` folder

**Backup:**
- Content is in Git (automatic backup)
- Can rollback to any previous version
- Clone repository to restore

---

## Troubleshooting

**Problem: Admin panel not working in production**
- Solution: Admin panel is for local use only. Edit locally, then deploy.

**Problem: Images not loading**
- Check file paths are relative (start with `/images/`)
- Verify files uploaded to `dist/public/images/`

**Problem: 404 errors on page refresh**
- Configure web server for client-side routing (see examples above)

**Problem: Styles not applying**
- Check browser console for errors
- Verify CSS files in `dist/_astro/` folder

---

## Support

For questions or issues:
1. Check README.md in project root
2. Review Astro documentation: https://docs.astro.build
3. Review Keystatic documentation: https://keystatic.com

