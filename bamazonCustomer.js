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
  promptUser();
  //readProducts();



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
              console.log(res);
            }
            );
        }
        console.log(res);
      });

      // console.log(inquirerResponse.id);
      // console.log(inquirerResponse.number);

    
  });
}
// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

function readProducts() {
  console.log("All products for Sale...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log("\n" + "ID: " + res[i].id + "  " + res[i].product_name + "    Price: $" + res[i].price + res[i].stock_quantity);
    }
   // console.log(res);
    connection.end();
  });
  console.log("---------------------------------");
  //promptUser();
  console.log("____________");
}
