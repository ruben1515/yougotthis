document.addEventListener("DOMContentLoaded", () => {
    const pink_heart = document.getElementById("heart-pink");
    const red_heart = document.getElementById("heart-red");
    const button = document.getElementById("cat-button");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".main-content");

    function getDayOfYear() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const diff = now - startOfYear; // Difference in milliseconds
        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
        return Math.floor(diff / oneDay) + 1; // Add 1 to include the current day
    }
    console.log(getDayOfYear());

    button.addEventListener("click", () => {
        // Clone the button and move it to the overlay
        const clonedButton = button.cloneNode(true);
        overlay.appendChild(clonedButton);

        // Add the animation class to the cloned button
        clonedButton.classList.add("expanded");
        clonedButton.classList.remove("breathing");

        setTimeout(() => {
            // Clear existing content after animation
            mainContent.innerHTML = "";

            // Fetch the new content
            fetch('./import337.html')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to load content");
                    }
                    return response.text();
                })
                .then((html) => {
                    // Insert the fetched HTML into the main content
                    mainContent.innerHTML = html;
                })
                .catch((error) => {
                    console.error("Error loading content:", error);
                    mainContent.innerHTML = `<p>Sorry, de nieuwe inhoud kon niet worden geladen.</p>`;
                });
        }, 1500); // Adjust delay to match animation timing
    });
});