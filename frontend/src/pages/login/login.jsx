/* React page for login */
import "./login.scss";
import { login } from "../../utils/authentication/auth-helper";
import logo from "../../components/titan-clear-logo.png";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../utils/authentication/auth-context";
import { useEffect, useRef, useContext, useState } from "react";
import RegexUtil from "../../utils/regex-util";
import ROUTES from "../../routes";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Returns a react component consisting of the Login page. Includes all logic relevant to logging in.
 * 
 * @returns a react component consisting of the Login page.
 */
export default function Login() {
    /* Message displayed if user just registered and was redirected to this page */
    const JUST_REGISTERED_MESSAGE = "Your registration was successful!"

    /* Whether the user was redirected to the login page from registering */
    const [recentlyRegistered, setRecentlyRegistered] = useState(false);

    /* Login type that user entered */
    const [emailOrPhoneOrUsername, setEmailOrPhoneOrUsername] = useState("");

    /* Password that user entered*/
    const [password, setPassword] = useState("");

    /* Whether user entered valid credentials */
    const [isValidCredentials, setIsValidCredentials] = useState(true);

    /* Authentication context */
    const { dispatch } = useContext(AuthContext);

    /* The current user */
    const [user, setUser] = useState({}); // begin with {} instead of null b/c useEffect detects changes to null as well

    /* Handles logging in the user */
    const handleLogin = (e) => {
        /* Prevent default event behavior */
        e.preventDefault();

        /* strip non-digits if user is trying to login with phone number */
        const loginMethod = RegexUtil.isValidPhoneFormat(emailOrPhoneOrUsername) ? RegexUtil.stripNonDigits(emailOrPhoneOrUsername) : emailOrPhoneOrUsername;

        /* Login and store the user in cache (authentication context) */
        login({ loginMethod, password }, dispatch).then(
            returnedUser => setUser(returnedUser)
        );
    }

    /* After log in attempt, set flag for whether or not it was a successful attempt */
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (user == null) {
            setIsValidCredentials(false);
        }
    }, [user]);

    /* Gets location that user navigated from */
    const location = useLocation();

    /* Gets whether user just registered (navigated from register page) */
    useEffect(() => {
        if (location.state != null) {
            setRecentlyRegistered(location.state.justRegistered);
        }
    }, [location.state]);

    /* Display a 5 second message informing the user their sign up was successful */
    useEffect(() => {
        if (recentlyRegistered) {
            window.history.replaceState({}, document.title, null); // prevents message from showing up after page reload
            setTimeout(() => {
                setRecentlyRegistered(false);
            }, 5000);
        }
    }, [recentlyRegistered]);

    /* Return react component */
    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="logo"
                        src={logo}
                        alt="Titan Logo"
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="container"
            >
                <AnimatePresence>
                    {recentlyRegistered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="recentlyRegisteredMessage"
                        >
                            <p>{JUST_REGISTERED_MESSAGE}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.form
                    whileHover={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)" }}
                >
                    <h1>Sign In</h1>
                    <input
                        type="text"
                        placeholder="Phone number, username, or email"
                        onChange={(e) => setEmailOrPhoneOrUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="loginButton"
                        onClick={handleLogin}
                    >
                        Sign In
                    </motion.button>

                    <AnimatePresence>
                        {!isValidCredentials && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="errorMessage"
                            >
                                <p>Invalid login credentials.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <span>
                        New to Thik Achi?
                        <b className="signUp">
                            <Link to={ROUTES.REGISTER} className="link"> Sign up now.</Link>
                        </b>
                    </span>
                </motion.form>
            </motion.div>
        </div>
    );
}