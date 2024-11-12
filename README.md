# Library Management System API

## Project Description

The **Library Management System API** is a backend API designed to streamline library operations by enabling CRUD (Create, Read, Update, Delete) functionalities for books, members, and borrow records. The API allows library staff and members to manage book inventories, memberships, and borrowing activities. Additional endpoints enable the borrowing and returning of books, ensuring accurate and up-to-date records.

## Live URL

You can access the live deployment of the API at: [https://ph-assignment-08-one.vercel.app/](https://ph-assignment-08-one.vercel.app/)

## Technology Stack & Packages

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (using UUID for unique identification)
- **Packages**:
  - `express` - for creating the server and handling routing
  - `prisma`- for database migrations and ORM
  - `uuid` - for generating unique identifiers
  - `dotenv` - for environment variable management
  - `ts-node` - for running TypeScript files

## Setup Instructions

To set up and run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/library-management-api.git
   cd library-management-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and configure the following variables:

   ```plaintext
   DATABASE_URL=your-database-url
   PORT=your-port
   ```

4. **Database Migration**:
   Run the necessary SQL commands or migrations to set up your database tables.

   ```bash
   npx prisma migrate dev
   ```

5. **Start the server**:
   ```bash
   npm start
   ```
   The API should now be accessible at `http://localhost:your-port`.

## Key Features & Functionality

- **Books Management**:

  - Create, Read, Update, and Delete book records
  - Unique UUID identifiers for each book

- **Members Management**:

  - CRUD operations for library members
  - UUIDs used for unique identification

- **Borrow Records Management**:

  - Log borrow records when a member borrows or returns a book
  - Track due dates and return dates

- **Borrow and Return Books**:
  - Special endpoints for managing borrowing and returning processes, checking due dates.

## Known Issues/Bugs

- **Concurrency Issues**: Potential race conditions when multiple users try to borrow or return the same book simultaneously.
- **Error Handling**: Limited error responses for invalid data in certain endpoints.
- **Security**: No authentication or authorization mechanisms in place.

## Additional Information

- **Status**: Active development; new features and improvements are being added.
