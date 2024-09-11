# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar solo package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias con npm ci
RUN \
  if [ -f yarn.lock ]; then echo "Using yarn.lock"; yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then echo "Using package-lock.json"; npm ci; \
  elif [ -f pnpm-lock.yaml ]; then echo "Using pnpm-lock.yaml"; corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found." && exit 1; \
  fi

# Build the application with environment variables
FROM base AS builder
WORKDIR /app

# Pass build arguments and set environment variables for the build process
ARG VITE_API_URL
ARG VITE_PORT
ARG VITE_AI_URL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PORT=${VITE_PORT}
ENV VITE_AI_URL=${VITE_AI_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build de la aplicación con las variables de entorno
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "No lockfile found." && exit 1; \
  fi

# Final stage: Rebuild the source code only when needed
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the build files from the builder stage
COPY --from=builder /app/dist ./dist

# Create non-root group and user
RUN addgroup -S vitegroup && adduser -S viteuser -G vitegroup

# Asignar permisos correctos al usuario sin root
RUN chown -R viteuser:vitegroup /app

# Switch to non-root user
USER viteuser

# Expose the application's port
EXPOSE 3000

# Command to run the application
CMD ["npx", "serve", "-s", "dist"]
