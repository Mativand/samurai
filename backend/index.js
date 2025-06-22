const cors = require('cors');
const express = require('express')
const sequelize = require('./config/database');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandlingMiddleware');

const PORT = process.env.BACKEND_PORT || 4000;

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin: `http://localhost:5173`,
}));
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (e) {
        console.log(e)
    }
};

start();
