//Test
console.log('script loaded');

//PIANO SECTION
const form = document.getElementById("signupForm");
const popup = document.getElementById("popup");

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

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    document.getElementById("usernameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    let valid = true;

    // Simple validation
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (username.value.length < 4) {
    document.getElementById("usernameError").textContent = "Username must be at least 4 characters.";
    valid = false;
    }

    if (!email.value.includes("@")) {
    document.getElementById("emailError").textContent = "Enter a valid email.";
    valid = false;
    }

    if (password.value.length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
    valid = false;
    }

    if (valid) {
    popup.style.display = "flex";
    form.reset();
    }
});

function closePopup() {
    popup.style.display = "none";
}