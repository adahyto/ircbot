class FickerIrcBot {
  constructor(url, chanel, nick, fickConditions, fickTopics) {
    this.chanel = chanel;
    this.nick = nick;
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
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
  }

  quit(name) {
    this.connection.send(`QUIT ${name}`);
  }

  send(msg) {
    this.connection.send(msg);
  }

  init() {
    this.connection.addEventListener("open", () => {
      this.setNick(this.nick);
      this.joinChanel(this.chanel);
    });

    this.connection.addEventListener("message", async (e) => {
      var line = e.data;
      if (line instanceof Blob) {
        line = await e.data.text();
      }
      if (line && this.fickConditions(line)) {
        console.log(this.fick());
      }
    });
  }

  fick() {
    const ran = Math.floor(Math.random() * this.fickTopics.length + 1);
    return `*** jebiemy ${this.fickTopics[ran]} ***`;
  }
}
