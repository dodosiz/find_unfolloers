import express from "express";
import { getNonFollowers } from "./api";
import { ENV } from "./env";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const html = [];
    const nonFollowers = getNonFollowers(ENV.userName, ENV.password);
    nonFollowers.then(result => {
        result.forEach(unfollower => {
            html.push("- " + unfollower.userName + "<br>");
        });
    }).finally(() => res.send(html.join("")));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
