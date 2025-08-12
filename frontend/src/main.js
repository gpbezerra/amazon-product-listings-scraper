// click event listener to the search button
document.getElementById("searchBtn").addEventListener("click", handleSearch);

async function handleSearch() {
    clearResults(); // clear previous search results

    const keyword = document.getElementById("keyword").value.trim();

    if (!keyword) return showToast("Please enter a keyword", "red", 3000)

    toggleButton(false); // disable button during the request
    const searchingToast = showToast("Searching...", "blue", -1);

    try {
        // fetch data from backend API with encoded keyword
        const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        const data = await res.json();

        searchingToast.hideToast();
        toggleButton(true); // enable button after response

        if (!data.data || data.data.length === 0) showToast("No products found", "#f59e0b");

        showToast("Products loaded successfully", "#10b981");
        renderResults(data.data);

    } catch (error) {
        searchingToast.hideToast();
        toggleButton(true);
        showToast("Error fetching data", "#ef4444");
    };
};

// render each product as a table row
function renderResults(products) {
    const resultsTable = document.getElementById("results");

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.title}</td>
            <td>⭐ ${product.rating}</td>
            <td>${product.reviews}</td>
            <td><img src="${product.image}" alt="${product.title}"></td>
        `;
        resultsTable.appendChild(row);
    });
};

// show a toast notification with custom message, time and color
function showToast(text, backgroundColor, duration = 3000, show = true) {
    const toast = Toastify({
        text,
        backgroundColor,
        duration
    });
    if (show) toast.showToast();
    return toast;
};

// clear all rows from the results table
const clearResults = () => document.getElementById("results").innerHTML = "";

// enable or disable the search button and update style
function toggleButton(enabled) {
    const button = document.getElementById("searchBtn");
    button.disabled = !enabled;

    if (!enabled) {
        button.style.opacity = "0.6";
        button.style.cursor = "not-allowed";
    } else {
        button.style.opacity = "1";
        button.style.cursor = "pointer";
    }
}
