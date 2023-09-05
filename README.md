# E_Commerce

This application goes through the backend of the E_commerce project. This project provides the server-side functionality for managing products, categories, and tags. The backend is built with Node.js, Express.js, and Sequelize ORM.

## Video Link
https://watch.screencastify.com/v/Zw5Xl8saMCH2vnUUUl5Q
## Table of Contents

- [E-commerce Backend](#e-commerce-backend)
  - [Video Link](#video-link)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [License](#license)
  - [Credits](#credits)
  - [Contact](#contact)

## Installation

1. Clone the repository:

2. Install dependencies

```bash
cd e-commerce-backend
npm install
```

3. Set up the database

Create a MySQL database and update the configuration in config/config.json

Run the database migrations

```bash
npm init
```
```bash
sequelize-cli
```
Follow through on the rest of the questions by pressing enter. 

4.  Seed the database with sample data

```bash
npm run seed
```
5. Start the server

```bash
npm start
```

The server will be running at `http://localhost:3001`. 

## API Endpoints

### Categories
- **GET /api/categories**: Get all categories.
- **GET /api/categories/:id**: Get a single category by ID.
- **POST /api/categories**: Create a new category.
- **PUT /api/categories/:id**: Update a category by ID.
- **DELETE /api/categories/:id**: Delete a category by ID.

### Products
- **GET /api/products**: Get all products.
- **GET /api/products/:id**: Get a single product by ID.
- **POST /api/products**: Create a new product.
- **PUT /api/products/:id**: Update a product by ID.
- **DELETE /api/products/:id**: Delete a product by ID.

### Tags
- **GET /api/tags**: Get all tags.
- **GET /api/tags/:id**: Get a single tag by ID.
- **POST /api/tags**: Create a new tag.
- **PUT /api/tags/:id**: Update a tag by ID.
- **DELETE /api/tags/:id**: Delete a tag by ID.


## Contributing


## License



## Credits

Simple ERM was created by me as part a coding challenge for the UCI Full Stack bootcamp course assignment related to topics on OOP, node js., Express.js, Heroku deployment, and more.

The development of this program was supported by the course materials and resources provided by the bootcamp.

Shield and badges used in this markdown document were sourced from Shields.io.

## Contact
