

## Plan: Add CollectionPage structured data to Kenniscentrum

### Change

**File: `src/pages/Kenniscentrum.tsx`**

Add a `CollectionPage` JSON-LD schema to the existing `<SEO>` component's `jsonLd` prop. The schema will be built dynamically from the loaded articles and include:

- `@type: "CollectionPage"` with `name`, `description`, `url`, `inLanguage: "nl"`
- `mainEntity` as an `ItemList` containing each published article as a `ListItem` with nested `Article` schema (`headline`, `url`, `image`, `author`, `datePublished`)
- `publisher` as the AIGA `EducationalOrganization`

The schema is constructed after articles load, so it reflects the actual published content. Pass it via the existing `jsonLd` prop on `<SEO>` — no new components needed.

