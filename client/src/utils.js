

export const  numberToEmoji = (n) => {
    const numbers = [
        "0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"
    ];
    if (n === 10 || n === '10') {
        return "🔟"
    }
    return n.toString().split('').map(
        char => numbers[parseInt(char)]
    ).join('');
};

export const formatDate = (date) => {
    const s = date;
    const a = s.split(/[^0-9]/);
    const d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    return (
        numberToEmoji(d.getMonth() + 1) + '🌙' +
        numberToEmoji(d.getDate()) + '☀️' +
        numberToEmoji(d.getHours()) + '⏰' +
        numberToEmoji(d.getMinutes()) + '⏲️'
    );
}
