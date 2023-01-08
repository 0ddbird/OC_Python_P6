const header = document.querySelector('header');
const anchor = document.querySelector('#observer_anchor');
export function observeHero() {
    if (header == null || anchor == null)
        return;
    const observerOptions = {
        root: null,
        threshold: 0,
        rootMargin: '0px'
    };
    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            // console.log(entry.target)
            if (!entry.isIntersecting) {
                header.classList.add('plain');
                header.classList.remove('gradient');
            }
            else {
                header.classList.remove('plain');
                header.classList.add('gradient');
            }
        });
    }, observerOptions);
    observer.observe(anchor);
}
