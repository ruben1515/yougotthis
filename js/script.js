document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("cat-button");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".main-content");

    button.addEventListener("click", () => {
        // Clone the button and move it to the overlay
        const clonedButton = button.cloneNode(true);
        overlay.appendChild(clonedButton);

        // Add the animation class to the cloned button
        clonedButton.classList.add("expanded");

        setTimeout(() => {
            mainContent.innerHTML = ""; // Clear existing content
        }, 1500); // Adjust delay as needed
    });
});