document.addEventListener('DOMContentLoaded', function () {
	const contentLinks = document.querySelectorAll('.content-link');
	const dashContents = document.querySelectorAll('.dash-content');
	const dashboardContent = document.getElementById('dashboard-content');
	const dashboardLink = document.querySelector('.dashboard-link');
	const expandArrow = document.querySelector('.expand-arrow');
	const subcategories = document.querySelector('.subcategories');

	contentLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			const targetId = link.getAttribute('href').replace('#', '');
			dashContents.forEach((content) => {
				content.style.display = 'none';
			});
			dashboardContent.style.display = 'none'; // Hide dashboard content
			document.getElementById(`content-${targetId}`).style.display =
				'block';
		});

		dashboardLink.addEventListener('click', (event) => {
			event.preventDefault();
			dashContents.forEach((content) => {
				content.style.display = 'none';
			});
			dashboardContent.style.display = 'grid'; // Show dashboard content
		});
	});

	//   contentLinks.forEach((link) => {
	//     link.addEventListener('click', (event) => {
	//       event.preventDefault();
	//       const targetId = link.getAttribute('href').replace('#', '');
	//       //   dashboardContent.style.display = 'none';
	//       dashContents.forEach((content) => {
	//         content.style.display = 'none';
	//       });
	//       document.getElementById(`content-${targetId}`).style.display = 'block';
	//     });
	//   });
	dashboardLink.addEventListener('click', (event) => {
		event.preventDefault();
		dashContents.forEach((content) => {
			content.style.display = 'none';
		});
	});
	expandArrow.addEventListener('click', () => {
		subcategories.classList.toggle('show');
	});
});
const dateTime = document.querySelector('.date-time');

function updateDateTime() {
	const currentTime = new Date();
	dateTime.textContent = `Date & Time: ${currentTime.toLocaleDateString()}, ${currentTime.toLocaleTimeString()}`;
}

updateDateTime();
setInterval(updateDateTime, 1000); // Update every second

document.addEventListener('DOMContentLoaded', function () {
	const profileToggle = document.getElementById('profileToggle');
	const profileDetails = document.getElementById('profileDetails');

	profileToggle.addEventListener('click', function () {
		profileDetails.classList.toggle('visible');
	});
});
