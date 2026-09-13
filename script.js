// ==========================================
// BEHEER HIER JE VIDEO'S EN UITLEG
// ==========================================
const collabVideos = [
    {
        title: "Halloween Special 2026 🎃",
        youtubeId: "dQw4w9WgXcQ", // Vervang dit door de echte YouTube Video ID (de code achter watch?v=)
        theme: "Halloween",
        description: "In deze video gaan Jense en ik griezelen in het donker. We proberen de engste spookhuizen te vinden en beleven de gekste avonturen. Lees hier alles over hoe we dit hebben opgenomen!"
    },
    {
        title: "Sinterklaas Surprise Chaos 🎁",
        youtubeId: "dQw4w9WgXcQ",
        theme: "Sinterklaas",
        description: "Pakjesavond liep volledig uit de hand! Jense had een surprise gemaakt waar je u tegen zegt. Bekijk de video om te zien wat er misging."
    },
    {
        title: "Kerst Special: De Grote Challenge 🎄",
        youtubeId: "dQw4w9WgXcQ",
        theme: "Kerst",
        description: "Kerstviering zoals je het nog nooit hebt gezien. Samen met Jense hebben we de grootste kerstboom ooit geprobeerd te versieren in recordtijd."
    }
];

// Wachtwoord instelling
const CORRECT_PASSWORD = "RoanJense2026!?";

// DOM Elementen koppelen
const authForm = document.getElementById('auth-form');
const passwordInput = document.getElementById('password-input');
const errorMsg = document.getElementById('error-msg');
const authScreen = document.getElementById('auth-screen');
const mainContent = document.getElementById('main-content');
const videoGrid = document.getElementById('video-grid');
const videoModal = document.getElementById('video-modal');
const modalIframe = document.getElementById('modal-iframe');
const closeModalBtn = document.getElementById('close-modal-btn');

// Wachtwoord formulier afhandeling
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passwordInput.value === CORRECT_PASSWORD) {
        authScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        loadVideos();
    } else {
        errorMsg.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Video grid genereren
function loadVideos() {
    videoGrid.innerHTML = "";

    collabVideos.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500/50 transition duration-300 cursor-pointer flex flex-col group";
        card.onclick = () => openModal(index);

        card.innerHTML = `
            <div class="bg-slate-800 aspect-video flex items-center justify-center relative overflow-hidden">
                <span class="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-full z-10">${video.theme}</span>
                <div class="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div class="text-slate-400 group-hover:text-amber-400 font-semibold transition duration-300">Bekijk video & uitleg</div>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition duration-200">${video.title}</h3>
                <p class="text-slate-400 text-sm line-clamp-2">${video.description}</p>
            </div>
        `;
        videoGrid.appendChild(card);
    });
}

// Modal openen
function openModal(index) {
    const video = collabVideos[index];
    document.getElementById('modal-title').innerText = video.title;
    modalIframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;
    document.getElementById('modal-desc').innerText = video.description;

    videoModal.classList.remove('hidden');
    videoModal.classList.add('flex');
}

// Modal sluiten functies
function closeModal() {
    modalIframe.src = ""; // Stopt de YouTube video direct bij sluiten
    videoModal.classList.remove('flex');
    videoModal.classList.add('hidden');
}

closeModalBtn.onclick = closeModal;

// Sluit modal ook als je buiten het venster klikt
videoModal.onclick = (e) => {
    if (e.target === videoModal) {
        closeModal();
    }
};

// Sluit modal met de Escape-toets
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
        closeModal();
    }
});