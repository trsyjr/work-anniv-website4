function revealCelebrants() {
  const landing = document.getElementById('landing');
  const celebrants = document.getElementById('celebrants');
  const appreciationCla = document.getElementById('appreciation-cla');
  const floating = document.getElementById('floating-images');
  const backBtn = document.getElementById('backBtn');

  landing.classList.add('hidden');
  celebrants.classList.remove('hidden');
  appreciationCla.classList.remove('hidden');
  floating.classList.remove('hidden');

  // ✅ Show the back button when celebrating
  backBtn.classList.remove('hidden');

  const music = document.getElementById('bg-music');
  music.play();

  launchConfetti();
  showFloatingImagesTurn();
  spawnBalloons(15);
}

/* ================= BACK BUTTON ================= */
function goBack() {
  const landing = document.getElementById('landing');
  const celebrants = document.getElementById('celebrants');
  const appreciationCla = document.getElementById('appreciation-cla');
  const floating = document.getElementById('floating-images');
  const backBtn = document.getElementById('backBtn');

  landing.classList.remove('hidden');
  celebrants.classList.add('hidden');
  appreciationCla.classList.add('hidden');
  floating.classList.add('hidden');

  // Hide back button when returning
  backBtn.classList.add('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ================= CONFETTI ================= */
function launchConfetti() {
  const colors = ['#A855F7', '#EF4444', '#F97316'];
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * 100 + 'vh';
    const size = Math.random() * 8 + 4;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

/* ================= BALLOONS ================= */
function spawnBalloons(quantity = 5) {
  const container = document.getElementById("floating-images");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const images = ["Assets/2Blue.png","Assets/Blue1.png","Assets/Blue2.png"];

  for (let i = 0; i < quantity; i++) {
    const balloon = document.createElement("img");
    balloon.src = images[Math.floor(Math.random() * images.length)];
    balloon.className = "floating-balloon opacity-0 absolute";

    const size = Math.random() * (120 - 60) + 60;
    balloon.style.width = size + "px";
    balloon.style.left = Math.random() * (containerWidth - size) + "px";
    balloon.style.top = Math.random() * (containerHeight - size) + "px";
    balloon.style.animation = `floatUpBalloon ${Math.random() * 3 + 5}s linear forwards`;

    container.appendChild(balloon);

    setTimeout(() => {
      balloon.classList.remove("opacity-0");
      balloon.classList.add("opacity-100");
    }, 50);

    balloon.addEventListener("animationend", () => {
      balloon.remove();
      setTimeout(() => spawnBalloons(1), Math.random() * 2000 + 500);
    });
  }
}

/* ================= CLA IMAGES ================= */
const claImages = [
  "Assets/Aljohn1.jpeg","Assets/Aljohn2.jpeg","Assets/Aljohn3.jpeg","Assets/Aljohn4.jpeg",
  "Assets/Aljohn5.jpeg","Assets/Aljohn6.jpeg"
];

/* ================= SHUFFLE ================= */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ================= FLOATING CLA IMAGES ================= */
function showFloatingImagesTurn() {
  const container = document.getElementById("floating-images");
  const containerWidth = container.offsetWidth;

  const images = shuffleArray(claImages);
  let index = 0;

  function spawnNextImage() {
    if (index >= images.length) {
      setTimeout(showFloatingImagesTurn, 1500);
      return;
    }

    const img = document.createElement("img");
    img.src = images[index];
    img.className = "floating-balloon opacity-0 absolute";

    const width = Math.random() * (480 - 320) + 320;
    img.style.width = width + "px";
    img.style.left = Math.random() * (containerWidth - width) + "px";
    img.style.animation = `floatUpBalloon ${Math.random() * 2 + 6}s linear forwards`;

    container.appendChild(img);

    setTimeout(() => {
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100");
    }, 50);

    img.addEventListener("animationend", () => img.remove());

    index++;
    setTimeout(spawnNextImage, Math.random() * 200 + 800);
  }

  spawnNextImage();
}
