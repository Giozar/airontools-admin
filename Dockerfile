# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
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

# Build the application with environment variables
FROM base AS builder
WORKDIR /app

# Define build arguments for Vite
ARG VITE_API_URL
ARG VITE_PORT
ARG VITE_AI_URL

# Set environment variables for the build process
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PORT=${VITE_PORT}
ENV VITE_AI_URL=${VITE_AI_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "No lockfile found." && exit 1; \
  fi

# Final stage: Rebuild the source code only when needed
FROM base AS runner
WORKDIR /app

# Set the environment for the runtime
ENV NODE_ENV=production
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PORT=${VITE_PORT}
ENV VITE_AI_URL=${VITE_AI_URL}

# Create non-root group and user
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
