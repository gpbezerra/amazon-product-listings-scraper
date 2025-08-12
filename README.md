# Amazon Product Listings Scraper

A simple application that scrapes Amazon product listings from the first page of search results for a given keyword.

---

## Prerequisites

- [Bun](https://bun.sh/) installed.

---

## Setup & Run

1. **Clone the repository**

```bash
git clone git@github.com:gpbezerra/amazon-product-listings-scraper.git
cd amazon-product-listings-scraper
```

2. **Install dependencies**

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

## Notes

- Backend uses CORS middleware to allow frontend API requests.
- Scraping relies on Amazon’s current HTML structure and user-agent headers to avoid blocking.

---