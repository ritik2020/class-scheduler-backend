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
const schedule_1 = require("../controllers/schedule");
const router = express_1.default.Router();
//endpoint for getting all the schedules
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield schedule_1.getAllSchedules();
        res.status(200).json(schedules);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
//endpoint for scheduling a class
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = req.body;
        yield schedule_1.scheduleClass(schedule);
        res.status(200).json({
            message: "Class Scheduled Succesfully"
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// endpoint for getting schedules of a date
router.get("/date/:date", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = req.params.date;
        const schedules = yield schedule_1.getSchedulesOfADate(date);
        res.status(200).json(schedules);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.get("/month/:month/:year", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const month = Number(req.params.month);
        const year = Number(req.params.year);
        const schedules = yield schedule_1.getSchedulesOfAMonth(month, year);
        res.status(200).json(schedules);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
router.get("/range/:startDate/:endDate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startDate = req.params['startDate'];
        const endDate = req.params['endDate'];
        const schedules = yield schedule_1.getSchedulesBetweenDateRange(startDate, endDate);
        res.status(200).json(schedules);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
//endpoint for deleting a schedule
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scheduleID = Number(req.params.id);
        yield schedule_1.deleteSchedule(scheduleID);
        res.status(200).json({
            message: "Deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
module.exports = router;
