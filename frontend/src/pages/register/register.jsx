/* React page for registering a new account */
import { useState, useRef } from "react";
import "./register.scss";
import logo from "../../components/titan-clear-logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RegexUtil from "../../utils/regex-util";
import ROUTES from "../../routes";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Returns a react component consisting of the Register page. Includes all logic relevant to registering.
 * 
 * @returns a react component consisting of the Register page.
 */
export default function Register() {
    /* Mapping of different error messages. */
    const ERROR_MESSAGES = {
        EXISTING_CREDENTIALS_ERROR: "Email, phone number, or username already taken.",
        INVALID_EMAIL_ERROR: "Invalid email format.",
        INVALID_PHONE_ERROR: "Invalid phone format.",
        INVALID_USERNAME_ERROR: "Invalid username. (No spaces, min length ",
        INVALID_PASSWORD_ERROR: "Invalid password. (Min length ",
        GENERIC_SERVER_ERROR: "There was a problem registering your account. Please try again later.",
        DIDNT_AGREE_TERMS_ERROR: "You must agree to the terms and conditions before registering."
    }

    /* Used to navigate to different pages. */
    const navigate = useNavigate();

    /* States for user credentials. */
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    /* State for whether credentials entered are valid. */
    const [isValidCredentials, setIsValidCredentials] = useState(true);

    /* Flag for whether use clicked on 'Get Started' after entering their email. */
    const [clickedGetStarted, setclickedGetStarted] = useState(false);

    /* The current error message to be displayed to the user */
    const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGES.EXISTING_CREDENTIALS_ERROR);

    /* Reference to the DOM element where user enters their email */
    const emailRef = useRef();

    /* Whether user wants to see terms and conditions */
    const [showTerms, setShowTerms] = useState(false);

    /* Whether user agreed to terms and conditions */
    const [termsAgreed, setTermsAgreed] = useState(false);

    /* Toggle the show terms poppup */
    const handleShowTerms = (e) => {
        e.preventDefault();
        setShowTerms(!showTerms);
    }

    /* Toggle checkbox for terms and conditions */
    const handleAgreeTerms = (e) => {
        setTermsAgreed(!termsAgreed);
    }

    /* Returns true if the email box is already filled */
    function isEmailBoxFilled() {
        return emailRef.current.value.length > 0;
    }

    /* Handles when user clicks get started or hits enter upon starting registration */
    const handleGetStarted = (e) => {
        e.preventDefault();

        /* If all the fields are displayed, try submitting the form */
        if (clickedGetStarted) {
            handleRegister(e);
            return;
        }

        /* If email box is filled, show other fields */
        if (isEmailBoxFilled()) {
            setclickedGetStarted(true);
        }
    }

    /* Handles registration logic when user clicks 'Sign Up' or hits 'Enter' on the keyboard. */
    const handleRegister = (e) => {
        e.preventDefault();

        /* Reset all error flags when attempting register */
        setIsValidCredentials(true);

        /* Check if email is valid */
        if (!RegexUtil.isValidEmailFormat(email)) {
            setIsValidCredentials(false);
            setErrorMessage(ERROR_MESSAGES.INVALID_EMAIL_ERROR);
            return;
        }

        /* Check if phone is valid */
        if (!RegexUtil.isValidPhoneFormat(phone)) {
            setIsValidCredentials(false);
            setErrorMessage(ERROR_MESSAGES.INVALID_PHONE_ERROR);
            return;
        }

        /* Check if username is valid */
        if (!RegexUtil.isValidUsernameFormat(username)) {
            setIsValidCredentials(false);
            setErrorMessage(ERROR_MESSAGES.INVALID_USERNAME_ERROR + RegexUtil.MIN_USERNAME_LENGTH + ".");
            return;
        }

        /* Check if password is valid */
        if (!RegexUtil.isValidPasswordFormat(password)) {
            setIsValidCredentials(false);
            setErrorMessage(ERROR_MESSAGES.INVALID_PASSWORD_ERROR + RegexUtil.MIN_PASSWORD_LENGTH + ".");
            return;
        }

        /* Check if user agreed to terms and conditions */
        if (!termsAgreed) {
            setIsValidCredentials(false);
            setErrorMessage(ERROR_MESSAGES.DIDNT_AGREE_TERMS_ERROR);
            return;
        }
        /* Perform HTTP request to register user */
        performRegister();
    }

    /* Performs the HTTP Request to the backend to register the user. */
    const performRegister = async () => {
        try {
            await axios.post("auth/register", {
                username: username,
                email: email,
                phone: phone,
                password: password
            });

            /* Navigate to login page after successful registration */
            navigate(ROUTES.LOGIN, {
                state: {
                    justRegistered: true
                }
            });
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setErrorMessage(ERROR_MESSAGES.EXISTING_CREDENTIALS_ERROR);
            } else {
                console.log(err)
                setErrorMessage(ERROR_MESSAGES.GENERIC_SERVER_ERROR);
            }
            setIsValidCredentials(false);
        }
    }

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <motion.img
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="logo"
                        src={logo}
                        alt="Titan Logo"
                    />
                    <Link to="/login" className="link">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="loginButton"
                        >
                            Sign In
                        </motion.button>
                    </Link>
                </div>
            </div>

            <AnimatePresence>
                {!showTerms && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="container"
                    >
                        <h1>Ready to level up your fitness journey?</h1>
                        <h2>Sign up for free.</h2>
                        <p>Create your account below.</p>

                        <div className="input">
                            <input
                                type="email"
                                placeholder="email address"
                                onChange={(e) => setEmail(e.target.value)}
                                ref={emailRef}
                                onKeyDown={(e) => e.key === 'Enter' && handleGetStarted(e)}
                            />
                            {!clickedGetStarted && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="registerButton"
                                    onClick={handleGetStarted}
                                >
                                    Get Started
                                </motion.button>
                            )}
                        </div>

                        <AnimatePresence>
                            {clickedGetStarted && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="input-group"
                                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                >
                                    <div className="input">
                                        <input
                                            type="text"
                                            placeholder="phone number"
                                            onChange={(e) => setPhone(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleRegister(e)}
                                        />
                                    </div>
                                    <div className="input">
                                        <input
                                            type="text"
                                            placeholder="username"
                                            onChange={(e) => setUsername(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleRegister(e)}
                                        />
                                    </div>
                                    <div className="input">
                                        <input
                                            type="password"
                                            placeholder="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleRegister(e)}
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="termsButton"
                                        onClick={handleShowTerms}
                                    >
                                        Terms and Conditions
                                    </motion.button>

                                    <div style={{ marginTop: '24px' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="registerButton"
                                            onClick={handleRegister}
                                            style={{ width: '200px' }}
                                        >
                                            Sign Up
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {!isValidCredentials && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="errorMessage"
                                >
                                    <p>{errorMessage}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Terms and Conditions Modal */}
            <AnimatePresence>
                {showTerms && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="termsForm"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="termsContainer"
                        >
                            <form>
                                <h1>Terms and Conditions</h1>
                                <textarea
                                    readOnly
                                    value={"No terms and conditions currently..."}
                                    className="terms-textarea"
                                />
                                <span className="checkboxContainer">
                                    <input
                                        type="checkbox"
                                        checked={termsAgreed}
                                        onChange={handleAgreeTerms}
                                    />
                                    I have read and agreed to the terms and conditions.
                                </span>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="backButton"
                                    onClick={handleShowTerms}
                                >
                                    Back
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}