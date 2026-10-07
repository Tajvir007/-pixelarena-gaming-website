# For loghtweight Node.js applications, we use the official Node.js Alpine image as the base image. This image is optimized for smaller size and faster performance.
FROM node:18-alpine

# Set the working directory inside the container to /app. This is where the application code will be copied and executed.
WORKDIR /app

# 1st copy dependency files to leverage Docker cache. This allows us to avoid re-installing dependencies if they haven't changed, which speeds up the build process.
COPY package*.json ./

# Install dependencies using npm ci, which is optimized for continuous integration environments. The --omit=dev flag ensures that only production dependencies are installed, reducing the final image size.
RUN npm ci --omit=dev

# Copying application source code
COPY . .

# Application will listen port 3001, so we expose this port to allow communication with the container from the host machine or other containers.
EXPOSE 3001

# Application will start by running the server.js file using Node.js. The CMD instruction specifies the command to run when the container starts.
CMD ["node", "server.js"]
