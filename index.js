//Test
console.log('script loaded');

//CURSOR SECTION
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("circularcursor");

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    const speed = 0.2; // Smaller = smoother trail

    // Update mouse coordinates on move
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate the cursor toward the mouse
    function animate() {
        currentX += (mouseX - currentX) * speed;
        currentY += (mouseY - currentY) * speed;

        cursor.style.transform = `translate3d(${currentX - 10}px, ${currentY - 10}px, 0)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects for links and buttons
    const hoverTargets = document.querySelectorAll("a, button, .hover-target");

    hoverTargets.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
    });
});

// FORM VALIDATION SECTION
const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
    // Clear previous errors
    document.getElementById("usernameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("timeError").textContent = "";

    let valid = true;

    // Get the correct form fields that exist in your HTML
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const time = document.getElementById("time");

    // Validate name (you called it username in error div, but field is name)
    if (name.value.trim().length < 3) {
        document.getElementById("usernameError").textContent = "Name must be at least 3 characters.";
        valid = false;
    }

    // Validate email
    if (!email.value.includes("@") || email.value.trim() === "") {
        document.getElementById("emailError").textContent = "Enter a valid email.";
        valid = false;
    }

    // Validate meeting time
    if (time.value === "") {
        document.getElementById("timeError").textContent = "Please select a meeting time.";
        valid = false;
    }

    // Only prevent submission if validation fails
    if (!valid) {
        e.preventDefault();
    }
    // If valid is true, the form will submit normally to Formspree
});