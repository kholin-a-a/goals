export function string(length) {
    const alph = "0123456789qwertyuiopasdfghjklzxcvbnm".split("");

    let str = "";
    for(let i = 0; i < length; i++) {
        const index = parseInt(
            Math.random() * (alph.length - 1)
        )

        str += alph[index];
    }

    return str;
}