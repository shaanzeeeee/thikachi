/* Code that renders homepage on the frontend */
import Navbar from "../../components/navbar/navbar";
import BracuInfo from "../../components/bracuinfo/bracuinfo";
import React from "react";
import "./home.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

/**
 * Returns a react component consisting of the Home page. Includes all logic relevant to the home page.
 * 
 * @returns a react component consisting of the Home page.
 */
const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className="page-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero"
                >
                    <h1>Your Journey to a Healthier Lifestyle Starts Here</h1>
                    <p>Track steps, manage nutrition, and achieve your fitness goals with Thik Achi's intelligent health companion.</p>

                    <div className="cta-buttons">
                        <Link to={ROUTES.REGISTER} className="link">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                            >
                                Get Started
                            </motion.button>
                        </Link>
                        <Link to={ROUTES.LOGIN} className="link">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-secondary"
                            >
                                Login
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                <div className="stats-section">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        className="stats-grid"
                    >
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="stat-card">
                            <div className="stat-icon"><MonitorHeartIcon fontSize="inherit" style={{ color: '#ef4444' }} /></div>
                            <div className="stat-value">Health</div>
                            <div className="stat-label">Comprehensive Tracking</div>
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="stat-card">
                            <div className="stat-icon"><RestaurantMenuIcon fontSize="inherit" style={{ color: '#10b981' }} /></div>
                            <div className="stat-value">Nutrition</div>
                            <div className="stat-label">Smart Meal Planning</div>
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="stat-card">
                            <div className="stat-icon"><FitnessCenterIcon fontSize="inherit" style={{ color: '#3b82f6' }} /></div>
                            <div className="stat-value">Fitness</div>
                            <div className="stat-label">Personalized Workouts</div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="info-section"
                >
                    <BracuInfo />
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
