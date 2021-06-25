"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.insertTeacher = exports.getTeacherByID = exports.getAllTeachers = void 0;
const mysql_1 = require("../mysql");
const getAllTeachers = () => {
    const dbConnection = mysql_1.db.getDBConnection();
    return new Promise((resolve, reject) => {
        const query = "select * from teachers";
        dbConnection.query(query, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getAllTeachers = getAllTeachers;
const getTeacherByID = (id) => {
    const dbConnection = mysql_1.db.getDBConnection();
    return new Promise((resolve, reject) => {
        const query = `select * from teachers where id=${id}`;
        dbConnection.query(query, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getTeacherByID = getTeacherByID;
const insertTeacher = (teacher) => {
    const { teacher_name } = teacher;
    const dbConnection = mysql_1.db.getDBConnection();
    return new Promise((resolve, reject) => {
        const query = `insert into teachers(teacher_name) values ('${teacher_name}')`;
        dbConnection.query(query, (err) => {
            err ? reject(err) : resolve();
        });
    });
};
exports.insertTeacher = insertTeacher;
const deleteTeacher = (id) => {
    const dbConnection = mysql_1.db.getDBConnection();
    return new Promise((resolve, reject) => {
        const query = `delete from teachers where id=${id}`;
        dbConnection.query(query, (err) => {
            err ? reject(err) : resolve();
        });
    });
};
exports.deleteTeacher = deleteTeacher;
