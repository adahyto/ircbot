let multiFickBot = null;

const runFickBot = () => {
  multiFickBot = new FickerIrcBot(
    "wss://web.libera.chat/webirc/websocket/",
    document.querySelector('.sirc-form-input[name="chanel"]').value,
    document.querySelector('.sirc-form-input[name="nick"]').value,
    (msg) => {
      return (
        msg.slice(0, 4) === "jeb " ||
        msg.includes("co jebiemy") ||
        msg.includes("jebac")
      );
    },
    document
      .querySelector('.sirc-form-input[name="topics"]')
      .value.replace(/\s/g, "")
      .split(",")
  );
  multiFickBot.init();

  document.querySelector("#sirc-logger--fickbot").style.display = "block";
};

document
  .querySelector("#sirc-fickbot-control--run")
  .addEventListener("click", () => {
    if (multiFickBot) return;
    runFickBot();
  });
