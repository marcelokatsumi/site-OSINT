/**
 * OSINT Scanner - Busca Direta e Instantânea
 */

const platforms = {
    'google': (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    'instagram': (q) => `https://www.google.com/search?q=site:instagram.com+"${encodeURIComponent(q)}"`,
    'linkedin': (q) => `https://www.google.com/search?q=site:linkedin.com/in+"${encodeURIComponent(q)}"`,
    'facebook': (q) => `https://www.google.com/search?q=site:facebook.com+"${encodeURIComponent(q)}"`,
    'tiktok': (q) => `https://www.google.com/search?q=site:tiktok.com+"${encodeURIComponent(q)}"`,
    'jusbrasil': (q) => `https://www.jusbrasil.com.br/busca?q=${encodeURIComponent(q)}`,
    'escavador': (q) => `https://www.escavador.com/busca?q=${encodeURIComponent(q)}`,
    'google_images': (q) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}`
};

/**
 * Abre um site específico direto com o nome da pessoa
 */
function openDirect(key) {
    const query = document.getElementById('target').value.trim();
    if (!query) {
        alert("Digite um nome primeiro!");
        return;
    }
    
    if (platforms[key]) {
        window.open(platforms[key](query), '_blank');
    }
}

/**
 * ABRE TUDO AO MESMO TEMPO (Google, Instagram e Jusbrasil)
 */
function openAllMain() {
    const query = document.getElementById('target').value.trim();
    if (!query) return alert("Digite um nome primeiro!");

    // O navegador pode bloquear popups se abrir muitos de uma vez.
    // Vamos abrir os 3 principais.
    window.open(platforms['google'](query), '_blank');
    window.open(platforms['instagram'](query), '_blank');
    window.open(platforms['jusbrasil'](query), '_blank');
}

// Suporte ao Enter para abrir o Google direto
document.getElementById('target').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') openDirect('google');
});
