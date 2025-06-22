# 📚 Library Management API

A RESTful API for managing a library system built using Express.js, TypeScript, and MongoDB (Mongoose). This project allows users to add, update, retrieve, delete books and borrow them, while enforcing business rules and validation.

## 🔗 Live Demo

###### 🌐 API Base Url [(https://library-management-api-beta.vercel.app)](https://library-management-api-beta.vercel.app)

###### 📹Video Explanation [watch on youtube](https://youtu.be/r8aum5dBrsY?si=G4Mb6OYNZXHZm-gW)

<br> </br>

## 🧩 Feature

  ✅ Create, Read, Update, Delete(CRUD) for books
  🔎 Filter & Sort by Genre & date(default)
  📦 Borrow System with availability check
  📊  Aggregatted Borrow Summary(MongoDb Aggregation)
  🧠 Mongoose Middleware, and instance method used
  🔒 Schema Validationwith custom error message

<br> </br>

## ⚙️ Technologies Used

    - Node.JS
    - Express.JS
    - TypeScript
    - Mongodb with Mongoose
    - Vercel for deployment
    - Postman for api testing

<br> </br>

## 🏗️ Project Structure

```
📁 src
├── controllers/
├── models/
├── router/
├── utils/
├── app.ts
└── server.ts

```

<br> </br>

## Getting Started

#### ✅ Prerequisites


    - Node.js >= 18
    - npm or yarn
    - MongoDB Atlas or Local MongoDB Instance

<br> </br>

## 📦 Installation

```
 git clone https://github.com/codewithsaidul/ph-mongooshe-assignment-three.git

 cd ph-mongooshe-assignment-three

 npm install

```

<br> </br>

## ⚙️ Environment Variables

create .env file on root on your folder:

```
MONGODB_URI = mongodb+srv://<username>:<password>@cluster.mongodb.net/library
```

<br> </br>

## 🛠️ Run Locally


```


# development mode

npm run dev

# Build mode

npm run build

```

<br> </br>

## 🛣️ API End Points

The Library Management API exposes the following endpoints:

<br> </br>

#### 📚 Books

<br> </br>

#### **post** `/api/books`:

this endpoint is used to create a new book. It accepts fields like `title`, `author`, `genre`, `isbn`, `copies`, and `available(optional)`. The `genre` must be one of the allowed categories like `FICTION`, `SCIENCE`, etc.

<br> </br>

#### **get** `/api/books`:

This endpoint retrieves all book. This route supports filtering by `genre` using the `filter` query parameter, sorting results by a field (e.g createdAt) using `sortBy`. Changing the sort direction using `sort`(asc or desc), and limiting the number of results using the `limit` parameter.

<br> </br>

#### **get** `/api/books:bookId`:

This endpoint fetchs a single book by its unique MongoDB ObjectID. It returns all details of the book including metadata like `createdAt` and `updatedAt`.

<br> </br>

#### **put** `/api/books:bookId`:

This endpoint updates an existing book record. You can send partial updates (e.g., only update the copies field), and only the specified fields will be modified in the database.

Before performing the update, a **Mongoose pre middleware** checks if the book exists. If the book does not exist, the API responds with a `404 Resource Not Found` error along with a detailed message including the invalid or incorrect book ID.

<br> </br>

#### **delete** `/api/books:bookId`:

This endpoint permently removes a book from the system based on its ID. It use a **Mongoose pre middleware** to verify the book's existence before deletion. If the book doesn't exist then api throws a `404 Resource Not Found`  error with a meaningfull error message including the invalid or wrong book id

<br> </br>

#### 📚 Borrow Books

<br> </br>

#### **post** `/api/borrow`:

This endpoint is used to borrow a book. Its accepts three fields in the requested body. The `book`: id of the book, `quantity`: number of `copies` to borrow, and the `dueDate`: return the deadline.
Before processing the request, the system verifies whether enough copies are available. If the rquested quantity is avaiable, it deducts the quantity from the total copies, Additionally, if the remaining number of copies becomes zero, the system automatically sets the book's `available` status to `false`.

<br> </br>

#### **get** `/api/borrow`:

This enpoints provides an aggregatted summary to all borrowed books. It uses MongoDB's aggregation pipeline to return the total quantity borrowed per book along with the book's title and isbn.

<br> </br>

## 🧪 Sample Request Payloads

<br>

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

<br> </br>

#### ✅ Borrow Book

```
{
  "book": "68545cd788b7c4f33258c387",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```
<br> </br>

## 🧠 Business Logic

  ✅ Prevent borrowing more available copies using Mongoose Instance Method
  ✅ Set Book's `available=false` if copies = 0
  ✅ `Borrow Summary` uses MongoDB Aggregation Pipeline
  ✅ Mongoose **pre** Middleware
  ✅ Custom Error Handler for Validation & Other Errors


<br> </br>

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
<br> </br>

### ✅ Bonus Highlights

    ✅ Follows RESTful principles

    ✅ Clean, modular code with comments

    ✅ Well-structured folder design

    ✅ Strong TypeScript usage for type safety

    ✅ Industry-standard error handling and response format
  
<br> </br>

## 🧑‍💻 Author
##### SAIDUL ISLAM RANA
Frontend Dev | Backend Learner | MERN Stack Enthusiast
<br>
GitHub: @codewithsaidul