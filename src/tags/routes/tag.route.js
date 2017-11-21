const tagController = require('../controllers/tag.controller');

module.exports = app => {
   app.get('/api/tags', tagController.getTags);

   app.post('/api/tags', tagController.postTag);

   app.get('/api/tags/:id', tagController.getTag);

   app.delete('/api/tags/:id', tagController.deleteTag);

   app.put('/api/tags/:id', tagController.updateTag);
};
