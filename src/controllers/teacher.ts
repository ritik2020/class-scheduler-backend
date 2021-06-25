import {db} from '../mysql';
export const getAllTeachers = ()=>{
    const dbConnection = db.getDBConnection();
    return new Promise((resolve, reject)=>{
        const query = "select * from teachers";
        dbConnection.query(query,(err,result)=>{
            err?reject(err):resolve(result);
        });
    });    
}

export const getTeacherByID = (id:number)=>{
    const dbConnection = db.getDBConnection();
    return new Promise((resolve,reject)=>{
        const query = `select * from teachers where id=${id}`;
        dbConnection.query(query,(err,result)=>{
            err?reject(err):resolve(result);
        });
    });
}

export const insertTeacher = (teacher:any):Promise<void>=>{
    const {teacher_name} = teacher;
    const dbConnection = db.getDBConnection();
    return new Promise((resolve,reject)=>{
        const query = `insert into teachers(teacher_name) values ('${teacher_name}')`;
        dbConnection.query(query,(err)=>{
            err?reject(err):resolve();
        });
    });
}

export const deleteTeacher = (id:number):Promise<void>=>{
    const dbConnection = db.getDBConnection();
    return new Promise((resolve,reject)=>{
        const query = `delete from teachers where id=${id}`;
        dbConnection.query(query,(err)=>{
            err?reject(err):resolve();
        });
    });
}