# 📚 Library Management API

A RESTful API for managing a library system built using Express.js, TypeScript, and MongoDB (Mongoose). This project allows users to add, update, retrieve, delete books and borrow them, while enforcing business rules and validation.

## 🔗 Live Demo

###### 🌐 API Base Url [(https://library-management-api-beta.vercel.app)](https://library-management-api-beta.vercel.app)

###### 📹Video Explanation [watch on youtube](https://youtu.be/K-7yB5dnMyQ?si=tu5lphvDDuy3y5to)

##

##

##

## 🧩 Feature

#

    - ✅ Create, Read, Update, Delete(CRUD) for books
    - 🔎 Filter & Sort by Genre & date(default)
    - 📦 Borrow System with availability check
    - 📊  Aggregatted Borrow Summary(MongoDb Aggregation)
    - 🧠 Mongoose Middleware, and instance method used
    - 🔒 Schema Validationwith custom error message

##

##

##

## ⚙️ Technologies Used

##

    - Node.JS
    - Express.JS
    - TypeScript
    - Mongodb with Mongoose
    - Vercel for deployment
    - Postman for api testing

##

##

##

## 🏗️ Project Structure

##

```
📁 src
├── controllers/
├── models/
├── router/
├── utils/
├── app.ts
└── server.ts

```

##

##

##

## Getting Started

#### ✅ Prerequisites

##

    - Node.js >= 18
    - npm or yarn
    - MongoDB Atlas or Local MongoDB Instance

##

##

##

## 📦 Installation

##

```
 git clone https://github.com/codewithsaidul/ph-mongooshe-assignment-three.git

 cd ph-mongooshe-assignment-three

 npm install

```

##

##

##

## ⚙️ Environment Variables

create .env file on root on your folder:

```
MONGODB_URI = mongodb+srv://<username>:<password>@cluster.mongodb.net/library
```

##

##

##

## 🛠️ Run Locally

##

```


# development mode

npm run dev

# Build mode

npm run build

```

##

##

##

## 🛣️ API End Points

The Library Management API exposes the following endpoints:

##

#### 📚 Books

##

###### post `/api/books`:

this endpoint is used to create a new book. It accepts fields like `title`, `author`, `genre`, `isbn`, `copies`, and `available(optional)`. The `genre` must be one of the allowed categories like `FICTION`, `SCIENCE`, etc.

##

###### get `/api/books`:

this endpoint retrieves all book. This route supports filtering by `genre` using the `filter` query parameter, sorting results by a field (e.g createdAt) using `sortBy`. Changing the sort direction using `sort`(asc or desc), and limiting the number of results using the `limit` parameter.

##

###### get `/api/books:bookId`:

this endpoint fetchs a single book by its unique MongoDB ObjectID. It returns all details of the book including metadata like `createdAt` and `updatedAt`.

##

###### put `/api/books:bookId`:

this endpoint updates an existing book. you can send partial update like (only changing the `copies`), and the correspending fields will be updated in the database.

##

###### delete `/api/books:bookId`:

this endpoint permently removes a book from the system based on its ID.

##

#### 📚 Borrow Books

##

###### post `/api/borrow`:

this endpoint is used to borrow a book. Its accepts three fields in the requested body. The `book`: id of the book, `quantity`: number of `copies` to borrow, and the `dueDate`: return the deadline.
Before processing the request, the system verifies whether enough copies are available. If the rquested quantity is avaiable, it deducts the quantity from the total copies, Additionally, if the remaining number of copies becomes zero, the system automatically sets the book's `available` status to `false`.

##

###### get `/api/borrow`:

this enpoints provides an aggregatted summary to all borrowed books. It uses MongoDB's aggregation pipeline to return the total quantity borrowed per book along with the book's title and isbn.

##

##

##

## 🧪 Sample Request Payloads

##

#### ✅ Create Book


```
    {
        "title": "Pale Blue Dot",
        "author": "Carl Sagan",
        "genre": "SCIENCE",
        "isbn": "9780345376596",
        "description": "A vision of the human future in space, based on the Voyager 1 photograph of Earth.",
        "copies": 2,
        "available": true
    }

```

##
##

#### ✅ Borrow Book

```
{
  "book": "68545cd788b7c4f33258c387",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```

##
##
##

## 🧠 Business Logic
##
    - ✅ Prevent borrowing more available copies using Mongoose Instance Method
    - ✅ Set Book's `available=false` if copies = 0
    - ✅ `Borrow Summary` uses MongoDB Aggregation Pipeline
    - ✅ Custom Error Handler for Validation & Other Errors


##
##
##

## ⚠️ Error Response Formate

```
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

##
##
##

### ✅ Bonus Highlights
###
    - ✅ Follows RESTful principles

    - ✅ Clean, modular code with comments

    - ✅ Well-structured folder design

    - ✅ Strong TypeScript usage for type safety

    - ✅ Industry-standard error handling and response format
  
##
##
##

## 🧑‍💻 Author
##### SAIDUL ISLAM RANA
Frontend Dev | Backend Learner | MERN Stack Enthusiast
GitHub: @codewithsaidul