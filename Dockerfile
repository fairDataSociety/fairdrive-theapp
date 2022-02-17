# Install dependencies only when needed
FROM node:lts AS deps

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:lts AS builder

WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
ARG NEXT_PUBLIC_FAIROSHOST
ENV NEXT_PUBLIC_FAIROSHOST=$NEXT_PUBLIC_FAIROSHOST
ARG NEXT_PUBLIC_FAIRDRIVEHOST
ENV NEXT_PUBLIC_FAIRDRIVEHOST=$NEXT_PUBLIC_FAIRDRIVEHOST
ARG NEXT_PUBLIC_NAME
ENV NEXT_PUBLIC_NAME=$NEXT_PUBLIC_NAME
ARG NEXT_PUBLIC_ETHERNA_INDEX_API_PATH
ENV NEXT_PUBLIC_ETHERNA_INDEX_API_PATH=$NEXT_PUBLIC_ETHERNA_INDEX_API_PATH
ARG HOST
ENV HOST=$HOST
ARG PORT
ENV PORT=$PORT

RUN echo $NEXT_PUBLIC_FAIROSHOST > .env \
    echo $NEXT_PUBLIC_FAIRDRIVEHOST >> .env \
    echo $NEXT_PUBLIC_NAME >> .env \
    echo $NEXT_PUBLIC_ETHERNA_INDEX_API_PATH >> .env \
    echo $HOST >> .env \
    echo $PORT >> .env

RUN yarn build

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner

WORKDIR /opt/app
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules

EXPOSE ${PORT}

CMD ["node_modules/.bin/next", "start"]
