
# Simple React URL Shortener

A client-side URL shortener application built with React. This project provides core URL shortening functionality and displays analytical insights, with all data managed within the client-side application using `localStorage` for persistence.

The application is built with plain CSS and standard HTML elements for a lightweight and simple user experience.

-----

## Features

  * **URL Shortening**: Convert long URLs into unique, shorter links.
  * **Custom Shortcodes**: Users can provide their own preferred shortcode for a link.
  * **Expiry Periods**: Set an optional validity period for each shortened URL (defaults to 30 minutes).
  * **Client-Side Redirection**: Automatically redirects users from the short link to the original long URL.
  * **Statistics Page**: A dedicated page to view analytics for all created links.
  * **Click Tracking**:
      * Total number of clicks for each link.
      * Detailed click data including the timestamp and source of each click.
  * **Data Persistence**: All URL data and statistics are saved in the browser's `localStorage`, preserving them across sessions.
  * **Logging Middleware**: A mandatory logging function is used to log important application events to the console, simulating a call to an external logging service.

-----

## Project Structure

The repository is organized into two main directories as required:

```
/
|-- Logging Middleware/
|   `-- logger.js
|
`-- Frontend Test Submission/
    `-- (React Application Source Code)
```

1.  **`Logging Middleware/`**: Contains the reusable logging function used throughout the frontend application.
2.  **`Frontend Test Submission/`**: Contains the complete source code for the React URL shortener web app.

-----

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository** (or set up the folders and files as described).

2.  **Navigate to the frontend application directory**:

    ```bash
    cd "Frontend Test Submission"
    ```

3.  **Install dependencies**:
    This will install React, React Router, and other necessary packages.

    ```bash
    npm install
    ```

4.  **Run the application**:
    This command starts the development server.

    ```bash
    npm start
    ```

The application will now be running and accessible at `http://localhost:3000`.

-----

## Technologies Used

  * **React**: For building the user interface.
  * **React Router**: For handling client-side routing and redirection.
  * **NanoID**: For generating unique random shortcodes.
  * **Plain CSS & HTML**: For styling and structure without relying on external UI libraries.
