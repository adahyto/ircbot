let multiFickBot = null;

const runFickBot = () => {
  multiFickBot = new IrcFickerBot(
    document.querySelector('.sirc-form-input[name="chanel"]').value,
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
      .split(","),
    document.querySelector('.sirc-form-input[name="nick"]').value
  );
  multiFickBot.init();

  document.querySelector("#sirc-logger--fickbot").style.display = "block";
};

document
  .querySelector("#sirc-fickbot-control--run")
  .addEventListener("click", () => {
    if (multiFickBot) multiFickBot.stop();
    runFickBot();
  });

document
  .querySelector("#sirc-fickbot-control--stop")
  .addEventListener("click", () => {
    multiFickBot.stop();
  });
