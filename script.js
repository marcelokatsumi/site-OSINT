/**
 * OSINT Direct - Busca Aprofundada por Nome Real
 */

const platforms = {
    'google': (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    
    // Instagram: Busca por Keyword - A melhor para achar o "Nome de Exibição" e "Bio"
    'instagram': (q) => `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(q)}`,
    
    // Facebook: Busca direta de pessoas (mais estável)
    'facebook': (q) => `https://www.facebook.com/search/people/?q=${encodeURIComponent(q)}`,
    
    // TikTok: Busca de usuários por nome real
    'tiktok': (q) => `https://www.tiktok.com/search/user?q=${encodeURIComponent(q)}`,

    'linkedin': (q) => `https://www.google.com/search?q=site:linkedin.com/in+"${encodeURIComponent(q)}"`,
    'jusbrasil': (q) => `https://www.jusbrasil.com.br/busca?q=${encodeURIComponent(q)}`,
    'escavador': (q) => `https://www.escavador.com/busca?q=${encodeURIComponent(q)}`,
    'google_images': (q) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}`
};

function handleSearch() {
    const query = document.getElementById('target').value.trim();
    if (!query) {
        alert("Digite um nome completo para uma busca precisa!");
        return;
    }
    const resultsArea = document.getElementById('results-area');
    resultsArea.classList.add('visible');
    resultsArea.scrollIntoView({ behavior: 'smooth' });
}

function openDirect(key) {
    const query = document.getElementById('target').value.trim();
    if (!query) return;
    if (platforms[key]) {
        window.open(platforms[key](query), '_blank');
    }
}

function openAllMain() {
    const query = document.getElementById('target').value.trim();
    if (!query) return;
    window.open(platforms['google'](query), '_blank');
    window.open(platforms['instagram'](query), '_blank');
    window.open(platforms['facebook'](query), '_blank');
}

document.getElementById('target').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
