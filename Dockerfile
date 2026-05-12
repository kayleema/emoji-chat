## Stage 1: build frontend
## webpack.config.js writes output to ../src/main/resources/static/ relative to
## the client dir, so built assets end up at /src/main/resources/static/ here.
FROM node:22-alpine AS node-build
WORKDIR /client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

## Stage 2: build backend JAR
FROM eclipse-temurin:21-jdk-alpine AS java-build
WORKDIR /build
COPY gradle/ gradle/
COPY gradlew build.gradle settings.gradle ./
RUN ./gradlew dependencies --no-daemon -q
COPY src/ src/
COPY --from=node-build /src/main/resources/static/ src/main/resources/static/
RUN ./gradlew bootJar --no-daemon -x test

## Stage 3: minimal runtime image (~200MB vs ~600MB for JDK)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=java-build /build/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
