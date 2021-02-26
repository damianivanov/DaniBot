module.exports  = { timeOfday: function()
    {
        var currentTime = new Date();
        var hours = currentTime.getHours()+2;
        var day = currentTime.getUTCDay();
        //console.log(`days: ${day} - hours:${hours}`);
        if ((day >= 1  && day <= 5) && (hours >= 8 && hours <= 15))
            return "Dani is currently in school getting this 🍆"
        else
            return "Dani is waiting for new year to get this 🍆"
    }
}
