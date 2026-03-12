import React, { useMemo } from "react";
import { getDiscountedPrice } from "../utils/discounts.js";
import { getShippingCost } from "../utils/shipping.js";

const CheckoutSummary = ({
    items,
    totalItems,
    totalPrice,
    deliveryMode = "standard",
    shippingOverride = null,
    totalOverride = null,
}) => {
    const shipping = useMemo(() => {
        if (typeof shippingOverride === "number") return shippingOverride;
        return getShippingCost(totalItems, deliveryMode);
    }, [totalItems, deliveryMode, shippingOverride]);
    const total = typeof totalOverride === "number" ? totalOverride : Math.max(0, totalPrice + shipping);

    return (
        <aside className="checkout-summary">
            <h3>Recapitulatif</h3>
            <div className="summary-items">
                {items.map((item) => {
                    const price = getDiscountedPrice(item.price, item.id);
                    return (
                        <div key={item.key ?? item.id} className="summary-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <div>{item.name}</div>
                                <div className="price-unit">x {item.quantity}</div>
                            </div>
                            <div>{(price * item.quantity).toFixed(2)} €</div>
                        </div>
                    );
                })}
            </div>
            <div className="summary-row">
                <span>Sous-total</span>
                <span>{totalPrice.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
                <span>Livraison</span>
                <span>{shipping.toFixed(2)} €</span>
            </div>
            <div className="summary-total">
                <span>Total TTC</span>
                <span>{total.toFixed(2)} €</span>
            </div>
        </aside>
    );
};

export default CheckoutSummary;
