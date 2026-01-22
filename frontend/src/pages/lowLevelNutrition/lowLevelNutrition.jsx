import Navbar from "../../components/navbar/navbar";
import "./lowLevelNutrition.scss";
import axios from 'axios';
import { AuthContext } from "../../utils/authentication/auth-context";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

// TODO: add input validation

/**
 * Returns a react component consisting of the nutrition goal age
 * 
 */
const NutrtionGoals = () => {
    const { user } = useContext(AuthContext); // get user from auth context
    const userId = user._id;

    /* Existing user info to be displayed */
    const [calories, setCalories] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [fat, setFat] = useState('');
    const [protein, setProtein] = useState('');

    /* User info to be changed to (in input boxes) */
    const [newCalories, setNewCalories] = useState('');
    const [newCarbohydrates, setNewCarbohydrates] = useState('');
    const [newFat, setNewFat] = useState('');
    const [newProtein, setNewProtein] = useState('');

    /* retrieve low level nutrition facts */
    const getNutritionInfo = () => {
        axios.get('users/nutrition/' + user._id, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then(res => {
            setCalories(res.data.calories);
            setCarbohydrates(res.data.carbohydrates);
            setFat(res.data.fat);
            setProtein(res.data.protein);
        }).catch(err => {
            console.log(err)
        })
    };

    /* get user info on first render */
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current === true) {
            getNutritionInfo();
            isFirstRender.current = false;
        }
    });


    /* Updates username when user initiates through the UI */
    const updateCalories = async (e) => {
        /* Prevent default event behavior */
        e.preventDefault();

        try {
            await axios.put(`users/nutrition/${user._id}`, {
                userId: userId,
                newEntry: {
                    calories: newCalories,
                },
            }, {
                headers: {
                    token: "Bearer " + user.accessToken
                }
            });

        } catch (err) {

            console.log(err);
        }

        /* Load and display new user information */
        getNutritionInfo();
    };

    /* Updates email when user initiates through the UI */
    const updateCarbohydrates = async (e) => {
        /* Prevent default event behavior */
        e.preventDefault();

        try {
            await axios.put(`users/nutrition/${user._id}`, {
                userId: userId,
                newEntry: {
                    carbohydrates: newCarbohydrates,
                },
            }, {
                headers: {
                    token: "Bearer " + user.accessToken
                }
            });

        } catch (err) {

            console.log(err);
        }
        /* Load and display new user information */
        getNutritionInfo();
    };

    /* Updates phone number when user initiates through the UI */
    const updateProtein = async (e) => {
        /* Prevent default event behavior */
        e.preventDefault();

        try {
            await axios.put(`users/nutrition/${user._id}`, {
                userId: userId,
                newEntry: {
                    protein: newProtein,
                },
            }, {
                headers: {
                    token: "Bearer " + user.accessToken
                }
            });

        } catch (err) {

            console.log(err);
        }

        /* Load and display new user information */
        getNutritionInfo();
    };

    /* Updates password when user initiates through the UI */
    const updateFat = async (e) => {
        /* Prevent default event behavior */
        e.preventDefault();
        /* Make HTTP request to update info */
        try {
            await axios.put(`users/nutrition/${user._id}`, {
                userId: userId,
                newEntry: {
                    fat: newFat,
                },
            }, {
                headers: {
                    token: "Bearer " + user.accessToken
                }
            });

        } catch (err) {

            console.log(err);
        }

        /* Load and display new user information */
        getNutritionInfo();
    };

    return (
        <div className="nutritionGoals">
            <Navbar />

            <div className="nutritionGoalsForm">
                <div className="container">
                    <form>
                        <h1>Nutrition Goals</h1>

                        {/* Display Current Info */}
                        <div className="infoButton">Calories: <span>{calories}</span> </div>
                        <div className="infoButton">Protein: <span>{protein}</span></div>
                        <div className="infoButton">Carbohydrates: <span>{carbohydrates}</span></div>
                        <div className="infoButton">Fat: <span>{fat}</span></div>

                        {/* Input Fields */}
                        <label>
                            <div className="infoType">Change calories:</div>
                            <input
                                type="number"
                                value={newCalories}
                                onChange={(e) => setNewCalories(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && updateCalories(e)}
                            />
                            <button onClick={updateCalories} className="formButton" type="button">Submit</button>
                        </label>

                        <label>
                            <div className="infoType">Change protein:</div>
                            <input
                                type="number"
                                value={newProtein}
                                onChange={(e) => setNewProtein(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && updateProtein(e)}
                            />
                            <button onClick={updateProtein} className="formButton" type="button">Submit</button>
                        </label>

                        <label>
                            <div className="infoType">Change carbs:</div>
                            <input
                                type="number"
                                value={newCarbohydrates}
                                onChange={(e) => setNewCarbohydrates(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && updateCarbohydrates(e)}
                            />
                            <button onClick={updateCarbohydrates} className="formButton" type="button">Submit</button>
                        </label>

                        <label>
                            <div className="infoType">Change fat:</div>
                            <input
                                type="number"
                                value={newFat}
                                onChange={(e) => setNewFat(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && updateFat(e)}
                            />
                            <button onClick={updateFat} className="formButton" type="button">Submit</button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NutrtionGoals;
