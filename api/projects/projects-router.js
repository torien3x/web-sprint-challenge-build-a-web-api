// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');



router.get('/', async (req, res) => {
    try {
      const projects = await Project.get();
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
        const project = await Project.get(id);
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

  const { name, description, completed } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Missing required fields: name and/or description' });
}
  
  try {
    const projectNew = await Project.insert({name, description, completed})
    console.log(projectNew)
  res.status(201).json(projectNew);
}
catch (error) {
  res.status(500).json({ message: 'Failed to create new project' });
}
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name || !changes.description || changes.completed === undefined) {
    return res.status(400).json({ message: 'Missing name, description or completed field' });
  }

  try {
    const updatedProject = await Project.update(id, changes);
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: "The project could not be updated",
      err: error.message,
      stack: error.stack,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.remove(id);
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


router.get('/:id/actions', async (req, res) => {
  try {
      const { id } = req.params;
      const actions = await Project.getProjectActions(id);
      if (!actions || actions.length === 0) {
          return res.status(200).json([]); 
      }
      res.status(200).json(actions);
  } catch (error) {
      res.status(500).json({
          message: "The actions information could not be retrieved",
          err: error.message,
          stack: error.stack,
      });
  }
});



module.exports = router