
Doel: het e-mailprobleem van de downloadformulieren definitief oplossen.

Diagnose (wat ik heb gevonden)
1. De lead-inserts werken wel (`download_leads` krijgt nieuwe records).
2. De call naar de backendfunctie voor e-mail krijgt nu `401 Unauthorized`.
3. In `supabase/config.toml` staat:
   - `[functions.send-transactional-email] verify_jwt = true`
4. De downloadformulieren zijn publiek (gebruikers zijn meestal niet ingelogd), dus die call wordt door JWT-verificatie geblokkeerd.
5. Oudere logs tonen nog `Emails disabled for this project`, maar de huidige blokkade is primair de 401 vóór de queue.

Implementatieplan
1. Maak `send-transactional-email` publiek aanroepbaar
   - Wijzig in `supabase/config.toml`:
     - `[functions.send-transactional-email] verify_jwt = false`
   - Laat `[functions.process-email-queue] verify_jwt = true` staan (moet alleen intern/service-role draaien).

2. Verbeter foutafhandeling in alle 3 formulieren
   - Bestanden:
     - `src/components/DownloadLeadDialog.tsx`
     - `src/components/SendCopyForm.tsx`
     - `src/components/ShareDocumentButton.tsx`
   - Wijzig gedrag:
     - `await supabase.functions.invoke(...)` gebruiken (niet “fire-and-forget”).
     - `error` van invoke expliciet checken.
     - Alleen “verstuurd/success” tonen als invoke zonder fout terugkomt.
     - Bij fout: duidelijke toast (“E-mail kon niet worden verzonden, probeer opnieuw”).

3. UX-correctheid
   - Voorkom vals-positieve success states (nu ziet gebruiker soms “verstuurd” terwijl e-mail nooit in queue kwam).
   - Eventueel subtiele fallbacktekst toevoegen: “Download is beschikbaar, e-mail is optioneel opnieuw te proberen.”

4. Verificatie na implementatie (end-to-end)
   - Vul elk formulier 1x in:
     - Checklist download dialog
     - “Stuur mij een kopie”
     - “Deel dit document”
   - Controleer:
     - record in `download_leads`
     - `email_send_log` status verloop `pending -> sent` (of duidelijke fout)
     - daadwerkelijke ontvangst in inbox/spam.

5. Fallbackcheck als het daarna nog faalt
   - Als queue wel gevuld wordt maar eindigt op `dlq` met “Emails disabled for this project”, dan project-e-mails opnieuw inschakelen in Cloud → Emails en opnieuw testen.

Technische details (kort)
- Root cause: publieke frontend -> protected function (`verify_jwt=true`) mismatch.
- Scope van wijziging: 1 configbestand + 3 frontend componenten.
- Geen schemawijzigingen nodig.
