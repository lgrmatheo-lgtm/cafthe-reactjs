/**
 * @file cartContext.jsx
 * Role: Source de verite du panier.
 * Comment c est fait: Mutualise les operations panier, calcule les totaux derives et persiste les donnees client.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { createContext, useEffect, useMemo, useState, useContext } from "react";
import { AuthContext } from "./authContext.jsx";
import { getDiscountedPrice } from "../utils/discounts.js";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        const key = item.key ?? `${item.id}-${item.variant ?? "unit"}`;
        setItems((prev) => {
            const existing = prev.find((entry) => entry.key === key);
            if (existing) {
                return prev.map((entry) =>
                    entry.key === key
                        ? { ...entry, quantity: entry.quantity + 1 }
                        : entry
                );
            }
            return [...prev, { ...item, key, quantity: 1 }];
        });
    };

    const decreaseItem = (keyOrId) => {
        setItems((prev) =>
            prev
                .map((entry) =>
                    entry.key === keyOrId || entry.id === keyOrId
                        ? { ...entry, quantity: entry.quantity - 1 }
                        : entry
                )
                .filter((entry) => entry.quantity > 0)
        );
    };

    const removeItem = (keyOrId) => {
        setItems((prev) => prev.filter((entry) => entry.key !== keyOrId && entry.id !== keyOrId));
    };

    const clear = () => setItems([]);
    const replaceCart = (nextItems) => setItems(nextItems ?? []);

    useEffect(() => {
        if (!isAuthenticated || !user?.email) return;
        const raw = localStorage.getItem(`cafthe_cart_${user.email}`);
        if (raw) {
            try {
                setItems(JSON.parse(raw));
            } catch {
                setItems([]);
            }
        }
    }, [isAuthenticated, user?.email]);

    useEffect(() => {
        if (!isAuthenticated || !user?.email) return;
        localStorage.setItem(`cafthe_cart_${user.email}`, JSON.stringify(items));
    }, [items, isAuthenticated, user?.email]);

    const totalItems = useMemo(
        () => items.reduce((sum, entry) => sum + entry.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (sum, entry) =>
                    sum + entry.quantity * getDiscountedPrice(entry.price, entry.id),
                0
            ),
        [items]
    );

    const value = {
        items,
        addItem,
        decreaseItem,
        removeItem,
        clear,
        replaceCart,
        totalItems,
        totalPrice,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
