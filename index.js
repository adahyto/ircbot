// const WebSocket = require("ws");

class IrcSocket {
  constructor(url) {
    this.connection = this.newConnection(url);
  }

  newConnection(url) {
    return new WebSocket(url);
  }

  keepConnection() {
    setInterval(() => {
      this.connection.send("");
    }, 45000);
  }

  setNick(nick) {
    this.connection.send(`NICK ${nick}`);
  }

  joinChanel(name) {
    this.connection.send(`JOIN ${name}`);
    this.keepConnection();
  }

  quit(name) {
    this.connection.send(`QUIT ${name}`);
  }

  send(msg) {
    this.connection.send(msg);
  }

  onMsg(func) {
    this.connection.onmessage = (event) => {
      func(event);
    };
  }
  onOpen(func) {
    this.connection.onopen = (event) => {
      func(event);
    };
  }
}

class IrcFickerBot {
  irc = new IrcSocket("wss://web.libera.chat/webirc/websocket/");
  constructor(chanel, fickConditions, fickTopics, nick) {
    this.chanel = chanel;
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
    this.nick = nick;
  }

  init() {
    this.irc.onOpen((event) => {
      this.irc.setNick(this.nick);
      this.irc.joinChanel(this.chanel);

      console.log("connection open: ", event);
    });

    this.irc.onMsg((event) => {
      if (this.isFickNeeded(event.data)) {
        this.irc.send(this.fick());
      }
    });
  }

  stop() {
    this.irc.quit();
  }

  isFickNeeded(msg) {
    if (this.fickConditions(msg)) {
      return true;
    }
  }

  fick() {
    const ran = Math.floor(Math.random() * this.fickTopics.length + 1);
    return `*** jebiemy ${this.fickTopics[ran]} ***`;
  }
}

let multiFickBot = null;

const runFickBot = () => {
  multiFickBot = new IrcFickerBot(
    document.querySelector('.sirc-form-input[name="chanel"]').value,
    (msg) => {
      return (
        msg.slice(0, 4) === "jeb " ||
        msg.includes("co jebiemy") ||
        msg.includes("jebac")
      );
    },
    document.querySelector('.sirc-form-input[name="topics"]').value,
    document.querySelector('.sirc-form-input[name="nick"]').value
  );
  multiFickBot.init();

  document.querySelector("#sirc-logger--fickbot").style.display = "block";
};

document
  .querySelector("#sirc-fickbot-control--run")
  .addEventListener("click", () => {
    if (multiFickBot) multiFickBot.stop();
    runFickBot();
  });

document
  .querySelector("#sirc-fickbot-control--stop")
  .addEventListener("click", () => {
    multiFickBot.stop();
  });
