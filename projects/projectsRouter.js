const express = require('express');

const projects = require('./projectsModel.js');

const router = express.Router();

//works
router.get('/', (req, res) => {
  projects.find()
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
  projects.findById(id)
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

router.get('/:id/resources', (req, res) => {
  const { id } = req.params;
  projects.findResources(id)
  .then(steps => {
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

router.post('/', (req, res) => {
  const projectData = req.body;
  projects.add(projectData)
  .then(project => {
    res.status(201).json(project);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.post('/:id/resources', (req, res) => {
    const resourceData = req.body;
    const { id } = req.params; 
    projects.findById(id)
    .then(project => {
      if (project) {
        projects.addResource(resourceData, id)
        .then(step => {
          res.status(201).json(step);
        })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new resource' });
    });
  });

router.post('/:id/tasks', (req, res) => {
  const taskData = req.body;
  const { id } = req.params; 
  projects.findById(id)
  .then(project => {
    if (project) {
      projects.addTask(taskData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projects.findById(id)
  .then(project => {
    if (project) {
      projects.update(changes, id)
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

router.put('/:id/resources', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    projects.findById(id)
    .then(project => {
      if (project) {
        projects.update(changes, id)
        .then(updatedproject => {
          res.json(updatedproject);
        });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update resource' });
    });
  });

  router.put('/:id/tasks', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    projects.findById(id)
    .then(project => {
      if (project) {
        projects.update(changes, id)
        .then(updatedproject => {
          res.json(updatedproject);
        });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update task' });
    });
  });

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  projects.remove(id)
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

router.delete('/:id/resources', (req, res) => {
    const { id } = req.params;
    projects.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete resource' });
    });
  });

  router.delete('/:id/tasks', (req, res) => {
    const { id } = req.params;
    projects.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete task' });
    });
  });

module.exports = router;