document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. HEADER / MOBILE MENU
    ===================================================== */

    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");


    // Header changes when page is scrolled
    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });

    }


    // Mobile hamburger button
    if (toggle && nav) {

        toggle.addEventListener("click", (event) => {

            // Prevent the click from immediately triggering
            // the "click outside menu" function
            event.stopPropagation();

            // Open / close navigation
            nav.classList.toggle("open");

            // Animate hamburger into X
            toggle.classList.toggle("active");

        });


        // Close menu after clicking a navigation link
        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");
                toggle.classList.remove("active");

            });

        });


        // Close menu when clicking anywhere outside it
        document.addEventListener("click", (event) => {

            if (
                nav.classList.contains("open") &&
                !nav.contains(event.target) &&
                !toggle.contains(event.target)
            ) {

                nav.classList.remove("open");
                toggle.classList.remove("active");

            }

        });

    }



    /* =====================================================
       2. GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach((item) => {

        item.addEventListener("click", () => {

            const lightbox = document.getElementById("lightbox");

            if (!lightbox) return;

            const lightboxImage = lightbox.querySelector("img");

            if (!lightboxImage) return;

            // Get image from data-full
            lightboxImage.src = item.dataset.full;

            // Show lightbox
            lightbox.classList.add("open");

        });

    });



    // Close gallery lightbox
    const lightbox = document.getElementById("lightbox");

    if (lightbox) {

        lightbox.addEventListener("click", (event) => {

            // Close if background is clicked
            if (event.target === lightbox) {

                lightbox.classList.remove("open");

            }

            // Close if X button is clicked
            if (event.target.classList.contains("lightbox-close")) {

                lightbox.classList.remove("open");

            }

        });


        // Close lightbox using ESC key
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                lightbox.classList.remove("open");

            }

        });

    }



    /* =====================================================
       3. CONTACT & BOOKING FORMS
    ===================================================== */

    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {

        form.addEventListener("submit", (event) => {

            // Prevent page refresh
            event.preventDefault();

            const message = form.querySelector(".form-message");

            if (!message) return;


            // Booking form
            if (form.id === "bookingForm") {

                message.textContent =
                    "Thank you! Your reservation request has been received. Our team will contact you to confirm availability.";

            }

            // Contact form
            else {

                message.textContent =
                    "Thank you! Your message has been received. Our team will get back to you shortly.";

            }


            // Clear form after submission
            form.reset();

        });

    });



    /* =====================================================
       4. PREVENT BOOKING PAST DATES
    ===================================================== */

    const dateInputs = document.querySelectorAll(
        'input[type="date"]'
    );

    dateInputs.forEach((input) => {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");


        const formattedDate =
            `${year}-${month}-${day}`;


        input.min = formattedDate;

    });



    /* =====================================================
       5. SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".room-card, " +
        ".large-room, " +
        ".amenities-large article, " +
        ".gallery-item, " +
        ".stats div"
    );


    // Check if browser supports IntersectionObserver
    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("reveal");

                        observer.unobserve(entry.target);

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

    } else {

        // If browser doesn't support the animation,
        // simply show all elements
        revealElements.forEach((element) => {

            element.classList.add("reveal");

        });

    }



    /* =====================================================
       6. BOOKING CHECK-IN / CHECK-OUT VALIDATION
    ===================================================== */

    const checkIn = document.querySelector(
        'input[name="checkin"]'
    );

    const checkOut = document.querySelector(
        'input[name="checkout"]'
    );


    if (checkIn && checkOut) {

        // Check-out cannot be before check-in
        checkIn.addEventListener("change", () => {

            if (checkIn.value) {

                checkOut.min = checkIn.value;

            }

        });


        checkOut.addEventListener("change", () => {

            if (
                checkIn.value &&
                checkOut.value &&
                checkOut.value <= checkIn.value
            ) {

                alert(
                    "Check-out date must be after the check-in date."
                );

                checkOut.value = "";

            }

        });

    }


});