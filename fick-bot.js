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

  init() {
    this.connection.addEventListener("open", () => {
      this.connection.send(`NICK ${this.nick}`);
      this.connection.send(`JOIN ${this.chanel}`);
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
