import {
	Box,
	List,
	ListItem,
	Paper,
	Stack
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
/*
 * Returns a component that displays the Corec's hours and
 * the distance from the user to the Corec.
 * */
const BracuInfo = () => {
	const [hours, setHours] = useState([]);

	const request = {
		placeId: 'ChIJc3NYhLXiEogRzh1avYzXIBc',
		fields: ['name', 'opening_hours']
	};

	const isFirstRender = useRef(true);
	useEffect(() => {
		if (isFirstRender.current === true) {
			//eslint-disable-next-line
			const service = new google.maps.places.PlacesService(document.createElement('div'));
			service.getDetails(request, placesCallback);
			function placesCallback(place, status) {
				//eslint-disable-next-line
				if (status !== google.maps.places.PlacesServiceStatus.OK) return;
				if (place.opening_hours) {
					console.log(`${place.opening_hours.weekday_text}`);
					setHours(place.opening_hours.weekday_text);
				}
			}
			isFirstRender.current = false;
		}
	});

	function listTimes(time) {
		return (
			<ListItem
				component="div"
				disablePadding
				sx={{
					paddingLeft: '16px', // Add left padding
					paddingRight: '4px', // Add left padding
					borderBottom: '1px solid #e0e0e0', // Line between items
					marginBottom: '8px', // Spacing between items
					paddingBottom: '8px', // Padding at the bottom of the item
					paddingTop: '4px', // Add left padding
				}}
			>
				<span className="smallListItem">{`${time}`}</span>
			</ListItem>
		)
	}
	/* menu box with weekly hours in it */
	/* TODO: add another box with maps info */
	/* TODO: add another box surrounding the two */
	return (
		<Box sx={{
			width: 650,
			height: 350,
			bgcolor: "background.paper",
			boxShadow: 1,
			borderRadius: 2,
			p: 2,
		}}>
			<Stack direction="row" spacing={2}>
				<Paper style={{
					maxWidth: 250,
					maxHeight: 355,
				}}
					elevation={3}>
					<List>
						<ListItem
							component="div"
							disablePadding
							sx={{
								paddingLeft: '16px', // Add left padding
								paddingRight: '4px', // Add left padding
								borderBottom: '1px solid #e0e0e0', // Line between items
								marginBottom: '8px', // Spacing between items
								paddingBottom: '8px', // Padding at the bottom of the item
								paddingTop: '4px', // Add left padding
							}}
						>
							<b>Bracu Hours and Directions</b>
						</ListItem>
						{hours.map((time) => listTimes(time))}
					</List>
				</Paper>
				<Box>
					<iframe
						title="map"
						width="400"
						height="350"
						style={{ border: 0 }}
						loading="lazy"
						allowfullscreen
						src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14603.903664895959!2d90.42282170044643!3d23.783871938834768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgyms%20near%20badda!5e0!3m2!1sen!2sbd!4v1713676682205!5m2!1sen!2sbd"
					>
					</iframe>
				</Box>
			</Stack>
		</Box>
	);
}

export default BracuInfo;
