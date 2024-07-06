// Write your "projects" router here!

const express = require('express');
const router = express.Router();
const Project = require('./projects-model')
// const Project = require('./project-model'); // Adjust the path to your Project model

// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
    try {
      const projects = await Project.getAllProjects();
      if (!projects || projects.length === 0) {
        return res.status(200).json([]); // Send an empty array if no projects are found
      }
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({
        message: "The projects information could not be retrieved",
        err: error.message,
        stack: error.stack,
      });
    }
  });
  

module.exports = router