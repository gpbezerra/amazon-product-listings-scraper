# Amazon Product Listings Scraper

A simple fullstack application that scrapes Amazon product listings from the first page of search results for a given keyword.

---

## Features

- Backend with Bun, Express, Axios, and JSDOM for scraping and parsing Amazon search results.
- Frontend built with Vanilla JavaScript and Vite for a responsive, user-friendly UI.
- Displays product title, rating, number of reviews, and product image.
- Toast notifications for user feedback.
- Graceful error handling.

---

## Prerequisites

- [Bun](https://bun.sh/) installed.
- Internet connection to access Amazon.

---

## Setup & Run

1. **Clone the repository**

```bash
git clone git@github.com:gpbezerra/amazon-product-listings-scraper.git
cd amazon-product-listings-scraper
```

2. **Install dependencies**

You need to install dependencies for both backend and frontend.

Run the following command from the root directory to install dependencies for both backend and frontend:

```bash
bun install:all
```

3. **Run backend and frontend concurrently**

From the root directory, run:

```bash
bun run dev
```

This will start:

- Backend API server on [http://localhost:3000](http://localhost:3000)
- Frontend dev server (Vite) on [http://localhost:5173](http://localhost:5173)

---

## Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Enter a search keyword (e.g., “headphones”).
3. Click **Search**.
4. View the scraped product listings displayed in the table.

---

## Project Structure

```
amazon-product-listings-scraper/
├── backend/
│   ├── src/                  # Backend source code
│   │   ├── index.ts          # Entry point of the backend server
│   │   └── types.ts          # TypeScript type definitions
│   ├── package.json          # Backend dependencies and scripts 
│   └── tsconfig.json         # TypeScript configuration for backend 
├── frontend/
│   ├── src/                  # Frontend source code
│   │   ├── index.html        # Frontend HTML file
│   │   ├── main.js           # Frontend JavaScript logic
│   │   └── style.css         # Frontend CSS styles
│   ├── package.json          # Frontend dependencies and scripts 
│   └── vite.config.js        # Vite configuration file for frontend
├── package.json              # Root dependencies and scripts
└── README.md                 # Project documentation
```

---

## Notes

- Backend uses CORS middleware to allow frontend API requests.
- Scraping relies on Amazon’s current HTML structure and user-agent headers to avoid blocking.

---