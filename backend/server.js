import express from "express"

const app = express()

app.get("/api/notes", (req, res) => {
    // send the notes
    res.status(200).send("you got 5 notes");
});

app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
});