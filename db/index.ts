import { DataSource } from "typeorm";
import { ImageLog } from './entities/ImageLog.js';

console.log('----------------------------------------------');
const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hackathon_ibrafares',
    entities: [ImageLog],
    // migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
});


dataSource.initialize().then(() => {
    console.log('******************************************')
    console.log("Connected to DB!");
    console.log('******************************************')
}).catch(err => {
    console.log('******************************************')
    console.error('Failed to connect to DB: ' + err);
    console.log('******************************************')
});

export default dataSource;