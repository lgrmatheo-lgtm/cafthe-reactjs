const hashId = (value) => {
    const str = String(value ?? "");
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
        hash = (hash * 31 + str.charCodeAt(i)) % 997;
    }
    return hash;
};

export const getDiscountPercent = (id) => {
    const seed = hashId(id) % 100;
    if (seed < 60) {
        return 5 + (seed % 11) * 5;
    }
    return 0;
};

export const getDiscountedPrice = (price, id) => {
    const percent = getDiscountPercent(id);
    if (!percent) return price;
    return price * (1 - percent / 100);
};

