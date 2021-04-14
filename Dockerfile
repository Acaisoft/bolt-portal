# build environment
FROM node:8.12 as build

ENV REACT_APP_KEYCLOAK_URL "https://keycloak.bolt-us-dev.acaisoft.io/auth"
ENV REACT_APP_HASURA_WS_URL "wss://hasura.bolt-us-dev.acaisoft.io/v1/graphql"
ENV REACT_APP_HASURA_API_URL "https://hasura.bolt-us-dev.acaisoft.io/v1/graphql"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN yarn
COPY . ./
RUN yarn build

# production environment
FROM nginx:1.15-alpine

COPY --from=build /app/build/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/

# README
# docker build -t eu.gcr.io/acai-bolt/bolt-portal .
# docker run --rm --name bolt-portal -p 80:80 -t bolt-portal
