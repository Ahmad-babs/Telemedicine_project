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

    // Signup form handling
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (!name || !email || !password || password !== confirmPassword) {
                alert("Please check your input.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Sign-up successful! Welcome.");
                    signupForm.reset();
                } else {
                    alert(result.message || "Error signing up.");
                }
            } catch (error) {
                alert("Network error. Please try again later.");
            }
        });
    }

    // Login form handling
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("Please enter your email and password.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Login successful!");
                    localStorage.setItem("authToken", result.token); // Save token
                    window.location.href = "/dashboard.html"; // Redirect to a secure page
                } else {
                    alert(result.message || "Invalid credentials.");
                }
            } catch (error) {
                alert("Network error. Please try again later.");
            }
        });
    }

    // Appointment booking form handling
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;

            if (!name || !email || !phone || !service || !date || !time) {
                alert("Please fill in all fields.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/appointments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include token
                    },
                    body: JSON.stringify({ name, email, phone, service, date, time }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Appointment booked successfully!");
                    bookingForm.reset();
                } else {
                    alert(result.message || "Error booking appointment.");
                }
            } catch (error) {
                alert("Network error. Please try again later.");
            }
        });
    }

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
                { name: "Dr. Ibrahim Bashir", service: "Cardiology" },
                { name: "Dr. Mainasara Ali", service: "Pediatrics" },
                { name: "Dr. Sarah Lee", service: "General Medicine" }
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
