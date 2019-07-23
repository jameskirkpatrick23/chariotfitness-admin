// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

const nanoid = require('nanoid')

router.db._.mixin({
  // Return incremented uuid
  // Override router's createId to also return a uuid instead of an int
  createId: function(coll) {
    return nanoid(7)
  }
});

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
