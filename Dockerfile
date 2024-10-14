# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instalar dependencias con manejo de errores
RUN set -e; \
  echo "Instalando dependencias..."; \
  if [ -f yarn.lock ]; then \
    echo "Usando yarn.lock para instalar dependencias"; \
    yarn install --frozen-lockfile || (echo "Error durante yarn install" && exit 1); \
  elif [ -f package-lock.json ]; then \
    echo "Usando package-lock.json para instalar dependencias"; \
    npm ci || (echo "Error durante npm ci" && exit 1); \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Usando pnpm-lock.yaml para instalar dependencias"; \
    corepack enable pnpm && pnpm install --frozen-lockfile || (echo "Error durante pnpm install" && exit 1); \
  else \
    echo "No se encontró ningún archivo de lock." && exit 1; \
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

# Build the application and catch any errors
RUN set -e; \
  echo "Iniciando el proceso de build..."; \
  if [ -f yarn.lock ]; then \
    echo "Usando yarn build"; \
    yarn build || (echo "Error durante yarn build" && exit 1); \
  elif [ -f package-lock.json ]; then \
    echo "Usando npm run build"; \
    npm run build || (echo "Error durante npm run build" && exit 1); \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Usando pnpm run build"; \
    corepack enable pnpm && pnpm run build || (echo "Error durante pnpm run build" && exit 1); \
  else \
    echo "No se encontró ningún archivo de lock para el build." && exit 1; \
  fi

# Final stage: Rebuild the source code only when needed
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the build files from the builder stage
COPY --from=builder /app/dist ./dist

# Create non-root group and user
RUN addgroup -S vitegroup && adduser -S viteuser -G vitegroup

# Assign correct permissions to the non-root user
RUN chown -R viteuser:vitegroup /app

# Switch to non-root user
USER viteuser

# Install serve to serve the static files
RUN npm install serve

# Expose the application's port
EXPOSE 3000

# Command to run the application
CMD ["npx", "serve", "-s", "dist"]
