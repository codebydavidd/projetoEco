// loader.js
window.onload = () => {
    // Esconde o loader após 5 segundos
    const loaderContainer = document.querySelector('.loader-container');
    
    // Esconde o loader após 5 segundos
    setTimeout(() => {
        loaderContainer.style.opacity = '0'; // Torna invisível
        loaderContainer.style.visibility = 'hidden'; // Torna invisível
    }, 11000); // O loader vai sumir após 5 segundos

    // Redireciona para o index.html após 5 segundos
    setTimeout(() => {
        window.location.href = 'home.html'; // Redireciona para a pasta 'site'
    }, 5500); // Um pouco mais de tempo para a animação desaparecer
};
