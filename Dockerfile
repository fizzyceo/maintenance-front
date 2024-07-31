# Use a specific version of Node.js as your base image
FROM node:14

# Create a working directory inside the container
WORKDIR /app

# Copy your source code into the container
COPY . .

# Install dependencies (if you have a package.json file)
RUN npm install --force

# Specify the port your application will listen on
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
