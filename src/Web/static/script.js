/* eslint-disable */

if ('serviceWorker' in navigator) {
	console.log(`[ServiceWorker]: Registering...`);

	navigator.serviceWorker
		.register('/serviceWorker.js')
		.then(() => console.log(`[ServiceWorker]: Registration complete.`))
		.catch(() => console.log(`[ServiceWorker]: Registration failed.`));
} else {
	console.log(`[ServiceWorker]: Browser not supported.`);
}

const scroll_To = (getID) => {
	const id = getID.replace('#', '');
	const el = document.getElementById(id);
	el.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
	history.pushState(null, null, `#${id}`);
};

window.addEventListener('scroll', () => {
	const scrollPosition = window.scrollY;
	const logoContainer = document.getElementsByClassName('arrow')[0];
	if (scrollPosition >= 100) logoContainer.classList.add('arrow--scrolled');
	else logoContainer.classList.remove('arrow--scrolled');
});
