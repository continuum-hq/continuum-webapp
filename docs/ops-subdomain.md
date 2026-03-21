# `ops.continuumworks.app` (same Next.js app)

The app serves **Continuum Ops** at **`/ops`**. The same deployment can answer on **`ops.*`** so Ops feels like its own site.

## What the code does

1. **`middleware.ts`**
   - **`https://ops.continuumworks.app/`** (path `/`): **rewrites** internally to the `/ops` route. The **address bar stays `/`** — no `/ops` in the URL.
   - **`https://ops.continuumworks.app/ops`**: **redirects** to **`/`** so the canonical URL on the subdomain is always the root.
   - Unauthenticated visitors to `ops.*` `/` are sent to `/login` with `callbackUrl` pointing back to `https://ops.continuumworks.app/`.

2. **`NEXT_PUBLIC_SITE_URL`** (Vercel env)  
   Used for **“Back to website”** on the Ops shell so it opens your **main** site (e.g. `https://www.continuumworks.app`), not the ops subdomain root.

## DNS & Vercel

1. **Vercel** → Project → **Settings → Domains** → add **`ops.continuumworks.app`** and wait until it shows **Valid**.

2. **Cloudflare DNS** (example — use the **exact** target Vercel shows):
   - **Type:** CNAME  
   - **Name:** `ops`  
   - **Target:** `cname.vercel-dns.com` (or whatever Vercel lists for your project)  
   - **Proxy:** Orange cloud is OK; if nothing resolves, try **DNS only** (grey cloud) briefly to rule out proxy issues.

3. **SSL/TLS** (Cloudflare): **Full** or **Full (strict)** so HTTPS to Vercel works.

4. Same **Vercel project** serves both apex/www and `ops.*` — no second deployment.

## “Nothing loads” checklist

| Check | Action |
|--------|--------|
| DNS not propagated | `nslookup ops.continuumworks.app` or dig — should point at Vercel, not “nothing”. |
| Wrong CNAME | Copy target from Vercel’s domain UI, not a generic guess. |
| Domain not on Vercel | Domain must appear under **Vercel → Domains** for this project. |
| Certificate pending | Wait a few minutes after adding the domain; Vercel issues certs automatically. |
| Cloudflare “too many redirects” | Often SSL mode **Flexible** with Vercel — set to **Full**. |

## Auth across subdomains

For one login to work on both `www` and `ops`:

- Set **`NEXTAUTH_URL`** to your primary URL (e.g. `https://www.continuumworks.app`).
- Configure the session cookie **`domain`** to **`.continuumworks.app`** (leading dot) in NextAuth cookie options where supported.
- Set **`NEXT_PUBLIC_SITE_URL`** to your marketing home (e.g. `https://www.continuumworks.app`) for “Back to website”.

See [NextAuth cookies](https://next-auth.js.org/configuration/options#cookies).

## Local testing

1. **Hosts file:** `127.0.0.1 ops.localhost`  
2. Open **`http://ops.localhost:3000/`** — should show Ops at **`/`** (rewritten), not `/ops` in the bar.

If `ops.localhost` is awkward, use **`https://continuumworks.app/ops`** on the main domain only.
