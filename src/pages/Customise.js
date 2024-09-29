import { useEffect, useState } from "react";
import supabase from "../supabase.js";
import "../css/CustomMeal.css";
import { Link } from "react-router-dom";
import homepage from '../images/homepage.png'
import { useAuth } from "../components/AuthProvider.js";



export default function Customise() {
    const [currentStep, setStep] = useState(1);
    const [baseList, setBaseList] = useState({});
    const [proteinList, setProteinList] = useState({});
    const [vegetableList, setVegetableList] = useState({});
    const [selected, setSelected] = useState({});
    const [price, setPrice] = useState(0);
    

    const steps = ["BASE", "PROTEIN", "VEGETABLES", "REVIEW"];



    useEffect(() => {
        const fetchOption = async () => {
            const {data, error} = await supabase
            .from('meals')
            .select('*')
            .eq('id',0)

            if (data) {
                let ingredients = data[0].ingredients;
                let bases = [];
                let proteins = {};
                let vegetables = {};
                for (let key in ingredients.optional) {
                    if (ingredients.optional[key].type === "base") {
                      bases[key] = ingredients.optional[key];
                    } else if (ingredients.optional[key].type === "protein") {
                        proteins[key] = ingredients.optional[key];
                    } else if (ingredients.optional[key].type === "vegetables") {
                        vegetables[key] = ingredients.optional[key];
                    }
                }
                setBaseList(bases);
                setProteinList(proteins);
                setVegetableList(vegetables);

            } else {
                console.log(error);
            }
        }

        fetchOption()


    }, []);

    const additem = ([type,key]) => {
        if (type === "base") {
            if (baseList[key].added == false) {
                baseList[key].added = true;
                let newprice = price + baseList[key].cost;
                setPrice(newprice);
            } else {
                baseList[key].added = false;
                setPrice(price - baseList[key].cost);
            }
        } else if (type === "protein") {
            if (proteinList[key].added == false) {
                proteinList[key].added = true;
                let newprice = price + proteinList[key].cost;
                setPrice(newprice);
            } else {
                proteinList[key].added = false;
                setPrice(price - proteinList[key].cost);
            }
        } else if (type === "vegetables") {
            if (vegetableList[key].added == false) {
                vegetableList[key].added = true;
                let newprice = price + vegetableList[key].cost;
                setPrice(newprice);
            } else {
                vegetableList[key].added = false;
                setPrice(price - vegetableList[key].cost);
            }
        }
    }

    const nextStep = () => {
        if (currentStep < 4) {
            setStep(currentStep + 1);
        }

    }

    const lastStep = () => {
        if (currentStep > 1) {
            setStep(currentStep -1);
        }

    }


    return (
        <div className="custom-meal-container">
            <h1>Custom Meal</h1>
            <div class="progress-steps">
                <div className={`step ${1 <= currentStep ? "active" : ""}`}>
                    <div className="step-number">{1}</div>
                    <div className="step-name">{steps[0]}</div>
                </div>
                <div className={`line ${2 <= currentStep ? "active" : ""}`}></div>
                <div className={`step ${2 <= currentStep ? "active" : ""}`}>
                    <div className="step-number">2</div>
                    <div className="step-name">{steps[1]}</div>
                </div>
                <div className={`line ${3 <= currentStep ? "active" : ""}`}></div>
                <div className={`step ${3 <= currentStep ? "active" : ""}`}>
                    <div className="step-number">3</div>
                    <div className="step-name">{steps[2]}</div>
                </div>
                <div className={`line ${4 <= currentStep ? "active" : ""}`}></div>
                <div className={`step ${4 <= currentStep ? "active" : ""}`}>
                    <div className="step-number">4</div>
                    <div className="step-name">{steps[3]}</div>
                </div>
            </div>
            <div className="step-content">
                <div className="step-div">
                    <h2>Step {currentStep}: {steps[currentStep-1]}</h2>
                </div>
                <div className="content-box">
                    {currentStep == 1 && (
                        <div>
                           {Object.entries(baseList).map(([key,value]) => (
                            <button key={key}
                            className={value.added ? "option-button-selected" : "option-button"}
                            onClick={() => additem([value.type,key])}
                            >
                                {key} ${value.cost}
                            </button>
                           ))}
                        </div>
                    )}
                    {currentStep == 2 && (
                        <div>
                           {Object.entries(proteinList).map(([key,value]) => (
                            <button key={key}
                            className={value.added ? "option-button-selected" : "option-button"}
                            onClick={() => additem([value.type,key])}
                            >
                                {key} ${value.cost}
                            </button>
                           ))}
                        </div>
                    )}
                    {currentStep == 3 && (
                        <div>
                           {Object.entries(vegetableList).map(([key,value]) => (
                            <button key={key}
                            className={value.added ? "option-button-selected" : "option-button"}
                            onClick={() => additem([value.type,key])}
                            >
                                {key} ${value.cost}
                            </button>
                           ))}
                        </div>
                    )}
                    {currentStep == 4 && (
                    <div className="review">
                        <div className="review-column">
                            <p className="total">Base:</p>
                        {Object.entries(baseList).filter(([key,value]) => value.added == true).map(([key,value]) => (
                            <p key={key}>{key} ${value.cost}</p>
                           ))}
                           </div>
                        <div className="review-column">
                        <p className="total">Protein:</p>
                        {Object.entries(proteinList).filter(([key,value]) => value.added == true).map(([key,value]) => (
                            <p key={key}>{key} ${value.cost}</p>
                           ))}
                           </div>
                           <div className="review-column">
                        <p className="total">vegetables:</p>
                        {Object.entries(vegetableList).filter(([key,value]) => value.added == true).map(([key,value]) => (
                            <p key={key}>{key} ${value.cost}</p>
                           ))}
                           </div>
                     </div>
                    )}
                    
                </div>

            </div>
            <div className="option-div">
                <button className="option-button"
                onClick={() => lastStep()}
                >Previous step</button>
                <p className="total" >Total: ${price}</p>
                {currentStep == 4 && (
                    <button className="option-button"
                    >Add to cart</button>
                )}
                {currentStep !=4 && (
                    <button className="option-button"
                    onClick={() => nextStep()}
                    >Next step</button>
                )}
                
            </div>
            


        </div>
    )
}