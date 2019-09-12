const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
 
};

function find() {
    return db('schemes')
}

function findById(id) {
  console.log(id)
    return db('schemes')
        .where({ id })
        .first()
    
}

function findSteps(id){
    return db('schemes as s')
        .join('steps as st', 's.id', 'st.scheme_id')
        .where({ scheme_id: id })
        .select('s.scheme_name', 'st.step_number','st.instructions')
        .orderBy('st.step_number')
        .then(scheme => {
                return scheme
        })
}
  
function add(scheme) {
  
    return db('schemes')
        .insert(scheme)
        .then(ids => {
            return findById(ids[0])
        })
}

function addStep(stepData, id) {
    stepData.scheme_id = id
    return db('steps')
        .insert(stepData)
}

function update(id, changes) {
    if (changes.scheme_name === undefined) {
        return null
    } else {
    return db('schemes')
        .where({ id })
        .update(changes)
        // .then(id => {
        //     console.log(id)
        //     return findById(ids[0])
        // })
    }
}

function remove(id) {
    return db('schemes')
      .where({ id })
      .del();
  }

