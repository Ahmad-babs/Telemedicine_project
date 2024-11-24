document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    AOS.init();

    // Smooth scroll for "Read More" button
    const readMoreBtn = document.querySelector(".btn a");
    if (readMoreBtn) {
        readMoreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector("#servicesSection").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    // Highlight active link in navigation menu
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav .links a");
    navLinks.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add("active");
        }
    });

    // Access the booking form
    const bookingForm = document.getElementById("bookingForm");

    // Add event listener to handle form submission
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form field values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        // Basic form validation
        if (!name || !email || !phone || !service || !date || !time) {
            alert("Please fill in all fields.");
            return;
        }

        // Create an object with the appointment data
        const appointmentData = {
            name,
            email,
            phone,
            service,
            date,
            time,
        };

        // Optionally, you can submit this data to a server via AJAX or store in a database
        console.log("Appointment Data: ", appointmentData);

        // Display success message
        alert("Your appointment has been successfully booked!");
        
        // Optionally, reset the form
        bookingForm.reset();
    });
});
