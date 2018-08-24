var mysql = require("mysql");
var inquirer = require("inquirer");

// Creates the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "MyNewPass",
    database: "bamazon"
});

// Initializes Bamazon
initBamazon();

function initBamazon() {
    displayInventory(); // Displays the available inventory
};

// Retrieves the current inventory from the database and outputs it to the console
function displayInventory() {

    // Ask the Database for everything from products table
    queryStr = 'SELECT * FROM products';

    connection.query(queryStr, function (err, data) {
        if (err) throw err; //error handling

        console.log('Existing Inventory: ');
        console.log('---------------------\n');

        var output = '';
        for (var i = 0; i < data.length; i++) {
            output = '';
            output += 'Item ID: ' + data[i].id + '  ||  ';
            output += 'Product Name: ' + data[i].product_name + '  ||  ';
            output += 'Department: ' + data[i].department_name + '  ||  ';
            output += 'Price: $' + data[i].price + '\n';

            console.log(output);
        }

        console.log("---------------------------------------------------------------------\n");

        //Prompts the user for item and quantity they would like to purchase
        promptUserPurchase();
    })
};

// Prompts the user for the item/quantity they would like to purchase
function promptUserPurchase() {

    // Prompts the user to select an item using inquirer
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the Item ID.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Enter the quantity of the item needed.',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        console.log('You have selected: \n    id = ' + input.id + '\n    quantity = ' + input.quantity);

        var item = input.id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { id: item }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            // console.log('data = ' + JSON.stringify(data));

            if (data.length === 0) {
                console.log('ERROR: Please select a valid Item ID.');
                displayInventory();

            } else {
                var productInfo = data[0];

                // console.log('productInfo = ' + JSON.stringify(productInfo));
                console.log('productInfo.stock_quantity = ' + productInfo.stock_quantity);

                // If the quantity requested by the user is in stock
                if (quantity <= productInfo.stock_quantity) {
                    console.log('The product you requested is in stock: Placing order...');

                    // Constructs the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productInfo.stock_quantity - quantity) + ' WHERE id = ' + item;

                    // Updates the inventory
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productInfo.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // Ends the connection
                        connection.end();
                    })
                } else {
                    console.log('NOT ENOUGH PRODUCT IN STOCK; your order can not be placed.');
                    console.log('PLEASE MODIFY YOUR ORDER.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
};

// Ensures positive quantities are entered ONLY
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
};
