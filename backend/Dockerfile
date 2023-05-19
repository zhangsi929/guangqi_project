# Use Node.js 16 LTS (Long Term Support) version
FROM node:16

# Create the working directory in Docker
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies in Docker
RUN npm ci

# Copy the rest of the code, but we already ignore some folder and files in .dockerignore
COPY . .

# we do this hack is because bcrypt buit on macos, we don't want use the one build by ipackage*.json, s not compatible with node 16
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Copy the 'openai' module from local_modules to node_modules
COPY src/local_modules/openai ./node_modules/openai

# Build the project
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3001

# Start the app
CMD [ "npm", "start" ]