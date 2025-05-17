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
      console.log(this.nick);
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
