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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const teacher_1 = require("../controllers/teacher");
const router = express_1.default.Router();
//endpoint for getting all the teachers
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield teacher_1.getAllTeachers();
        res.status(200).json(teachers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
//endpoint for inserting a teacher
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = req.body;
        yield teacher_1.insertTeacher(teacher);
        res.status(200).json({
            message: "Inserted Successfully"
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
//endpoint for getting a teacher by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherID = Number(req.params.id);
        const teacher = yield teacher_1.getTeacherByID(teacherID);
        res.status(200).json(teacher);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
//endpoint
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherID = Number(req.params.id);
        yield teacher_1.deleteTeacher(teacherID);
        res.status(200).json({
            message: "Deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
module.exports = router;
