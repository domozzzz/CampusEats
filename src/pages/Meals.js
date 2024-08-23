import '@fortawesome/fontawesome-free/css/all.min.css';
import '../meals.css'

export default function Meals() {
    return (
        <div>
            <div className="meals-title">
                    <h2>Personalise your Meal Plan</h2>
                    <p>Craft your meals to fit your lifestyle and preferences</p>
            </div>
            <div className="meals-logo">
                <div>
                    <i class="fa-solid fa-utensils"></i>
                    <h3>Meal Type</h3>
                </div>
                <div>
                    <i className="fa-solid fa-basket-shopping"></i>
                    <h3>Preferences</h3>
                </div>
                <div>
                    <i className="fa-solid fa-circle-xmark"></i>
                    <h3>Order</h3>
                </div>
            </div>
            <div className="meal-info">
                <div className="meal-info-header">
                    <h3>Meal Kit</h3>
                    <h3>Prepped & <br>
                     Ready</h3>
                </div>
                <p>Meal kits provide you with all the ingredients needed to cook a meal from scratch.
                They come with pre-measured ingredients and step-by-step instructions
                </p>
                <div>
                    <h4>Breakfast</h4>
                    <p>Stuff for breakfast</p>
                </div>
                <div>
                    <h4>Lunch</h4>
                    <p>Stuff for Lunch</p>
                </div>
                <div>
                    <h4>Dinner</h4>
                    <p>Stuff for dinner</p>
                </div>
                <div>
                    <h4>Snack</h4>
                    <p>Stuff for snack</p>
                </div>
            </div>
        </div>
    );
}