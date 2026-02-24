/**
 * @file InfoPage.jsx
 * Role: Composant de page informative generique.
 * Comment c est fait: Reutilise un meme squelette pour toutes les pages statiques (FAQ, CGV, privacy, etc.).
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import { Link } from "react-router-dom";

const InfoPage = ({ tag, title, lead, actions = [], sections = [] }) => {
    return (
        <main className="info-page">
            <header className="info-hero">
                {tag && <span className="info-tag">{tag}</span>}
                <h1>{title}</h1>
                {lead && <p className="info-lead">{lead}</p>}
                {actions.length > 0 && (
                    <div className="info-actions">
                        {actions.map((action) => (
                            <Link
                                key={action.label}
                                to={action.to}
                                className={action.variant ?? "primary"}
                            >
                                {action.label}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {sections.length > 0 && (
                <section className="info-grid">
                    {sections.map((section) => (
                        <article key={section.title} className="info-card">
                            <h3>{section.title}</h3>
                            {section.text && <p>{section.text}</p>}
                            {section.items?.length ? (
                                <ul className="info-list">
                                    {section.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
};

export default InfoPage;
