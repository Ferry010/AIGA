

# AIGA — AI Geletterdheid Academy Website

A complete multi-page Dutch B2B website designed to convert HR/L&D buyers into bulk seat purchasers for AI literacy training. Dark precision aesthetic with teal accents.

## Design System Setup
- Custom color palette: near-black backgrounds (#0A0E1A), surface cards (#111827), teal accent (#5AA6B2)
- Google Fonts: Syne (display), Inter (body/UI), Roboto Mono (data/scores)
- Reusable components: PrimaryButton, SecondaryButton, Card, SectionLabel, UrgencyBanner
- Framer Motion scroll animations (fade-up with stagger) applied globally
- Animated dot grid background pattern for hero sections

## Navigation & Layout
- Sticky dark navbar with AIGA logo, center links (Training, Masterclass, Voor Organisaties, Over AIGA), right CTAs
- Mobile hamburger with full-screen overlay
- Shared footer across all pages with nav links, contact info, legal links
- React Router with 7 routes

## Page 1: Homepage (/)
- Full-height hero with dot grid background, headline about AI literacy obligation, dual CTAs
- Urgency banner (August 2025 deadline, amber accent)
- Logo strip (text placeholders, muted)
- 2×2 pain point cards with Lucide icons
- Solution section with 3-column features
- 3-step horizontal timeline (vertical on mobile)
- Quiz CTA block (teal-tinted section)
- Two product cards side by side (Online Training featured, Masterclass)
- Ferry Hoes trainer section with placeholder avatar and stats
- Final CTA section

## Page 2: Online Training (/training)
- Hero with training description
- 2×3 grid of learning outcomes with check icons
- 4 feature cards (platform, exam, certificate, dashboard)
- 4-tier pricing table (Starter, Team highlighted, Organisatie, Enterprise)
- FAQ accordion (7 questions)
- Closing CTA

## Page 3: Masterclass (/masterclass)
- Hero describing live session for leaders
- Target audience pills (Directie, HR, L&D, Beleidsmakers)
- 5 numbered takeaways (01-05)
- 4-block program timeline
- Split CTA: Open sessie vs Besloten sessie cards

## Page 4: Voor Organisaties (/voor-organisaties)
- Hero for complete organizational solution
- Comparison table (Online Training vs Masterclass)
- Full pricing table (same as /training)
- "Always included" checklist (6 items, 2 columns)
- HR FAQ accordion
- Quote request form with fields: Naam, Organisatie, Functie, Email, Telefoon, Aantal medewerkers dropdown, Opmerkingen

## Page 5: Over AIGA (/over-aiga)
- Hero with mission statement
- Story section (why AIGA exists)
- Ferry Hoes profile with large avatar placeholder, bio, stats
- Partners section (Speakers Academy, Brand Humanizing)
- 3 principle cards

## Page 6: Contact (/contact)
- Two-column layout: contact form (left) + direct contact info (right)
- Response time badge
- Mini FAQ accordion (4 questions)

## Page 7: AI Readiness Quiz (/quiz)
- Quiz hero with start button
- Full-screen quiz interface: one question per screen, progress bar (10 blocks), 4 answer cards per question
- Auto-advance on selection (400ms delay)
- 10 pre-defined questions with A/B/C/D options
- Email gate screen after Q10 (name, org, email, team size)
- Score calculation (A=0, B=1, C=2, D=3, max 30)
- 4 result tiers with unique colors, badges, ring chart score animation, personalized recommendations
- Share functionality (LinkedIn + copy link)
- All quiz state managed with React useState, forms log to console

