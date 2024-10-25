const list = [
    {
        scriptUrl: "./maya/french/10-2024/words.js",
        name: "צרפתית אוקטובר 2024",
        lang: 'fr-FR',
    }
];



document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('testSelect');

    // Default option that prompts user to make a selection
    let defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "יש לבחור הכתבה";
    select.appendChild(defaultOption);

    // Append options from the list to the select element
    list.forEach(item => {
        let option = document.createElement('option');
        option.value = item.scriptUrl; // Store URL in value for loading script
        option.textContent = item.name;
        option.dataset.lang = item.lang; // Store language in data attribute
        select.appendChild(option);
    });

    // Initialize the event listener for change
    select.addEventListener('change', function() {
        if (this.value) {
            loadWords(this.options[this.selectedIndex].dataset.lang); // Pass language to loadWords
        }
    });
});

function loadWords(lang) {
    const select = document.getElementById('testSelect');
    const scriptUrl = select.value;
    if (scriptUrl) {
        // Remove any previously loaded script to prevent duplicates or conflicts
        const existingScript = document.querySelector('script[data-source="dynamic-words"]');
        if (existingScript) {
            document.body.removeChild(existingScript);
        }

        // Load the new script
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.setAttribute('data-source', 'dynamic-words'); // Mark the script to identify it later
        document.body.appendChild(script);
        script.onload = () => {
            initializeGame(lang); // Initialize the game once the words are loaded, passing the language
        };
    }
}
