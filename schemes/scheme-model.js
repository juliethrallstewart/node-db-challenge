const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  findUserPosts
};

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
    .where({ id })
    .first()
}

function findSteps(id){
    return db('schemes')
}

function findUserPosts(id) {
  /* 
    select * from posts as p
    join users as u on u.id = p.user_id
    where u.id = 123
  */

  return db('users as u') // remember to return the call to db()
    .join('posts as p', 'u.id', 'p.user_id')
    .where({ user_id: id })
    .select('p.id', 'p.contents', 'u.username')
    .then(posts => {
      return posts;
    });
}

