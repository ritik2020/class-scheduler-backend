import express, {Router, Request, Response} from 'express';
import { getAllSchedules, scheduleClass, getSchedulesOfADate, deleteSchedule, getSchedulesOfAMonth, getSchedulesBetweenDateRange} from '../controllers/schedule';
const router:Router = express.Router();

//endpoint for getting all the schedules
router.get('/', async (req:Request, res:Response)=>{
    try{
        const schedules = await getAllSchedules();
        res.status(200).json(schedules);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//endpoint for scheduling a class
router.post('/', async (req:Request, res:Response)=>{
    try{
        const schedule = req.body;
        await scheduleClass(schedule);
        res.status(200).json({
            message: "Class Scheduled Succesfully"
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
});


// endpoint for getting schedules of a date
router.get("/date/:date", async (req:Request, res:Response)=>{
    try{
        const date:string = req.params.date;
        const schedules = await getSchedulesOfADate(date);
        res.status(200).json(schedules);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get("/month/:month/:year", async (req:Request, res:Response)=>{
    try{
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        const schedules = await getSchedulesOfAMonth(month,year);
        res.status(200).json(schedules);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}); 

router.get("/range/:startDate/:endDate", async (req:Request, res:Response)=>{
    try{
        const startDate = req.params['startDate'];
        const endDate = req.params['endDate'];
        const schedules = await getSchedulesBetweenDateRange(startDate, endDate);
        res.status(200).json(schedules);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//endpoint for deleting a schedule
router.delete('/:id', async (req:Request, res:Response)=>{
    try{
        const scheduleID:number = Number(req.params.id);
        await deleteSchedule(scheduleID);
        res.status(200).json({
            message: "Deleted successfully"
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

export = router;