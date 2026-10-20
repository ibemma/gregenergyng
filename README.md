# Greg Energy Limited — Website

A 5-page static site (plain HTML/CSS/JS, no build step, no dependencies to install).

## Pages
- `index.html` — Home
- `about.html` — About Us (heritage & compliance)
- `divisions.html` — Our Core Divisions (HSE & PPE, MRO, Access & Logistics)
- `procurement.html` — Procurement & Delivery Framework
- `contact.html` — Contact Us (Request for Quote form)

## Structure
```
index.html, about.html, divisions.html, procurement.html, contact.html
assets/css/styles.css     the whole site's styling
assets/js/main.js         theme toggle, mobile menu, photo carousel, RFQ form
assets/icon.png           logo mark
assets/favicon-*.png      browser tab icons
assets/img/               photography
assets/clients/           client logos
assets/video/hero.mp4     looping background video on the Home hero (~3.6MB, muted, no audio track)
```

## The RFQ form
The contact form is wired to Formspree (endpoint already configured) and delivers straight to your inbox. Formspree's free plan does not support file attachments, so the form asks people to email PDF/Excel material lists directly to info@gregenergyng.com alongside their enquiry — that note is built into the form itself.

If you want true in-form file uploads later, Formspree's paid tier supports it — just add a `<input type="file" name="attachment">` field and the existing JS handles the rest automatically.

## Deploy to GitHub Pages
1. Create a new **public** repository on GitHub.
2. Upload all files in this folder (drag-and-drop the whole folder, or use git push), keeping the folder structure exactly as-is — `index.html` and `assets/` must sit at the same level, not nested.
3. In the repo, go to **Settings → Pages → Source → Deploy from a branch**, choose `main` and `/ (root)`, then Save.
4. Your site goes live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` within a couple of minutes.
5. To use your own domain (e.g. gregenergyng.com), add it under **Settings → Pages → Custom domain**, then add the DNS records GitHub shows you at your domain registrar.

## Editing later
- **Text**: open any page's `.html` file — copy is plain text, readable top to bottom.
- **Colors/theme**: all defined once at the top of `assets/css/styles.css` under `:root` and the two `html[data-theme="..."]` blocks.
- **Photos**: replace any file in `assets/img/` or `assets/clients/` with a new image of the *same filename*.
