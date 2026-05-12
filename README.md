# emoji-chat
絵文字しか使えない — A real-time emoji chat app.

Built with Spring Boot (Java) + React. Users add friends, create group conversations, and chat in real time over WebSocket (STOMP/SockJS). There is also a public feed.

---

## Requirements

| Tool | Version |
|------|---------|
| Java | 21 |
| Node.js | 22 |
| PostgreSQL | 14+ (local dev only) |
| Docker + Docker Compose | build + server deploy |

---

## Local Development

### 1. Create the dev database

```bash
psql -U kaylee postgres
CREATE DATABASE kaylee;
\q
```

The dev profile connects to `localhost:5432/kaylee` with user `kaylee` and no password.

### 2. Build the frontend

```bash
cd client
npm install
npm run build   # outputs to src/main/resources/static/built/
```

During active frontend development, use watch mode instead:

```bash
npm run watch
```

### 3. Run the backend

```bash
./gradlew bootRun --args='--spring.profiles.active=dev'
```

App is available at `http://localhost:8080`. A demo user `kaylee` is created on first startup.

### Running tests

```bash
./gradlew test

# Single test class
./gradlew test --tests "hello.SomeTestClass"
```

---

## Server Setup (one-time)

### Install Docker

```bash
curl -fsSL https://get.docker.com | sh
```

### Create a dedicated user

Running the app under its own user limits what can be affected if something goes wrong.

```bash
sudo useradd -m -s /bin/bash emoji-chat
sudo usermod -aG docker emoji-chat   # allow docker without sudo
sudo loginctl enable-linger emoji-chat  # keep containers running after you log out
```

> **Note:** `docker` group membership is effectively root-equivalent since Docker can mount the host filesystem. This is an acceptable tradeoff for most self-hosted setups, but be aware of it on a sensitive shared server.

### Create the app directory

```bash
sudo mkdir -p /srv/emoji-chat
sudo chown emoji-chat:emoji-chat /srv/emoji-chat
```

All subsequent server commands should be run as the `emoji-chat` user:

```bash
sudo -u emoji-chat -i
cd /srv/emoji-chat
```

---

## Deploy with Docker Compose

Images are built locally (Apple Silicon → AMD64) and pushed to Docker Hub. The server only needs Docker and a `.env` file.

### 1. One-time setup: create a buildx builder

Only needed the first time. The default Docker Desktop builder already supports multi-platform, but creating a dedicated one is more reliable:

```bash
docker buildx create --name multiplatform --use
docker buildx inspect --bootstrap
```

### 2. Build and push to Docker Hub

```bash
docker buildx build \
  --platform linux/amd64 \
  -t yourdockerhubuser/emoji-chat:latest \
  --push \
  .
```

Tag with a version when you want to pin a release:

```bash
docker buildx build \
  --platform linux/amd64 \
  -t yourdockerhubuser/emoji-chat:1.0.0 \
  -t yourdockerhubuser/emoji-chat:latest \
  --push \
  .
```

### 3. Configure the server

Copy `docker-compose.yml` and `.env.sample` to `/srv/emoji-chat` on the server (scp, rsync, or paste), then as the `emoji-chat` user:

```bash
cp .env.sample .env
```

Edit `.env`:

```
APP_IMAGE=yourdockerhubuser/emoji-chat:latest
APP_PORT=8080          # change if another app owns this port
POSTGRES_USER=emoji
POSTGRES_PASS=your_secure_password
```

### 4. Start on the server

Run these as the `emoji-chat` user from `/srv/emoji-chat`:

```bash
docker compose pull
docker compose up -d
```

### Updating to a new version

Build and push a new image locally (step 2), then on the server as `emoji-chat`:

```bash
cd /srv/emoji-chat
docker compose pull
docker compose up -d
```

Postgres data lives in the `emoji_chat_postgres` Docker volume and is unaffected by app updates.

### Useful commands

```bash
# View logs
docker compose logs -f app
docker compose logs -f db

# Stop everything (data is preserved)
docker compose down

# Stop and delete all data
docker compose down -v
```

---

## Deploy to Kubernetes

Manifests are in `deployments/` and `services/`.

### 1. Create a ConfigMap with database credentials

```bash
kubectl create configmap emoji-config \
  --from-literal=postgres_host=<postgres-service-name> \
  --from-literal=postgres_user=<db-user> \
  --from-literal=postgres_password=<db-password>
```

### 2. Apply manifests

```bash
# Database (PVC + Service + Deployment)
kubectl apply -f deployments/postgres.yml

# App (Deployment)
kubectl apply -f deployments/emoji.yml

# LoadBalancer Service (exposes port 80)
kubectl apply -f services/emoji.yml
```

The app image is configured in `deployments/emoji.yml` under `spec.containers[0].image`.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `APP_IMAGE` | Docker Hub image to pull and run | Docker Compose only |
| `APP_PORT` | Host port the app is exposed on (default: `8080`) | Docker Compose only |
| `POSTGRES_HOST` | PostgreSQL hostname | prod profile |
| `POSTGRES_USER` | Database username | prod profile |
| `POSTGRES_PASS` | Database password | prod profile |

The `dev` profile ignores all Postgres env vars and connects to `localhost:5432/kaylee` directly.

---

## Project Structure

```
src/main/java/hello/    # Spring Boot backend
client/src/             # React frontend
src/main/resources/
  application.properties        # Prod config (default profile)
  application-dev.properties    # Dev config
  static/built/                 # Compiled frontend (generated)
deployments/            # Kubernetes manifests
services/               # Kubernetes service definitions
```
