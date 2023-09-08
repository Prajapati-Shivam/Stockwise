# Stockwise

Stockwise is a web application for managing and tracking stocks. It allows users to add, view, search, and update stock information.

![Stockwise Screenshot](/public/screenshot.png)

## Features

- User authentication using NextAuth.js
- Add new stocks with details like name, price, quantity, etc.
- View a list of all stocks
- Search for stocks by name
- Update stock details
- Delete stocks
- Responsive design for various screen sizes(working)

## Technologies Used

- Next.js: A React framework for building server-rendered web applications.
- MongoDB: A NoSQL database for storing stock information.
- NextAuth.js: An authentication library for handling user authentication.
- Axios: A Promise-based HTTP client for making API requests.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- Mantine: A modern React component library for UI components.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Prajapati-Shivam/Stockwise.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Stockwise
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   MONGODB_URI=your_mongodb_uri
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and access the application at [http://localhost:3000](http://localhost:3000).

## Usage

- Sign in with your Google account or use email/password credentials to create an account.
- Once logged in, you can add new stocks, view the list of stocks, search for stocks, and update or delete existing stocks.

## Acknowledgments

- Thanks to the Next.js, MongoDB, NextAuth.js, and other open-source projects that made this application possible.
