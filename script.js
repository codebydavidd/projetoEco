window.onload = function() {
    const form = document.querySelector(".form");
    form.classList.add("animate__animated", "animate__bounceInLeft");
}

document.getElementById("entrarButton").onclick = function() {
    window.location.href = "principal.html";
}