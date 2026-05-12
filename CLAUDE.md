# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Full build (frontend then backend)
make javabuild

# Frontend only (outputs to src/main/resources/static/built/)
cd client && npm install && npm run build

# Backend only
./gradlew build

# Watch mode for frontend development
cd client && npm run watch

# Run tests
./gradlew test

# Run a single test class
./gradlew test --tests "hello.SomeTestClass"
```

## Running Locally

```bash
# Start with dev profile (connects to local PostgreSQL, disables caching)
./gradlew bootRun --args='--spring.profiles.active=dev'
```

Dev profile expects PostgreSQL at `localhost:5432`, database `kaylee`, user `kaylee`, no password. The app seeds a demo user `kaylee` on startup via `DatabaseLoader`.

## Architecture Overview

This is a Spring Boot 2.7.18 + React 16 SPA. The frontend is bundled by Webpack into `src/main/resources/static/built/bundle.js` and served by Spring Boot's static file handler. All React routes are served from a single Thymeleaf template (`index.html`), with `HomeController` mapping every frontend path to that template.

**Backend packages** (`src/main/java/hello/`):
- Entities: `EmojiUser`, `Message`, `Conversation`, `Post`
- Repositories: Spring Data JPA repos; `MessageRepository` and `ConversationRepository` have custom finders
- Controllers: `HomeController` (SPA shell), `EmojiUserController`, `ConversationController`, `MessageController` (WebSocket)
- Security: `SecurityConfiguration`, `SpringDataJpaUserDetailsService`
- WebSocket: `WebSocketConfiguration`

**Frontend** (`client/src/`):
- `App.js` defines all React Router v4 routes
- `websocketUtils.js` contains `ChatSocket` and `FeedSocket` classes that manage STOMP connections
- `UserRepository.js` is the API client for all REST calls

## WebSocket Flow

STOMP over SockJS connects to `/posts`. Message routing:
- `/app/chat/{conversationId}` → `MessageController#chat()` → persists message → broadcasts to `/topic/messages/{conversationId}`
- `/app/chat` → `MessageController#greeting()` → public broadcast (not persisted)
- `@SubscribeMapping("/messages/{conversationId}")` → returns message history on subscribe

The server extracts the authenticated `Principal` from the WebSocket session to set message authorship.

## Auth & Session

Session-based auth with BCrypt passwords. Sessions are JDBC-persisted (24-hour timeout), so they survive restarts. CSRF is disabled. The `/user/login` endpoint manually authenticates and creates a session; Spring Security's form login is not used.

Protected vs. public routes are configured in `SecurityConfiguration` — REST API paths under `/api/**` return HTTP 401 on auth failure, while web paths redirect to `/home`.

## Database Profiles

| Profile | Database | Notes |
|---------|----------|-------|
| `dev` | `localhost:5432/kaylee` | No credentials, caching disabled |
| `prod` | `${POSTGRES_HOST}:5432/emoji` | Credentials from `POSTGRES_USER`/`POSTGRES_PASS` env vars |

Hibernate DDL: `update` (auto-migrates schema).

## Key Compatibility Notes

- Gradle wrapper is pinned to **8.8** — required because Java 21 is the only installed JDK, and the Spring Boot 2.7.x plugin needs Gradle 7.5+
- `node-sass` was replaced with `sass` (Dart Sass) in `client/package.json` — `node-sass` doesn't support Node 22
- Frontend build targets `src/main/resources/static/built/` — this directory must exist before `./gradlew build` runs tests that serve static assets
