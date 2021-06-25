"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.getSchedulesBetweenDateRange = exports.getSchedulesOfAMonth = exports.getSchedulesOfADate = exports.scheduleClass = exports.getAllSchedules = void 0;
const mysql_1 = require("../mysql");
const getAllSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbConnection = mysql_1.db.getDBConnection();
    return new Promise((resolve, reject) => {
        const query = "select * from schedules";
        dbConnection.query(query, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
});
exports.getAllSchedules = getAllSchedules;
const scheduleClass = (schedule) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule_date, start_time, end_time, topic_name, teacher_id } = schedule;
    const dbConnection = mysql_1.db.getDBConnection();
    const isOverlapping = yield isTimingsOverlapping(schedule);
    return new Promise((resolve, reject) => {
        if (!isOverlapping) {
            const query = `insert into schedules(schedule_date, start_time, end_time, topic_name, teacher_id) 
            values("${schedule_date}","${start_time}","${end_time}", "${topic_name}", ${teacher_id})`;
            dbConnection.query(query, (err) => {
                err ? reject(err) : resolve();
            });
        }
        else {
            const err = new Error("Timings overlapping");
            reject(err);
        }
    });
});
exports.scheduleClass = scheduleClass;
const getSchedulesOfADate = (date) => {
    const dbConnection = mysql_1.db.getDBConnection();
    const query = `select schedules.*, teachers.teacher_name from schedules inner join teachers on schedules.teacher_id=teachers.id where schedules.schedule_date='${date}' order by start_time;`;
    return new Promise((resolve, reject) => {
        dbConnection.query(query, (err, schedules) => {
            err ? reject(err) : resolve(schedules);
        });
    });
};
exports.getSchedulesOfADate = getSchedulesOfADate;
const getSchedulesOfAMonth = (month, year) => {
    const dbConnection = mysql_1.db.getDBConnection();
    const query = `select schedules.*, teachers.teacher_name from schedules
    inner join teachers
    on schedules.teacher_id=teachers.id
    where month(schedules.schedule_date)=${month} and year(schedules.schedule_date)=${year}
    order by schedule_date, start_time;`;
    return new Promise((resolve, reject) => {
        dbConnection.query(query, (err, schedules) => {
            err ? reject(err) : resolve(schedules);
        });
    });
};
exports.getSchedulesOfAMonth = getSchedulesOfAMonth;
const getSchedulesBetweenDateRange = (startDate, endDate) => {
    const dbConnection = mysql_1.db.getDBConnection();
    const query = `select schedules.*, teachers.teacher_name from schedules
    inner join teachers
    on schedules.teacher_id=teachers.id
    where schedules.schedule_date between "${startDate}" and "${endDate}"
    order by schedule_date, start_time;`;
    return new Promise((resolve, reject) => {
        dbConnection.query(query, (err, schedules) => {
            err ? reject(err) : resolve(schedules);
        });
    });
};
exports.getSchedulesBetweenDateRange = getSchedulesBetweenDateRange;
const deleteSchedule = (id) => {
    const dbConnection = mysql_1.db.getDBConnection();
    const query = `delete from schedules where id=${id}`;
    return new Promise((resolve, reject) => {
        dbConnection.query(query, (err) => {
            err ? reject(err) : resolve();
        });
    });
};
exports.deleteSchedule = deleteSchedule;
const isTimingsOverlapping = (schedule) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule_date, start_time, end_time, teacher_id } = schedule;
    //get the start and end times of all the schedules of a date for a teacher.
    const timings = yield getSchedulesTimingsOfADateForATeacher(schedule_date, teacher_id);
    timings.push([start_time, end_time]);
    if (timings.length === 1)
        return false;
    timings.sort((time1, time2) => time1[0].localeCompare(time2[0]));
    for (let i = 0; i < timings.length - 1; i++) {
        const currentEndTime = timings[i][1];
        const nextStartTime = timings[i + 1][0];
        if (currentEndTime > nextStartTime) {
            return true;
        }
    }
    return false;
});
const getSchedulesTimingsOfADateForATeacher = (schedule_date, teacher_id) => {
    const dbConnection = mysql_1.db.getDBConnection();
    const query = `select * from schedules where teacher_id=${teacher_id} AND schedule_date='${schedule_date}'`;
    const schedulesTimings = []; //[[startTime,endTime],[startTime,endTime]]
    return new Promise((resolve, reject) => {
        dbConnection.query(query, (err, schedules) => {
            if (err) {
                reject(err);
            }
            else {
                schedules.forEach((schedule) => {
                    schedulesTimings.push([schedule.start_time, schedule.end_time]);
                });
                resolve(schedulesTimings);
            }
        });
    });
};
