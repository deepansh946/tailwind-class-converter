# Release Checklist for Tailwind Class Translator

## 🔧 Pre-Release Tasks

### 1. Testing & Quality Assurance
- [ ] Test on multiple websites with Tailwind CSS
- [ ] Test all responsive breakpoints (sm, md, lg, xl, 2xl)
- [ ] Test dark mode and media query classes
- [ ] Test arbitrary value syntax (e.g., `w-[200px]`)
- [ ] Test hover states and pseudo-classes
- [ ] Verify tooltip positioning on different screen sizes
- [ ] Test class highlighting functionality
- [ ] Test extension activation/deactivation
- [ ] Test on pages without Tailwind CSS
- [ ] Test performance with large numbers of classes

### 2. Build & Package
- [ ] Run `npm run build` successfully
- [ ] Test the production build locally
- [ ] Verify all assets are included
- [ ] Check bundle size is reasonable
- [ ] Run `npm run package` to create distribution zip

### 3. Documentation
- [ ] Update README.md with latest features
- [ ] Add screenshots/GIFs for store listing
- [ ] Create privacy policy
- [ ] Write detailed description for store
- [ ] Prepare promotional materials

### 4. Store Preparation
- [ ] Create high-quality icon (128x128, 48x48, 32x32, 16x16)
- [ ] Take promotional screenshots
- [ ] Write compelling store description
- [ ] Set up analytics (optional)
- [ ] Prepare support email/website

## 📋 Store Submission Requirements

### Chrome Web Store
- [ ] Google Developer Account ($5 one-time fee)
- [ ] Extension zip file (from `npm run package`)
- [ ] Store listing details
- [ ] Privacy policy URL
- [ ] Screenshots and promotional images

### Edge Add-ons Store
- [ ] Microsoft Partner Center account
- [ ] Same extension package
- [ ] Store listing details
- [ ] Age rating information

### Firefox Add-ons (Future)
- [ ] Mozilla Developer account
- [ ] Manifest V2 compatibility layer
- [ ] Firefox-specific testing

## 🎯 Launch Strategy
- [ ] Soft launch to developer communities
- [ ] Social media announcement
- [ ] Product Hunt submission
- [ ] Developer blog post
- [ ] Community feedback collection