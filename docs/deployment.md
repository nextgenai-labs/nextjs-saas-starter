# Deployment Guide

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL 16+
- Docker (optional, for containerized deployment)

## Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in all required values.

### Required

| Variable       | Description                  | Source                                            |
| -------------- | ---------------------------- | ------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | Your database provider (Neon, RDS, Railway, etc.) |
| `AUTH_SECRET`  | Random 32+ char string       | `openssl rand -base64 32`                         |
| `AUTH_URL`     | Canonical app URL            | e.g. `https://myapp.com`                          |

### OAuth

| Variable             | Description                | Source                    |
| -------------------- | -------------------------- | ------------------------- |
| `AUTH_GITHUB_ID`     | GitHub OAuth App ID        | GitHub Developer Settings |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Secret    | GitHub Developer Settings |
| `AUTH_GOOGLE_ID`     | Google OAuth Client ID     | Google Cloud Console      |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret | Google Cloud Console      |

### Email

| Variable            | Description          | Source                    |
| ------------------- | -------------------- | ------------------------- |
| `RESEND_API_KEY`    | Resend API key       | Resend Dashboard          |
| `RESEND_FROM_EMAIL` | Sender email address | Verified domain in Resend |

---

## Option 1: Vercel Deployment

1. Push your repository to GitHub.
2. Create a new project on [Vercel](https://vercel.com/new).
3. Import your GitHub repository.
4. Configure the following environment variables in Vercel dashboard:
   - `DATABASE_URL` — use Neon, Supabase, or any PostgreSQL provider
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`
   - `AUTH_URL` — set to your Vercel domain (e.g. `https://myapp.vercel.app`)
   - `NEXT_PUBLIC_APP_URL` — same as `AUTH_URL`
   - Configure OAuth callback URLs to point to your Vercel domain
5. Deploy.

### Database Migration

After deployment, run:

```bash
vercel env pull
pnpm db:migrate
pnpm db:seed
```

Or use the Vercel Postgres integration if you prefer.

---

## Option 2: Docker Deployment

### Build the Image

```bash
docker build -t saas-starter .
```

### Run with Docker Compose

```bash
docker compose up -d
```

This starts:

- **PostgreSQL 16** on port 5432
- **App** on port 3000

### Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: saas
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: saas_starter
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U saas -d saas_starter"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  app:
    image: saas-starter:latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://saas:${POSTGRES_PASSWORD}@postgres:5432/saas_starter
      AUTH_SECRET: ${AUTH_SECRET}
      AUTH_URL: ${APP_URL}
      NEXT_PUBLIC_APP_URL: ${APP_URL}
      NODE_ENV: production
      LOG_LEVEL: info
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres_data:
```

### Run Production Stack

```bash
export POSTGRES_PASSWORD="your-secure-password"
export AUTH_SECRET="$(openssl rand -base64 32)"
export APP_URL="https://yourdomain.com"

docker compose -f docker-compose.prod.yml up -d
```

### Health Checks

The application exposes:

| Endpoint            | Purpose               | Expected Status |
| ------------------- | --------------------- | --------------- |
| `/api/health/live`  | Liveness probe (K8s)  | 200             |
| `/api/health/ready` | Readiness probe (K8s) | 200 or 503      |
| `/api/health`       | Full health check     | 200 or 503      |

---

## Option 3: Manual VPS Deployment

### 1. Install Dependencies

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs postgresql
corepack enable && corepack prepare pnpm@9.15.0 --activate
```

### 2. Clone and Build

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with production values
pnpm install
pnpm build
```

### 3. Database Setup

```bash
createdb saas_starter
pnpm db:migrate
pnpm db:seed
```

### 4. Run with Process Manager

```bash
npm install -g pm2
pm2 start apps/web/server.js --name saas-starter
pm2 save
pm2 startup
```

### 5. Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://localhost:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /api/health {
        access_log off;
        proxy_pass http://localhost:3000;
    }
}
```

---

## Security Checklist

- [ ] All secrets stored in environment variables, never in code
- [ ] `AUTH_SECRET` is a strong random string (min 32 chars)
- [ ] HTTPS enabled with valid certificate
- [ ] Database firewall restricts access to app server IP
- [ ] Rate limiting configured for API routes
- [ ] Security headers verified (use `curl -I https://yourdomain.com`)
- [ ] Regular dependency updates with Dependabot/Renovate
- [ ] Database backups configured (daily minimum)
- [ ] Monitoring and alerting set up
- [ ] Error tracking integrated (Sentry, etc.)

---

## Monitoring

### Health Check Endpoints

```bash
# Liveness — is the process alive?
curl https://yourdomain.com/api/health/live

# Readiness — can it serve traffic?
curl https://yourdomain.com/api/health/ready

# Full health — all dependencies checked
curl https://yourdomain.com/api/health
```

### Metrics

```bash
curl https://yourdomain.com/api/metrics
```

### Logging

In production, logs are emitted as structured JSON:

```json
{
  "timestamp": "2026-07-26T12:00:00.000Z",
  "level": "INFO",
  "message": "Request processed",
  "meta": { "path": "/dashboard", "method": "GET", "durationMs": 45, "authenticated": true }
}
```

---

## Performance Optimizations

- Image optimization with Next.js Image component (AVIF/WebP)
- Automatic code splitting via React Server Components
- Bundle optimization for `lucide-react` and `@nextjs-saas/ui`
- Static asset caching with immutable cache headers
- Database connection pooling via Prisma
- Standalone output mode for Docker (reduces image size)

---

## Troubleshooting

### Database Connection Failed

Verify `DATABASE_URL` is correct and the database is accessible:

```bash
psql $DATABASE_URL -c "SELECT 1"
```

### Build Failures

```bash
# Clear caches and retry
rm -rf .turbo .next node_modules
pnpm install
pnpm build
```

### Session Issues

- Verify `AUTH_SECRET` is consistent across deployments
- Check that `AUTH_URL` matches the deployed domain
- Clear browser cookies and retry

### Docker Build Slow

The Docker build uses multi-stage caching. If dependencies haven't changed, the deps layer is cached:

```bash
docker build --cache-from saas-starter:latest -t saas-starter .
```
