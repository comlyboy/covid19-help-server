    
//@ts-check
import app from "./app";
const debug = require("debug")("node-angular");
import http from "http";

const normalizePort = val => {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};



const onError = (error) => {
    const addr = server.address();

    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};


const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug(`Listening on ${bind}`);
    console.log(`Listening on http://localhost:${port}`)
};

// const port = normalizePort(process.env.PORT || "3900");
const port = process.env.PORT || "3900";

app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
