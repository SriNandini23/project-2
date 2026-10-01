/* =================================
   NANDINI INTERIORS
   MAIN JAVASCRIPT
================================= */


/* =================================
   MOBILE NAVIGATION
================================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show-menu");

    });

}


/* =================================
   PROJECT FILTER
================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length > 0) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            projectCards.forEach(card => {

                const category =
                    card.getAttribute("data-category");

                if (filter === "all" || category === filter) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });

}


/* =================================
   CONTACT FORM VALIDATION
================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value.trim();


        const nameError =
            document.getElementById("nameError");

        const emailError =
            document.getElementById("emailError");

        const phoneError =
            document.getElementById("phoneError");

        const serviceError =
            document.getElementById("serviceError");

        const messageError =
            document.getElementById("messageError");

        const formSuccess =
            document.getElementById("formSuccess");


        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        serviceError.textContent = "";
        messageError.textContent = "";
        formSuccess.textContent = "";


        let valid = true;


        /* Name */

        if (name === "") {

            nameError.textContent =
                "Please enter your name.";

            valid = false;

        }


        /* Email */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            emailError.textContent =
                "Please enter your email.";

            valid = false;

        } else if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email.";

            valid = false;

        }


        /* Phone */

        const phonePattern =
            /^[0-9]{10}$/;

        if (phone === "") {

            phoneError.textContent =
                "Please enter your phone number.";

            valid = false;

        } else if (!phonePattern.test(phone)) {

            phoneError.textContent =
                "Phone number must contain 10 digits.";

            valid = false;

        }


        /* Service */

        if (service === "") {

            serviceError.textContent =
                "Please select a service.";

            valid = false;

        }


        /* Message */

        if (message === "") {

            messageError.textContent =
                "Please tell us about your project.";

            valid = false;

        }


        /* Success */

        if (valid) {

            formSuccess.textContent =
                "Thank you! Your enquiry has been submitted successfully.";

            contactForm.reset();

        }

    });

}


/* =================================
   SCROLL REVEAL ANIMATION
================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .philosophy-card, .project-card, .process-step, .value-card"
    );


function revealOnScroll() {

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (elementTop < windowHeight - 80) {

            element.classList.add("reveal-active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
/* =================================
   INTERIOR BUDGET CALCULATOR
================================= */

const calculateBudget =
    document.getElementById("calculateBudget");

if (calculateBudget) {

    calculateBudget.addEventListener("click", function () {

        const homeType =
            document.getElementById("homeType").value;

        const area =
            Number(document.getElementById("area").value);

        const style =
            document.getElementById("style").value;

        const rooms =
            Number(document.getElementById("rooms").value);

        const result =
            document.getElementById("budgetResult");


        /* Check inputs */

        if (
            homeType === "" ||
            area === 0 ||
            style === "" ||
            rooms === 0
        ) {

            result.innerHTML = `
                <h3>PLEASE COMPLETE THE DETAILS</h3>
                <p>
                    Select all options to calculate
                    your estimated budget.
                </p>
            `;

            result.classList.add("show");

            return;
        }


        /* Price per square foot */

        let pricePerSqFt;


        if (style === "basic") {

            pricePerSqFt = 1200;

        } else if (style === "modern") {

            pricePerSqFt = 1800;

        } else {

            pricePerSqFt = 2500;

        }


        /* Calculate base cost */

        let baseCost =
            area * pricePerSqFt;


        /* Room adjustment */

        const roomCost =
            rooms * 25000;


        const totalCost =
            baseCost + roomCost;


        /* Create budget range */

        const minimum =
            Math.round(totalCost * 0.90);

        const maximum =
            Math.round(totalCost * 1.10);


        /* Format currency */

        const minFormatted =
            minimum.toLocaleString("en-IN");

        const maxFormatted =
            maximum.toLocaleString("en-IN");


        /* Display result */

        result.innerHTML = `

            <h3>
                ESTIMATED INTERIOR BUDGET
            </h3>

            <div class="amount">
                ₹${minFormatted}
                –
                ₹${maxFormatted}
            </div>

            <p>
                This is an approximate estimate.
                Final pricing depends on materials,
                furniture, finishes and project requirements.
            </p>

        `;

        result.classList.add("show");

    });

}
/* =================================
   PROJECT IMAGE LIGHTBOX
================================= */

const projectImages =
    document.querySelectorAll(".project-image img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


let currentImage = 0;


/* Open lightbox */

if (projectImages.length > 0 && lightbox) {

    projectImages.forEach((image, index) => {

        image.addEventListener("click", () => {

            currentImage = index;

            showLightboxImage();

            lightbox.classList.add("show");

        });

    });


    /* Display image */

    function showLightboxImage() {

        const image =
            projectImages[currentImage];

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;

        lightboxCaption.textContent =
            image.alt;

    }


    /* Next */

    lightboxNext.addEventListener("click", () => {

        currentImage++;

        if (currentImage >= projectImages.length) {

            currentImage = 0;

        }

        showLightboxImage();

    });


    /* Previous */

    lightboxPrev.addEventListener("click", () => {

        currentImage--;

        if (currentImage < 0) {

            currentImage =
                projectImages.length - 1;

        }

        showLightboxImage();

    });


    /* Close */

    lightboxClose.addEventListener("click", () => {

        lightbox.classList.remove("show");

    });


    /* Close by clicking background */

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            lightbox.classList.remove("show");

        }

    });


    /* Keyboard controls */

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("show")) {
            return;
        }

        if (event.key === "Escape") {

            lightbox.classList.remove("show");

        }

        if (event.key === "ArrowRight") {

            lightboxNext.click();

        }

        if (event.key === "ArrowLeft") {

            lightboxPrev.click();

        }

    });

}