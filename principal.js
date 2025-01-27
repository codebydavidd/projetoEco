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

// Projetos
const projects = [
    {
        id: 1,
        title: 'Jardim Residencial Moderno',
        description: 'Projeto completo de paisagismo para residência contemporânea.',
        image: 'https://images.unsplash.com/photo-1558293842-c0fd3db86157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        category: 'residencial'
    },
    {
        id: 2,
        title: 'Praça Sustentável',
        description: 'Revitalização de praça pública com conceitos sustentáveis.',
        image: 'https://images.unsplash.com/photo-1596328546171-77e37b5e8b3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        category: 'publico'
    },
    {
        id: 3,
        title: 'Jardim Corporativo',
        description: 'Área verde para prédio comercial com espaço de convivência.',
        image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        category: 'comercial'
    }
];

// Renderizar projetos
function renderProjects(filter = 'todos') {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'todos' 
        ? projects 
        : projects.filter(project => project.category === filter);

    filteredProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="btn primary" onclick="showProjectDetails(${project.id})">Ver Detalhes</button>
            </div>
        `;
        projectsGrid.appendChild(projectElement);
    });
}

// Filtrar projetos
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// Inicializar projetos
renderProjects();

// Calculadora de Orçamento
function calcularOrcamento() {
    const area = parseFloat(document.getElementById('area').value);
    const tipo = document.getElementById('tipo').value;
    const elementos = Array.from(document.querySelectorAll('.checkbox-group input:checked'))
        .map(checkbox => checkbox.value);

    if (!area) {
        alert('Por favor, insira a área do projeto.');
        return;
    }

    // Valores base por m²
    const valoresPorTipo = {
        jardim: 150,
        horta: 100,
        manutencao: 50
    };

    // Valores adicionais por elemento
    const valoresElementos = {
        gramado: 30,
        arvores: 200,
        flores: 100,
        irrigacao: 80
    };

    // Cálculo base
    let valorTotal = area * valoresPorTipo[tipo];

    // Adicionar valores dos elementos selecionados
    elementos.forEach(elemento => {
        valorTotal += area * valoresElementos[elemento];
    });

    // Exibir resultado
    const resultado = document.querySelector('.result-details');
    resultado.innerHTML = `
        <p><strong>Área:</strong> ${area} m²</p>
        <p><strong>Tipo:</strong> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
        <p><strong>Elementos inclusos:</strong> ${elementos.length ? elementos.join(', ') : 'Nenhum'}</p>
        <p><strong>Valor estimado:</strong> R$ ${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
        <small>*Valores aproximados, sujeitos a alteração após visita técnica.</small>
    `;
}

// Modal
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

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
            <ul> <boltAction type="file" filePath="script.js">                <li>Planejamento do espaço</li>
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

// Detalhes dos Projetos
function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
        <div class="project-details">
            <p>${project.description}</p>
            <h3>Características do Projeto</h3>
            <ul>
                <li>Categoria: ${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</li>
                <li>Sustentabilidade integrada</li>
                <li>Manutenção otimizada</li>
                <li>Design personalizado</li>
            </ul>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Formulário de Contato
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        mensagem: document.getElementById('mensagem').value
    };

    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por exemplo, enviar para um servidor ou API
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    document.getElementById('contactForm').reset();
}

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    
    e.target.value = value;
});