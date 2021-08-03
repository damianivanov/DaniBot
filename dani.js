module.exports = {
    lastBan: function() {
        const lastBan = new Date('8/3/2021');
        const today = new Date();
        const diffTime = Math.abs(lastBan - today);
        const diffDays = Math.ceil((diffTime + (1000 * 60 * 60 * 3)) / (1000 * 60 * 60 * 24));
        console.log(today);
        return (diffDays - 1 + ' days since the last ban! Keep it up 🙂');

    }
};