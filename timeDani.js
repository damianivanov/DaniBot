module.exports  = { timeOfday: function()
    {
        var currentTime = new Date();
        var hours = currentTime.getHours()+2;
        var day = currentTime.getUTCDay();
        if ((hours >= 15 && hours <= 5))
            return "Dani is grinding c#/c++/c/python/Angular/React/Ruby on Rails/Swift/GO/Kotlin/Java/JavaScript/TypeScript 🧢"
        else
            return "Dani is chillaxin' "
    }
}
