// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Action = require('./actions-model'); // Adjust the path to your actions model


router.get('/', async (req, res) => {
    try {
      const projects = await Action.get();
      if (projects || projects.length !== 0 ) {
        return res.status(200).json(projects); 
      }
      res.status(404).json();
    } catch (error) {
      res.status(500).json({
        message: "The projects information could not be retrieved",
        err: error.message,
        stack: error.stack,
      });
    }
  });

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Action.get(id);
        if (project) {
            return res.status(200).json(
               project
            );
        }
        return res.status(404).json({
          message: "Project not found",
      });
    } catch (error) {
        res.status(404).json({
            message: "The project information could not be retrieved",
            err: error.message,
            stack: error.stack,
        });
    }
});

router.post('/', async (req, res) => {
    const { project_id, notes, description, completed } = req.body;
  
    if (!notes || !description) {
      return res.status(400).json({ message: 'Missing required fields: notes and/or description' });
  }
    
    try {
      const actionNew = await Action.insert({project_id, notes, description, completed})
    res.status(201).json(actionNew);
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to create new project' });
  }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.notes || !changes.description || changes.completed === undefined) {
        return res.status(400).json({ message: 'Missing name, description or completed field' });
    }

    try {
        const updatedProject = await Action.update(id, changes);
        if (!updatedProject) {
        return res.status(404).json({ message: 'Action not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({
        message: "The action could not be updated",
        err: error.message,
        stack: error.stack,
        });
    }
});

  
router.delete('/:id', async (req, res) => {
try {
    const { id } = req.params;
    const deleted = await Action.remove(id);
    if (!deleted) {
    return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
} catch (error) {
    res.status(500).json({
    message: "The project could not be deleted",
    err: error.message,
    stack: error.stack,
    });
}
});

module.exports = router