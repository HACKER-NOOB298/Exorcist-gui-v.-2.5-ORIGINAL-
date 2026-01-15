let playerMusica = new Audio();
let vozes = [];

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('closed');
}

function navegar(idTela) {
    pararSom();
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(idTela).classList.add('active');
}

function pararSom() {
    window.speechSynthesis.cancel();
    playerMusica.pause();
    playerMusica.currentTime = 0;
}

window.speechSynthesis.onvoiceschanged = () => { vozes = window.speechSynthesis.getVoices(); };

function falar(texto) {
    pararSom();
    const utterance = new SpeechSynthesisUtterance(texto);
    const vLatina = vozes.find(v => v.lang.includes('it-IT')) || vozes.find(v => v.lang.includes('es-ES'));
    if (vLatina) utterance.voice = vLatina;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}

function tocarMusica(arquivo) {
    pararSom();
    playerMusica.src = "mp3/" + arquivo;
    playerMusica.play().catch(() => console.log("Arquivo de áudio não encontrado"));
}
