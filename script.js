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
    
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(b => {
        if(b.getAttribute('onclick').includes(idTela)) b.classList.add('active');
    });

    if(idTela === 'dicionario') renderizarDicionario(dicionarioDB);
}

function pararSom() {
    window.speechSynthesis.cancel();
    playerMusica.pause();
    playerMusica.currentTime = 0;
}

// VOZ (IA)
window.speechSynthesis.onvoiceschanged = () => { vozes = window.speechSynthesis.getVoices(); };
function falar(texto) {
    pararSom();
    const utterance = new SpeechSynthesisUtterance(texto);
    const v = vozes.find(v => v.lang.includes('it-IT')) || vozes.find(v => v.lang.includes('es-ES'));
    if (v) utterance.voice = v;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}

// MÚSICA (MP3)
function tocarMusica(arquivo) {
    pararSom();
    playerMusica.src = "mp3/" + arquivo;
    playerMusica.play().catch(() => alert("Arquivo mp3/" + arquivo + " não encontrado."));
}

// DICIONARIO
const dicionarioDB = [
    { latin: "Deus", pt: "Deus" },
    { latin: "Dominus", pt: "Senhor" },
    { latin: "Caelum", pt: "Céu" },
    { latin: "Crux", pt: "Cruz" },
    { latin: "Vade Retro", pt: "Afasta-te" },
    { latin: "Amen", pt: "Amém" }
];

function renderizarDicionario(lista) {
    const container = document.getElementById('lista-palavras');
    container.innerHTML = lista.map(i => `
        <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid #333;">
            <div><strong style="color:var(--gold)">${i.latin}</strong> ➔ ${i.pt}</div>
            <button class="btn-sm-vocab" style="flex:none" onclick="falar('${i.latin}')">🔊</button>
        </div>
    `).join('');
}

function pesquisar() {
    const t = document.getElementById('searchInput').value.toLowerCase();
    renderizarDicionario(dicionarioDB.filter(i => i.latin.toLowerCase().includes(t) || i.pt.toLowerCase().includes(t)));
}
