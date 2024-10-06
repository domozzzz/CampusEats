import React, { useState } from 'react';
import homepage from '../images/Homepage.png';
import lentils from '../images/Lentils.png';
import whiteRice from '../images/White_rice.png';
import brownRice from '../images/Brown_rice.png';
import periPeri from '../images/PeriPeri.png';
import braisedbeef from '../images/Braised_beef.png';
import porchetta from '../images/Porchetta.png';
import '../css/OrderMealKit.css';

export default function OrderSelect() {
    const [step, setStep] = useState(1);
    const [choices, setChoices] = useState({
        base: '',
        protein: '',
        veggie: ''
    });

    const handleChoice = (type, value) => {
        setChoices({
            ...choices,
            [type]: value
        });
    };

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const goToStep = (newStep) => {
        setStep(newStep);
    };

    const ProgressBar = () => {
        const steps = ['BASE', 'PROTEIN', 'VEGETABLES', 'REVIEW'];
        return (
            <div className="progress progress-bar">
                {steps.map((stepLabel, index) => (
                    <div
                        className={`step ${step === index + 1 ? 'active' : ''}`}
                        key={index}
                        onClick={() => goToStep(index + 1)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="number">{index + 1}</div>
                        <span>{stepLabel}</span>
                    </div>
                ))}
            </div>
        );
    };

    const StepInstruction = () => {
        const stepText = [
            'Choose Your Base',
            'Choose Your Protein',
            'Choose Your Veggies',
            'Review'
        ];
        return (
            <p className="step-instruction">Step {step}: {stepText[step - 1]}</p>
        );
    };

    const ChoiceCard = ({ imageSrc, label, onClick }) => {
        return (
            <div className="choice-card" onClick={onClick}>
                <img src={imageSrc} alt={label} />
                <p>{label}</p>
            </div>
        );
    };

    const stepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="choices">
                        <ChoiceCard imageSrc={lentils} label="Lentils" onClick={() => handleChoice('base', 'Lentils')} />
                        <ChoiceCard imageSrc={whiteRice} label="White Rice" onClick={() => handleChoice('base', 'White Rice')} />
                        <ChoiceCard imageSrc={brownRice} label="Brown Rice" onClick={() => handleChoice('base', 'Brown Rice')} />
                    </div>
                );
            case 2:
                return (
                    <div className="choices">
                        <ChoiceCard imageSrc={periPeri} label="Protein 1" onClick={() => handleChoice('protein', 'Protein 1')} />
                        <ChoiceCard imageSrc={braisedbeef} label="Protein 2" onClick={() => handleChoice('protein', 'Protein 2')} />
                        <ChoiceCard imageSrc={porchetta} label="Protein 3" onClick={() => handleChoice('protein', 'Protein 3')} />
                    </div>
                );
            case 3:
                return (
                    <div className="choices">
                        <ChoiceCard imageSrc={lentils} label="Veggie 1" onClick={() => handleChoice('veggie', 'Veggie 1')} />
                        <ChoiceCard imageSrc={lentils} label="Veggie 2" onClick={() => handleChoice('veggie', 'Veggie 2')} />
                        <ChoiceCard imageSrc={lentils} label="Veggie 3" onClick={() => handleChoice('veggie', 'Veggie 3')} />
                    </div>
                );
            case 4:
                return (
                    <div className="review">
                        <h2>Review Your Order</h2>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="welcome">
                <div className="heading-image">
                    <img src={homepage} alt="Homepage" style={{ zIndex: "0", width: "100%", height: "100vh", position: "relative" }} />
                </div>
            </div>
            <div className="quick-order">
                <h1>Quick Order</h1>
                <ProgressBar />
                <StepInstruction />
                {stepContent()}
                {step < 4 && <button className="continue-btn" onClick={nextStep}>Continue</button>}
            </div>
        </div>
    );
}
