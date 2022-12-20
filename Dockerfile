# Install dependencies only when needed
FROM node:lts AS deps

WORKDIR /opt/app
COPY *.json ./
RUN npm install

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
ARG NEXT_PUBLIC_RPC_URL
ENV NEXT_PUBLIC_RPC_URL=$NEXT_PUBLIC_RPC_URL
ARG NEXT_PUBLIC_BEE_URL
ENV NEXT_PUBLIC_BEE_URL=$NEXT_PUBLIC_BEE_URL
ARG NEXT_PUBLIC_BEE_DEBUG_URL
ENV NEXT_PUBLIC_BEE_DEBUG_URL=$NEXT_PUBLIC_BEE_DEBUG_URL
ARG NEXT_PUBLIC_ENS_REGISTRY_ADDRESS
ENV NEXT_PUBLIC_ENS_REGISTRY_ADDRESS=$NEXT_PUBLIC_ENS_REGISTRY_ADDRESS
ARG NEXT_PUBLIC_PUBLIC_RESOLVER_ADDRESS
ENV NEXT_PUBLIC_PUBLIC_RESOLVER_ADDRESS=$NEXT_PUBLIC_PUBLIC_RESOLVER_ADDRESS
ARG NEXT_PUBLIC_SUBDOMAIN_REGISTRAR_ADDRESS
ENV NEXT_PUBLIC_SUBDOMAIN_REGISTRAR_ADDRESS=$NEXT_PUBLIC_SUBDOMAIN_REGISTRAR_ADDRESS
ARG NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT
ENV NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT=$NEXT_PUBLIC_CREATE_ACCOUNT_REDIRECT
ARG NEXT_PUBLIC_NFT_GENERATOR_URL
ENV NEXT_PUBLIC_NFT_GENERATOR_URL=$NEXT_PUBLIC_NFT_GENERATOR_URL
ARG NEXT_PUBLIC_GLOBAL_BATCH_ID
ENV NEXT_PUBLIC_GLOBAL_BATCH_ID=$NEXT_PUBLIC_GLOBAL_BATCH_ID
ARG HOST
ENV HOST=$HOST
ARG PORT
ENV PORT=$PORT

SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN env |grep 'NEXT\|HOST\|PORT' > .env

RUN npm run build

# Production image, copy all the files and run next
#FROM node:lts-alpine AS runner
#
#WORKDIR /opt/app
#COPY --from=builder /opt/app/next.config.js ./
#COPY --from=builder /opt/app/public ./public
#COPY --from=builder /opt/app/.next ./.next
#COPY --from=builder /opt/app/node_modules ./node_modules
#
#EXPOSE ${PORT}
#
#CMD ["node_modules/.bin/next", "start"]

#webserver
FROM nginx:stable-alpine
COPY --from=builder /opt/app/out /usr/share/nginx/html
RUN chown -R nginx /usr/share/nginx/html
RUN echo "real_ip_header X-Forwarded-For;" \
    "real_ip_recursive on;" \
    "set_real_ip_from 0.0.0.0/0;" > /etc/nginx/conf.d/ip.conf
RUN sed -i '/index  index.html index.htm/c\        try_files $uri $uri/ /index.html =404;' /etc/nginx/conf.d/default.conf
RUN if [ -f /usr/share/nginx/html/404.html ]; then sed -i 's/#error_page/error_page/g' /etc/nginx/conf.d/default.conf; fi
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
