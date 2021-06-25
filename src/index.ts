import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {db} from './mysql';
import teacherRoutes from './routes/teacher';
import scheduleRoutes from './routes/schedule';
const app:Express = express();
const port:string = process.env.PORT || '3000';

(async()=>{
    try{
        await db.connect();
        app.use(cors());
        app.use(express.json());
        app.use('/teachers',teacherRoutes);
        app.use('/schedules', scheduleRoutes);
        app.get('/',(req:Request, res:Response)=>{
            res.json({ message: "Root Route hit"});
        });
        app.listen(port, ()=>console.log(`Server running on port ${port}`));
    }catch(err){
        throw new Error(err.message);
    }
})();

