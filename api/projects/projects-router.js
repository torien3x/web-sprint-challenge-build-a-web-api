// Write your "projects" router here!

const express = require('express');
const router = express.Router();
// const Project = require('./project-model'); // Adjust the path to your Project model

// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.getAllProjects(); // Replace with your actual method to fetch projects
    if (!projects || projects.length === 0) {
      return res.status(200).json([]); // Send an empty array if no projects are found
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching projects',
      error: error.message,
    });
  }
});

module.exports = router;