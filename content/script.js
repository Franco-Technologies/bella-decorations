window.addEventListener('scroll', function() {
    // const menu = document.getElementById('floatingMenu');
    // if (window.pageYOffset > 100) {
    //     menu.style.display = 'block';
    // } else {
    //     menu.style.display = 'none';
    // }
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const menuLinks = document.querySelectorAll('.floating-menu a');

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

        menuLinks.forEach((link) => link.classList.remove('active'));
        menuLinks[index].classList.add('active');

        if (index === 0) {
            menuLinks[0].classList.add('active');
        }
        
        if (window.scrollY + window.innerHeight === document.body.clientHeight) {
            menuLinks.forEach((link) => link.classList.remove('active'));
            menuLinks[menuLinks.length - 1].classList.add('active');
        }
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);
});

let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.querySelectorAll('.carousel-images img');
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function moveSlide(n) {
    slideIndex += n-1;
    showSlides();
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
});

window.onscroll = function() {shrinkLogo()};

function shrinkLogo() {
    const logo = document.getElementById("logo");
    const header = document.getElementById("header");
    const firstSection = document.querySelector('.section'); // Assuming .section is your first section

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        logo.style.height = "50px";
        header.style.padding = "5px 0";
        firstSection.style.paddingTop = "180px"; // Adjusted based on the shrunk header size
    } else {
        logo.style.height = "80px";
        header.style.padding = "20px 0";
        firstSection.style.paddingTop = "200px"; // Adjusted based on the original header size
    }
}
