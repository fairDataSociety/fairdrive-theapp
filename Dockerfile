FROM node:16 as builder

WORKDIR /app
COPY package*.json ./
RUN echo "REACT_APP_FAIROSHOST=http://localhost:9090/v1/" >> .env
RUN echo "REACT_APP_FAIRDRIVEHOST=http://localhost:3000" >> .env
RUN echo "REACT_APP_NAME=Fairdrive" >> .env
RUN echo "REACT_APP_ETHERNA_INDEX_API_PATH=https://index.etherna.io/api/v0.2" >> .env
RUN yarn
COPY app .
RUN yarn build

FROM nginx:1.21.1-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
