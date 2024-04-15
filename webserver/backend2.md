# Backend Coding Challenge: Building a RESTful API with Node.js and MongoDB

You're tasked with building a RESTful API for managing a collection of users in a MongoDB database using Node.js. Your API should support CRUD operations (Create, Read, Update, Delete) for users and implement basic authentication using JWT (JSON Web Tokens). Here are the specific requirements:

1. **User Model**: Define a MongoDB schema for storing user data. Include fields such as `name`, `email`, `password` (hashed), and any other relevant information.

2. **Authentication Endpoint**: Implement an endpoint for user authentication. Users should be able to log in with their email and password and receive a JWT token upon successful authentication.

3. **User CRUD Endpoints**:
   - Create a new user: Implement an endpoint to register a new user. Validate the input data (e.g., email format, password strength).
   - Get all users: Implement an endpoint to fetch all users from the database.
   - Get user by ID: Implement an endpoint to retrieve a user by their ID.
   - Update user: Implement an endpoint to update user information. Only authenticated users should be able to update their own information.
   - Delete user: Implement an endpoint to delete a user. Only authenticated users should be able to delete their own account.

4. **Middleware**: Write middleware functions to authenticate requests using the JWT token. Unauthorized requests should be rejected with an appropriate error message.

5. **Error Handling**: Implement error handling middleware to catch and format errors in a consistent manner. Handle common errors such as validation errors, database errors, and unauthorized access.

6. **Testing**: Write unit tests for your API endpoints using a testing framework like Jest. Test both the success and error cases for each endpoint.

7. **Documentation**: Provide clear and concise documentation for your API endpoints, including details on request/response formats, authentication requirements, and error handling.

Bonus Points (Optional):
- Implement pagination for fetching users in batches.
- Add validation middleware to sanitize and validate input data.
- Use environment variables for configuration (e.g., MongoDB connection string, JWT secret).
- Implement rate limiting to prevent abuse of your API.


**Submission Instructions:**
- Fork the provided starter repository or create your own project structure.
- Commit your code to a Git repository and provide a link to your repository.
- Include instructions on how to run your application locally.

