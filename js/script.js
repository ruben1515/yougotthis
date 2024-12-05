document.addEventListener("DOMContentLoaded", () => {
    const pink_heart = document.getElementById("heart-pink");
    const red_heart = document.getElementById("heart-red");
    const start = document.getElementById("cat-button");
    const frontpage = document.getElementById("frontpage-container");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".main-content");
    let arrowleft = document.getElementById("arrowleft");
    let backbutton = document.getElementById("backbutton");

    Date.prototype.addDays = function(days) {//function to add days to variables with new Date()
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    async function checkIfFileExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok; // Returns true if the file exists
        } catch (error) {
            console.error('Error checking file:', error);
            return false; // Returns false if there's an error
        }
    }

    start.addEventListener("click", () => {//when we click on the button on the main page
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
        var selectedday = padNumber();//put the padded number in a variable to use in our file selector
        let yesterday = parseInt(selectedday) - 1;
        console.log('yesterday ' + yesterday);
        console.log('today ' + selectedday);
        // Clone the button and move it to the overlay
        const clonedButton = start.cloneNode(true);
        overlay.appendChild(clonedButton);

        // Add the animation class to the cloned button
        clonedButton.classList.add("expanded");
        clonedButton.classList.remove("breathing");
        start.classList.add("pointer-disabled");

        const fileUrl = './html/import'+yesterday+'.html';
        checkIfFileExists(fileUrl).then((exists) => {
            if (exists) {
                console.log('File exists! Performing action...');
                yesterday_exists = true;
                // Perform action if file exists
            } else {
                console.log('File does not exist! Performing alternative action...');
                // Perform alternative action if file doesn't exist
            }
        });

        setTimeout(() => {
            // Clear existing content after animation
            mainContent.innerHTML = "";
            // Fetch the new content
            fetch('./html/import'+selectedday+'.html')//with the padded number variable
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
            if(yesterday_exists){
                arrowleft.classList.remove("hidden");
                backbutton.classList.remove("pointer-disabled");
            }
        }, 500); // Adjust delay to match animation timing
        //TOEVOEGEN OM PAGINA 2 TE LATEN IN FADEN
        //MISSCHIEN SCHRIJF MANIER GEBRUIKEN ZODAT HET LIJKT ALSOF HET GETYPT WORDT WANNEER HET VERSCHIJNT?
    });
});