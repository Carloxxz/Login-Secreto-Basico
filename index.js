//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express"
import bodyParser from "body-parser"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

let userIsAuthorised = false

app.use(bodyParser.urlencoded({ extended: true }))

function passwordCheck(req, res, next) {
    const password = req.body["password"]
    userIsAuthorised = password === "ILoveProgramming" ? true
        : userIsAuthorised
    next()
}

app.use(passwordCheck)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get("/", (get, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/check", (req, res) => {
    // const filePath = userIsAuthorised ? "/public/secret.html" : "/public/index.html"
    // res.sendFile(__dirname + filePath)

    // userIsAuthorised ? res.sendFile(__dirname + "/public/secret.html") 
    // : res.sendFile(__dirname + "/public/index.html")

    const filePath = __dirname + "/public/" + (userIsAuthorised ? "secret" : "index") + ".html";
    res.sendFile(filePath);
})