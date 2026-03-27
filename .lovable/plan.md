

## Plan: Restore Gated Download Flow with Lead Capture Dialog

### Current State
The landing pages (`ChecklistLanding`, `BeleidstemplateLanding`) have a "Download gratis" button that links directly to the document page. The `DownloadLeadDialog` component already exists but is not being used. The `SendCopyForm` on the document pages captures leads optionally.

### What Changes

**1. Update `ChecklistLanding.tsx`**
- Replace the direct `<Link>` button with a button that opens `DownloadLeadDialog`
- Add dialog state and handler
- On success, navigate to the document page (`/tools/downloads/ai-act-compliance-checklist/document`)

**2. Update `BeleidstemplateLanding.tsx`**
- Same pattern: button opens `DownloadLeadDialog` instead of linking directly
- On success, navigate to `/tools/downloads/ai-beleid-opstellen/document`

**3. Keep existing `SendCopyForm` on document pages**
- The "Stuur mij een kopie" form and "Deel dit document" button stay as-is on the document pages for users who land there directly

### Flow
```text
Landing page → Click "Download gratis" → Dialog (voornaam + email) → Submit → Navigate to document
```

No database or backend changes needed — `DownloadLeadDialog` already handles the insert and email sending.

