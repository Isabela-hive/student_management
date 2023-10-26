const backgrounds = [
	{
		imageUrl: '/images/africastudents.jpg',
		title: 'Welcome to Your App',
		text: 'Your personalized learning platform.',
	},
	{
		imageUrl: '/images/cjlf.jpeg',
		title: 'Calistous Juma Resource and Innovation Hub',
		text: 'CJLF - Legacy and Foundation',
	},
	{
		imageUrl: '/images/childrn.jpg',
		title: 'Discover New Opportunities',
		text: 'Expand your knowledge and skills.',
	},
	// Add more background objects as needed
];

function changeBackground() {
	const randomIndex = Math.floor(Math.random() * backgrounds.length);
	const background = backgrounds[randomIndex];

	document.getElementById('landing-title').textContent = background.title;
	document.getElementById('landing-text').textContent = background.text;
	document.querySelector(
		'.coverimg'
	).style.backgroundImage = `url('${background.imageUrl}')`;
}

// Change background and text every 5 seconds
setInterval(changeBackground, 5000);
