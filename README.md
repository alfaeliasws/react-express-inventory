# INVENTORY MANAGEMENT APP

# TECH STACK
* TailwindCSS : I use Tailwind for the styling, as the class is great for the development process and the classes are UI friendly too (having many color options and almost all of the CSS styling general styles (flex, grid, block, etc))
* React : It is the industry standard of the front end (especially in the west), it makes the front end to work optimally with the robust development also (not to be too 'templaty' and the use of the state is great especially for one page app)
* Axios : For API Calling i use axios for simpler API Call than using AJAX/xhr
* Express : I use express since it is the simplest one for the backend, not having too many configuration but still able to execute the backend processes well
* MySQL2 : For the connection I use MySQL2 for connection to DB, and using the configuration as can be seen in express/config.js, I use raw SQL commands and query to get data from the DB since it doesn't have to attach other ORM/Technology that could make the backend heavier
* MYSQL : I use mysql as it is the most affordable SQL database and widely used. It is not heavy also for the use of one table and several columns, it is also fast and without the use of ORM, it is even faster
* Javascript : Why JS? Because it is the most proficient language that I am in, but it is also connects with the stacks, it makes development experience better with array methods like filter and map.

Drawback: it may get not to type-safety in the future, but with the time of development (around 5 hours) with a robust dynamical UX, it is the best that I could provide

Why I don't deploy? I find it is hard right now to deploy full stack app for free. The accessible one that is really free is vercel, but it is almost built for NextJS app without the use of DB (should figure out what to use for database). Why not use NextJS? Because it is simpler to have react-express-mysql for this one page application - and it is more than enough. (From what I know heroku's free backend-frontend plan is erased 1 or 2 years ago)

# How to run the program:
* after cloning, go to each directory (express, react) and do `npm i` in each express and react directories (not outside)
* add this env in ./react directory:
```
VITE_REACT_APP_DEV_API_URL = "http://localhost:4500"
FAST_REFRESH = false
SKIP_PREFLIGHT_CHECK = true
```
* add this env in ./express directory:
```
DB_USERNAME=root
DB_PASSWORD=
DB_HOST=localhost
DB_NAME=store_inventory
URL_ENDPOINT=/api
TOKEN_SECRET=mikemozawski
```
* PORTS:
  * mysql: 3306 (i use xampp)
  * express: 4500
  * react: 5173
* running react app: `npm run dev`
* running express app: `npx nodemon app.js`


# DB Structure

The DB Structure is in the SQL file (store_inventory)
But here are the overview of the structure

```plaintext
Table inventory {
  id          int         [pk, not null, auto increment]   // Primary key, auto-incremented
  name        varchar(255)                                // Product name, allows NULL
  stock       int         [not null, default: 0]          // Stock count, cannot be NULL, default is 0
  created_at  datetime    [default: current_timestamp()]  // Creation timestamp, defaults to current time
  updated_at  datetime    [default: current_timestamp(), on update: current_timestamp()] // Update timestamp, defaults to current time, auto-updates on row change
  deleted_at  datetime    [default: null]                 // Soft deletion timestamp, allows NULL
}
```

# API Documentation - Inventory Management API

## Base URL
`http://localhost:4500/api/products/`

## Endpoints

### 1. **Get All Products**
   - **Endpoint:** `/`
   - **Method:** `GET`
   - **Description:** Retrieve all products in the inventory.
   - **Response:**
     - **Status Code:** `200 OK`
     - **Body:**
       ```json
       {
         "message": "Fetch Success",
         "products": [
           {
             "id": 1,
             "name": "Product Name",
             "stock": 100,
             "created_at": "2024-08-23T10:00:00Z",
             "updated_at": "2024-08-23T10:00:00Z",
             "deleted_at": null
           },
           ...
         ],
         "status": 200,
         "success": 1
       }
       ```

### 2. **Add a Product**
   - **Endpoint:** `/`
   - **Method:** `POST`
   - **Description:** Add a new product to the inventory.
   - **Request Body:**
     - **Content-Type:** `application/json`
     - **Body Structure:**
       ```json
       {
         "name": "Product Name",
         "stock": 100
       }
       ```
   - **Response:**
     - **Status Code:** `201 Created`
     - **Body:**
       ```json
       {
         "message": "Add Success",
         "products": {
           "fieldCount": 0,
           "affectedRows": 1,
           "insertId": 1,
           "info": "",
           "serverStatus": 2,
           "warningStatus": 0
         },
         "status": 201,
         "success": 1
       }
       ```

### 3. **Update a Product**
   - **Endpoint:** `/:id`
   - **Method:** `PUT`
   - **Description:** Update an existing product in the inventory by its ID.
   - **Request Parameters:**
     - **Path Parameter:**
       - `id` (integer): The ID of the product to update.
   - **Request Body:**
     - **Content-Type:** `application/json`
     - **Body Structure:**
       ```json
       {
         "id": 1, //integer-product-id
         "name": "Updated Product Name",
         "stock": 150
       }
       ```
   - **Response:**
     - **Status Code:** `200 OK`
     - **Body:**
       ```json
       {
         "message": "Update Success",
         "products": {
           "fieldCount": 0,
           "affectedRows": 1,
           "insertId": 0,
           "info": "Rows matched: 1 Changed: 1 Warnings: 0",
           "serverStatus": 2,
           "warningStatus": 0
         },
         "status": 200,
         "success": 1
       }
       ```

### 4. **Delete a Product**
   - **Endpoint:** `/:id`
   - **Method:** `DELETE`
   - **Description:** Remove a product from the inventory by its ID. This action will soft delete the product by setting `deleted_at` to the current datetime.
   - **Request Parameters:**
     - **Path Parameter:**
       - `id` (integer): The ID of the product to delete.
   - **Response:**
     - **Status Code:** `200 OK`
     - **Body:**
       ```json
       {
         "message": "Remove Success",
         "products": {
           "fieldCount": 0,
           "affectedRows": 1,
           "insertId": 0,
           "info": "Rows matched: 1 Changed: 1 Warnings: 0",
           "serverStatus": 2,
           "warningStatus": 0
         },
         "status": 200,
         "success": 1
       }
       ```

---

### **Notes:**
- **Error Responses:** Each endpoint may return standard error codes such as `400 Bad Request`, `404 Not Found`, or `500 Internal Server Error` with appropriate error messages.
- **Soft Deletion:** The `deleted_at` field will be set when a product is deleted. If `deleted_at` is not `null`, the product is considered deleted.