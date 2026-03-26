/**
 * Register.test.jsx
 * ==================
 * MISSION 1 — Tests unitaires du formulaire d'inscription
 *
 * Composant testé : Register (src/pages/Register.jsx)
 * Pourquoi ce composant ?
 *   - Formulaire complexe avec 5 champs
 *   - Validation côté client (correspondance des mots de passe)
 *   - Appel API asynchrone (fetch)
 *   - Gestion des états : succès, erreur, redirection
 *   → Il couvre toutes les exigences du référentiel DWWM pour les tests unitaires
 *
 * Framework : Vitest (natif pour les projets Vite)
 * Outils utilisés :
 *   - Vitest  : describe, test, expect, vi, beforeEach (exposés globalement)
 *   - React Testing Library : render, screen, fireEvent, waitFor
 *   - @testing-library/jest-dom : matchers DOM (toBeInTheDocument, etc.)
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/Register";

// ─── Mock de useNavigate ──────────────────────────────────────────────────────
const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ─── Fonction utilitaire ──────────────────────────────────────────────────────
const renderRegister = () =>
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

// ─── Suite de tests ───────────────────────────────────────────────────────────
describe("Register — Formulaire d'inscription", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    global.fetch = vi.fn();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 1 — Rendu initial
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche tous les champs et le bouton de soumission au rendu initial", () => {
    renderRegister();

    // ASSERT : on vérifie que chaque champ est présent via son label associé
    expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/j'accepte la politique de confidentialité/i)).toBeInTheDocument();

    // Vérifie que le bouton "S'inscrire" est bien présent dans le DOM
    expect(
      screen.getByRole("button", { name: /s'inscrire/i })
    ).toBeInTheDocument();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 2 — Interaction utilisateur réussie
  // ═══════════════════════════════════════════════════════════════════════════
  test("redirige vers /login après une inscription valide", async () => {
    // ARRANGE : on simule une réponse API positive.
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Compte créé" }),
    });

    renderRegister();

    // ACT : on remplit tous les champs du formulaire
    fireEvent.change(screen.getByLabelText(/nom complet/i), {
      target: { value: "Marie Dupont" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "marie.dupont@email.fr" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "MotDePasse123!" },
    });
    // Coche la case de politique de confidentialité
    fireEvent.click(screen.getByLabelText(/j'accepte la politique de confidentialité/i));

    // On clique sur le bouton de soumission
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    // ASSERT : on attend que la redirection soit appelée
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    // On vérifie aussi que fetch a bien été appelé une seule fois
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TEST 3 — Gestion d'erreur : case non cochée
  // ═══════════════════════════════════════════════════════════════════════════
  test("affiche une erreur si la politique de confidentialité n'est pas acceptée", () => {
    renderRegister();

    // ACT : on remplit les champs mais on ne coche pas la case
    fireEvent.change(screen.getByLabelText(/nom complet/i), {
      target: { value: "Marie Dupont" },
    });

    // On soumet le formulaire
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    // ASSERT : le message d'erreur doit apparaître et l'API ne doit pas être appelée
    expect(
      screen.getByText(/vous devez accepter la politique de confidentialité/i)
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
