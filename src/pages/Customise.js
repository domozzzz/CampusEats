import { useEffect, useState, useContext } from "react";
import supabase from "../supabase.js";
import styles from "../css/CustomMeal.module.css"
import { Link } from "react-router-dom";
import homepage from '../images/Homepage.png'
import { useAuth } from "../components/AuthProvider.js";
import { useParams } from 'react-router-dom';
import { CartContext } from "../components/CartContext.js";



export default function Customise() {
    const [currentStep, setStep] = useState(1);
    const [baseList, setBaseList] = useState({});
    const [proteinList, setProteinList] = useState({});
    const [vegetableList, setVegetableList] = useState({});
    const [selected, setSelected] = useState({});
    const [price, setPrice] = useState(0);
    const [photo , setPhoto] = useState();

    const { addToCart } = useContext(CartContext);
    const { LID } = useParams();    

    const steps = ["BASE", "PROTEIN", "VEGETABLES", "REVIEW"];



    useEffect(() => {
        const fetchOption = async () => {
            const {data, error} = await supabase
            .from('meals')
            .select('*')
            .eq('id',0)

            if (data) {
                console.log(data);
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
                setPhoto(data[0].photo);

            } else {
                console.log(error);
            }
        }

        fetchOption()


    }, []);

    const checkout = () => {
        console.log(vegetableList);
        let v = Object.entries(vegetableList).filter(([key,value]) => value.added == true );
        let p = Object.entries(proteinList).filter(([key,value]) => value.added == true );
        let b = Object.entries(baseList).filter(([key,value]) => value.added == true );
        let all = ({...Object.fromEntries(b),...Object.fromEntries(p),...Object.fromEntries(v) })
        const item = {
            name: "Quick meal",
            meal_id: 0,
            ingredients: all,
            quantity: 1,
            image: photo,
            cost: price,
            lid: LID
        }
        addToCart(item);
    }

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
        <div>
        <div className={styles.custom_meal_container}>
            <h1>Custom Meal</h1>
            <div className={styles.progress_steps}>
                <div className={`${styles.step} ${1 <= currentStep ? styles.active : ""}`}>
                    <div className={styles.step_number}>{1}</div>
                    <div className={styles.step_name}>{steps[0]}</div>
                </div>
                <div className={`${styles.line} ${2 <= currentStep ? styles.active : ""}`}></div>
                <div className={`${styles.step} ${2 <= currentStep ? styles.active : ""}`}>
                    <div className={styles.step_number}>2</div>
                    <div className={styles.step_name}>{steps[1]}</div>
                </div>
                <div className={`${styles.line} ${3 <= currentStep ? styles.active : ""}`}></div>
                <div className={`${styles.step} ${3 <= currentStep ? styles.active : ""}`}>
                    <div className={styles.step_number}>3</div>
                    <div className={styles.step_name}>{steps[2]}</div>
                </div>
                <div className={`${styles.line} ${4 <= currentStep ? styles.active : ""}`}></div>
                <div className={`${styles.step} ${4 <= currentStep ? styles.active : ""}`}>
                    <div className={styles.step_number}>4</div>
                    <div className={styles.step_name}>{steps[3]}</div>
                </div>
            </div>
            <div className={styles.step_content}>
                <div className={styles.step_div}>
                    <h2>Step {currentStep}: {steps[currentStep-1]}</h2>
                </div>
                <div className={styles.content_box}>
                    {currentStep == 1 && (
                        <div>
                           {Object.entries(baseList).map(([key,value]) => (
                            <button key={key}
                            className={value.added ? styles.option_button_selected : styles.option_button}
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
                            className={value.added ? styles.option_button_selected : styles.option_button}
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
                            className={value.added ? styles.option_button_selected : styles.option_button}
                            onClick={() => additem([value.type,key])}
                            >
                                {key} ${value.cost}
                            </button>
                           ))}
                        </div>
                    )}
                    {currentStep == 4 && (
                    <div className={styles.review}>
                        <div className={styles.review_colum}>
                            <p className={styles.total}>Base:</p>
                        {Object.entries(baseList).filter(([key,value]) => value.added == true).map(([key,value]) => (
                            <p key={key}>{key} ${value.cost}</p>
                           ))}
                           </div>
                            <div className={styles.review_colum}>
                        <p className={styles.total}>Protein:</p>
                        {Object.entries(proteinList).filter(([key,value]) => value.added == true).map(([key,value]) => (
                            <p key={key}>{key} ${value.cost}</p>
                           ))}
                           </div>
                           <div className={styles.review_colum}>
                        <p className={styles.total}>vegetables:</p>
                        {Object.entries(vegetableList).filter(([key,value]) => value.added == true).map(([key,value]) => (
                            <p key={key}>{key} ${value.cost}</p>
                           ))}
                           </div>
                     </div>
                    )}
                    
                </div>

            </div>
            <div className={styles.option_div}>
                <button className={styles.option_button}
                onClick={() => lastStep()}
                >Previous step</button>
                <p className={styles.total} >Total: ${price}</p>
                {currentStep == 4 && (
                    <button className={styles.option_button}
                    onClick={() => checkout()}
                    >Add to cart</button>
                )}
                {currentStep !=4 && (
                    <button className={styles.option_button}
                    onClick={() => nextStep()}
                    >Next step</button>
                )}
                
            </div>
            


        </div>
        </div>
    )
}