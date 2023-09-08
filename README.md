# Inventory Management System

The Inventory Management System is a web application built using Next.js, React, and MongoDB. It allows users to manage inventory, update product details, and keep track of stock levels.

## Features

- View a list of products in the inventory
- Add new products to the inventory
- Update product details such as quantity and price
- Delete products from the inventory

## Technologies Used

- Next.js: A React framework for building server-side rendered and statically generated web applications.
- React: A JavaScript library for building user interfaces.
- MongoDB: A NoSQL database for storing inventory data.
- Express: A minimal and flexible Node.js web application framework used in the Next.js API routes.
- Tailwind CSS: A utility-first CSS framework for quickly styling the application.
- Git: Version control system for tracking changes in the codebase.

## Getting Started

### Prerequisites

- Node.js (version 12 or above)
- MongoDB Atlas account (or a local MongoDB installation)
- MongoDB connection string

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/inventory-management-system.git
   ```

2. Install the dependencies:

   ```
   cd inventory-management-system
   npm install
   ```

3. Create a `.env.local` file in the root directory of the project and add your MongoDB connection string:

   ```
   MONGO_URI=your-mongodb-connection-string
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or new features to add, please open an issue or submit a pull request.
