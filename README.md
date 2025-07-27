# Inventory Management Project

This project is a simple inventory management system with a React front-end and a Laravel back-end.

## Features

-   **Product Management:** Add, edit, and delete products.
-   **Category Management:** Add new categories for products.
-   **Product Filtering:** Filter products by category.
-   **Responsive UI:** A clean and responsive user interface for managing inventory.

## Front-End (React)

The front-end is a single-page application built with React and Vite.

### Technologies Used

-   React
-   Vite
-   Tailwind CSS
-   React Query
-   ESLint

### Setup and Installation

1.  Navigate to the `front-end` directory:
    ```bash
    cd front-end
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.

## Back-End (Laravel)

The back-end is a RESTful API built with Laravel.

### Technologies Used

-   PHP 8.2
-   Laravel 12
-   Sanctum (for API authentication)

### Setup and Installation

1.  Navigate to the `inventory-management` directory:
    ```bash
    cd inventory-management
    ```
2.  Install the dependencies:
    ```bash
    composer install
    ```
3.  Create a copy of the `.env.example` file and name it `.env`:
    ```bash
    cp .env.example .env
    ```
4.  Generate an application key:
    ```bash
    php artisan key:generate
    ```
5.  Run the database migrations:
    ```bash
    php artisan migrate
    ```
6.  Start the development server:
    ```bash
    php artisan serve
    ```
    The API will be available at `http://localhost:8000`.

### Available Scripts

-   `composer run dev`: Starts the development server, queue listener, and Vite dev server.
-   `composer run test`: Runs the tests.

## API Usage

The back-end provides the following API endpoints:

### Products

-   `GET /api/products`: Get a list of all products.
-   `POST /api/products`: Create a new product.
-   `GET /api/products/{id}`: Get a specific product.
-   `PUT /api/products/{id}`: Update a specific product.
-   `DELETE /api/products/{id}`: Delete a specific product.

### Categories

-   `GET /api/categories`: Get a list of all categories.
-   `POST /api/categories`: Create a new category.
