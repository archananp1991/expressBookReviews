const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
 
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    const myPromise = new Promise((resolve, reject) => {
        let success = true; 
        if (success) { 
          resolve(JSON.stringify({books}, null, 4));
        } else { 
          reject("The operation failed!");
        } 
      });
      myPromise
      // Handle the resolved state of the promise
      .then((message) => { 
        res.send(message); // "The operation was successful!"
      }) 
      .catch((error) => { 
        res.send(error); // "The operation failed!"
      });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    const myPromise = new Promise((resolve, reject) => {
        if (book) {
          resolve(book);
        } else { 
          reject("The operation failed!");
        } 
      });
      myPromise
      // Handle the resolved state of the promise
      .then((message) => { 
       res.send(message); // "The operation was successful!"
      }) 
      .catch((error) => { 
        res.send(error); // "The operation failed!"
      });
 
 });
  

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
   const author = req.params.author;
   const bookdetail = Object.values(books).filter((book) => book.author === author);
   const myPromise = new Promise((resolve, reject) => {
    if (author) { 
      resolve(bookdetail);
    } else { 
      reject("The operation failed!");
    } 
  });
  myPromise
  // Handle the resolved state of the promise
  .then((message) => { 
    res.send(bookdetail); // "The operation was successful!"
  }) 
  .catch((error) => { 
    res.send(error); // "The operation failed!"
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  const title=req.params.title;
  const bookdetail=Object.values(books).filter((book) => book.title === title);
 const myPromise = new Promise((resolve, reject) => {
        if (title) { 
          resolve(bookdetail);
        } else { 
          reject("The operation failed!");
        } 
      });
      myPromise
      // Handle the resolved state of the promise
      .then((message) => { 
        res.send(bookdetail); // "The operation was successful!"
      }) 
      .catch((error) => { 
        res.send(error); // "The operation failed!"
      });

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book=books[isbn];
    const review=book.reviews;
  res.send(review);
});

module.exports.general = public_users;
