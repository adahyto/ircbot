// const WebSocket = require("ws");

class IrcSocket {
  constructor(url) {
    this.connection = new WebSocket(url, [
      "text.ircv3.net",
      "binary.ircv3.net",
    ]);
  }

  get client() {
    return this.connection;
  }

  keepConnection() {
    setInterval(() => {
      this.client.send("");
    }, 45000);
  }

  setNick(nick) {
    this.client.send(`NICK ${nick}`);
  }

  joinChanel(name) {
    this.client.send(`JOIN ${name}`);
  }

  quit(name) {
    this.client.send(`QUIT ${name}`);
  }

  send(msg) {
    this.client.send(msg);
  }
}
