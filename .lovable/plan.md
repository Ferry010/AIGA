

## Plan: Trigger republish

Add a harmless comment to `src/App.tsx` to create a new commit, enabling the Publish → Update button.

### Change
- `src/App.tsx`: Add a comment line (e.g. `// force redeploy`) at the top of the file.

After implementation, click **Publish → Update** to push the latest build to production and your custom domain.

