const express = require('express');
const projects = require('./projectsModel.js');
const router = express.Router();

//works
router.get('/', (req, res) => {
  projects.findProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

//works
router.get('/:id', (req, res) => {
  const { id } = req.params;
  projects.findProjectById(id)
  .then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

//NOT WORKING
router.get('/resources', (req, res) => {
    projects.findResources()
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resources' });
    });
  });

//works
router.get('/:id/resources', (req, res) => {
    const { id } = req.params;
  projects.findResourceByID(id)
  .then(resources => {
    if (resources.length) {
      res.json(resources);
    } else {
      res.status(404).json({ message: 'Could not find resources for given project' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

//works
router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
    projects.findTasks(id)
    .then(tasks => {
      if (tasks.length) {
        res.json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given project' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
  });

//works -- NOT Completed dependant
router.post('/', (req, res) => {
  const projectData = req.body;
  projects.addProject(projectData)
  .then(project => {
        res.status(201).json(project);
    })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

//works
router.post('/:id/resources', (req, res) => {
    const resourceData = req.body;
    const { id } = req.params;
    projects.findProjectById(id)
    .then(project => {
         if (project) {
            projects.addResource(resourceData)
            .then(resource => {
                res.status(201).json(resource);
            })
        } else {
            res.status(404).json({ message: 'Could not find project with given id.' })
        }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new resource' });
    })
});

  //works BAD RETURN
router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  const { id } = req.params; 
  projects.findProjectById(id)
  .then(project => {
    if (project) {
      projects.addTask(taskData)
      .then(task => {
        res.status(201).json(task);})
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});

//works
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projects.findProjectById(id)
  .then(project => {
    if (project) {
      projects.updateProject(changes, id)
      .then(updatedproject => {
        res.json(updatedproject);
      });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project' });
  });
});

//NOT WORKING
router.put('/:proj_id/resources/:res_id', (req, res) => {
    const { proj_id } = req.params;
    const { res_id } = req.params
    const changes = req.body;
    projects.findProjectById(proj_id)
    .then(project => {
      if (project) {
        projects.updateResource(changes, res_id)
        .then(updatedthing => {
          res.json(updatedthing);
        });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update resource' });
    });
  });

//   router.put('/:id/tasks', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;
//     projects.findById(id)
//     .then(project => {
//       if (project) {
//         projects.update(changes, id)
//         .then(updatedproject => {
//           res.json(updatedproject);
//         });
//       } else {
//         res.status(404).json({ message: 'Could not find project with given id' });
//       }
//     })
//     .catch (err => {
//       res.status(500).json({ message: 'Failed to update task' });
//     });
//   });

//works
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  projects.removeProject(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});

// router.delete('/resources/:id', (req, res) => {
//     const { id } = req.params;
//     projects.removeResource(id)
//     .then(deleted => {
//       if (deleted) {
//         res.json({ removed: deleted });
//       } else {
//         res.status(404).json({ message: 'Could not find project with given id' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Failed to delete resource' });
//     });
//   });

//works BAD RETURN
router.delete('/:proj_id/tasks/:task_id', (req, res) => {
    const { proj_id } = req.params;
    const { task_id } = req.params;
    projects.removeTask(task_id)
        .then(deleted => {
            if (deleted) {
            projects.getProjectById(proj_id)
            .then(project => {
                res.status(200).json(project)
            });
            } else {
            res.status(404).json({ message: 'Could not delete' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete task' });
        });
});

module.exports = router;