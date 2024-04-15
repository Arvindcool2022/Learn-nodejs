# Docker Coding Challenge: Containerizing a Node.js and MongoDB Application

Your task is to containerize a Node.js and MongoDB application using Docker. The application is a simple RESTful API for managing a collection of users, similar to the one described in the previous backend challenge. Here are the specific requirements:

1. **Dockerfile**: Write a Dockerfile to build a Docker image for your Node.js application. Use a suitable base image for Node.js and include instructions to install dependencies, copy application files, and expose the necessary port for your API.

2. **Docker Compose**: Write a Docker Compose file to define the services for your Node.js application and MongoDB database. Use separate services for the Node.js application and MongoDB database, and define the necessary environment variables for configuration.

3. **Volume Mounts**: Configure Docker Compose to use volume mounts for persisting MongoDB data. Ensure that MongoDB data is stored outside of the container so that it persists between container restarts.

4. **Networking**: Configure Docker Compose to create a custom network for your services. Ensure that the Node.js application can communicate with the MongoDB database using the service name as the hostname.

5. **Environment Variables**: Use environment variables to configure your Node.js application, such as the MongoDB connection string and any other necessary configuration options.

6. **Logging**: Configure logging for your Node.js application to output logs to stdout/stderr. Ensure that Docker captures these logs and provides them through the Docker CLI or Docker Dashboard.

7. **Health Checks**: Implement health checks for your Node.js application and MongoDB database. Configure Docker Compose to perform periodic health checks and restart services if they become unhealthy.

8. **Security**: Implement best practices for securing your Docker containers, such as running processes with non-root users, limiting container privileges, and avoiding hard-coded secrets in Dockerfiles or Compose files.

9. **Testing**: Test your Docker configuration locally to ensure that your application runs correctly within containers. Verify that the Node.js application can connect to the MongoDB database and perform CRUD operations as expected.

10. **Documentation**: Provide clear and concise documentation on how to build and run your Docker containers locally. Include instructions for developers to modify configuration options and customize the Docker setup if necessary.

Bonus Points (Optional):
- Use Docker Swarm or Kubernetes for orchestration instead of Docker Compose.
- Implement container health checks and auto-scaling based on resource usage.
- Configure container security scanning tools to detect vulnerabilities in your Docker images.
- Set up a CI/CD pipeline to automate the build and deployment of your Docker containers.

**Submission Instructions:**
- Fork the provided starter repository or create your own project structure.
- Commit your Docker configuration files and any necessary application changes to a Git repository.
- Provide instructions on how to build and run your Docker containers locally using Docker Compose or another container orchestration tool.


This Docker coding challenge covers various aspects of containerization, including Dockerfile creation, Docker Compose configuration, volume mounts, networking, environment variables, logging, health checks, security best practices, testing, and documentation. Candidates who successfully complete this challenge demonstrate proficiency in containerization and Docker usage for deploying and managing applications in a production environment.