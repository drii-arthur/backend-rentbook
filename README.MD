RentBook App Back-End
Back-End of an App for borrowing books made using Node.js. This app use MVC style as it's structure. It didn't have any views yet, so it is recommended to use Postman for creating requests.

Built With
Express.js Node.js

Requirement
10.1.38-MariaDB MySQL RDBMS

npm version 6.10.3

Postman latest version

Getting Started
Clone or download this repo then use npm install to install all the dependencies.
npm install
Create database and run init.sql script to install the necessary database structure.
Create the .env file and set it up based on your own configuration
Use npm start to start the server. Then you're ready to go
npm start
Documentation
Books Routes
GET Request
"host/books/" => display all books, with default pagination {page:1, limit:3}. Query params:

sortby -> its value is name of column you want to sort.
availability -> displaying list of available books if it's value set to 1, or unavailable books if set to 0
page -> page to display (default 1)
limit -> number of books displayed in a page (default 3)
search -> display all books with title that contains the keyword.
"host/books/{id}" => display one book with the id specified by id parameter

POST Request
"host/books/" => Inserting a book to database. data required = title, description, image, date_released, genre_id.
note =
image is the url to the image, not the actual image
admin previlege is required
PATCH Request
"host/books/{id}" => Updating a book in database with the specified id. data required = title, description, image, date_released, genre_id. (admin previlege is required)
DELETE Request
"host/books/{id}" => Deleting a book in database with the specified id. (admin previlege is required)
Genres Routes
GET Request
"host/genres/cat/" => display all genre
"host/genres/cat/{id}" => display one genre with the id specified by id parameter
POST Request
"host/genres/" => Inserting a genre to database. data required = name. (admin previlege is required)
PATCH Request
"host/genres/cat/{id}" => Updating a genre in database with the specified id. data required = name. (admin previlege is required)
DELETE Request
"host/genres/cat/{id}" => Deleting a genre in database with the specified id. (admin previlege is required)
Borrowing Routes
GET Request
"host/borrow/" => display all borrowings. (admin previlege is required)
"host/borrow/{id}" => display one borrowing with the id specified by id parameter. (admin previlege is required)
POST Request
"host/borrow/" => Inserting a borrowing to database. data required = book_id. (regular previlege is required)
PATCH Request
"host/borrow/{id}" => Updating a borrowing in database with the specified id. data required = book_id (regular previlege is required)
DELETE Request
"host/borrow/{id}" => Deleting a borrowing in database with the specified id. (admin previlege is required)
User Routes
GET Request
"host/users/" => display all users. (admin previlege is required)
"host/users/{id}" => display one user with the id specified by id parameter. (admin previlege is required)
POST Request
"host/users/register" => registering a new regular user to database. data required = username, email, password
"host/users/register/admin" => registering a new admin user to database. data required = username, email, password. (admin previlege is required)
"host/users/login" => login route for generating new jwt token. data required = email, password