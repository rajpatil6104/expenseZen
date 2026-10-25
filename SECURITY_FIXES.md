# ExpenseZen — security fixes (apply in this order)

These files patch the issues found in the 2026-10-26 review. They do **not**
push anything to GitHub for you — steps 1 and 4 need your GitHub/hosting
access, and step 4 rewrites history, so do it deliberately.

## What changed in the patched code

- `backend/server.py`
  - Removed the public fallback JWT secret. The server now refuses to start
    unless `JWT_SECRET_KEY` is set, and it must be at least 32 characters.
  - CORS no longer defaults to `*`. The default is `http://localhost:3000`
    only. A `*` origin is rejected when credentials are enabled.
  - Registration now requires a password of at least 8 characters
    (max 128). Login validation is unchanged, so existing accounts are not
    locked out by this change.
- `.gitignore` — now ignores `.env`, `.env.local`, and `.env.*.local`,
  while still allowing `.env.example`.
- `backend/.env.example` and `frontend/.env.example` — safe templates with
  placeholder values only. No real secrets are in this pack.

## Step 1 — Rotate the leaked MongoDB credentials FIRST

Do this before anything else. Removing files from git does not un-leak a
secret that was already public, and anyone may already have a copy.

1. In MongoDB Atlas, create a new database user with a new strong password.
2. Update the connection string wherever the app is deployed (hosting
   environment variables, not the repo).
3. Delete the old database user.
4. Confirm the app still works with the new credentials, then continue.

## Step 2 — Apply the patched files

From your local clone of expenseZen, copy these files over the originals:

- `backend/server.py` → `backend/server.py`
- `.gitignore` → `.gitignore`
- `backend/.env.example` → `backend/.env.example`
- `frontend/.env.example` → `frontend/.env.example`

Do **not** copy any real `.env` file into the repo, and do not put real
values into the `.example` files.

## Step 3 — Stop tracking the real .env files

```bash
git rm --cached backend/.env frontend/.env
```

Then create your local (untracked) env files from the examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Generate a new JWT secret and put it in `backend/.env` only:

```bash
openssl rand -hex 32
```

Set the same secret in your hosting environment. Every existing login token
becomes invalid after this change — users will need to log in again.
That is intentional: tokens signed with the old public secret cannot be
trusted.

In production, also set `CORS_ORIGINS` to your exact frontend origin, for
example `https://expensezen.example.com` (comma-separated if there are two).

## Step 4 — Purge the .env files from git history (destructive)

Back up your clone first. This rewrites history, so collaborators must
re-clone afterwards, and any open pull requests based on the old history
will need rebasing.

```bash
# Install if needed: pip install git-filter-repo
git filter-repo --path backend/.env --path frontend/.env --invert-paths
git remote add origin https://github.com/rajpatil6104/expenseZen.git
git push origin --force --all
git push origin --force --tags
```

Verify afterwards:

```bash
git ls-files | grep -i env
# Should show only: backend/.env.example, frontend/.env.example

git log --all -- backend/.env frontend/.env
# Should show nothing
```

If you use GitHub's UI, also check that no old commit still shows the files,
and consider contacting GitHub support about cached views if needed.
Rotation in Step 1 remains mandatory even after a successful purge.

## Step 5 — Sanity checks

```bash
# 1. Server must fail fast without a JWT secret (set a dummy MONGO_URL/DB_NAME
#    for this check; it fails on the secret before serving traffic)
# 2. With a real secret set, the app starts normally.
# 3. Registering with a password shorter than 8 characters is rejected (422).
# 4. Registering with a normal password still works.
```

## Deliberately NOT changed in this pack

These are the next hardening steps, not silent omissions:

- Rate-limiting on `/auth/login` and `/auth/register` (use slowapi, or a
  reverse proxy / hosting rate limit — an in-memory limiter alone does not
  protect a multi-worker deployment).
- Moving the token out of `localStorage` into httpOnly cookies, plus
  refresh-token rotation. That changes both backend and frontend auth flow.
- Email verification and a forgot-password flow.
- MongoDB indexes, pagination, and amount/category validation — those are
  correctness/performance fixes, covered in the earlier review.
