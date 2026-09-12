# Greg Energy Limited — Website

A static one-page website (plain HTML/CSS/JS, no build step, no dependencies to install).

## Files

```
index.html          the whole site
assets/logo.png      company logo (transparent PNG)
assets/img/          photography used across the site
```

## Deploy to GitHub Pages

### 1. Create the repository
1. Go to [github.com/new](https://github.com/new)
2. Name it whatever you like, e.g. `greg-energy-website`
3. Keep it **Public** (GitHub Pages on a free account requires a public repo)
4. Don't add a README/gitignore/license here — you already have these files — click **Create repository**

### 2. Upload the files
Easiest way, no command line needed:
1. On your new repo's page, click **"uploading an existing file"**
2. Drag in `index.html`, `README.md`, and the whole `assets` folder (drag the folder itself — GitHub keeps the folder structure)
3. Scroll down, click **Commit changes**

(If you prefer the command line instead:)
```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### 3. Turn on GitHub Pages
1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, choose **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)` → **Save**
4. Wait 1–2 minutes. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```
   GitHub shows this exact URL at the top of the Pages settings once it's ready.

### 4. Point your own domain at it (optional, once you own a domain)
1. In **Settings → Pages**, enter your domain (e.g. `gregenergy.com`) in the **Custom domain** field and save — this creates a `CNAME` file in your repo automatically
2. At your domain registrar, add these DNS records:
   - Four **A** records for the root domain pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`
3. DNS changes can take a few hours to propagate. Once live, tick **Enforce HTTPS** back in the Pages settings.

## Editing later
- **Contact details**: search `index.html` for the office address, phone, and email — they appear in the Contact section and the footer.
- **Text/copy**: everything is plain text inside the HTML, readable top to bottom in the order it appears on the page.
- **Colors/theme**: all colors are defined once at the top of the `<style>` block under `:root`, `html[data-theme="dark"]`, and `html[data-theme="light"]` — change a value there and it updates everywhere.
- **Photos**: replace any file in `assets/img/` with a new image of the *same filename* and it'll update automatically. Keep photos under ~1600px wide and compressed (JPEG quality ~75) so the site stays fast.

No build tools, frameworks, or `npm install` needed — it's just HTML, CSS, and vanilla JavaScript in one file.

## Troubleshooting: images not showing

If your images 404 (don't load) after deploying, it's almost always one of these:

1. **The `assets` folder wasn't uploaded to the same level as `index.html`.** If you drag files into GitHub one at a time or via a nested folder, you can accidentally end up with `index.html` at the repo root but `assets/` inside a subfolder (e.g. `greg-energy-website/assets/...`). Check your repo's file list on GitHub — `index.html` and `assets` should be siblings, both directly visible at the repo root.
2. **Case sensitivity.** GitHub Pages is case-sensitive (unlike Windows/Mac file systems). `Assets/Icon.png` is not the same as `assets/icon.png`. Keep filenames exactly as they are in this folder.
3. **Give it a minute.** GitHub Pages can take 1–2 minutes to rebuild after a push — if you just uploaded, refresh again shortly after.

If it's still not working, open your browser's dev tools (F12) → Network tab → reload the page → look for any request showing a red 404, and check the exact URL it tried to load against your repo's actual file structure.

