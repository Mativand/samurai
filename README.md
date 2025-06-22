## Running the Application

You can run the application in three different modes: using Docker in development mode, using Docker in production mode, or running it directly on your local machine.

### Running with Docker (Development Mode)

1. Ensure you have Docker installed on your machine.
2. It is recommended to remove the `node_modules` directory before building the container to avoid potential issues:
   ```sh
   rm -rf node_modules
   ```
3. Build and start the Docker container using the following command:
   ```sh
   docker compose -f compose-dev.yml up --build
   ```
4. Open your browser and navigate to `http://localhost:5173` to see the application running.

### Running with Docker (Production Mode)

1. Ensure you have Docker installed on your machine.
2. Build and start the Docker container using the following command:
   ```sh
   docker compose -f compose-prod.yml up --build
   ```
4. Open your browser and navigate to `http://localhost` to see the application running.

### Running Directly on Your Local Machine

1. Ensure you have Node.js and Yarn installed on your machine.
2. Install the dependencies by running:
   ```sh
   yarn install
   ```
3. Start the development server by running:
   ```sh
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:5173` to see the application running.
