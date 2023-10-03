FROM node:lts-alpine as build

#ARG VITE_APP_API_URL=LINK

WORKDIR /app
COPY . . 

RUN yarn install && \
      yarn build


FROM node:lts-alpine as release

WORKDIR /app
RUN mkdir .nuxt .output node_modules

COPY --from=build app/.nuxt/ ./.nuxt/
COPY --from=build app/.output/ ./.output/
COPY --from=build app/node_modules/ ./node_modules/
COPY --from=build app/package.json .
COPY --from=build app/nuxt.config.ts .

EXPOSE 3000
ENTRYPOINT [ "yarn", "preview" ]
