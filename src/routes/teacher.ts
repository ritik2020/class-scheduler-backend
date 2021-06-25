import express, {Router, Request, Response} from 'express';
import { getAllTeachers, getTeacherByID, insertTeacher, deleteTeacher } from '../controllers/teacher';
const router:Router = express.Router();

//endpoint for getting all the teachers
router.get('/', async (req:Request, res:Response)=>{
    try{
        const teachers = await getAllTeachers();
        res.status(200).json(teachers);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//endpoint for inserting a teacher
router.post('/', async (req:Request, res:Response)=>{
    try{
        const teacher = req.body; 
        await insertTeacher(teacher);
        res.status(200).json({
            message: "Inserted Successfully"
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//endpoint for getting a teacher by id
router.get('/:id', async (req:Request, res:Response)=>{
    try{
        const teacherID:number = Number(req.params.id);
        const teacher = await getTeacherByID(teacherID);
        res.status(200).json(teacher);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});     

//endpoint
router.delete('/:id', async (req:Request, res:Response)=>{
    try{
        const teacherID:number = Number(req.params.id);
        await deleteTeacher(teacherID);
        res.status(200).json({
            message: "Deleted successfully"
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
export = router;