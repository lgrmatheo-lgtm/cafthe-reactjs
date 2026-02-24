/**
 * @file react-helmet-async.js
 * Role: Fallback local pour react-helmet-async quand la dependance n est pas installee.
 * Comment c est fait: Fournit HelmetProvider + Helmet et applique title/meta/link dans document.head.
 * Note junior: ce shim garde la meme API d import pour ne pas bloquer le dev local.
 */
import React, { Children, isValidElement, useEffect, useMemo, useRef } from "react";

const registry = new Map();
let idCounter = 0;

const getMetaKey = (props) => {
    if (props.name) return `name:${props.name}`;
    if (props.property) return `property:${props.property}`;
    if (props.httpEquiv) return `httpEquiv:${props.httpEquiv}`;
    if (props.charset) return "charset";
    if (props.itemProp) return `itemProp:${props.itemProp}`;
    return `meta:${JSON.stringify(props)}`;
};

const getLinkKey = (props) => {
    const rel = props.rel ?? "";
    const href = props.href ?? "";
    return `rel:${rel}|href:${href}`;
};

const parseChildren = (children) => {
    const out = { title: null, metas: [], links: [] };
    const nodes = Children.toArray(children);

    nodes.forEach((node) => {
        if (!isValidElement(node) || typeof node.type !== "string") return;

        const tag = node.type.toLowerCase();
        const props = node.props ?? {};

        if (tag === "title") {
            const titleText = Children.toArray(props.children).join("").trim();
            out.title = titleText || null;
            return;
        }

        if (tag === "meta") {
            out.metas.push(props);
            return;
        }

        if (tag === "link") {
            out.links.push(props);
        }
    });

    return out;
};

const mergeEntries = () => {
    let title = null;
    const metaMap = new Map();
    const linkMap = new Map();

    registry.forEach((entry) => {
        if (entry.title) {
            title = entry.title;
        }

        entry.metas.forEach((metaProps) => {
            metaMap.set(getMetaKey(metaProps), metaProps);
        });

        entry.links.forEach((linkProps) => {
            linkMap.set(getLinkKey(linkProps), linkProps);
        });
    });

    return {
        title,
        metas: Array.from(metaMap.values()),
        links: Array.from(linkMap.values()),
    };
};

const setAttributes = (el, props) => {
    Object.entries(props).forEach(([key, value]) => {
        if (key === "children" || value == null || value === false) return;
        if (value === true) {
            el.setAttribute(key, "");
            return;
        }
        el.setAttribute(key, String(value));
    });
};

const applyHead = () => {
    if (typeof document === "undefined") return;

    const { title, metas, links } = mergeEntries();
    if (title) {
        document.title = title;
    }

    document
        .querySelectorAll("meta[data-helmet-shim], link[data-helmet-shim]")
        .forEach((node) => node.remove());

    metas.forEach((metaProps) => {
        const meta = document.createElement("meta");
        setAttributes(meta, metaProps);
        meta.setAttribute("data-helmet-shim", "true");
        document.head.appendChild(meta);
    });

    links.forEach((linkProps) => {
        const link = document.createElement("link");
        setAttributes(link, linkProps);
        link.setAttribute("data-helmet-shim", "true");
        document.head.appendChild(link);
    });
};

export const HelmetProvider = ({ children }) => children;

export const Helmet = ({ children }) => {
    const idRef = useRef(++idCounter);
    const parsed = useMemo(() => parseChildren(children), [children]);

    useEffect(() => {
        registry.set(idRef.current, parsed);
        applyHead();

        return () => {
            registry.delete(idRef.current);
            applyHead();
        };
    }, [parsed]);

    return null;
};

export default Helmet;
