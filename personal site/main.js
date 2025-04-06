// Home Page Behavior
function initHomePage() {
    const factButton = document.getElementById("factButton");
    const factDisplay = document.getElementById("factDisplay");
    const factImage = document.getElementById("factImage");

    // Mexico Facts Data with images
    const mexicoFacts = [
        {
            fact: "Mexico is known for its vibrant culture, which includes art, music, dance, and festivals such as Día de los Muertos and Cinco de Mayo.",
            image: "images/mexican-culture.jpg" // Replace with actual image path
        },
        {
            fact: "Mexico has a diverse geography with deserts, rainforests, and mountains. It borders the United States to the north and the Pacific Ocean to the south.",
            image: "images/city.jpg" // Replace with actual image path
        },
        {
            fact: "Mexico has a rich history, from ancient civilizations like the Aztecs and Mayans to its fight for independence from Spain.",
            image: "images/aztec.jpg" // Replace with actual image path
        },
        {
            fact: "Spanish is the official language of Mexico, but the country is also home to many indigenous languages, including Nahuatl, Maya, and Mixtec.",
            image: "images/spanish.jpg" // Replace with actual image path
        },
        {
            fact: "Chichen Itza, one of the New Seven Wonders of the World, is located in Mexico.",
            image: "images/chichenitza.jpg" // Replace with actual image path
        },
        {
            fact: "Mexico introduced chocolate, chilies, and corn to the world!",
            image: "images/food.jpg" // Replace with actual image path
        },
        {
            fact: "The Aztecs built their capital, Tenochtitlán, on a lake.",
            image: "images/teotihuacan.jpg" // Replace with actual image path
        },
        {
            fact: "Mexico is home to the largest pyramid in the world: The Great Pyramid of Cholula.",
            image: "images/pyramid.jpg" // Replace with actual image path
        },
        {
            fact: "There are 68 indigenous languages spoken in Mexico.",
            image: "images/Mexico-flag.jpg" // Replace with actual image path
        }
    ];

    // Handle random fact button click
    if (factButton && factDisplay) {
        factButton.addEventListener("click", () => {
            const randomIndex = Math.floor(Math.random() * mexicoFacts.length);
            const selectedFact = mexicoFacts[randomIndex];

            // Update the fact text
            factDisplay.textContent = selectedFact.fact;

            // Update the image
            if (factImage) {
                factImage.src = selectedFact.image; // Set the source to the corresponding image
                factImage.alt = selectedFact.fact; 
                factImage.style.display = "block";  // Set the alt text for accessibility
            }
        });
    }
}
// History Page Behavior
function initHistoryPage() {
    const eventList = document.querySelector(".history-list ul");
    if (eventList) {
        const historicalEvents = {
            "Pre-Columbian": [
                "1200 BC – Olmecs establish first major civilization",
                "1500 BC – Zapotecs develop in Oaxaca",
                "500 BC – Maya civilization emerges"
            ],
            "Colonial": [
                "1521 – Fall of the Aztec Empire",
                "1535 – Viceroyalty of New Spain established",
                "1810 – Grito de Dolores begins the war of independence"
            ],
            "Independence": [
                "1810 – Miguel Hidalgo calls for independence",
                "1821 – Mexico officially gains independence",
                "1836 – Texas declares independence from Mexico"
            ],
            "Revolution": [
                "1910 – Mexican Revolution begins",
                "1917 – New Constitution of Mexico",
                "1938 – Nationalization of the oil industry"
            ],
            "Modern": [
                "2000 – First non-PRI president elected in 71 years",
                "2010 – Bicentennial celebrations of independence",
                "2020 – Mexico tackles COVID-19 pandemic"
            ]
        };

        // Function to update the list of events
        function updateHistoryList(period) {
            const events = historicalEvents[period];
            eventList.innerHTML = ""; // Clear current list

            events.forEach(event => {
                const li = document.createElement("li");
                li.textContent = event;
                eventList.appendChild(li);
            });
        }

        // Add event listeners for period buttons
        const periodButtons = document.querySelectorAll(".timeline-buttons button");
        periodButtons.forEach(button => {
            button.addEventListener("click", () => {
                const period = button.textContent;
                updateHistoryList(period);
            });
        });
    }

    // Quiz Logic
    const questions = [
        {
            question: "What year did the Olmecs establish the first major civilization?",
            options: ["1200 BC", "500 AD", "1000 BC"],
            answer: "1200 BC"
        },
        {
            question: "What happened in 1810 in Mexico?",
            options: ["Fall of Aztec Empire", "Start of Independence", "Mexican Revolution begins"],
            answer: "Start of Independence"
        },
        {
            question: "Which city was founded in 1325?",
            options: ["Teotihuacan", "Tenochtitlán", "Chichen Itza"],
            answer: "Tenochtitlán"
        },
        {
            question: "When did the Mexican Revolution begin?",
            options: ["1910", "1821", "2000"],
            answer: "1910"
        }
    ];

    let currentQuestion = 0;

    const quizButton = document.getElementById("quizStart");
    const questionBox = document.getElementById("quiz-question");
    const optionsBox = document.querySelector(".quiz-options");
    const feedback = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("next-question");
    const tryAgainBtn = document.getElementById("try-again");

    function showQuestion(index) {
        const q = questions[index];
        questionBox.textContent = q.question;
        optionsBox.innerHTML = "";

        q.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.classList.add("option-btn");
            btn.addEventListener("click", () => checkAnswer(option, q.answer));
            optionsBox.appendChild(btn);
        });

        feedback.textContent = "";
        nextBtn.style.display = "none";
        tryAgainBtn.style.display = "none";
    }

    function checkAnswer(selected, correct) {
        const isCorrect = selected === correct;
        feedback.textContent = isCorrect ? "✅ Correct!" : `❌ Oops! The correct answer was "${correct}"`;
        feedback.style.color = isCorrect ? "green" : "red";

        // Disable all buttons
        const allBtns = optionsBox.querySelectorAll("button");
        allBtns.forEach(btn => btn.disabled = true);

        nextBtn.style.display = "inline-block";
    }

    quizButton?.addEventListener("click", () => {
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });

    nextBtn?.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            questionBox.textContent = "🎉 Quiz complete! Great job!";
            optionsBox.innerHTML = "";
            feedback.textContent = "";
            nextBtn.style.display = "none";
        }
    });

    tryAgainBtn?.addEventListener("click", () => {
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });
}


// Init Logic
window.addEventListener("DOMContentLoaded", () => {
    initHomePage();
    initHistoryPage();
});
