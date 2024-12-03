document.addEventListener("DOMContentLoaded", () => {
    const pink_heart = document.getElementById("heart-pink");
    const red_heart = document.getElementById("heart-red");
    const button = document.getElementById("cat-button");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".main-content");

    Date.prototype.addDays = function(days) {//function to add days to variables with new Date()
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function getDayOfYear() {//function to get the current day of the year (for example day 337)
        var now = new Date();//get date
        var now = now.addDays(0);//add 0 days

        const startOfYear = new Date(now.getFullYear(), 0, 1);//get date for the start of the year
        const diff = now - startOfYear; // Difference in milliseconds
        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
        return Math.floor(diff / oneDay) + 1; // Add 1 to include the current day
    }
    function padNumber(){//function to add leading zeros if the number is shorter than 3
        return getDayOfYear().toString().padStart(3, '0');
    }

    button.addEventListener("click", () => {//when we click on the button on the main page
        var selectedday = padNumber();//put the padded number in a variable to use in our file selector
        console.log(selectedday);
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
            fetch('./import'+selectedday+'.html')//with the padded number variable
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
                    mainContent.innerHTML = `<p>Sorry, de inhoud kon niet worden geladen.</p>`;
                });
        }, 500); // Adjust delay to match animation timing
        //TOEVOEGEN OM PAGINA 2 TE LATEN IN FADEN
        //MISSCHIEN SCHRIJF MANIER GEBRUIKEN ZODAT HET LIJKT ALSOF HET GETYPT WORDT WANNEER HET VERSCHIJNT?
    });
});