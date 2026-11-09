
# Etapa 1: instalação e build do Angular
FROM node:24.11.0-alpine AS frontend-build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build -- --configuration production

# Etapa 2: execução do Angular SSR
FROM node:24.11.0-alpine AS frontend-runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=frontend-build /app/dist/ride-frontend ./dist/ride-frontend

EXPOSE 4000

CMD ["node", "dist/ride-frontend/server/server.mjs"]
