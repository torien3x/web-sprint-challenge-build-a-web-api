// Write your "projects" router here!

const express = require('express');
const router = express.Router();
const Project = require('./projects-model')
// const Project = require('./project-model'); // Adjust the path to your Project model

// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
    Project.find()
    .then(found => {
        res.json(found)
    })
    .catch(err => {
        res.status(500).json({
            message:"The projects information could not be retrieved",
            err: err.message,
            stack: err.stack,
        })
    })
}
  

module.exports = router,