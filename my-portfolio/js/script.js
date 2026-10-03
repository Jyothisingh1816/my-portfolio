/* =========================================================
   PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll(".nav-links a");

const sections = document.querySelectorAll("section");

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const yearElement = document.getElementById("year");


/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

const savedTheme = localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    body.classList.add("light-mode");

    themeToggle.textContent = "🌙";

} else {

    body.classList.remove("light-mode");

    themeToggle.textContent = "☀️";
}


/*
   When the theme button is clicked
*/

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-mode");


    const isLightMode =
        body.classList.contains("light-mode");


    if (isLightMode) {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    } else {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");


    const menuIsOpen =
        navLinks.classList.contains("open");


    if (menuIsOpen) {

        menuToggle.textContent = "✕";

    } else {

        menuToggle.textContent = "☰";
    }

});


/*
   Close mobile menu when a navigation
   link is clicked
*/

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";

    });

});


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

function updateActiveNavigation() {

    let currentSection = "home";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        const scrollPosition =
            window.scrollY;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");


        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

/*
   Add the reveal class automatically
   to important elements.
*/

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-text, " +
    ".info-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".resume-card, " +
    ".contact-info, " +
    ".contact-form"
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


/*
   Intersection Observer watches elements
   as they enter the screen.
*/

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   FOOTER YEAR
   ========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();


            const email =
                document.getElementById("email").value.trim();


            const message =
                document.getElementById("message").value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                formMessage.textContent =
                    "Please fill in all fields.";

                return;

            }


            formMessage.textContent =
                "Thank you! Your message is ready to send.";


            contactForm.reset();

        }
    );

}


/* =========================================================
   PROJECT IMAGE MODAL
   ========================================================= */

/*
   This function creates the image modal
   when a project screenshot is clicked.
*/

function createImageModal() {

    const modal =
        document.createElement("div");


    modal.className =
        "image-modal";


    modal.innerHTML = `

        <div class="modal-overlay"></div>

        <div class="modal-content">

            <button
                class="modal-close"
                aria-label="Close image">
                ✕
            </button>

            <img
                src=""
                alt="Project screenshot"
                class="modal-image">

        </div>

    `;


    document.body.appendChild(modal);


    return modal;

}


let imageModal = null;


/*
   Open image modal
*/

function openImageModal(imageSource, imageAlt) {

    if (!imageModal) {

        imageModal =
            createImageModal();

    }


    const modalImage =
        imageModal.querySelector(
            ".modal-image"
        );


    modalImage.src = imageSource;

    modalImage.alt = imageAlt;


    imageModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/*
   Close image modal
*/

function closeImageModal() {

    if (!imageModal) {
        return;
    }


    imageModal.classList.remove("show");

    document.body.style.overflow = "";

}


/*
   Event delegation for project images
*/

document.addEventListener(
    "click",
    (event) => {

        const image =
            event.target.closest(
                ".project-gallery img"
            );


        if (image) {

            openImageModal(
                image.src,
                image.alt
            );

        }


        if (
            event.target.classList.contains(
                "modal-overlay"
            ) ||
            event.target.classList.contains(
                "modal-close"
            )
        ) {

            closeImageModal();

        }

    }
);


/*
   Close modal with Escape key
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeImageModal();

        }

    }
);


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

navItems.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const navbarHeight =
                document.querySelector(
                    ".navbar"
                ).offsetHeight;


            const targetPosition =
                target.offsetTop -
                navbarHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   PREVENT BROKEN IMAGE DISPLAY
   ========================================================= */

/*
   If an image is missing, add a class
   instead of showing a broken-image icon.
*/

document.addEventListener(
    "error",
    (event) => {

        if (
            event.target.tagName === "IMG"
        ) {

            event.target.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   PAGE LOADED
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);