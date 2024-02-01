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

# Set host to localhost / the docker image
ENV NUXT_HOST=0.0.0.0

# Set app port
ENV NUXT_PORT=$PORT

# Set the base url
ENV NUXT_PROXY_API=$PROXY_API

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
