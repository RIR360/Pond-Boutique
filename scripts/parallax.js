/* module written by Rejwan Islam Rizvy (RIR360) */


let images = this.document.querySelectorAll('.parallax-image');

window.addEventListener('scroll', function() {

    let scrollPosition = window.scrollY;

    images.forEach(image => {

        let factor = image.getAttribute('parallax-speed');
        let translateY = scrollPosition * factor;

        image.style.transform = `translate3d(0px, ${translateY}px, 0px)`;
        
    });


});