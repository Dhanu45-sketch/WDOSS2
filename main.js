// Drug data: Contains details of all available drugs, their categories, and prices
const drugData = [
    { "name": "Aspirin", "type": "Analgesic", "price": 350 },
    { "name": "Paracetamol", "type": "Analgesic", "price": 450 },
    { "name": "Ibuprofen", "type": "Analgesic", "price": 500 },
    { "name": "Naproxen", "type": "Analgesic", "price": 600 },
    { "name": "Diclofenac", "type": "Analgesic", "price": 750 },
    { "name": "Ketorolac", "type": "Analgesic", "price": 800 },
    { "name": "Amoxicillin", "type": "Antibiotic", "price": 400 },
    { "name": "Ciprofloxacin", "type": "Antibiotic", "price": 1400 },
    { "name": "Levofloxacin", "type": "Antibiotic", "price": 2400 },
    { "name": "Azithromycin", "type": "Antibiotic", "price": 3400 },
    { "name": "Doxycycline", "type": "Antibiotic", "price": 4400 },
    { "name": "Clindamycin", "type": "Antibiotic", "price": 5400 },
    { "name": "Cephalexin", "type": "Antibiotic", "price": 6400 },
    { "name": "Penicillin", "type": "Antibiotic", "price": 4200 },
    { "name": "Erythromycin", "type": "Antibiotic", "price": 4020 },
    { "name": "Trimethoprim", "type": "Antibiotic", "price": 4700 },
    { "name": "Metronidazole", "type": "Antibiotic", "price": 4400 },
    { "name": "Rifaximin", "type": "Antibiotic", "price": 4700 },
    { "name": "Fluoxetine", "type": "Antidepressant", "price": 350 },
    { "name": "Sertraline", "type": "Antidepressant", "price": 550 },
    { "name": "Citalopram", "type": "Antidepressant", "price": 600 },
    { "name": "Escitalopram", "type": "Antidepressant", "price": 700 },
    { "name": "Paroxetine", "type": "Antidepressant", "price": 750 },
    { "name": "Amitriptyline", "type": "Antidepressant", "price": 800 },
    { "name": "Diphenhydramine", "type": "Antihistamine", "price": 150 },
    { "name": "Cetirizine", "type": "Antihistamine", "price": 250 },
    { "name": "Loratadine", "type": "Antihistamine", "price": 300 },
    { "name": "Fexofenadine", "type": "Antihistamine", "price": 350 },
    { "name": "Lisinopril", "type": "Antihypertensive", "price": 400 },
    { "name": "Amlodipine", "type": "Antihypertensive", "price": 450 },
    { "name": "Losartan", "type": "Antihypertensive", "price": 500 },
    { "name": "Enalapril", "type": "Antihypertensive", "price": 550 },
    { "name": "Ramipril", "type": "Antihypertensive", "price": 600 },
    { "name": "Hydrochlorothiazide", "type": "Antihypertensive", "price": 650 },
    { "name": "Valsartan", "type": "Antihypertensive", "price": 700 },
    { "name": "Metoprolol", "type": "Antihypertensive", "price": 750 },
    { "name": "Olmesartan", "type": "Antihypertensive", "price": 800 },
    { "name": "Furosemide", "type": "Antihypertensive", "price": 850 },
    { "name": "Carvedilol", "type": "Antihypertensive", "price": 900 }
];

// DOM elements for interaction
const directory = document.getElementById("directory");
const selected2 = document.getElementById("selected2");
const addButton = document.getElementById("add");
const orderButton = document.getElementById("order");
const clearButton = document.getElementById("clear");
const output2 = document.getElementById("output2");
const drugCategory = document.getElementById("drugCategory");
const amountInput = document.getElementById("amount");

let selectedItems = []; // Keeps track of selected drugs in the cart

// Event Listeners for user interactions
drugCategory.addEventListener("change", updateDrugList);
addButton.addEventListener("click", addToCart);
orderButton.addEventListener("click", redirectToOrderPage);
clearButton.addEventListener("click", clearCart);

// Updates the displayed drug list based on selected category
function updateDrugList() {
    const category = drugCategory.value;

    if (!category) {
        directory.innerHTML = "<p>Select a category to view available drugs.</p>";
        return;
    }

    const filteredDrugs = drugData.filter(drug => drug.type === category);

    if (filteredDrugs.length === 0) {
        directory.innerHTML = "<p>No drugs available in this category.</p>";
    } else {
        directory.innerHTML = ""; // Clear previous entries
        filteredDrugs.forEach(drug => {
            const div = document.createElement("div");
            div.className = "entry";
            div.textContent = `${drug.name} - $${drug.price}`;
            div.dataset.name = drug.name;
            div.dataset.price = drug.price;

            // Highlight selection
            div.addEventListener("click", () => {
                document.querySelectorAll(".directory .entry").forEach(e => e.classList.remove("highlight"));
                div.classList.add("highlight");
            });

            directory.appendChild(div);
        });
    }
}

// Adds the selected drug to the cart
function addToCart() {
    const selectedEntry = document.querySelector(".directory .highlight");

    if (!selectedEntry) {
        alert("Please select a drug.");
        return;
    }

    const amount = parseInt(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const name = selectedEntry.dataset.name;
    const price = parseFloat(selectedEntry.dataset.price) * amount;

    selectedItems.push({ name, price, amount });
    updateCart();
}

// Updates the displayed cart with selected drugs
function updateCart() {
    selected2.innerHTML = "";

    if (selectedItems.length === 0) {
        selected2.innerHTML = "<p>No items in the cart.</p>";
        return;
    }

    selectedItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.textContent = `${item.name} - $${item.price} (${item.amount} pcs)`;
        selected2.appendChild(div);
    });
}

// Redirects to order confirmation page
function redirectToOrderPage() {
    if (selectedItems.length === 0) {
        alert("No items in the cart.");
        return;
    }

    // Save the selected items to localStorage
    localStorage.setItem("orderDetails", JSON.stringify(selectedItems));

    // Redirect to the order confirmation page
    window.location.href = "order.html";
}

// Clears the cart and resets the output
function clearCart() {
    selectedItems = [];
    selected2.innerHTML = "<p>No items in the cart.</p>";
    output2.textContent = "";
}
