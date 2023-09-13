import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL!);

const db = mongoose.connection;

db.on('connected', () => console.log('Conexão ok'));
db.on('error', (error) => console.log('Erro na conexão', error));

export default db;
