// Validation and Interactivity Script

// Booking Form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Basic Validation
        if (!name || !email || !phone || !service || !date || !time) {
            alert('Please fill in all the fields!');
            return;
        }

        alert(`Appointment Booked!\nName: ${name}\nService: ${service}\nDate: ${date} ${time}`);
    });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic Validation
        if (!email || !password) {
            alert('Please fill in both fields!');
            return;
        }

        alert(`Welcome back!\nEmail: ${email}`);
    });
}

// Signup Form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields!');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        alert(`Account Created!\nWelcome, ${name}!`);
    });

    // Password Strength Indicator
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const indicator = document.createElement('p');
    indicator.style.color = 'red';
    passwordInput.insertAdjacentElement('afterend', indicator);

    passwordInput.addEventListener('input', () => {
        const strength = passwordInput.value.length;
        if (strength < 6) {
            indicator.textContent = 'Password is too weak!';
        } else {
            indicator.textContent = 'Password strength is good.';
            indicator.style.color = 'green';
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        if (passwordInput.value !== confirmPasswordInput.value) {
            indicator.textContent = 'Passwords do not match!';
            indicator.style.color = 'red';
        } else if (passwordInput.value.length >= 6) {
            indicator.textContent = 'Passwords match!';
            indicator.style.color = 'green';
        }
    });
}
