FROM node:18.14.2-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY package.json package-lock.json .
RUN npm install --production=false

COPY . .

RUN npm run build
RUN npm prune

# Run
FROM base

EXPOSE $PORT

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=$PORT

ENV NUXT_PROXY_API='http://timetable-api:8000/'

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
