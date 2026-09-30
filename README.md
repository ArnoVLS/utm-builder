# UTM Builder MVP

## Functies
- 8 kanalen
- live preview en kopieren
- Supabase login
- opslag en persoonlijke historiek
- adminbeheer voor campaign name en event name
- adminactie om historiek te wissen
- RLS

## Setup
1. Maak een Supabase-project.
2. Voer `supabase/schema.sql` uit in SQL Editor.
3. Maak een Auth-gebruiker en voer de laatste admin-query uit.
4. Kopieer `.env.example` naar `.env.local` en vul de waarden in.
5. Run `npm install`, `npm test`, `npm run dev`.
6. Deploy op Vercel of een andere Next.js-compatible host.

## Opmerking
Controleer voor productie de kanaalspecifieke formules tegen de finale Excel-guide, vooral advertentieplatformmacro's.
