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

class IrcFickerBot {
  constructor(chanel, fickConditions, fickTopics, nick) {
    this.chanel = chanel;
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
    this.nick = nick;
    this.irc = new IrcSocket("wss://web.libera.chat/webirc/websocket/");
  }

  init() {
    this.irc.onOpen((event) => {
      this.irc.setNick(this.nick);
      this.irc.joinChanel(this.chanel);
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
