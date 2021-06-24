const { ipcRenderer } = require("electron");

var hourFormat = true;

function callOnce() {
    const date = new Date();
    document.getElementById("time").innerHTML = date.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: hourFormat,
        }
    );
    document.getElementById("date").innerHTML = date.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
}

function time() {
    const date = new Date();

    document.getElementById("time").innerHTML = date.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: hourFormat,
        }
    );
    document.getElementById("date").innerHTML =
        " " +
        date.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
}

var run = setInterval(time, 30000);
callOnce();
ipcRenderer.on("settings", (event, arg) => {
    var data = arg;
    hourFormat = JSON.parse(data.tF);
    document.getElementById("date").style.display = JSON.parse(data.dR)
        ? "block"
        : "none";
    document.getElementById("time").style.color = data.fCT;
    document.getElementById("date").style.color = data.fCD;
    document.getElementById("time").style.fontSize = `${JSON.parse(
        data.fST
    )}px`;
    document.getElementById("date").style.fontSize = `${JSON.parse(
        data.fSD
    )}px`;
    document.getElementById("time").style.fontFamily = data.fFT;
    document.getElementById("date").style.fontFamily = data.fFD;
    document.getElementById("time").style.fontWeight = `${JSON.parse(
        data.fWT
    )}`;
    document.getElementById("date").style.fontWeight = `${JSON.parse(
        data.fWD
    )}`;

    switch (data.pos) {
        case "C":
            var head = document.head;
            var oldStyle = document.getElementById("styleBaby");
            if (oldStyle !== undefined) {
                head.removeChild(oldStyle);
            }
            var style = document.createElement("style");
            style.setAttribute("id", "styleBaby");
            style.innerHTML = `#clickthrough { 
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                                }

                                #time{
                                padding: 0%;
                                margin: 0%;
                                }

                                #date{
                                margin: 0%;
                                }`;
            document.head.appendChild(style);
            break;
        case "RB":
            var head = document.head;
            var oldStyle = document.getElementById("styleBaby");
            if (oldStyle !== undefined) {
                head.removeChild(oldStyle);
            }
            var style = document.createElement("style");
            style.setAttribute("id", "styleBaby");
            style.innerHTML = `#clickthrough { 
                                position: absolute;
                                bottom: 0%;
                                right: 0%;
                                }

                                #time{
                                padding: 0%;
                                margin: 0%;
                                }

                                #date{
                                margin: 0%;
                                } `;
            document.head.appendChild(style);
            break;
        case "RT":
            var head = document.head;
            var oldStyle = document.getElementById("styleBaby");
            if (oldStyle !== undefined) {
                head.removeChild(oldStyle);
            }
            var style = document.createElement("style");
            style.setAttribute("id", "styleBaby");
            style.innerHTML = ` #clickthrough { 
                                display: flex;
                                flex-direction: column;
                                }

                                #time{
                                padding: 0%;
                                margin: 0%;
                                align-self: flex-end;
                                }

                                #date{
                                margin: 0%;
                                align-self: flex-end;
                                } `;
            document.head.appendChild(style);
            break;
        case "LB":
            var head = document.head;
            var oldStyle = document.getElementById("styleBaby");
            if (oldStyle !== undefined) {
                head.removeChild(oldStyle);
            }
            var style = document.createElement("style");
            style.setAttribute("id", "styleBaby");
            style.innerHTML = `#clickthrough { 
                                position: absolute;
                                bottom: 0%;
                                left: 0%;
                                }

                                #time{
                                padding: 0%;
                                margin: 0%;
                                }

                                #date{
                                margin: 0%;
                                } `;
            document.head.appendChild(style);
            break;
        case "LT":
            var head = document.head;
            var oldStyle = document.getElementById("styleBaby");
            if (oldStyle !== undefined) {
                head.removeChild(oldStyle);
            }
            var style = document.createElement("style");
            style.setAttribute("id", "styleBaby");
            style.innerHTML = `#clickthrough { 
                                display: flex;
                                flex-direction: column;
                                }

                                #time{
                                padding: 0%;
                                margin: 0%;
                                }

                                #date{
                                margin: 0%;
                                }`;
            document.head.appendChild(style);
            break;
        default:
            var head = document.head;
            var oldStyle = document.getElementById("styleBaby");
            if (oldStyle !== undefined) {
                head.removeChild(oldStyle);
            }
            var style = document.createElement("style");
            style.setAttribute("id", "styleBaby");
            style.innerHTML = `#clickthrough { 
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                                }

                                #time{
                                padding: 0%;
                                margin: 0%;
                                }

                                #date{
                                margin: 0%;
                                }`;
            document.head.appendChild(style);
            break;
    }
});
