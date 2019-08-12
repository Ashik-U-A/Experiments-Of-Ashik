import { Router } from "express";
import { join } from "path";

export const AssetsRouter: Router = Router();

AssetsRouter.get("/*.ttf", (req, res) => {
    res.sendFile(join(__dirname, "..", "frontend", "assets", req.path));
})
    .get("/*.css", (req, res) => {
        res.sendFile(join(__dirname, "..", "frontend", "assets", req.path));
    })
    .get("/*.js", (req, res) => {
        res.sendFile(join(__dirname, "..", "frontend", "assets", req.path));
    });
