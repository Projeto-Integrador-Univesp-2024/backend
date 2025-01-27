FROM node:18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 9229

# RUN npm run build

# RUN npx prisma generate

# USER root

CMD ["npm", "run", "start:dev"]

FROM node:18 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /user/src/app/dist ./dist

CMD ["node", "dist/main"]