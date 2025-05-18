class IrcBot {
  constructor(url, chanel, nick) {
    this.chanel = chanel;
    this.nick = nick;
    this.irc = new IrcSocket(url);
  }
  init() {
    this.irc.connection.addEventListener("open", () => {
      this.irc.setNick(this.nick);
      this.irc.joinChanel(this.chanel);
    });
  }
}

class FickerIrcBot extends IrcBot {
  constructor(url, chanel, nick, fickConditions, fickTopics) {
    super(url, chanel, nick);
    this.fickConditions = fickConditions;
    this.fickTopics = fickTopics;
  }

  init() {
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

  fick() {
    const ran = Math.floor(Math.random() * this.fickTopics.length + 1);
    return `*** jebiemy ${this.fickTopics[ran]} ***`;
  }
}
