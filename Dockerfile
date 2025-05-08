FROM node:24-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

# copy all of the files except for the ones in the dockerignore file
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]