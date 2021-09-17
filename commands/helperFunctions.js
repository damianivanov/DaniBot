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

module.exports = {
  getUserByTag: getUserByTag,
  mm: mm,
  sendInvite: sendInvite,
};
