// Simulador de Orçamento
document.getElementById('budget-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obter valores dos campos
    const renda = parseFloat(document.getElementById('renda').value);
    const moradia = parseFloat(document.getElementById('moradia').value) || 0;
    const transporte = parseFloat(document.getElementById('transporte').value) || 0;
    const alimentacao = parseFloat(document.getElementById('alimentacao').value) || 0;
    const educacao = parseFloat(document.getElementById('educacao').value) || 0;
    const saude = parseFloat(document.getElementById('saude').value) || 0;
    const lazer = parseFloat(document.getElementById('lazer').value) || 0;
    const vestuario = parseFloat(document.getElementById('vestuario').value) || 0;
    const outros = parseFloat(document.getElementById('outros').value) || 0;
    
    // Validar renda
    if (!renda || renda <= 0) {
        alert('Por favor, insira uma renda válida.');
        return;
    }
    
    // Calcular total de despesas
    const totalDespesas = moradia + transporte + alimentacao + educacao + saude + lazer + vestuario + outros;
    
    // Calcular saldo
    const saldo = renda - totalDespesas;
    
    // Calcular porcentagens
    const porcentagemMoradia = (moradia / renda) * 100;
    const porcentagemTransporte = (transporte / renda) * 100;
    const porcentagemAlimentacao = (alimentacao / renda) * 100;
    const porcentagemTotal = (totalDespesas / renda) * 100;
    
    // Exibir resultado
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'block';
    
    let html = `<h3><i class="fas fa-chart-bar"></i> Resultado do Orçamento</h3>`;
    html += `<p><strong>Renda Mensal:</strong> R$ ${renda.toFixed(2)}</p>`;
    html += `<p><strong>Total de Despesas:</strong> R$ ${totalDespesas.toFixed(2)} (${porcentagemTotal.toFixed(1)}% da renda)</p>`;
    html += `<p><strong>Saldo:</strong> R$ ${saldo.toFixed(2)}</p>`;
    
    // Análise das despesas
    html += `<h4><i class="fas fa-search-dollar"></i> Análise das Despesas:</h4>`;
    html += `<ul>`;
    html += `<li>Moradia: ${porcentagemMoradia.toFixed(1)}% da renda (recomendado: até 30%)</li>`;
    html += `<li>Transporte: ${porcentagemTransporte.toFixed(1)}% da renda (recomendado: até 15%)</li>`;
    html += `<li>Alimentação: ${porcentagemAlimentacao.toFixed(1)}% da renda (recomendado: até 20%)</li>`;
    html += `</ul>`;
    
    // Recomendações
    html += `<h4><i class="fas fa-lightbulb"></i> Recomendações:</h4>`;
    
    if (saldo > 0) {
        resultado.className = 'result positive';
        html += `<p>Parabéns! Você está com saldo positivo. Considere:</p>`;
        html += `<ul>`;
        html += `<li>Destinar parte desse valor para poupança ou investimentos</li>`;
        html += `<li>Criar uma reserva de emergência (equivalente a 3-6 meses de despesas)</li>`;
        html += `<li>Investir em educação ou qualificação profissional</li>`;
        html += `</ul>`;
    } else {
        resultado.className = 'result negative';
        html += `<p>Atenção! Você está com saldo negativo. Considere:</p>`;
        html += `<ul>`;
        html += `<li>Revisar suas despesas e identificar onde pode economizar</li>`;
        html += `<li>Reduzir gastos com lazer e vestuário temporariamente</li>`;
        html += `<li>Buscar fontes alternativas de renda</li>`;
        html += `</ul>`;
    }
    
    resultado.innerHTML = html;
    
    // Rolar para o resultado
    resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animar as barras do menu hamburguer
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Fechar menu ao clicar em um link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Criar partículas
    createParticles();
    
    // Otimização para mobile: prevenir zoom desnecessário em inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            window.scrollTo(0, 0);
            document.body.style.zoom = "1.0";
        });
    });
});

// Criar efeito de partículas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório baseado no tamanho da tela
        const size = window.innerWidth < 480 ? 
            Math.random() * 5 + 3 : 
            Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição aleatória
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Atraso aleatório na animação
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Duração da animação baseada no tamanho da tela
        const duration = window.innerWidth < 768 ? 10 : 15;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Otimização de performance: throttle para eventos de redimensionamento
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recriar partículas em tamanhos de tela diferentes
        const particlesContainer = document.getElementById('particles');
        particlesContainer.innerHTML = '';
        createParticles();
    }, 250);
});

// Melhorar acessibilidade do menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});

// Feedback tátil para mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Adicionar classes de toque para estilos específicos
    document.body.classList.add('touch-device');
}

// Prevenir comportamento padrão de pull-to-refresh em mobile
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Otimização de carregamento para conexões lentas
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.saveData || connection.effectiveType === 'slow-2g') {
        // Reduzir número de partículas em conexões lentas
        const particles = document.querySelectorAll('.particle');
        if (particles.length > 10) {
            for (let i = 10; i < particles.length; i++) {
                particles[i].remove();
            }
        }
    }
}