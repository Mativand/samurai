class ExampleController {
    async create(req, res, next) {
        res.json({ message: 'create' });
    }

    async read(req, res, next) {
        res.json({ message: 'read' });
    }
}

module.exports = new ExampleController();