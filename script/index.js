function toggleMenu() {
    const nav = document.querySelector('.nav');
    if (nav.className === 'nav') {
        nav.className += ' responsive';
    } else {
        nav.className = 'nav';
    }
}



