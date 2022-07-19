const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const robot = require("robotjs");
const winaudio = require("win-audio");

// to check if http is working
app.get("/home", function (req, res) {
  res.sendStatus(200);
});

// Listen for connections
io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for mousemovement
  socket.on("mouseMove", (data) => {
    console.log(data);
    let currentMousePos = robot.getMousePos();
    robot.moveMouse(currentMousePos.x + (2*data.x), currentMousePos.y + (2*data.y));
  });

    // Listen for mouseclick
    /**
     * 0 is left click
     * 1 is double click
     * 2 is right click
     */
    socket.on("mouseClick", (data) => {
      switch(data.clickType) {
        case 0:
            robot.mouseClick();
            break;
        case 1:ś
            robot.mouseClick();
            robot.mouseClick();
            break;// adding a comment
            ṣ
        case 2:
            robot.mouseClick('right');
            break;
    }
    });

    // Listen for volume change
    socket.on("volume", (data) => {
      console.log(data);
      winaudio.speaker.set(data.volume);
    }
    );

    // listen for keystrokes
    socket.on("keystroke", (data) => {
        if(data.keystroke != "Enter") {
            robot.typeString(data.keystroke);
        }else if(data.keystroke == "Enter") {
            robot.keyTap('enter');
        }
    });
});

// listen for disconnections
io.on("disconnect", () => {
  console.log("user disconnected");
});

http.listen(9999, function () {
  console.log("listening on *:9999");
});
