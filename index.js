const Joi = require('joi'); // Import Joi for request validation
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser for parsing request bodies

const app = express();
app.use(bodyParser.json()); // Use body-parser middleware for parsing JSON bodies

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Get a single course by ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with the given ID was not found');
    
    res.send(course);
});

// Add a new course
app.post('/api/courses', (req, res) => {
    // Validate the request body
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // Create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// Update an existing course
app.put('/api/courses/:id', (req, res) => {
    // Find the course by ID
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('No course found with that ID');
    
    // Validate the request body
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    
    // Update the course name
    course.name = req.body.name;
    res.send(course);
});

// Deleting an existing course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course, if it doesn't exist, return 404 error.
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('Course not found');

    // Delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    // Return the deleted course
    res.send(course);
});

// Function to validate a course object
function validateCourse(course) {
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    return schema.validate(course);
}

const port = process.env.PORT || 3000; // Set the port number
app.listen(port, () => console.log(`Listening on port ${port}...`)); // Start the server and listen on the specified port
