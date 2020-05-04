document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        if (window.location.pathname != "/index.html" && sessionStorage.getItem('userAtual') == null) {
            window.location.search = "";
            window.location.pathname = "/index.html";
        }
    }
};
onload = () => {
    criarSala.onsubmit = (evento) => {
        alert('click criar');

    };

    entrarSala.onsubmit = (evento) => {
        alert('click entrar');

    };

    sair.onclick = (evento) => {
        sessionStorage.clear();
        window.location.search = "";
        window.location.pathname = "/index.html";
        console.log('eai');
    }
}