# Buckutt Client Specifications

* Usage of Vuejs as frontend framework. Nothing but a web client only.
* Warning : chrome beta (v > 44), --harmony.
* Goal : beautiful, usable, performant web client.
* Structure :
    - init.js : puts a global object that will be used in the constructor of Vuejs : `vmBuilder`
    - app.js  : instanciantes the Vuejs with `vmBuilder` : `vm`. And add automatic watchers and also functions automatically called after the initialisation
    - app/    : contains either global directories (`utils`, `filters`, `components`, `directives`) that are used by everything **or** custom directories that has multiple functionnalities uner the same category (`connection`, `articles`, etc.)
* Notes :
    - Reloads should be in the basket to make everything in one request, and to be able to cancel it
    - There should be virtual categories called « Set » and promotions should be on sets and not on the categories.
    - Use ES6 specs in Harmony Chrome https://kangax.github.io/compat-table/es6/ (`google-chrome --harmony`) : actually : `let`, `const`, `for ... of`, template strings, arrow functions, classes, `Promise` but not `import` nor default parameters
* Workflow :
    1. Start the webpage
    2. Wait for articles and promotions to be loaded
    3. Badge with a seller card
    4. Auth yourself with the pin board
    5. Wait for the hash computation
        1. If failed, go to 4. or to 13.
        2. If succeded, go to 6.
    6. Badge with a buyer card
    7. Wait for the buyer to load
    8. The buyer tells what he wants to buy
        1. The seller clicks on the items
        2. The promotions are automatically calculated
        3. Expand promotions by clicking on it
        4. Remove items by clicking on the « - » orange button next to the item
        5. The user credit should go down with the articles selecting
    9. The buyer tells if he wants to relaod
        1. The seller clicks on the reload button
        2. He indicates the amount
        3. The reload is added to the basket
    10. Click on the green done button to validates
    11. If the user has a reload, he must pay (cash, card, cheque)
        1. He gives the money
        2. The seller clicks on the « paid » button
    12. If the user wants to cancel, eject him
    13. If the seller wants to disconnect, eject him (same as 12. but without user)
    14. To change point (see Buckutt-Server/SPECS.md for more info), click on the point change button (top right) and select the point wanted. The user and the seller will be disconnected
