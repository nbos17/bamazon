var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "sixhbpH7&",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  readProducts();



});

function promptUser() {
  inquirer.prompt([
  {
    type: "input",
    message: "Which ID would you like to Purchase?",
    name : "id",
  },
  {
    type: "input",
    message: "How many would you like to Purchase?",
    name: "number"
  }

    ])

  .then(function(inquirerResponse) {

      var responseID = inquirerResponse.id;
      var responseNumber= inquirerResponse.number;

      connection.query("SELECT * FROM products WHERE ?", {id  : responseID}, function(err, res) {
        var newStock = res[0].stock_quantity;
        var price = res[0].price;
        if (newStock < responseNumber) {
          console.log("Quantity not available");
        }
        else {
          connection.query("UPDATE products SET ? WHERE ?",
            [
            {
              stock_quantity : newStock - responseNumber
            },
            {
              id : responseID
            }
            ],
            function(err, res) {
              console.log("You have made a purchase!" + "\n");
              console.log("Total Price: " + price * responseNumber);
              newOrder();
            }
            );

          
        }
        
      });
    
  });


}


function newOrder(){
  inquirer.prompt([{
    type: 'confirm',
    name: 'choice',
    message: 'Would you like to place another order?'
  }]).then(function(answer){
    if(answer.choice){
      promptUser();
    }
    else{
      console.log('Thank you for shopping at Bamazon!');
      connection.end();
    }
  })
};


function readProducts() {
  console.log("All products for Sale...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log("\n" + "ID: " + res[i].id + "  " + res[i].product_name + "    Price: $" + res[i].price + " " + res[i].stock_quantity);
    }

  });
  console.log("---------------------------------");
  promptUser();
  console.log("____________");

}

