# transportistas-api

## Description
The `transportistas-api` is a RESTful API built with Node.js and Express for managing transportistas. It provides endpoints for creating, reading, updating, and deleting transportistas, and connects to a MongoDB database using Mongoose.

## Technologies Used
- Node.js
- Express
- Mongoose
- CORS
- dotenv

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- MongoDB database (local or cloud)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd transportistas-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

### Running the Application
1. Start the server:
   ```
   npm start
   ```
2. The API will be running on `http://localhost:3000`.

## API Endpoints
- `GET /transportistas` - Retrieve all transportistas
- `POST /transportistas` - Create a new transportista
- `GET /transportistas/:id` - Retrieve a transportista by ID
- `PUT /transportistas/:id` - Update a transportista by ID
- `DELETE /transportistas/:id` - Delete a transportista by ID

## License
This project is licensed under the MIT License.