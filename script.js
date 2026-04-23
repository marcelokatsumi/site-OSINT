/**
 * OSINT Search Dashboard - Core Logic
 */

const searchPlatforms = {
    // Social Media
    'instagram': (q) => `https://www.google.com/search?q=site:instagram.com+"${encodeURIComponent(q)}"`,
    'linkedin': (q) => `https://www.google.com/search?q=site:linkedin.com/in+"${encodeURIComponent(q)}"`,
    'facebook': (q) => `https://www.google.com/search?q=site:facebook.com+"${encodeURIComponent(q)}"`,
    'tiktok': (q) => `https://www.google.com/search?q=site:tiktok.com+"${encodeURIComponent(q)}"`,
    'twitter': (q) => `https://twitter.com/search?q=${encodeURIComponent(q)}&f=user`,

    // Search Engines
    'google': (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    'bing': (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
    'duckduckgo': (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,

    // Legal & Brazil Specific
    'jusbrasil': (q) => `https://www.jusbrasil.com.br/busca?q=${encodeURIComponent(q)}`,
    'escavador': (q) => `https://www.escavador.com/busca?q=${encodeURIComponent(q)}`,
    'transparencia': (q) => `https://www.portaltransparencia.gov.br/busca?termo=${encodeURIComponent(q)}`,

    // Images & Tools
    'google_images': (q) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}`,
    'yandex': (q) => `https://yandex.com/images/search?text=${encodeURIComponent(q)}`,
    'lattes': (q) => `http://buscatextual.cnpq.br/buscatextual/busca.do?metodo=apresentar&textoBusca=${encodeURIComponent(q)}`
};

/**
 * Main search function
 * @param {string} platform - The key for the searchPlatforms object
 */
function search(platform) {
    const query = document.getElementById('target').value.trim();
    
    if (!query) {
        showFeedback("Por favor, digite um nome ou termo de busca.");
        document.getElementById('target').focus();
        return;
    }

    if (searchPlatforms[platform]) {
        const url = searchPlatforms[platform](query);
        window.open(url, '_blank');
    } else {
        console.error(`Platform ${platform} not found.`);
    }
}

/**
 * Searches multiple platforms at once
 * @param {string[]} platforms - Array of platform keys
 */
function searchCategory(platforms) {
    const query = document.getElementById('target').value.trim();
    
    if (!query) {
        showFeedback("Por favor, digite um nome ou termo de busca.");
        document.getElementById('target').focus();
        return;
    }

    platforms.forEach(p => {
        if (searchPlatforms[p]) {
            window.open(searchPlatforms[p](query), '_blank');
        }
    });
}

/**
 * Simple feedback mechanism (could be expanded to a toast)
 */
function showFeedback(message) {
    // For now, using a simple alert, but styled for the context
    const input = document.getElementById('target');
    input.style.borderColor = '#ef4444';
    input.placeholder = message;
    
    setTimeout(() => {
        input.style.borderColor = '';
        input.placeholder = "Digite o nome, usuário ou termo de busca...";
    }, 3000);
}

// Add event listener for "Enter" key on search input
document.getElementById('target').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        // Default to Google search on Enter
        search('google');
    }
});

// Animation logic for cards on load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
});
