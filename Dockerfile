# Build stage
FROM node:20-slim AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built assets
COPY --from=builder /app/dist ./

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the correct port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
