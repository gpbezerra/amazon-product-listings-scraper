import express, { Request, Response } from "express";
import axios from "axios";
import { JSDOM } from "jsdom";
import cors from "cors";

import { Product } from "./types";

const app = express();
const PORT: number = 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Hello World!" });
});

app.get("/api/scrape", async (req: Request, res: Response) => {
    const keyword: string = req.query.keyword;

    if (!keyword) return res.status(400).json({ error: "keyword is required" });

    try {
        // using encodeURIComponent to handle special characters
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

        // fetch HTML with headers simulating my real browser to avoid blocking
        const response = await axios.get(url, {
            headers: {
                "Accept": "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",
                "Host": "www.amazon.com",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0",
                "Accept-Language": "en-US,en;q=0.9",
                "TE": "trailers"
            }
        });

        const html = response.data;
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const products: Product[] = [];

        // select each product container on the search result page
        document.querySelectorAll("div.s-main-slot > div.s-result-item").forEach((item) => {
            const title = item.querySelector("h2 span")?.textContent?.trim() || null;
            const rating = item.querySelector("span.a-icon-alt")?.textContent?.trim() || null;
            const reviews = item.querySelector("span.a-size-base.s-underline-text")?.textContent?.trim() || null;
            const image = item.querySelector("img.s-image")?.getAttribute("src") || null;

            // only add product if all fields are present
            if (title && image && rating && reviews) {
                products.push({
                    title,
                    rating,
                    reviews,
                    image
                });
            }
        });

        res.status(200).json({ data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data from Amazon" });
    }
});

// Start server on specified port
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
