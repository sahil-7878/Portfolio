// ABOUT POPUP OPEN

function openAbout() {
    document.getElementById("aboutPopup").style.display = "flex";
}

// ABOUT POPUP CLOSE

function closeAbout() {
    document.getElementById("aboutPopup").style.display = "none";
}

// CLOSE POPUP WHEN CLICK OUTSIDE

window.onclick = function (event) {

    const popup = document.getElementById("aboutPopup");

    if (event.target === popup) {
        popup.style.display = "none";
    }
};
// navLinks
const sections = document.querySelectorAll("#home, #about, #skills, #projects, #contact");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "home";

    sections.forEach(section => {

        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
// SMOOTH FADE ANIMATION

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

cards.forEach(card => {
    observer.observe(card);
});

// TYPEWRITER EFFECT

const roles = [
  "Full-Stack Developer",
  "MERN Stack Developer",
];

let roleIndex = 0;
let charIndex = 0;

const heading = document.querySelector(".hero-content h2");

function typeEffect() {

    if (!heading) return;

    if (charIndex < roles[roleIndex].length) {

        heading.textContent += roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 100);

    } else {

        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {

    if (charIndex > 0) {

        heading.textContent =
            roles[roleIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(eraseEffect, 50);

    } else {

        roleIndex++;

        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

        setTimeout(typeEffect, 300);
    }
}

heading.textContent = "";
typeEffect();
function openImage(){
    document.getElementById("imagePopup").style.display = "flex";
}

function closeImage(){
    document.getElementById("imagePopup").style.display = "none";
}
function openAchievement() {
    document.getElementById("achievementPopup").style.display = "flex";
}

function closeAchievement() {
    document.getElementById("achievementPopup").style.display = "none";
}

const hiddenObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((el)=>{
    hiddenObserver.observe(el);
});
const skillBars = document.querySelectorAll(".fill");

const skillObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const bar = entry.target;
            bar.style.width = bar.dataset.width;
        }

    });

},{threshold:0.5});

skillBars.forEach(bar=>{
    skillObserver.observe(bar);
});
const percentages = document.querySelectorAll(".percent");

const percentObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            let percent = entry.target;
            let target = +percent.dataset.target;
            let count = 0;

            const updateCount = () => {

                if(count < target){
                    count++;
                    percent.innerText = count + "%";
                    setTimeout(updateCount, 20);
                }
            };

            updateCount();
            percentObserver.unobserve(percent);
        }

    });

},{threshold:0.5});

percentages.forEach(percent=>{
    percentObserver.observe(percent);
});
