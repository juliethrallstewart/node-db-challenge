const express = require('express');

// const Schemes = require('../data/db-config.js');
const Models = require('./scheme-model')

const router = express.Router();

router.get('/', (req, res) => {
  Models.find()
  .then(schemes => {
    res.json(schemes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

router.get('/:id', validateId, (req, res) => {
  const { id } = req.params;

  Models.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

// need to complete
router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Models.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Models.add(schemeData)
  .then(scheme => {
    console.log(scheme)
    res.status(201).json(scheme);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new scheme' });
  });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Models.findById(id)
  .then(scheme => {
    if (scheme) {
      Models.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Models.findById(id)
  .then(scheme => {
    if (scheme) {
      Models.update(id, changes)
      .then(updatedScheme => {
        console.log(updatedScheme, 'number of schemes updated')
        res.json(updatedScheme);
      });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Models.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

//delete that return obj deleted

// router.delete('/:id', (req, res) => {
//   const { id } = req.params
//   let schemeRemoved = {}

//   Models.findById(id)
//       .then(scheme => {
//           schemeRemoved = scheme
//       })
//       .catch(e => {
//           res.status(500).json({error: 'error getting post by id'})
//       })

//   Models.remove(id)
//       .then(result => {
//           res.status(200).json({deleted: [result, schemeRemoved]})
//       })
//       .catch(e => {
//           res.status(500).json({error: 'error deleting scheme'})
//       })
// });

module.exports = router;

function validateId (req, res, next) {
    const {id} = req.params
  
    !id ? null : console.log('id validated')
    next()
  }