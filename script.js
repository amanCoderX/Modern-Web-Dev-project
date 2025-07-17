
// Custom Cursor Fix for Locomotive + GSAP
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", function (e) {
  // No need to add scrollY, just use viewport values
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.8,
    ease: "power2.out"
  });
});


const videoReveal = document.querySelector("#video-reveal");
const video = videoReveal.querySelector("video");
const hoverTargets = document.querySelectorAll(".hvr"); // text with class 'hvr'

// Mouse move: position the video near cursor
document.addEventListener("mousemove", function (e) {
  gsap.to(videoReveal, {
    x: e.clientX + 20,
    y: e.clientY - 30,
    duration: 0.3,
    ease: "power2.out",
  });
});

// List of videos (match order of your .hvr elements)
const videoSources = [
  "https://cuberto.com/assets/home/hero/header.mp4",
  "https://cuberto.com/assets/projects/flipaclip/cover.mp4?2",
  "https://cuberto.com/assets/projects/ferrumpipe/cover.mp4?2"
];

// Hover effect
hoverTargets.forEach((el, index) => {
  el.addEventListener("mouseenter", () => {
    video.src = videoSources[index];
    video.play();
    videoReveal.style.opacity = 1;
  });

  el.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
    videoReveal.style.opacity = 0;
  });
});

// 🧲 Magnetic Buttons
document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", function (e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  btn.addEventListener("mouseleave", function () {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });
});


const revealImages = document.querySelectorAll(".reveal-image");
let current = 0;

function showImage(index) {
  revealImages.forEach((img, i) => {
    if (i === index) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
}

showImage(current);

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const imageZone = document.querySelector("#image-scroll-zone");
  const zoneTop = imageZone.offsetTop;
  const zoneHeight = imageZone.offsetHeight;

  if (scrollY >= zoneTop && scrollY <= zoneTop + zoneHeight) {
    const progress = (scrollY - zoneTop) / zoneHeight;
    const index = Math.floor(progress * revealImages.length);
    if (index !== current && index < revealImages.length) {
      current = index;
      showImage(current);
    }
  }
});



