document.addEventListener("DOMContentLoaded", function () {
    const designation = document.getElementById("designation");
    const phrases = ["Front-end Developer", "Website Designer", "Mobile App Designer"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false; // Flag to pause/resume animation
    const typingSpeed = 200;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 2000;
    const pauseBeforeNext = 500;

    function typeEffect() {
        if (isPaused) return; // Stop animation if paused

        const currentPhrase = phrases[phraseIndex];
        designation.textContent = currentPhrase.substring(0, charIndex);

        if (isDeleting) {
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, pauseBeforeNext);
                return;
            }
            setTimeout(typeEffect, deletingSpeed);
        } else {
            charIndex++;
            if (charIndex > currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, pauseBeforeDelete);
                return;
            }
            setTimeout(typeEffect, typingSpeed);
        }
    }

    function handleScroll() {
        const hero = document.querySelector("#hero");
        const downIcon = document.querySelector("#down-icon");
        const heroRect = hero.getBoundingClientRect();

        // Pause animation if hero section is out of viewport (not visible)
        if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
            isPaused = true;
        } else {
            if (isPaused) {
                isPaused = false;
                typeEffect(); // Resume animation
            }
        }

        if (heroRect.bottom < 50 || heroRect.top > window.innerHeight) {
            downIcon.classList.add("invisible");
        } else {
            downIcon.classList.remove("invisible");
        }
    }

    window.addEventListener("scroll", handleScroll);

    typeEffect(); // Start animation initially
});
document.addEventListener("DOMContentLoaded", function () {
    function updateNavbarLogo() {
        const logo = document.getElementById("myImage");

        if (window.innerWidth <= 991) {
            logo.src = "./assets/images/myimage2.png";
        } else {
            logo.src = "./assets/images/myimage.png";
        }
    }

    // Run on page load
    updateNavbarLogo();

    // Update on window resize
    window.addEventListener("resize", updateNavbarLogo);
})
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const hero = document.querySelector("#hero");
    const imgBrand = document.querySelector("#img-brand");

    function toggleHeader() {
        const heroBottom = hero.getBoundingClientRect().bottom;

        if (heroBottom <= 0) {
            header.classList.add("visible");
            imgBrand.classList.add("visible");
        } else {
            header.classList.remove("visible");
            imgBrand.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", toggleHeader);
});


document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Select all sections
    const navLinks = document.querySelectorAll(".nav-link"); // Select all nav links
    const navbarHeight = document.querySelector("header").offsetHeight; // Get navbar height

    // Function to remove active class from all links
    function removeActiveClass() {
        navLinks.forEach((link) => link.classList.remove("active"));
    }

    // Intersection Observer to detect which section is in view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    removeActiveClass(); // Remove active class from all

                    // Find the matching link and add active class
                    let activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });
        },
        { threshold: 0.6 } // Section must be 60% visible to trigger
    );

    // Observe each section
    sections.forEach((section) => observer.observe(section));

    // Smooth scrolling behavior + Active Class Handling on Click
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            removeActiveClass(); // Remove active class from all links
            link.classList.add("active"); // Add active class to clicked link

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight, // Adjust for fixed header
                    behavior: "smooth",
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let progressBars = document.querySelectorAll(".progress-bar");

    function animateProgressBars() {
        progressBars.forEach(bar => {
            let percent = bar.getAttribute("data-percent");
            bar.style.width = percent + "%";
            bar.querySelector("span").textContent = percent + "%"; // Update text inside bar
        });
    }

    function checkScroll() {
        let section = document.querySelector("#skills");
        let sectionPosition = section.getBoundingClientRect().top;
        let screenPosition = window.innerHeight / 1.2;

        if (sectionPosition < screenPosition) {
            animateProgressBars();
            window.removeEventListener("scroll", checkScroll);
        }
    }

    window.addEventListener("scroll", checkScroll);
});

document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
