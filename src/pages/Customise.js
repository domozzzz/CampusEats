import { useEffect, useState, useContext } from "react";
import supabase from "../supabase.js";
import styles from "../css/CustomMeal.module.css"
import { useNavigate, Navigate } from "react-router-dom";
import homepage from '../images/Homepage.png'
import { useAuth } from "../components/AuthProvider.js";
import { useParams } from 'react-router-dom';
import { CartContext } from "../components/CartContext.js";

export default function Customise() {
    const [currentStep, setStep] = useState(1);
    const [baseList, setBaseList] = useState({});
    const [proteinList, setProteinList] = useState({});
    const [vegetableList, setVegetableList] = useState({});
    const [price, setPrice] = useState(0);
    const [photo , setPhoto] = useState();

    const { addToCart } = useContext(CartContext);
    const { LID } = useParams();    

    const steps = ["BASE", "PROTEIN", "VEGETABLES", "REVIEW"];

    const nav = useNavigate()
    const { user } = useAuth();



    /**
     * Fetch all the options from the custom meal entry in the meal table
     */
    useEffect(() => {
        const fetchOption = async () => {
            const {data, error} = await supabase
            .from('meals')
            .select('*')
            .eq('id',0)

            if (data) {
                let ingredients = data[0].ingredients;
                let bases = {};
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

    /**
     * What happens when user clicks add to cart
     */
    const checkout = () => {

        // Only add the items that have been selected
        let v = Object.entries(vegetableList).filter(([key,value]) => value.added === true );
        let p = Object.entries(proteinList).filter(([key,value]) => value.added === true );
        let b = Object.entries(baseList).filter(([key,value]) => value.added === true );

        let all = ({...Object.fromEntries(b),...Object.fromEntries(p),...Object.fromEntries(v) })
        const item = {      // Formate to the structure of cart objects
            name: "Custom meal",
            meal_id: 0,
            ingredients: all,
            quantity: 1,
            image: photo,
            cost: price,
            lid: LID
        }
        addToCart(item);

        nav('/cart') // go to the cart once done

        
        
    }


    /**
     * Toggle whether an item is added or not
     * @param {array} [type,key] type is the type of the item, and the key is the name of the item
     */
    const additem = ([type,key]) => {
        console.log("adding", key);
        if (type === "base") {
            if (baseList[key].added === false) {
                baseList[key].added = true;
                let newprice = price + baseList[key].cost;
                setPrice(newprice);
            } else {
                baseList[key].added = false;
                setPrice(price - baseList[key].cost);
            }
        } else if (type === "protein") {
            if (proteinList[key].added === false) {
                proteinList[key].added = true;
                let newprice = price + proteinList[key].cost;
                setPrice(newprice);
            } else {
                proteinList[key].added = false;
                setPrice(price - proteinList[key].cost);
            }
        } else if (type === "vegetables") {
            if (vegetableList[key].added === false) {
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


    /**
     * The card for each ingredient that could be added
     * @returns React element
     */
    const ChoiceCard = ({ info, label, onClick }) => {
        return (
            <div className={info.added ? styles.choice_card_added : styles.choice_card} onClick={() => onClick([info.type,label])}>
                <img className={info.added ? styles.choice_card_img_added : styles.choice_card_img} src={info.photo} alt={label} />
                <p className={info.added ? styles.choice_card_p_added : styles.choice_card_p}>{label}</p>
                <p className={info.added ? styles.choice_card_p_added : styles.choice_card_p}>${info.cost}</p>
            </div>
        );
    };


    return user ? (
        <div>
            <div className="welcome">
                <div className="heading-image">
                    <img src={homepage} alt="Homepage" style={{ zIndex: "0", width: "100%", height: "100vh", position: "relative" }} />
                </div>
            </div>
            <div className={styles.custom_meal_container}>
                <h1>Customise</h1>
                {/* Shows the number of steps and the users current step */}
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
                        {currentStep === 1 && (
                            <div className={styles.cards}>
                            {Object.entries(baseList).map(([key,value]) => (
                                <ChoiceCard info={value} label={key} onClick={additem}/>
                            ))}
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div className={styles.cards}>
                            {Object.entries(proteinList).map(([key,value]) => (
                                <ChoiceCard info={value} label={key} onClick={additem}/>
                            ))}
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div className={styles.cards}>
                            {Object.entries(vegetableList).map(([key,value]) => (
                                <ChoiceCard info={value} label={key} onClick={additem}/>
                            ))}
                            </div>
                        )}
                        {currentStep === 4 && (
                        <div className={styles.review}>
                            <div className={styles.review_colum}>
                                <p className={styles.total}>Base:</p>
                                <div className={styles.cards}>
                                    {Object.entries(baseList).filter(([key,value]) => value.added === true).map(([key,value]) => (
                                        <ChoiceCard info={value} label={key}/>
                                    ))}
                                </div>
                            </div>
                                <div className={styles.review_colum}>
                            <p className={styles.total}>Protein:</p>
                                <div className={styles.cards}>
                                    {Object.entries(proteinList).filter(([key,value]) => value.added === true).map(([key,value]) => (
                                        <ChoiceCard info={value} label={key}/>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.review_colum}>
                            <p className={styles.total}>vegetables:</p>
                                <div className={styles.cards}>
                                    {Object.entries(vegetableList).filter(([key,value]) => value.added === true).map(([key,value]) => (
                                        <ChoiceCard info={value} label={key}/>
                                    ))}
                                </div>
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
                    {currentStep === 4 && (
                        <button className={styles.option_button}
                        onClick={() => checkout()}
                        >Add to cart</button>
                    )}
                    {currentStep !== 4 && (
                        <button className={styles.option_button}
                        onClick={() => nextStep()}
                        >Next step</button>
                    )}
                    
                </div>
                


            </div>
        </div>
    ) : <Navigate to='/login'/>
}