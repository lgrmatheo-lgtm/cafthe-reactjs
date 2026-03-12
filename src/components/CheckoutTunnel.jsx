import React from "react";

const steps = ["Panier", "Livraison", "Paiement", "Confirmation"];

const CheckoutTunnel = ({ activeStep = 1 }) => {
    return (
        <div className="checkout-tunnel">
            <div className="checkout-steps" aria-label="Etapes d'achat" role="list">
                {steps.map((_, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === activeStep;
                    const isDone = stepNumber < activeStep;
                    const className = `step${isActive ? " active" : ""}${isDone ? " done" : ""}`;

                    return (
                        <div
                            key={stepNumber}
                            className={className}
                            role="listitem"
                            aria-current={isActive ? "step" : undefined}
                        >
                            {stepNumber}
                        </div>
                    );
                })}
            </div>
            <div className="checkout-step-labels" role="list">
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === activeStep;
                    return (
                        <div key={label} role="listitem" className={isActive ? "active" : undefined}>
                            {label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CheckoutTunnel;
