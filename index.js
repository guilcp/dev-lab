document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        if (window.location.pathname == "/index.html" && sessionStorage.getItem('userAtual') != null) {
            window.location.search = "";
            window.location.pathname = "/pages/home.html";
        }
    }
};

onload = () => {
    if (localStorage.getItem('users') == null) localStorage.setItem('users', JSON.stringify([]));
    if (localStorage.getItem('rooms') == null) localStorage.setItem('rooms', JSON.stringify([]));
    // loga o usuário e registra o seu identificador
    login.onsubmit = (evento) => {
        let users = JSON.parse(localStorage.getItem('users'));
        let found = users.find((user) => {
            return (user.email == document.getElementById('emailLogin').value && user.senha == document.getElementById('senhaLogin').value);
        });

        if (found == undefined) {
            alert('Credenciais de acesso inválidas!');
            evento.preventDefault();
        } else {
            sessionStorage.setItem('userAtual', JSON.stringify(found));
        }
    };
    // cadastra o usuario
    cadastro.onsubmit = (evento) => {
        let users = JSON.parse(localStorage.getItem('users'));
        let user = {
            id: users.length,
            nome: nomeCadastro.value,
            email: emailCadastro.value,
            senha: senhaCadastro.value
        };

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
        $('#modalCadastro').modal('toggle');
        $('#modalLogin').modal('toggle');
        evento.preventDefault();
    };
};