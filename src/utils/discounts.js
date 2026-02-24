/**
 * @file discounts.js
 * Role: Utilitaires de remise.
 * Comment c est fait: Calcule un taux de reduction stable et fournit les helpers de prix avec/sans promo.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
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
