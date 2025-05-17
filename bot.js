// const WebSocket = require("ws");

class IrcSocket {
  constructor(url) {
    this.connection = new WebSocket(url);
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
    this.keepConnection();
  }

  quit(name) {
    this.client.send(`QUIT ${name}`);
  }

  send(msg) {
    this.client.send(msg);
  }

  onMsg(func) {
    this.client.onmessage = (event) => {
      func(event);
    };
  }

  onOpen(func) {
    this.client.onopen = (event) => {
      func(event);
    };
  }
}
