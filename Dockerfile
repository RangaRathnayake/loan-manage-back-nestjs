###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN yarn install --production

USER node

###################
# PRODUCTION
###################

FROM node:16-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Install PM2 globally
RUN npm install -g pm2

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Colombo /etc/localtime
RUN echo "Asia/Colombo" > /etc/timezone

# USER node
# CMD [ "node", "dist/main.js" ]

# Start the Node.js application with PM2
CMD ["pm2-runtime", "pm2-apps.config.json"]