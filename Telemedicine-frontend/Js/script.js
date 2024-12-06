document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS for animations if available
    if (typeof AOS !== "undefined") {
        AOS.init();
    }

    // Smooth scroll for navigation links and "Read More" button
    const handleSmoothScroll = () => {
        const navLinks = document.querySelectorAll(".links a, .btn a");
        navLinks.forEach(link => {
            link.addEventListener("click", e => {
                const target = document.querySelector(e.target.getAttribute("href"));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    };
    handleSmoothScroll();

    // Highlight active navigation link
    const highlightActiveNavLink = () => {
        const currentPage = window.location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll(".nav .links a");
        navLinks.forEach(link => {
            if (link.href.includes(currentPage)) {
                link.classList.add("active");
            }
        });
    };
    highlightActiveNavLink();

    // Generic form handling function
    const handleFormSubmission = (form, validationCallback, successMessage) => {
        form.addEventListener("submit", event => {
            event.preventDefault();
            if (validationCallback()) {
                alert(successMessage);
                form.reset();
            }
        });
    };

    // Handle multiple forms
    const forms = [
        {
            id: "signupForm",
            validation: () => {
                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;
                const confirmPassword = document.getElementById("confirmPassword").value;

                if (!name || !email || !password || !confirmPassword) {
                    alert("Please fill in all fields.");
                    return false;
                }
                if (password !== confirmPassword) {
                    alert("Passwords do not match.");
                    return false;
                }
                return true;
            },
            message: "Sign-up successful! Welcome to H.Healthcare."
        },
        {
            id: "loginForm",
            validation: () => {
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;

                if (!email || !password) {
                    alert("Please enter your email and password.");
                    return false;
                }
                return true;
            },
            message: "Login successful! Welcome back to H.Healthcare."
        },
        {
            id: "bookingForm",
            validation: () => {
                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                const phone = document.getElementById("phone").value.trim();
                const service = document.getElementById("service").value;
                const date = document.getElementById("date").value;
                const time = document.getElementById("time").value;

                if (!name || !email || !phone || !service || !date || !time) {
                    alert("Please fill in all fields.");
                    return false;
                }
                console.log({ name, email, phone, service, date, time });
                return true;
            },
            message: "Your appointment has been successfully booked!"
        },
        {
            id: "contactForm",
            validation: () => {
                const name = document.getElementById("name").value.trim();
                const email = document.getElementById("email").value.trim();
                const subject = document.getElementById("subject").value.trim();
                const message = document.getElementById("message").value.trim();

                if (!name || !email || !subject || !message) {
                    alert("Please fill in all fields.");
                    return false;
                }
                return true;
            },
            message: "Thank you for reaching out! We will respond to your message soon."
        }
    ];

    forms.forEach(({ id, validation, message }) => {
        const form = document.getElementById(id);
        if (form) {
            handleFormSubmission(form, validation, message);
        }
    });

    // Services: Highlight cards on hover
    const handleServiceCardHover = () => {
        const serviceCards = document.querySelectorAll(".service-card");
        serviceCards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "scale(1.05)";
                card.style.transition = "transform 0.3s ease";
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "scale(1)";
            });
        });
    };
    handleServiceCardHover();

    // Doctors: Expand doctor details on click
    const handleDoctorCardClick = () => {
        const doctorCards = document.querySelectorAll(".doctor-card");
        doctorCards.forEach(card => {
            card.addEventListener("click", () => {
                const details = card.querySelector("p:last-of-type");
                if (details) {
                    details.style.display = details.style.display === "none" ? "block" : "none";
                }
            });
        });
    };
    handleDoctorCardClick();

    // About Page: Toggle Core Values visibility
    const handleCoreValuesToggle = () => {
        const valuesList = document.querySelector(".values ul");
        if (valuesList) {
            const toggleValuesBtn = document.createElement("button");
            toggleValuesBtn.textContent = "Toggle Core Values";
            toggleValuesBtn.style.cssText =
                "display: block; margin: 20px auto; padding: 10px 20px; background: #0076ff; color: #fff; border: none; cursor: pointer;";

            valuesList.parentElement.insertBefore(toggleValuesBtn, valuesList);
            toggleValuesBtn.addEventListener("click", () => {
                valuesList.style.display = valuesList.style.display === "none" ? "block" : "none";
            });
        }
    };
    handleCoreValuesToggle();

    // Search form logic
    const searchForm = document.getElementById("searchForm");
    const searchResults = document.getElementById("searchResults");
    if (searchForm && searchResults) {
        searchForm.addEventListener("submit", event => {
            event.preventDefault();
            const searchInput = document.getElementById("searchInput").value.trim();

            if (!searchInput) {
                alert("Please enter a search term.");
                return;
            }

            // Simulated search results
            const results = [
                { name: "Dr. John Doe", service: "Consultation" },
                { name: "Dr. Jane Smith", service: "Therapy" }
            ];
            const filteredResults = results.filter(item =>
                item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.service.toLowerCase().includes(searchInput.toLowerCase())
            );

            searchResults.innerHTML = ""; // Clear previous results
            if (filteredResults.length > 0) {
                filteredResults.forEach(item => {
                    const resultItem = document.createElement("p");
                    resultItem.textContent = `${item.name} - ${item.service}`;
                    searchResults.appendChild(resultItem);
                });
            } else {
                const noResultsMessage = document.createElement("p");
                noResultsMessage.textContent = "No results found.";
                searchResults.appendChild(noResultsMessage);
            }
        });
    }
});
