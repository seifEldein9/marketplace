# 1. Use the official Node.js image
FROM node:20

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json to the container
COPY package*.json ./

# 4. Install dependencies inside the container
RUN npm install

# 5. Copy the rest of the application code into the container
COPY . .

# 6. Expose the port that the app will run on
EXPOSE 4000

# 7. Run the application
CMD ["node", "src/server.js"]
