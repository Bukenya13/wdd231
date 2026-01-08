/* ========================================
   JAVASCRIPT BREAKDOWN & EXPLANATION
   ======================================== */

/* ========================================
   1. NAVIGATION TOGGLE (Hamburger Menu)
   ======================================== */

// Select elements from HTML using their IDs
const menuButton = document.getElementById('menu-button');
// document = the entire web page
// getElementById() = finds element with specific id
// 'menu-button' = the id we're looking for
// const = constant variable (can't be reassigned)

const mainNav = document.getElementById('main-nav');
// Store the navigation menu element

// Add event listener - listens for clicks on menu button
menuButton.addEventListener('click', () => {
    // addEventListener() syntax: (event_type, function_to_run)
    // 'click' = the event we're listening for
    // () => { } = arrow function (modern JavaScript syntax)
    
    // Toggle the "open" class on/off
    mainNav.classList.toggle('open');
    // classList = list of CSS classes on an element
    // toggle() = add if missing, remove if present
    // When 'open' class is added, CSS shows the menu (display: block)
    
    // Check if menu is open
    const isOpen = mainNav.classList.contains('open');
    // contains() = returns true if class exists, false otherwise
    
    // Update ARIA attribute for accessibility (screen readers)
    menuButton.setAttribute('aria-expanded', isOpen);
    // setAttribute() = changes HTML attribute
    // 'aria-expanded' tells screen readers if menu is open
    
    // Change button icon
    menuButton.textContent = isOpen ? '✕' : '☰';
    // textContent = the text inside the element
    // ? : is ternary operator (shorthand if/else)
    // Format: condition ? value_if_true : value_if_false
    // If open, show X, otherwise show hamburger
});

/* Breakdown of arrow function:
   Old way:  function() { code }
   New way:  () => { code }
   Both do the same thing!
*/

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    // e = event object (contains info about the click)
    // e.target = the element that was clicked
    
    // Check if click was outside menu and button
    if (!mainNav.contains(e.target) && !menuButton.contains(e.target)) {
        // contains() = checks if element contains another element
        // ! = NOT operator (reverses true/false)
        // && = AND operator (both conditions must be true)
        
        // If clicked outside, close the menu
        mainNav.classList.remove('open');
        menuButton.textContent = '☰';
        menuButton.setAttribute('aria-expanded', 'false');
    }
});

/* Logic explanation:
   - If you click ON the menu or button, do nothing
   - If you click OUTSIDE both, close the menu
*/

/* ========================================
   2. WEATHER SIMULATION
   ======================================== */

// Function to get simulated weather data
function getKampalaWeather() {
    // function = reusable block of code
    // getKampalaWeather = function name
    // () = parameters (none in this case)
    
    // Array of possible weather conditions
    const weatherConditions = [
        // Array = list of items in [ ]
        // Each item is an object with properties
        { temp: 24, high: 28, low: 19, humidity: 65, desc: 'Partly Cloudy' },
        { temp: 26, high: 30, low: 21, humidity: 70, desc: 'Sunny' },
        { temp: 23, high: 27, low: 20, humidity: 75, desc: 'Light Rain' },
        { temp: 25, high: 29, low: 20, humidity: 68, desc: 'Mostly Sunny' }
    ];
    // Object syntax: { property: value, property: value }
    
    // Calculate which weather to show based on today's date
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    // Break this down:
    // new Date() = creates object representing current date/time
    // new Date().getFullYear() = gets current year (2026)
    // new Date(2026, 0, 0) = January 1st of current year
    // new Date() - new Date(2026, 0, 0) = milliseconds since Jan 1
    // 86400000 = milliseconds in one day (24 * 60 * 60 * 1000)
    // Math.floor() = rounds down to whole number
    // Result: which day of the year it is (1-365)
    
    const weatherIndex = dayOfYear % weatherConditions.length;
    // % = modulo operator (remainder after division)
    // weatherConditions.length = 4 (number of items in array)
    // Example: day 7 % 4 = 3 (remainder)
    // This gives us a number between 0-3
    
    return weatherConditions[weatherIndex];
    // return = sends value back to whoever called the function
    // [weatherIndex] = access array item at that position
    // Returns one weather object from the array
}

/* Why use modulo?
   - Ensures we always get valid array index (0-3)
   - Creates consistent "random" weather based on date
   - Same weather shows all day, changes next day
*/

// Function to display weather on page
function displayWeather() {
    const weather = getKampalaWeather();
    // Call the function above, store result in 'weather' variable
    
    // Update temperature
    document.getElementById('current-temp').textContent = weather.temp;
    // Gets element with id="current-temp"
    // Sets its text content to temperature value
    // weather.temp = access 'temp' property from weather object
    
    // Update description
    document.getElementById('weather-desc').textContent = weather.desc;
    
    // Update high temperature
    document.getElementById('high-temp').textContent = weather.high;
    
    // Update low temperature
    document.getElementById('low-temp').textContent = weather.low;
    
    // Update humidity
    document.getElementById('humidity').textContent = weather.humidity;
}

/* Object property access:
   If object = { temp: 24, desc: 'Sunny' }
   Then: object.temp = 24
   And:  object.desc = 'Sunny'
*/

/* ========================================
   3. MEMBER SPOTLIGHTS
   ======================================== */

// Array of member objects (our data)
const members = [
    {
        name: "Nakumatt Supermarket",
        description: "Leading retail chain providing quality products to Ugandans for over 20 years",
        level: "Gold Member"
    },
    {
        name: "Uganda Crafts 2000 Ltd",
        description: "Promoting local artisans and supporting sustainable craft production",
        level: "Silver Member"
    },
    {
        name: "Kampala Tech Hub",
        description: "Fostering innovation and supporting tech startups across East Africa",
        level: "Gold Member"
    }
];

// Function to display member spotlights
function displaySpotlights() {
    // Get the container where we'll add members
    const container = document.getElementById('spotlight-container');
    
    // Loop through each member in the array
    members.forEach(member => {
        // forEach() = run code for each item in array
        // member = current item in loop (changes each iteration)
        
        // Create new div element
        const spotlightItem = document.createElement('div');
        // createElement() = creates new HTML element
        // It's not on the page yet, just in memory
        
        // Add CSS class to the div
        spotlightItem.className = 'spotlight-item';
        // className = sets the class attribute
        
        // Set HTML content inside the div
        spotlightItem.innerHTML = `
            <h4>${member.name}</h4>
            <p>${member.description}</p>
            <p class="membership-level">${member.level}</p>
        `;
        // innerHTML = sets HTML content as a string
        // ` ` = template literal (allows ${} for variables)
        // ${member.name} = inserts value of member.name
        // This is called "string interpolation"
        
        // Add the div to the container (makes it visible)
        container.appendChild(spotlightItem);
        // appendChild() = adds element as last child
    });
}

/* forEach loop breakdown:
   array.forEach(item => {
       // Run this code for each item
       // item = current item being processed
   });
   
   Equivalent old-style loop:
   for (let i = 0; i < array.length; i++) {
       let item = array[i];
       // code here
   }
*/

/* Template literals vs regular strings:
   Regular: 'Hello ' + name
   Template: `Hello ${name}`
   
   Benefits of template literals:
   - Easier to read
   - Can span multiple lines
   - Can insert variables/expressions with ${}
*/

/* ========================================
   4. FOOTER DYNAMIC CONTENT
   ======================================== */

// Display current year
document.getElementById('currentyear').textContent = new Date().getFullYear();
// new Date() = current date/time
// getFullYear() = extracts year (2026)
// Sets the year in copyright notice

// Display last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
// document.lastModified = date file was last changed
// It's automatically maintained by the browser

/* ========================================
   5. INITIALIZE ON PAGE LOAD
   ======================================== */

// Wait for page to fully load before running code
window.addEventListener('DOMContentLoaded', () => {
    // window = the browser window
    // DOMContentLoaded = event fired when HTML is fully loaded
    // DOM = Document Object Model (the HTML structure)
    
    displayWeather();      // Call weather function
    displaySpotlights();   // Call spotlights function
});

/* Why wait for DOMContentLoaded?
   - JavaScript might run before HTML elements exist
   - Trying to access non-existent elements causes errors
   - This ensures everything is loaded first
   
   Alternative: put <script> at end of <body>
*/

/* ========================================
   KEY JAVASCRIPT CONCEPTS USED
   ========================================

1. VARIABLES:
   const name = value;     // Can't be reassigned
   let name = value;       // Can be reassigned
   var name = value;       // Old way (avoid)

2. DATA TYPES:
   String:   'text' or "text" or `text`
   Number:   42 or 3.14
   Boolean:  true or false
   Object:   { key: value }
   Array:    [item1, item2, item3]

3. FUNCTIONS:
   // Function declaration
   function name(parameters) {
       // code
       return value;
   }
   
   // Arrow function (modern)
   const name = (parameters) => {
       // code
       return value;
   }

4. DOM MANIPULATION:
   document.getElementById('id')        // Get element
   element.textContent = 'text'         // Change text
   element.innerHTML = '<p>html</p>'    // Change HTML
   element.classList.add('class')       // Add class
   element.classList.remove('class')    // Remove class
   element.classList.toggle('class')    // Toggle class
   document.createElement('div')        // Create element
   parent.appendChild(child)            // Add element

5. EVENT LISTENERS:
   element.addEventListener('event', function)
   Common events: 'click', 'submit', 'change', 'keyup'

6. OPERATORS:
   =    Assignment
   ==   Equal value
   ===  Equal value and type (preferred)
   !    NOT
   &&   AND
   ||   OR
   %    Modulo (remainder)
   ?:   Ternary (condition ? true : false)

7. ARRAY METHODS:
   array.forEach(item => { })     // Loop each item
   array.length                   // Number of items
   array[0]                       // Access first item

8. OBJECT PROPERTY ACCESS:
   object.property                // Dot notation
   object['property']             // Bracket notation

9. TEMPLATE LITERALS:
   `Text ${variable} more text`   // Embed variables

10. ARROW FUNCTIONS:
    () => { }                     // No parameters
    (x) => { }                    // One parameter
    (x, y) => { }                 // Multiple parameters
    x => x * 2                    // Implicit return (one line)

========================================
PROGRAM FLOW:
========================================

1. Page loads HTML
2. Browser finds <script> tag
3. JavaScript executes:
   - Defines variables (menuButton, mainNav, members)
   - Defines functions (getKampalaWeather, displayWeather, displaySpotlights)
   - Sets up event listeners (click on menu, click anywhere)
   - Updates footer (year, last modified)
4. When DOMContentLoaded fires:
   - displayWeather() runs → updates weather display
   - displaySpotlights() runs → creates member cards
5. Page is interactive:
   - Click menu button → toggle menu open/closed
   - Click outside menu → close menu
   - Hover over links → CSS animations trigger

======================================== */