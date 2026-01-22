// Javascript for page displaying info related to a menu item
import Navbar from "../../components/navbar/navbar";
import "./exerciseInfo.scss";
import { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { IconButton, Tooltip, List, ListItem, FormControl, InputLabel, Select, MenuItem, Typography, Box, Button } from '@mui/material';
import { Info, StarOutline, Star, BookmarkBorder, Bookmark } from '@mui/icons-material';
import { AuthContext } from "../../utils/authentication/auth-context";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import ROUTES from "../../routes";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "black",
    },
    selected: {
        color: "white"
    }
}));

const ExerciseInfo = () => {

    /* Rating Info */
    const [starClick1, setStarClick1] = useState(false);
    const [starClick2, setStarClick2] = useState(false);
    const [starClick3, setStarClick3] = useState(false);
    const [starClick4, setStarClick4] = useState(false);
    const [starClick5, setStarClick5] = useState(false);
    const [savedClick, setSavedClick] = useState(false);

    /* Exercise info corresponding to input boxes */
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [time, setTime] = useState(0);
    const [exerciseType, setExerciseType] = useState('');
    const [priorExercise, setPriorExercise] = useState();

    const { user } = useContext(AuthContext);
    const userId = user._id;
    const classes = useStyles();
    let { exerciseHash } = useParams(); // this will be undefined if no params
    const [exercise, setExercise] = useState({
        exerciseName: "",
        sets: "",
        reps: "",
        time: "",
        exerciseType: "",
        hash: ""
    }); //tracks food item

    const handleClick0 = () => {
        setStarClick1(false);
        setStarClick2(false);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
        // setScore(0);
    }
    const handleClick1 = () => {
        setStarClick1(true);
        setStarClick2(false);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
        // setScore(1);
    }
    const handleClick2 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(false);
        setStarClick4(false);
        setStarClick5(false);
        // setScore(2);
    }
    const handleClick3 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(false);
        setStarClick5(false);
        // setScore(3);
    }
    const handleClick4 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(true);
        setStarClick5(false);
        // setScore(4);
    }
    const handleClick5 = () => {
        setStarClick1(true);
        setStarClick2(true);
        setStarClick3(true);
        setStarClick4(true);
        setStarClick5(true);
        // setScore(5);
    }
    const handleSavedClick = () => {
        setSavedClick(!savedClick);
    }

    /**
    *   Get item on page render
    */
    const isFirstRender = useRef(true); // don't do anything on first render
    useEffect(() => {

        const getExerciseInfo = async () => {
            try {
                const response = await axios.get(`/users/anExercise/${userId}/${exerciseHash}`,
                    { headers: { token: `Bearer ${user.accessToken}` } });
                console.log(`Bearer ${user.accessToken}`);
                const item = response.data;

                const priorCheck = await axios.get(`/users/priorExercise/${userId}/${item.exerciseName}`,
                    { headers: { token: `Bearer ${user.accessToken}` } });

                if (priorCheck.data !== "No Prior History") {
                    setPriorExercise(priorCheck.data);
                } else {
                    setPriorExercise("N/A");
                }

                setExercise({
                    exerciseName: item.exerciseName,
                    sets: item.sets,
                    reps: item.reps,
                    time: item.time,
                    exerciseType: item.exerciseType,
                    hash: item.hash
                });
            } catch (error) { console.log(error) };
        };

        if (isFirstRender.current) {
            if (exerciseHash != null) {
                getExerciseInfo();
            }
        }
        isFirstRender.current = false;
        // eslint-disable-next-line
    }, []);

    const handleEditExercise = async () => {

        try {
            const hash = exerciseHash;
            const res = await axios.put(
                `/users/editExercise/${userId}`,
                { exerciseName, sets, reps, time, exerciseType, hash },
                { headers: { token: `Bearer ${user.accessToken}` } }
            );

            // Refresh the food items after editing
            setExercise({
                exerciseName: exerciseName,
                sets: sets,
                reps: reps,
                time: time,
                exerciseType: exerciseType,
                hash: exerciseHash
            });

            // Clear the previous state
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteExercise = async () => {
        try {
            const hash = exerciseHash;
            const res = await axios.delete(
                `/users/deleteExercise/${userId}/${hash}`,
                { headers: { token: `Bearer ${user.accessToken}` } }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleExerciseTypeChange = (event) => {
        setExerciseType(event.target.value);
    }

    return (
        <div className="exerciseInfo">
            <Navbar />

            {/* Top Grid: Facts, Edit, Delete */}
            <div className="infoGrid">
                {/* Exercise Facts */}
                <Box className="infoCard">
                    <div className="cardHeader">
                        <Typography style={{ color: "#ebc034" }} fontWeight="bold">
                            Exercise Facts for: &nbsp; {exercise.exerciseName}
                        </Typography>
                    </div>
                    <List>
                        <ListItem key="sets">
                            <Typography fontWeight="bold">
                                Sets: {exercise.sets}
                            </Typography>
                        </ListItem>
                        <ListItem key="reps">
                            <Typography fontWeight="bold">
                                Reps: {exercise.reps}
                            </Typography>
                        </ListItem>
                        <ListItem key="time">
                            <Typography fontWeight="bold">
                                Time: {exercise.time}
                            </Typography>
                        </ListItem>
                        <ListItem key="type">
                            <Typography fontWeight="bold">
                                Exercise Type: {exercise.exerciseType}
                            </Typography>
                        </ListItem>
                    </List>
                </Box>

                {/* Update Exercise */}
                <Box className="infoCard">
                    <div className="cardHeader">
                        <Typography fontWeight="bold">
                            Edit Exercise:
                        </Typography>
                    </div>
                    <List>
                        <ListItem key="name">
                            <Typography fontWeight="bold">
                                Exercise Name:
                            </Typography>
                            <input type="name" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
                        </ListItem>
                        <ListItem key="sets">
                            <Typography fontWeight="bold">
                                Sets:
                            </Typography>
                            <input type="sets" value={sets} onChange={(e) => setSets(e.target.value)} />
                        </ListItem>
                        <ListItem key="reps">
                            <Typography fontWeight="bold">
                                Reps:
                            </Typography>
                            <input type="reps" value={reps} onChange={(e) => setReps(e.target.value)} />
                        </ListItem>
                        <ListItem key="time">
                            <Typography fontWeight="bold">
                                Time:
                            </Typography>
                            <input type="duration" value={time} onChange={(e) => setTime(e.target.value)} />
                        </ListItem>
                        <ListItem>
                            <Box sx={{ minWidth: 120, width: '100%' }}>
                                <FormControl error fullWidth>
                                    <InputLabel>Exercise Type</InputLabel>
                                    <Select id="demo-simple-select" value={exerciseType} onChange={handleExerciseTypeChange} label="Filter" classes={{ root: classes.root, select: classes.selected }} >
                                        <MenuItem value={"Weight Lifting"}>{`Weight Lifting`}</MenuItem>
                                        <MenuItem value={"Cardio"}>{`Cardio`}</MenuItem>
                                        <MenuItem value={"Other"}>{`Other`}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="success" size="large" className="button" onClick={handleEditExercise}> Update Exercise </Button>
                        </ListItem>
                    </List>
                </Box>

                {/* Delete Exercise */}
                <Box className="infoCard">
                    <div className="cardHeader">
                        <Typography fontWeight="bold">
                            Delete This Exercise:
                        </Typography>
                    </div>
                    <List>
                        <ListItem>
                            <Link to={ROUTES.EXERCISE_TRACKER} className="link" onClick={handleDeleteExercise} style={{ width: '100%' }}>
                                <Button variant="contained" color="error" size="large" className="button"> Delete </Button>
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </div>

            {/* Interaction Section: Ratings */}
            <div className="interactionSection">
                <Box className="ratingsBox">
                    <Tooltip title={`Average Rating: `} placement="bottom">
                        <IconButton color="inherit">
                            <Info />
                        </IconButton>
                    </Tooltip>
                    <IconButton color="inherit" onClick={handleClick1}>
                        {starClick1 ? <Star /> : <StarOutline />}
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClick2}>
                        {starClick2 ? <Star /> : <StarOutline />}
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClick3}>
                        {starClick3 ? <Star /> : <StarOutline />}
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClick4}>
                        {starClick4 ? <Star /> : <StarOutline />}
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClick5}>
                        {starClick5 ? <Star /> : <StarOutline />}
                    </IconButton>
                    <IconButton color="inherit" onClick={handleSavedClick}>
                        {savedClick ? <Bookmark /> : <BookmarkBorder />}
                    </IconButton>
                </Box>
            </div>

            {/* Bottom Section: History & Disclaimer */}
            <div className="detailsSection">
                <Box className="detailsBox">
                    <Typography fontWeight="bold" gutterBottom>
                        Most Recent Exercise History:
                    </Typography>
                    {/* Add history content here if available */}
                    <Typography>
                        {priorExercise !== "N/A" && priorExercise ? priorExercise : "No prior history found."}
                    </Typography>
                </Box>

                <Box className="detailsBox disclaimer">
                    <Typography style={{ color: "#f74d40" }} fontWeight="bold" gutterBottom>
                        Disclaimer:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ color: '#aaa' }}>
                        Exercises should follow proper form - ego lifting is strictly prohibited.
                    </Typography>
                </Box>
            </div>
        </div>
    );
};

export default ExerciseInfo;