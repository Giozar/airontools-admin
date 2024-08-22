# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manager files and install dependencies based on the lockfile
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found." && exit 1; \
  fi

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "No lockfile found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS runner
WORKDIR /app

# Environment configuration
ENV NODE_ENV=production
ENV VITE_API_URL=http://localhost:4000
ENV PORT=3000

# Create non-root group and user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 viteuser
RUN addgroup -S vitegroup && adduser -S viteuser -G vitegroup

# Copy necessary files from the builder stage
COPY --from=builder /app/dist ./dist

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
