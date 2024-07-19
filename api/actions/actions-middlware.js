// add middlewares here related to actions
// actions-middleware.js

// function validateActionUpdate(req, res, next) {
//     const { project_id, description, notes, completed } = req.body;
//     if (!project_id === undefined || !description === undefined || !notes === undefined || !completed === undefined) {
//       return res.status(400).json({
//         message: "Missing required project_id, description, notes, or completed field",
//       });
//     }
//     next();
//   }
  
//   module.exports = {
//     validateActionUpdate,
//   };