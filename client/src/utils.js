

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
