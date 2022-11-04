const express = require("express");

const server = express();


server.get("/hello", (req, res) => {
    res.send("Hello Hypo1006");
});

server.listen(3000, () => {
    console.log("서버가 작동합니다.");
}); 