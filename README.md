# Revisiong REST API with Joi Validation

Revision of a RESTful API implemented with Express.js, now enhanced with input validation using Joi.

## Introduction

This API provides endpoints to manage courses. It follows RESTful principles for CRUD operations. Input validation is performed using Joi to ensure data integrity and consistency.

## API Endpoints

### Default Route

- **GET** `/`: Returns 'Hello World'

### Get All Courses

- **GET** `/api/courses`: Returns a list of all courses

### Get a Single Course by ID

- **GET** `/api/courses/:id`: Returns a single course by ID

### Add a New Course

- **POST** `/api/courses`: Adds a new course

### Update an Existing Course

- **PUT** `/api/courses/:id`: Updates an existing course by ID

### Delete an Existing Course

- **DELETE** `/api/courses/:id`: Deletes an existing course by ID

## Input Validation

Request bodies for adding and updating courses are validated using Joi. The schema expects a `name` field that is a string with a minimum length of 3 characters.

