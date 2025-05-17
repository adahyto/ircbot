// const WebSocket = require("ws");

class IrcSocket {
  constructor(url) {
    this.connection = new WebSocket(url);
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
