import { db } from '../mysql';
export const getAllSchedules = async () => {
    const dbConnection = db.getDBConnection();
    return new Promise((resolve, reject) => {
        const query = "select * from schedules";
        dbConnection.query(query, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}

export const scheduleClass = async(schedule:any):Promise<void>=>{
    const {schedule_date, start_time, end_time, topic_name, teacher_id} = schedule;
    const dbConnection = db.getDBConnection();
    const isOverlapping:boolean = await isTimingsOverlapping(schedule);
    return new Promise((resolve,reject)=>{
        if(!isOverlapping){
            const query = `insert into schedules(schedule_date, start_time, end_time, topic_name, teacher_id) 
            values("${schedule_date}","${start_time}","${end_time}", "${topic_name}", ${teacher_id})`;
            dbConnection.query(query,(err)=>{
                err?reject(err):resolve();
            });
        } else{
            const err = new Error("Timings overlapping");
            reject(err);
        }
    })
    
} 

export const getSchedulesOfADate = (date:string)=>{
    const dbConnection = db.getDBConnection();
    const query = `select schedules.*, teachers.teacher_name from schedules inner join teachers on schedules.teacher_id=teachers.id where schedules.schedule_date='${date}' order by start_time;`
    return new Promise((resolve,reject)=>{
        dbConnection.query(query,(err,schedules)=>{
            err?reject(err):resolve(schedules);
        });
    });
}

export const getSchedulesOfAMonth = (month:number, year:number)=>{
    const dbConnection = db.getDBConnection();
    const query = `select schedules.*, teachers.teacher_name from schedules
    inner join teachers
    on schedules.teacher_id=teachers.id
    where month(schedules.schedule_date)=${month} and year(schedules.schedule_date)=${year}
    order by schedule_date, start_time;`
    return new Promise((resolve,reject)=>{
        dbConnection.query(query, (err,schedules)=>{
            err?reject(err):resolve(schedules);
        })
    })
}

export const getSchedulesBetweenDateRange = (startDate:string, endDate:string)=>{
    const dbConnection = db.getDBConnection();
    const query = `select schedules.*, teachers.teacher_name from schedules
    inner join teachers
    on schedules.teacher_id=teachers.id
    where schedules.schedule_date between "${startDate}" and "${endDate}"
    order by schedule_date, start_time;`
    return new Promise((resolve,reject)=>{
        dbConnection.query(query, (err, schedules)=>{
            err?reject(err):resolve(schedules);
        });
    }); 
}

export const deleteSchedule = (id:number):Promise<void>=>{
    const dbConnection = db.getDBConnection();
    const query = `delete from schedules where id=${id}`;
    return new Promise((resolve,reject)=>{
        dbConnection.query(query,(err)=>{
            err?reject(err):resolve();
        });
    });
}

const isTimingsOverlapping = async (schedule: any): Promise<boolean>=> {
    const { schedule_date, start_time, end_time, teacher_id } = schedule;
    //get the start and end times of all the schedules of a date for a teacher.
    const timings: string[][] = await getSchedulesTimingsOfADateForATeacher(schedule_date, teacher_id);
    timings.push([start_time, end_time]);
    if (timings.length === 1) return false;
    timings.sort((time1, time2) =>time1[0].localeCompare(time2[0]));
    for (let i = 0; i < timings.length - 1; i++) {
        const currentEndTime = timings[i][1];
        const nextStartTime = timings[i + 1][0];
        if (currentEndTime > nextStartTime) {
            return true;
        }
    }
    return false;
}

const getSchedulesTimingsOfADateForATeacher = (schedule_date: string, teacher_id: number): Promise<string[][]> => {
    const dbConnection = db.getDBConnection();
    const query = `select * from schedules where teacher_id=${teacher_id} AND schedule_date='${schedule_date}'`;
    const schedulesTimings: string[][] = []; //[[startTime,endTime],[startTime,endTime]]
    return new Promise((resolve, reject) => {
        dbConnection.query(query, (err, schedules) => {
            if (err) {
                reject(err);
            } else {
                schedules.forEach((schedule: any) => {
                    schedulesTimings.push([schedule.start_time, schedule.end_time]);
                });
                resolve(schedulesTimings);
            }
        });
    });
}

