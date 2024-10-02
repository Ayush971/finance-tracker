# Personal Finance Tracker

A full-stack web application for tracking personal finances. This app helps users manage their expenses by adding, deleting, and categorizing them. It also provides visual insights into spending patterns through charts and allows for report generation in CSV format.

## Key Features

- **Expense Tracking**: Add, view, and delete expenses. Filter expenses by category or time period (e.g., month or days).
- **Dashboard**: Visualize expenses through pie and line charts.
- **Report Generation**: Download a CSV report of expenses filtered by month or custom time periods.
- **Categories**: Sort expenses based on different categories like groceries, bills, entertainment, etc.

## Technologies Used

### Backend
- **Node.js & Express**: Handles API requests and server-side logic.
- **MongoDB & Mongoose**: Database for storing expenses.
- **Axios**: Manages HTTP requests between the frontend and backend.

### Frontend
- **React**: User interface for adding, viewing, and interacting with expenses.
- **React Router**: Used for navigation between different views/pages.
- **Chart.js & react-chartjs-2**: Visualize expenses through interactive charts.

## Project Structure

The project is structured into two main parts: `frontend` and `backend`.

- **Frontend**: Contains all the React components and UI code.
  - **/src/components**: Components like the dashboard, expense table, and charts.
  - **/src/styles**: Custom CSS for the application.
  
- **Backend**: Contains the Express server and API routes.
  - **/routes**: API routes for handling expenses (GET, POST, DELETE).
  - **/models**: Mongoose models to represent expenses in the database.

## Installation & Setup

To get the project up and running locally, follow these steps:

### Prerequisites

- **Node.js** (version 14.x or later)
- **MongoDB** (running locally or using a cloud instance like MongoDB Atlas)

### Installation

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/your-username/Project-1.git
   cd Project-1
   
2. **Install Dependencies**:
   - **for backend**
     
     ```bash
     cd backend
     npm install
     
   - **for frontend**
     
     ```bash
     cd frontend
     npm install
3. **Set up environment variables**: Create a .env file in the backend folder with the following details:
   
    ```makerfile
    MONGO_URI=<your_mongo_database_url>
    PORT=5000

4. **Run Backend Server**:
   
   ```bash
   cd backend
   npm start
   
5. **Run Frontend Server**:
   
   ```bash
   cd frontend
   npm start

The frontend will be running on http://localhost:3000 and the backend on http://localhost:5000.

   
