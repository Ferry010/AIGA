
# Externe tools koppelen aan je database

Je hoeft niets te migreren. De bestaande database blijft staan. Je hebt drie dingen nodig om vanuit Retool, n8n of een andere externe tool te verbinden.

## Wat je nodig hebt

**1. Project URL** (al bekend)
```
https://zomldsagozipnelyuhzy.supabase.co
```

**2. Service role key** (geheim — geeft volledige toegang, voorbij RLS)
- Staat als `SUPABASE_SERVICE_ROLE_KEY` in je Cloud secrets
- Bekijk hem via: **Cloud tab → Secrets → SUPABASE_SERVICE_ROLE_KEY → oogje icoon**
- Deze gebruik je in n8n / Retool als "API key"

**3. Database connection string** (voor directe SQL toegang via Postgres)
- Staat als `SUPABASE_DB_URL` in je Cloud secrets
- Bekijk hem via: **Cloud tab → Secrets → SUPABASE_DB_URL → oogje icoon**
- Format: `postgresql://postgres.[ref]:[password]@aws-1-eu-central-1.pooler.supabase.com:6543/postgres`

## Hoe te gebruiken per tool

**n8n** — gebruik de Supabase node:
- Host: `zomldsagozipnelyuhzy.supabase.co`
- Service Role Secret: plak `SUPABASE_SERVICE_ROLE_KEY`

**Retool** — kies "REST API" of "PostgreSQL" resource:
- REST API: base URL = je project URL + `/rest/v1`, header `apikey` en `Authorization: Bearer` met service role key
- PostgreSQL: gebruik de `SUPABASE_DB_URL` connection string

**Andere tools (Make, Zapier, eigen scripts)** — werken hetzelfde: project URL + service role key, of de Postgres connection string.

## Belangrijke waarschuwingen

- De **service role key** omzeilt alle RLS policies. Behandel hem als een wachtwoord. Zet hem nooit in frontend code, GitHub repos of openbare tools.
- Gebruik bij voorkeur de **anon key** (`VITE_SUPABASE_PUBLISHABLE_KEY`) als de externe tool alleen openbare data hoeft te lezen — die respecteert RLS.
- Je hebt geen toegang tot het Supabase dashboard zelf (`supabase.com`), maar voor externe tools heb je dat ook niet nodig — alleen de keys.

## Wat ik doe na goedkeuring

Niets in de code — dit zijn alleen instructies. Ik kan op verzoek:
- Een korte handleiding schrijven specifiek voor de tool die je gaat gebruiken (zeg welke)
- Een dedicated read-only database user aanmaken als je de service role key niet wilt delen met externe tools
