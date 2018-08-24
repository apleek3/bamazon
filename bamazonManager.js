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

managerBamazon(); //Runs it.

// Presents menu options to user
function managerBamazon() {

    // Prompts user to select an option
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option:',
            choices: ['Products for Sale', 'Inventory Low', 'Add Item to Inventory', 'Add New Product to Stock'],
            filter: function (val) {
                if (val === 'Products for Sale') {
                    return 'sale';
                } else if (val === 'Inventory Low') {
                    return 'lowInventory';
                } else if (val === 'Add Item to Inventory') {
                    return 'addInventory';
                } else if (val === 'Add New Product to Stock') {
                    return 'newProduct';
                } else {
                    console.log('ERROR - Retry operation.');
                }
            }
        }
    ]).then(function (input) {

        if (input.option === 'sale') {
            displayInventory();
        } else if (input.option === 'lowInventory') {
            lowInventory();
        } else if (input.option === 'addInventory') {
            addInventory();
        } else if (input.option === 'newProduct') {
            createNewProduct();
        } else {
            console.log('ERROR - Retry operation.');
        }
    })
};

// Retrieves the current inventory
function displayInventory() {

    // Selects all from DB products
    queryStr = 'SELECT * FROM products';

    // Queries the DB
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('------------------------------\n');

        var output = '';
        for (var i = 0; i < data.length; i++) {
            output = '';
            output += 'Item ID: ' + data[i].id + '  //  ';
            output += 'Product Name: ' + data[i].product_name + '  //  ';
            output += 'Department: ' + data[i].department_name + '  //  ';
            output += 'Price: $' + data[i].price + '  //  ';
            output += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(output);
        }

        console.log("---------------------------------------------------------------------\n");

        connection.end(); //END THE CONNECTION!
    })
};

// lowInventory will display a list of products with the available quantity below 100
function lowInventory() {

    // SELECTS ALL from products if they are less than 10
    queryStr = 'SELECT * FROM products WHERE stock_quantity < 10';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Low Inventory: (below 10): ');
        console.log('------------------------------\n');

        var output = '';
        for (var i = 0; i < data.length; i++) {
            output = '';
            output += 'ID: ' + data[i].id + '  //  ';
            output += 'Product Name: ' + data[i].product_name + '  //  ';
            output += 'Department: ' + data[i].department_name + '  //  ';
            output += 'Price: $' + data[i].price + '  //  ';
            output += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(output);
        }

        console.log("---------------------------------------------------------------------\n");

        connection.end(); // END THE CONNECTION!
    })
};

//Prompts the user to UPDATE a quantity
function addInventory() {

    // Prompts the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the Item ID.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Enter the number of items you would like to add.',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {

        var item = input.id;
        var addQuantity = input.quantity;

        // Confirmms that the given item ID exists and determines the current stock
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addInventory();

            } else {
                var productData = data[0];

                console.log('Updating Inventory...');

                // Builds the string to UPDATE the DB
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE id = ' + item;

                // Updates the quantity
                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;

                    console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
                    console.log("\n---------------------------------------------------------------------\n");

                    connection.end(); //END THE CONNECTION!
                })
            }
        })
    })
};

// Prompts the user to add a new product
function createNewProduct() {

    // Product info questions
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Please enter the new product name: ',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Which department does the new product belong to? ',
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the price per unit? ',
            validate: validateInput
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many items are in stock? ',
            validate: validateInput
        }
    ]).then(function (input) {

        console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +
            '    department_name = ' + input.department_name + '\n' +
            '    price = ' + input.price + '\n' +
            '    stock_quantity = ' + input.stock_quantity);

        // INSERTS THE QUERY into DB
        var queryStr = 'INSERT INTO products SET ?';

        // Adds the new product to the DB
        connection.query(queryStr, input, function (error, results, fields) {
            if (error) throw error;

            console.log('New product has been added to the inventory under Item ID: ' + results.insertId + '.');
            console.log("\n---------------------------------------------------------------------\n");

            connection.end(); //END THE CONNECTION!
        });
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