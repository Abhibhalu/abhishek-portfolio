/* =========================================
   DEVOPS PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // UPDATE FOOTER YEAR
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        navItems.forEach(function (item) {
            item.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");
            }
        });
    }


    // HEADER SCROLL EFFECT
    const header = document.getElementById("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });


    // CURSOR AURA
    const cursorAura = document.querySelector(".cursor-aura");

    if (cursorAura && window.matchMedia("(pointer: fine)").matches) {

        window.addEventListener("mousemove", function (event) {

            cursorAura.style.left = event.clientX + "px";
            cursorAura.style.top = event.clientY + "px";

        });

    }


    // AMBIENT PARTICLE NETWORK
    const canvas = document.getElementById("ambient-canvas");
    const ctx = canvas ? canvas.getContext("2d") : null;

    if (!canvas || !ctx) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let particles = [];
    let animationFrame;


    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createParticles();

    }


    function createParticles() {

        particles = [];

        const particleCount = Math.min(
            Math.floor((canvas.width * canvas.height) / 18000),
            65
        );

        for (let i = 0; i < particleCount; i++) {

            particles.push({

                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,

                radius: Math.random() * 1.8 + 0.5,

                speedX: (Math.random() - 0.5) * 0.35,
                speedY: (Math.random() - 0.5) * 0.35

            });

        }

    }


    function drawParticles() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (particle) {

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "rgba(139, 92, 246, 0.7)";
            ctx.fill();


            if (!reducedMotion) {

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX *= -1;
                }

                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY *= -1;
                }

            }

        });


        // CONNECT NEARBY PARTICLES
        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.strokeStyle =
                        "rgba(56, 189, 248, " +
                        (1 - distance / 120) * 0.2 +
                        ")";

                    ctx.lineWidth = 0.7;
                    ctx.stroke();

                }

            }

        }


        if (!reducedMotion) {
            animationFrame = requestAnimationFrame(drawParticles);
        }

    }


    // INITIALIZE CANVAS
    resizeCanvas();

    drawParticles();


    // HANDLE WINDOW RESIZE
    window.addEventListener("resize", function () {

        cancelAnimationFrame(animationFrame);

        resizeCanvas();
        drawParticles();

    });

});