/* eslint-disable */

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

window.addEventListener('load', () => new Darkmode().showWidget());
