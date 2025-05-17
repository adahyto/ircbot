// const WebSocket = require("ws");

class IrcSocket {
  newConnection(url) {
    return new WebSocket(url);
  }

  keepConnection(conn) {
    setInterval(() => {
      conn.send("");
    }, 45000);
  }

  setNick(conn, nick) {
    conn.send(`NICK ${nick}`);
  }

  joinChanel(conn, name) {
    conn.send(`JOIN ${name}`);
    this.keepConnection(conn);
  }

  quit(conn, name) {
    conn.send(`QUIT ${name}`);
  }

  send(conn, msg) {
    conn.send(msg);
  }

  onMsg(conn, func) {
    conn.onmessage = (event) => {
      func(event);
    };
  }

  onOpen(conn, func) {
    conn.onopen = (event) => {
      func(event);
    };
  }
}

class IrcFickerBot extends IrcSocket {
  constructor(chanel, fickConditions, fickTopics, nick) {
    super();
    this.chanel = chanel;
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
    this.nick = nick;
    this.connection = this.newConnection(
      "wss://web.libera.chat/webirc/websocket/"
    );
  }

  init() {
    this.onOpen(this.connection, (event) => {
      this.connection.setNick(this.nick);
      this.connection.joinChanel(this.chanel);
    });

    this.onMsg(this.connection, (event) => {
      if (this.isFickNeeded(event.data)) {
        this.this.connection.send(this.fick());
      }
    });
  }

  stop() {
    this.connection.quit();
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
