const Router = require('express');
const router = new Router();
const exampleRouter = require('./exampleRouter');

router.use('/example', exampleRouter);

module.exports = router;