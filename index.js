let multiFickBot = null;

document.querySelector("#run-fickbot").addEventListener("click", () => {
  if (multiFickBot) multiFickBot.stop();
  const bot = new IrcFickerBot(
    document.querySelector("#nick"),
    (msg) => {
      return (
        msg.slice(0, 4) === "jeb " ||
        msg.includes("co jebiemy") ||
        msg.includes("jebac")
      );
    },
    document.querySelector("#topics"),
    document.querySelector("#nick")
  );
  multiFickBot = bot;
  multiFickBot.init();
  document.querySelector("#fickbot").style.display = "block";
});

document.querySelector("#stop-fickbot").addEventListener("click", () => {
  multiFickBot.stop();
});
