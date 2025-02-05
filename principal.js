// Inicialização do AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Navegação
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll suave para as seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Navbar transparente no topo
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'white';
    }
});

// Modal
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');

if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Detalhes dos Serviços
const servicosDetalhados = {
    paisagismo: {
        title: 'Paisagismo Profissional',
        content: `
            <h3>Nosso Processo de Paisagismo</h3>
            <ul>
                <li>Análise do terreno e necessidades do cliente</li>
                <li>Desenvolvimento do projeto personalizado</li>
                <li>Seleção das melhores espécies</li>
                <li>Execução profissional</li>
                <li>Acompanhamento pós-implantação</li>
            </ul>
            <p>Transformamos seu espaço em um ambiente único e harmonioso.</p>
        `
    },
    jardinagem: {
        title: 'Serviços de Jardinagem',
        content: `
            <h3>Manutenção Completa</h3>
            <ul>
                <li>Poda e modelagem de plantas</li>
                <li>Controle de pragas</li>
                <li>Adubação especializada</li>
                <li>Limpeza e organização</li>
                <li>Replantio quando necessário</li>
            </ul>
            <p>Cuidamos do seu jardim com todo carinho e atenção que ele merece.</p>
        `
    },
    irrigacao: {
        title: 'Sistemas de Irrigação',
        content: `
            <h3>Irrigação Inteligente</h3>
            <ul>
                <li>Projeto personalizado</li>
                <li>Automação completa</li>
                <li>Economia de água</li>
                <li>Manutenção preventiva</li>
                <li>Monitoramento remoto</li>
            </ul>
            <p>Tecnologia e sustentabilidade para o seu jardim.</p>
        `
    },
    hortas: {
        title: 'Hortas Orgânicas',
        content: `
            <h3>Cultivo Orgânico</h3>
            <ul>
                <li>Planejamento do espaço</li>
                <li>Preparação do solo</li>
                <li>Seleção de espécies</li>
                <li>Sistema de compostagem</li>
                <li>Orientação para manutenção</li>
            </ul>
            <p>Alimentos saudáveis e sustentáveis no seu espaço.</p>
        `
    }
};

function showServiceDetails(service) {
    const modalContent = document.getElementById('modal-content');
    const serviceDetails = servicosDetalhados[service];
    
    modalContent.innerHTML = `
        <h2>${serviceDetails.title}</h2>
        <div class="service-details">
            ${serviceDetails.content}
        </div>
    `;
    
    modal.style.display = 'flex';
}
