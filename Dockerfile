FROM node:13.12.0

WORKDIR /usr/src/leanify-dev

# ENVIORMENTAL VARIABLES


# INSTALL APP DEPENDECIES
COPY package*.json ./
RUN npm install

COPY . .

# BUILD APPLICATION
RUN npm run build

# EXPOSE PORT
EXPOSE 8000

# RUN FOR PRODUCTION
CMD [ "node", "./build/main.js", "--production" ]