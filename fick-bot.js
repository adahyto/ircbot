class IrcFickerBot {
  constructor(chanel, fickConditions, fickTopics, nick) {
    this.chanel = chanel;
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
    this.nick = nick;
    this.irc = new IrcSocket("wss://web.libera.chat/webirc/websocket/");
  }

  init() {
    this.irc.connection.onopen = this.onOpen.bind(this);
    this.irc.connection.onopen = this.onMsg.bind(this);
  }

  onOpen() {
    this.irc.setNick(this.nick);
    this.irc.joinChanel(this.chanel);
  }

  onMsg() {
    if (this.isFickNeeded(event.data)) {
      this.irc.send(this.fick());
    }
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
