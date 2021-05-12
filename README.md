# tybca-project-api
Backend api built with express.js for the our ecommerce site's admin panel, hosted at [https://admin-speedwagoan.web.app/](https://admin-speedwagoan.web.app/), and github repo [ecommerce-admin](https://github.com/joseito-terence/ecommerce-admin) 

## BCA Final Year Project.
This api is a part of our final year project.

## Base URL
[https://tybca-project-api.herokuapp.com/](https://tybca-project-api.herokuapp.com/)

## Endpoints
### Indexing Endpoints (Algolia)

* `POST /algolia`\
  Add or Update in the index.
  * If the objectID exists, the record will be replaced
  * If the objectID is specified but does not exist, the record is created
  * If the objectID is not specified, the method returns an error.

  Request Body

  | property    | description                       |
  |:------------|:----------------------------------|
  | id          | product id
  | title       | Product title or name
  | description | a short description of the product |
  | tags[ ]     | array of tags or search keywords |
  | price       | price of the product
  | category    | category of the product
  | images      | image url of the product
  <br>
* `DELETE /algolia/:pid`\
  Delete Record from the index.

  Request Params\
  pid, the product id.

* `DELETE /aloglia/reset`\
  Reset Index. (Clear all items in the index)\
  All products are deleted from index.\
  This can't be undone. : )

### Firebase Operations Endpoints

* `PUT /user/:option`\
  Disable or Enable user in firebase auth.
  Performs the operation and set the disabled&lt;bool&gt; property in the user's db record.

  Request Params <br> 
  option = 'enable' or 'disable'.

* `DELETE /user/:uid`\
  Delete the user.
  - First deletes from Firebase Auth
  - Then from the Firestore, the db.
  - User can be seller or customer.

* `PUT /order/cancel/:orderId`
  Cancel order
  - Change the order status to 'canceled'.
  - ex:- { status: 'canceled' }

## Available Scripts

In the project directory, run:

### `npm i`

Installs all the dependancies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Group Members:
* R/BCA-18-118 - Charlton J. Dias
* R/BCA-18-201 - Aaron C. Fernandes
* R/BCA-18-202 - Shaun J. Barreto
* R/BCA-18-207 - Angel K. Fernandes
* R/BCA-18-208 - Joseito T. Fernandes