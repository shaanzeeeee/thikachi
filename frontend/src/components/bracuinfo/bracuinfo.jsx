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
			// Check if Google Maps API is loaded
			if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places) {
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
			} else {
				// Google Maps API not loaded, set default hours
				console.log('Google Maps API not loaded, using default hours');
				setHours([
					'Monday: 7:00 AM – 10:00 PM',
					'Tuesday: 7:00 AM – 10:00 PM',
					'Wednesday: 7:00 AM – 10:00 PM',
					'Thursday: 7:00 AM – 10:00 PM',
					'Friday: 7:00 AM – 10:00 PM',
					'Saturday: 9:00 AM – 8:00 PM',
					'Sunday: 9:00 AM – 8:00 PM'
				]);
			}
			isFirstRender.current = false;
		}
	});

	return (
		<div className="bracu-info-container">
			<div className="hours-card">
				<h3>Thik Achi Center Hours</h3>
				<ul className="hours-list">
					{hours.length > 0 ? (
						hours.map((time, index) => <li key={index}>{time}</li>)
					) : (
						<li>Loading hours...</li>
					)}
				</ul>
			</div>
			<div className="map-container">
				<iframe
					title="map"
					width="100%"
					height="100%"
					style={{ border: 0, minHeight: '300px' }}
					loading="lazy"
					allowFullScreen
					src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14603.903664895959!2d90.42282170044643!3d23.783871938834768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgyms%20near%20badda!5e0!3m2!1sen!2sbd!4v1713676682205!5m2!1sen!2sbd"
				>
				</iframe>
			</div>
		</div>
	);
}

export default BracuInfo;
