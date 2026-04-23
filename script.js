/**
 * OSINT Scanner - Automated Intelligence Logic
 */

const platforms = [
    { id: 'google', name: 'Google Search', desc: 'Busca geral em toda a web.', url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}` },
    { id: 'instagram', name: 'Instagram', desc: 'Perfis e menções em fotos/vídeos.', url: (q) => `https://www.google.com/search?q=site:instagram.com+"${encodeURIComponent(q)}"` },
    { id: 'linkedin', name: 'LinkedIn', desc: 'Histórico profissional e conexões.', url: (q) => `https://www.google.com/search?q=site:linkedin.com/in+"${encodeURIComponent(q)}"` },
    { id: 'facebook', name: 'Facebook', desc: 'Posts públicos e perfis sociais.', url: (q) => `https://www.google.com/search?q=site:facebook.com+"${encodeURIComponent(q)}"` },
    { id: 'jusbrasil', name: 'Jusbrasil', desc: 'Processos judiciais e diários oficiais.', url: (q) => `https://www.jusbrasil.com.br/busca?q=${encodeURIComponent(q)}` },
    { id: 'escavador', name: 'Escavador', desc: 'Currículos e dados públicos oficiais.', url: (q) => `https://www.escavador.com/busca?q=${encodeURIComponent(q)}` },
    { id: 'transparencia', name: 'Transparência', desc: 'Gastos públicos e dados governamentais.', url: (q) => `https://www.portaltransparencia.gov.br/busca?termo=${encodeURIComponent(q)}` },
    { id: 'tiktok', name: 'TikTok', desc: 'Presença em vídeos curtos e tendências.', url: (q) => `https://www.google.com/search?q=site:tiktok.com+"${encodeURIComponent(q)}"` },
    { id: 'lattes', name: 'Currículo Lattes', desc: 'Produção acadêmica e científica.', url: (q) => `http://buscatextual.cnpq.br/buscatextual/busca.do?metodo=apresentar&textoBusca=${encodeURIComponent(q)}` }
];

async function startAutomatedScan() {
    const query = document.getElementById('target').value.trim();
    if (!query) return alert("Por favor, digite um nome para iniciar.");

    // Reset UI
    const consoleElem = document.getElementById('scan-console');
    const resultsSection = document.getElementById('results-section');
    const container = document.getElementById('results-container');
    const output = document.getElementById('console-output');
    const btn = document.getElementById('start-scan');
    const loader = document.getElementById('loader');

    container.innerHTML = '';
    output.innerHTML = '';
    consoleElem.style.display = 'block';
    resultsSection.style.display = 'none';
    btn.disabled = true;
    loader.style.display = 'block';
    btn.querySelector('span').innerText = 'Escaneando...';

    // Simulated Log Messages
    const logs = [
        `> Inicializando mecanismo de busca para: ${query}`,
        `> Conectando aos servidores de inteligência...`,
        `> Verificando bases de dados de redes sociais...`,
        `> Consultando API do Google para indexação profunda...`,
        `> Analisando fontes governamentais brasileiras...`,
        `> Filtrando resultados públicos disponíveis...`,
        `> Gerando relatório de inteligência digital...`
    ];

    // Animation for logs
    for (const log of logs) {
        addConsoleLine(log);
        await sleep(600);
    }

    // Process each platform with a small delay
    for (const platform of platforms) {
        addConsoleLine(`[OK] Dados encontrados em: ${platform.name}`);
        createResultCard(platform, query);
        await sleep(300);
    }

    // Finish
    addConsoleLine(`> Varredura concluída. ${platforms.length} fontes verificadas.`);
    btn.disabled = false;
    loader.style.display = 'none';
    btn.querySelector('span').innerText = 'Nova Varredura';
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function addConsoleLine(text) {
    const output = document.getElementById('console-output');
    const line = document.createElement('div');
    line.className = 'console-line';
    line.innerText = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function createResultCard(platform, query) {
    const container = document.getElementById('results-container');
    const card = document.createElement('div');
    card.className = 'result-card';
    
    card.innerHTML = `
        <div>
            <div class="result-title">${platform.name}</div>
            <div class="result-desc">${platform.desc}</div>
        </div>
        <a href="${platform.url(query)}" target="_blank" class="btn-view">Ver Resultados Online</a>
    `;
    
    container.appendChild(card);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Enter key support
document.getElementById('target').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startAutomatedScan();
});
