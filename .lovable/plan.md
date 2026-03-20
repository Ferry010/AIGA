

## Problem

The `risk_scan_submissions` table has RLS policies configured correctly (anonymous inserts allowed), but **no table-level grants** exist for the `anon` role. This means the Supabase client (which uses the `anon` key) is denied access before RLS even applies.

## Fix

Run a single database migration to grant the necessary permissions:

```sql
GRANT INSERT ON public.risk_scan_submissions TO anon;
GRANT SELECT, UPDATE ON public.risk_scan_submissions TO authenticated;
```

This grants:
- **`anon`**: INSERT permission (for quiz submissions without login)
- **`authenticated`**: SELECT and UPDATE permission (for admin dashboard to view and mark submissions)

No code changes needed — the Quiz.tsx insert logic and Admin.tsx read logic are correct.

