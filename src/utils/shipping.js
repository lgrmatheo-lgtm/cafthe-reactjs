export const getShippingCost = (totalItems, method = "standard") => {
    if (method === "pickup") return 0;
    if (!totalItems || totalItems <= 0) return 0;

    const base = 4.9;
    const perItem = 0.8;
    const standard = base + perItem * Math.max(0, totalItems - 1);

    if (method === "express") return standard + 4;
    return standard;
};

