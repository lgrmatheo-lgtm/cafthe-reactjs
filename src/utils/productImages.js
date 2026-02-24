/**
 * @file productImages.js
 * Role: Resolution d image produit intelligente.
 * Comment c est fait: Mappe image par id/nom/categorie puis applique fallback robuste si aucune correspondance exacte.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
const PRODUCT_IMAGE_MAP = {
    "1": "/img/products/1-arabica.jpg",
    "2": "/img/products/2-robusta.jpg",
    "3": "/img/products/3-moka.jpg",
    "4": "/img/products/4-santos.jpg",
    "5": "/img/products/5-filtre.jpg",
    "6": "/img/products/6-espresso.jpg",
    "7": "/img/products/7-earl-grey.jpg",
    "8": "/img/products/8-darjeeling.jpg",
    "9": "/img/products/9-sencha.jpg",
    "10": "/img/products/10-matcha.jpg",
    "11": "/img/products/11-gunpowder.jpg",
    "12": "/img/products/12-bai-mu-dan.jpg",
    "13": "/img/products/13-mug.jpg",
    "14": "/img/products/14-theiere.jpg",
};

const PRODUCT_NAME_MAP = {
    "arabica": "/img/products/1-arabica.jpg",
    "robusta": "/img/products/2-robusta.jpg",
    "moka": "/img/products/3-moka.jpg",
    "santos": "/img/products/4-santos.jpg",
    "filtre": "/img/products/5-filtre.jpg",
    "espresso": "/img/products/6-espresso.jpg",
    "earl grey": "/img/products/7-earl-grey.jpg",
    "darjeeling": "/img/products/8-darjeeling.jpg",
    "sencha": "/img/products/9-sencha.jpg",
    "matcha": "/img/products/10-matcha.jpg",
    "gunpowder": "/img/products/11-gunpowder.jpg",
    "bai mu dan": "/img/products/12-bai-mu-dan.jpg",
    "mug": "/img/products/13-mug.jpg",
    "theiere": "/img/products/14-theiere.jpg",
};

const CATEGORY_FALLBACKS = {
    coffee: [
        "/img/products/1-arabica.jpg",
        "/img/products/2-robusta.jpg",
        "/img/products/3-moka.jpg",
        "/img/products/4-santos.jpg",
        "/img/products/5-filtre.jpg",
        "/img/products/6-espresso.jpg",
    ],
    tea: [
        "/img/products/7-earl-grey.jpg",
        "/img/products/8-darjeeling.jpg",
        "/img/products/9-sencha.jpg",
        "/img/products/10-matcha.jpg",
        "/img/products/11-gunpowder.jpg",
        "/img/products/12-bai-mu-dan.jpg",
    ],
    accessories: [
        "/img/products/13-mug.jpg",
        "/img/products/14-theiere.jpg",
    ],
    fallback: [
        "/img/products/1-arabica.jpg",
        "/img/products/2-robusta.jpg",
        "/img/products/3-moka.jpg",
        "/img/products/4-santos.jpg",
        "/img/products/5-filtre.jpg",
        "/img/products/6-espresso.jpg",
        "/img/products/7-earl-grey.jpg",
        "/img/products/8-darjeeling.jpg",
        "/img/products/9-sencha.jpg",
        "/img/products/10-matcha.jpg",
        "/img/products/11-gunpowder.jpg",
        "/img/products/12-bai-mu-dan.jpg",
        "/img/products/13-mug.jpg",
        "/img/products/14-theiere.jpg",
    ],
};

const CATEGORY_KEYWORDS = {
    tea: ["the", "tea", "matcha", "infusion", "oolong", "darjeeling", "earl", "sencha"],
    coffee: ["cafe", "coffee", "espresso", "arabica", "robusta", "moka", "latte", "cappuccino"],
    accessories: ["accessoire", "accessory", "filtre", "filter", "moulin", "grinder", "kettle", "theiere", "teapot", "tasse", "mug"],
    gift: ["coffret", "gift", "box", "collection", "assortiment", "selection", "set"],
};

const normalizeText = (value) => {
    if (!value) return "";
    return value
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
};

const normalizeKey = (value) => normalizeText(value).replace(/\s+/g, " ").trim();

const hashString = (value) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
};

const pickImage = (list, seed) => {
    const safeSeed = seed || "product";
    const index = hashString(safeSeed) % list.length;
    return list[index];
};

const resolveCategory = (name, category) => {
    const haystack = `${normalizeText(name)} ${normalizeText(category)}`;

    if (CATEGORY_KEYWORDS.tea.some((word) => haystack.includes(word))) {
        return "tea";
    }

    if (CATEGORY_KEYWORDS.coffee.some((word) => haystack.includes(word))) {
        return "coffee";
    }

    if (CATEGORY_KEYWORDS.accessories.some((word) => haystack.includes(word))) {
        return "accessories";
    }

    if (CATEGORY_KEYWORDS.gift.some((word) => haystack.includes(word))) {
        return "gift";
    }

    return "fallback";
};

export const PRODUCT_IMAGE_URLS = Object.values(PRODUCT_IMAGE_MAP);

export const getProductImage = (produit) => {
    if (!produit) {
        return CATEGORY_FALLBACKS.fallback[0];
    }

    const id = produit.id_article ?? produit.id ?? produit.id_articles ?? produit._id ?? "";
    if (id && PRODUCT_IMAGE_MAP[id]) {
        return PRODUCT_IMAGE_MAP[id];
    }

    const name = produit.nom_produit ?? produit.nom ?? produit.name ?? "Produit";
    const nameKey = normalizeKey(name);
    if (PRODUCT_NAME_MAP[nameKey]) {
        return PRODUCT_NAME_MAP[nameKey];
    }

    const category =
        produit.categorie?.nom ??
        produit.categorie ??
        produit.type ??
        produit.famille ??
        "";

    const categoryKey = resolveCategory(name, category);
    const seed = `${id}-${name}-${category}`.trim();
    const list = CATEGORY_FALLBACKS[categoryKey] || CATEGORY_FALLBACKS.fallback;
    return pickImage(list, seed);
};
