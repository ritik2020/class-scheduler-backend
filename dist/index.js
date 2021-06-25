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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql_1 = require("./mysql");
const teacher_1 = __importDefault(require("./routes/teacher"));
const schedule_1 = __importDefault(require("./routes/schedule"));
const app = express_1.default();
const port = process.env.PORT || '3000';
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_1.db.connect();
        app.use(cors_1.default());
        app.use(express_1.default.json());
        app.use('/teachers', teacher_1.default);
        app.use('/schedules', schedule_1.default);
        app.get('/', (req, res) => {
            res.json({ message: "Root Route hit" });
        });
        app.listen(port, () => console.log(`Server running on port ${port}`));
    }
    catch (err) {
        throw new Error(err.message);
    }
}))();
