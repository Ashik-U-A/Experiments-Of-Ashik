import { Router } from "express";
import { join } from "path";

export const MainRouter: Router = Router();

MainRouter.get("/styles/:name.css", (req, res) => {
    res.sendFile(
        join(__dirname, "..", "frontend", "styles", req.params.name + ".css")
    );
})
    .get("/scripts/:name.js", (req, res) => {
        res.sendFile(
            join(
                __dirname,
                "..",
                "frontend",
                "scripts",
                req.params.name + ".js"
            )
        );
    })
    .get("/", (req, res) => {
        res.sendFile(join(__dirname, "..", "frontend", "index.html"));
    })
    .get("*", (req, res, next) => {
        if (req.headers.navloaded !== undefined) {
            next();
        } else {
            res.sendFile(join(__dirname, "..", "frontend", "index.html"));
        }
    })
    .get("/home", (req, res) => {
        res.sendFile(join(__dirname, "..", "frontend", "home_page.html"));
    })
    .get("/who_am_i", (req, res) => {
        res.sendFile(join(__dirname, "..", "frontend", "who_am_i.html"));
    });
