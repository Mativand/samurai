const Router = require('express');
const ExampleController = require('../controllers/exampleController');
const router = new Router();

router.get('/', ExampleController.read);
router.post('/', ExampleController.create);
// router.patch('/:id', ExampleController.update);
// router.delete('/:id', ExampleController.delete);

module.exports = router;