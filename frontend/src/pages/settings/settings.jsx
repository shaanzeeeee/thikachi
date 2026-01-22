/* JS for settings page */
import Navbar from "../../components/navbar/navbar";
import "./settings.scss";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { logout } from "../../utils/authentication/auth-helper";
import { AuthContext } from "../../utils/authentication/auth-context";
import { useContext } from "react";
import ROUTES from "../../routes";


/**
 * Returns a react component consisting of the Settings page. 
 * Includes all logic relevant to logging in.
 * 
 * @returns a react component consisting of the Settings page.
 */
const Settings = () => {
    const { dispatch } = useContext(AuthContext); // get auth context
    const navigate = useNavigate();

    /* Handles logging out if user clicks logout */
    const handleLogout = (e) => {
        e.preventDefault();
        logout(dispatch);
        navigate(ROUTES.LOGIN);
    }

    return (
        <div className="settings">
            <Navbar />
            <div className="centered">
                <Grid container spacing={4} direction="column" alignItems="center">
                    <Grid item xs={12} className="about">
                        <span className="pageTitle">Info & Settings</span>
                    </Grid>

                    <Grid item xs={12} sm={8} md={6} style={{ width: '100%' }}>
                        <div className="box">
                            <Link to={ROUTES.PERSONAL_INFO} className="link">
                                <span className="buttonText">Personal Information</span>
                            </Link>
                        </div>
                        <div className="box">
                            <Link to={ROUTES.PREFERENCES} className="link">
                                <span className="buttonText">Dietary Preferences</span>
                            </Link>
                        </div>
                        <div className="box">
                            <span className="buttonText">Notifications</span>
                        </div>
                        <div className="box">
                            <Link to={ROUTES.REPORT_PROBLEM} className="link">
                                <span className="buttonText">Report a Problem</span>
                            </Link>
                        </div>
                        <div className="box">
                            <span className="buttonText">Delete Account</span>
                        </div>
                        <div className="box">
                            <Link to="/login" className="link" onClick={handleLogout}>
                                <span className="buttonText">Logout</span>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Settings;