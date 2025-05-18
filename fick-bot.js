class IrcFickerBot {
  constructor(chanel, fickConditions, fickTopics, nick) {
    this.chanel = chanel;
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
    this.nick = nick;
    this.irc = new IrcSocket("wss://web.libera.chat/webirc/websocket/");
  }

  init() {
    this.irc.connection.addEventListener("open", () => {
      this.irc.setNick("jebaczpro");
      this.irc.joinChanel("#polen2");
    });

    this.irc.connection.addEventListener("message", async (e) => {
      var line = e.data;
      if (line instanceof Blob) {
        line = await e.data.text();
      }
      if (line && this.fickConditions(line)) {
        console.log(this.fick());
      }
    });
  }

  //   onMsg(event) {
  //
  //   }

  //   stop() {
  //     this.irc.quit();
  //   }

  fick() {
    const ran = Math.floor(Math.random() * this.fickTopics.length + 1);
    return `*** jebiemy ${this.fickTopics[ran]} ***`;
  }
}
