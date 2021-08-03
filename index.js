require('dotenv').config();
const app = require('./src/app');
const mongo = require('./connection/mongo');

const start = async () => {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE)
        throw new Error('JWT_SECRET & JWT_EXPIRE must be defined');
    const PORT = +process.env.PORT || 3000;

    await mongo.connectDB();
    app.listen(PORT, () => {
        console.log(`Auth service is running on port ${PORT}`);
    });
};

start().catch((err) => {
    console.error(err);
});
