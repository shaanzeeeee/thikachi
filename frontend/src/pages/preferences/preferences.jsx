/* React page for dietary preferences page */
import Navbar from "../../components/navbar/navbar";
import "./preferences.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../utils/authentication/auth-context";
import axios from "axios";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";

/* Preferences names */
const VEGAN = "Vegan";
const VEGETARIAN = "Vegetarian";

/* Restrictions names */
const COCONUT = "Coconut";
const EGGS = "Eggs";
const FISH = "Fish";
const GLUTEN = "Gluten";
const SESAME = "Sesame";
const SHELLFISH = "Shellfish";
const SOY = "Soy";
const TREE_NUTS = "Tree Nuts";
const WHEAT = "Wheat";
const MILK = "Milk";
const PEANUTS = "Peanuts";

/**
 * Returns a react component consisting of the Dietary Preferences page. 
 * Includes all logic relevant to logging in.
 * 
 * @returns a react component consisting of the Dietary Preferences page.
 */
const Preferences = () => {
    /* get user from auth context, can directly index into its fields */
    const { user } = useContext(AuthContext);
    const userId = user._id;

    /* Preference flags */
    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);

    /* Restriction flags */
    const [coconut, setCoconut] = useState(false);
    const [eggs, setEggs] = useState(false);
    const [fish, setFish] = useState(false);
    const [gluten, setGluten] = useState(false);
    const [sesame, setSesame] = useState(false);
    const [shellfish, setShellfish] = useState(false);
    const [soy, setSoy] = useState(false);
    const [treeNuts, setTreeNuts] = useState(false);
    const [wheat, setWheat] = useState(false);
    const [milk, setMilk] = useState(false);
    const [peanuts, setPeanuts] = useState(false);

    /* Temp prefs and restriction arrays */
    const [prefs, setPrefs] = useState([]);
    const [rests, setRests] = useState([]);

    /* Handlers for toggling checkboxes */
    const handleVegetarian = () => setVegetarian(!vegetarian);
    const handleVegan = () => setVegan(!vegan);
    const handleCoconut = () => setCoconut(!coconut);
    const handleEggs = () => setEggs(!eggs);
    const handleFish = () => setFish(!fish);
    const handleGluten = () => setGluten(!gluten);
    const handleSesame = () => setSesame(!sesame);
    const handleShellfish = () => setShellfish(!shellfish);
    const handleSoy = () => setSoy(!soy);
    const handleTreeNuts = () => setTreeNuts(!treeNuts);
    const handleWheat = () => setWheat(!wheat);
    const handleMilk = () => setMilk(!milk);
    const handlePeanuts = () => setPeanuts(!peanuts);

    // whether to run an update on (for initial render case)
    const [shouldUpdatePrefs, setShouldUpdatePrefs] = useState(false);
    const [shouldUpdateRests, setShouldUpdateRests] = useState(false);

    /* Load initial preferences and restrictions on page render */
    const isFirstRender = useRef(true);
    useEffect(() => {
        // Get initial preferences then set local variables to those.
        const setInitialPreferences = async () => {
            try {
                const response = await axios.get('users/preferences/' + userId, {
                    headers: {
                        token: "Bearer " + user.accessToken
                    }
                });
                const initialPreferences = response.data;
                const preferences = []; // initial preferences to set
                if (initialPreferences.includes(VEGAN)) {
                    setVegan(true);
                    preferences.push(VEGAN);
                }
                if (initialPreferences.includes(VEGETARIAN)) {
                    setVegetarian(true);
                    preferences.push(VEGETARIAN);
                }

                setPrefs(preferences);
                setShouldUpdatePrefs(true);
                console.log("finished setting initial prefs")
            } catch (error) {
                console.log(error);
            }
        };

        // Get initial restrictions then set local variables to those.
        const setInitialRestrictions = async () => {
            try {
                const response = await axios.get('users/restrictions/' + userId, {
                    headers: {
                        token: "Bearer " + user.accessToken
                    }
                });
                const initialRestrictions = response.data;
                const restrictions = []; // restrictions to set initially
                if (initialRestrictions.includes(COCONUT)) {
                    setCoconut(true);
                    restrictions.push(COCONUT);
                }
                if (initialRestrictions.includes(EGGS)) {
                    setEggs(true);
                    restrictions.push(EGGS);
                }
                if (initialRestrictions.includes(FISH)) {
                    setFish(true);
                    restrictions.push(FISH);
                }
                if (initialRestrictions.includes(GLUTEN)) {
                    setGluten(true);
                    restrictions.push(GLUTEN);
                }
                if (initialRestrictions.includes(SESAME)) {
                    setSesame(true);
                    restrictions.push(SESAME);
                }
                if (initialRestrictions.includes(SHELLFISH)) {
                    setShellfish(true);
                    restrictions.push(SHELLFISH);
                }
                if (initialRestrictions.includes(SOY)) {
                    setSoy(true);
                    restrictions.push(SOY);
                }
                if (initialRestrictions.includes(TREE_NUTS)) {
                    setTreeNuts(true);
                    restrictions.push(TREE_NUTS);
                }
                if (initialRestrictions.includes(WHEAT)) {
                    setWheat(true);
                    restrictions.push(WHEAT);
                }
                if (initialRestrictions.includes(MILK)) {
                    setMilk(true);
                    restrictions.push(MILK);
                }
                if (initialRestrictions.includes(PEANUTS)) {
                    setPeanuts(true);
                    restrictions.push(PEANUTS);
                }

                setRests(restrictions);
                setShouldUpdateRests(true);
                console.log("finished setting initial rests")
            } catch (error) {
                console.log(error);
            }
        };

        /* only run on first render */
        if (isFirstRender.current) {
            setInitialPreferences();
            setInitialRestrictions();
        }
        isFirstRender.current = false;
        // eslint-disable-next-line
    }, []);

    /* Update preferences when any of the preferences changes. This will trigger the useEffect below. */
    useEffect(() => {
        if (!shouldUpdatePrefs) {
            return;
        }

        const preferences = []; // set preferences
        if (vegetarian) preferences.push(VEGETARIAN);
        if (vegan) preferences.push(VEGAN);

        setPrefs(preferences); // triggers useEffect below
        // eslint-disable-next-line
    }, [vegan, vegetarian]);

    /* Update the preferences in the database when prefs changes, not on first render though. Triggered by useEffect above */
    useEffect(() => {
        if (!shouldUpdatePrefs) {
            return;
        }

        /* Update the preferences in the database */
        const updatePreferencesInDB = async () => {
            try {
                await axios.put('users/preferences', {
                    userId: userId,
                    preferences: prefs
                }, {
                    headers: {
                        token: "Bearer " + user.accessToken
                    }
                });
                console.log("Successfully updated preferences: " + prefs);
            } catch (error) {
                console.log("Failed to update preferences: " + error);
            }
        }
        updatePreferencesInDB();
        // eslint-disable-next-line
    }, [prefs]);

    /* Update restrictions when any of the restrictions changes. This will trigger the useEffect below. Triggers useEffect below. */
    useEffect(() => {
        if (!shouldUpdateRests) {
            return;
        }

        /* Set restrictions to checkboxes */
        const restrictions = [];
        if (coconut) restrictions.push(COCONUT);
        if (eggs) restrictions.push(EGGS);
        if (fish) restrictions.push(FISH);
        if (gluten) restrictions.push(GLUTEN);
        if (sesame) restrictions.push(SESAME);
        if (shellfish) restrictions.push(SHELLFISH);
        if (soy) restrictions.push(SOY);
        if (treeNuts) restrictions.push(TREE_NUTS);
        if (wheat) restrictions.push(WHEAT);
        if (milk) restrictions.push(MILK);
        if (peanuts) restrictions.push(PEANUTS);

        setRests(restrictions);
        // eslint-disable-next-line
    }, [coconut, eggs, fish, gluten, sesame, shellfish, soy, treeNuts, wheat, milk, peanuts]);

    /* Update the restrictions in the database when restrictions changes, not on first render though. Triggered by useEffect above. */
    useEffect(() => {
        if (!shouldUpdateRests) {
            return;
        }

        /* Update the restrictions in the database */
        const updateRestrictionsInDB = async () => {
            try {
                await axios.put('users/restrictions', {
                    userId: userId,
                    restrictions: rests
                }, {
                    headers: {
                        token: "Bearer " + user.accessToken
                    }
                });
                console.log("Successfully updated restrictions: " + rests);
            } catch (error) {
                console.log("Failed to update restrictions: " + error);
            }
        }

        updateRestrictionsInDB();
        // eslint-disable-next-line
    }, [rests]);


    return (
        <div className="preferences">
            <Navbar />
            <div className="preferencesContainer">
                <div className="pageHeader">
                    <span className="pageTitle">Dietary Preferences</span>
                    <span className="pageDesc">Select Your Dietary Preferences & Restrictions</span>
                </div>

                <div className="contentGrid">
                    {/* Preferences Column */}
                    <div className="column">
                        <div className="columnHeader">Preferences</div>
                        <FormGroup>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={vegetarian} onChange={handleVegetarian} />}
                                    label={VEGETARIAN}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={vegan} onChange={handleVegan} />}
                                    label={VEGAN}
                                />
                            </div>
                        </FormGroup>
                    </div>

                    {/* Restrictions Column 1 */}
                    <div className="column">
                        <div className="columnHeader">Restrictions</div>
                        <FormGroup>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={coconut} onChange={handleCoconut} />}
                                    label={`${COCONUT} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={eggs} onChange={handleEggs} />}
                                    label={`${EGGS} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={fish} onChange={handleFish} />}
                                    label={`${FISH} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={gluten} onChange={handleGluten} />}
                                    label={`${GLUTEN} free`}
                                />
                            </div>
                        </FormGroup>
                    </div>

                    {/* Restrictions Column 2 */}
                    <div className="column">
                        <div className="columnHeader">More Restrictions</div>
                        <FormGroup>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={sesame} onChange={handleSesame} />}
                                    label={`${SESAME} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={shellfish} onChange={handleShellfish} />}
                                    label={`${SHELLFISH} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={soy} onChange={handleSoy} />}
                                    label={`${SOY} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={treeNuts} onChange={handleTreeNuts} />}
                                    label={`${TREE_NUTS} free`}
                                />
                            </div>
                        </FormGroup>
                    </div>

                    {/* Restrictions Column 3 */}
                    <div className="column">
                        <div className="columnHeader">Other</div>
                        <FormGroup>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={wheat} onChange={handleWheat} />}
                                    label={`${WHEAT} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={milk} onChange={handleMilk} />}
                                    label={`${MILK} free`}
                                />
                            </div>
                            <div className="checkboxWrapper">
                                <FormControlLabel
                                    control={<Checkbox checked={peanuts} onChange={handlePeanuts} />}
                                    label={`${PEANUTS} free`}
                                />
                            </div>
                        </FormGroup>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Preferences;