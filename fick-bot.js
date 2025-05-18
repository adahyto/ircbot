class IrcFickerBot {
  constructor(chanel, fickConditions, fickTopics, nick) {
    this.chanel = chanel;
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
    this.nick = nick;
    this.irc = new IrcSocket("wss://web.libera.chat/webirc/websocket/");
  }

  init() {
    this.irc.connection.onopen = (event) => {
      this.irc.joinChanel("#polen2");
      console.log(event);
    };
  }

  //   onMsg(event) {
  //     if (event.data && this.fickConditions(event.data)) {
  //       this.irc.send(this.fick());
  //     }
  //   }

  //   stop() {
  //     this.irc.quit();
  //   }

  //   fick() {
  //     const ran = Math.floor(Math.random() * this.fickTopics.length + 1);
  //     return `*** jebiemy ${this.fickTopics[ran]} ***`;
  //   }
}
