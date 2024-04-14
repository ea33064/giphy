document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const resultsEl = document.getElementById("results");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const q = searchInput.value.trim(); // Trim whitespace from the search query
    if (q !== "") {
      // Check if the search query is not empty
      search(q);
    }
  });

  function search(q) {
    const apikey = "gDB5BBjDNKB7SiV4rxlWM2ZBbTQ3lmjw";
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}`;

    fetch(path)
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        if (json.data && json.data.length > 0) {
          // Check if there are results
          let resultsHTML = json.data
            .map(function (obj) {
              const { url, width, height, title } = obj.images.fixed_width;
              return `<img src="${url}" width="${width}" height="${height}" alt="${title}">`;
            })
            .join("");
          resultsEl.innerHTML = resultsHTML;
        } else {
          resultsEl.innerHTML = "No results found";
        }
      })
      .catch(function (err) {
        console.error("Error fetching data:", err);
        resultsEl.innerHTML = "An error occurred while fetching data";
      });
  }
});
