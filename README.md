# Bamazon
## Overview
Command line app that uses npm inquirer and mySQL to create a storefront feeling for both pseudo "customers" and "managers."


## Setup
### To use this application yourself:
1) Set up a MySQL database on your machine. I used the 'community' version here: [MySQL](https://dev.mysql.com/downloads/mysql/) 
2) Set up MySQL WorkBench: [MySQL Workbench](https://www.mysql.com/products/workbench/)
3) Set up a new MySQL connection.
4) Create a new Data Base named: bamazon. 
5) Use the attached bamazon.sql to create a new table pre-loaded with information.
6) If you haven't already clone this repository to your computer
7) Using your terminal: cd to the root of the directory and install the node dependencies -- npm i --
8) Run the bamazonCustomer using node to "purchase" or check items available for sale from the bamazon database
9) Run the bamazonCustomer using node to add or change items in the inventory based on the available options.


### Notes about bamazonCustomer
Allows the user to view the current inventory of store items: item IDs, descriptions, department location, and price. You can "purchase" by entering the Item ID and Quantity. If there are enough in stock then then the order is "fulfilled" and the app displays the total purchase price and updates Database. If there is not enough in stock then the order must be modified.


#### Example command line codes for getting started: 


    $ git clone https://github.com/apleek3/bamazon.git
    $ cd --your file path--../bamazon
    $ npm i
    $ node bamazonCustomer


### Notes about bamazonManager
Options are as follows for bamazonManager: 

    (Use arrow keys)
    ❯ View Products for Sale
      View Low Inventory
      Add to Inventory
      Add New Product
  
- The 'View Products for Sale' allows the user to view the current inventory.

- The 'View Low Inventory' shows the user the items that currently have fewer than 10 units available.

- The 'Add to Inventory' allows the user to add more items those currently in stock by referencing Item ID.

- The 'Add New Product' allows the user to enter details about an entirely unlisted product which will be entered into the database.

#### Example command line codes for getting started: 

    $ git https://github.com/apleek3/bamazon.git
    $ cd bamazon
    $ npm install
    $ node bamazonManager.js


## DEMO
Want to see it working? 

### Click here: [bamazonDemo](https://youtu.be/X7o-jE0rq5k)


