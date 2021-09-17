const { getUserByTag } = require("./helperFunctions");

function stream(message, args) {
  const user = args[0];
  var taggedUser = getUserByTag(message.guild, user);
  var status = taggedUser.presence.status;
  if (status === "online" || status === "idle") {
    message.channel.send(user);
    if (user === "<@!374199399146061836>") {
      message.channel.send(
        "You can also try - https://www.twitch.tv/gnoyl9375"
      );
    } else if (user === "<@!214072494737457152>") {
      message.channel.send("Probvai tuk: https://www.twitch.tv/freewaydani");
    }
    message.channel.send(
      "https://media.tenor.com/images/037ad7fd2f75a122c29f25f241b2770d/tenor.gif"
    );
  } else message.channel.send(user + " is 🔨 his 🥩");
}
module.exports = {
  stream: stream,
};
