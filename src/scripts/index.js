document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        if (window.location.pathname == "/src/index.html" && sessionStorage.getItem('userAtual') != null) {
            window.location.search = "";
            window.location.pathname = "/src/home.html";
        }
    }
};

onload = () => {
    // loga o usuário e registra o seu identificador
    login.onsubmit = (evento) => {
        jQuery.ajax({
            type: "POST",
            url: '../../index.php',
            dataType: 'json',
            async: !1,
            data: JSON.stringify({
                functionname: "getJson",
                arguments: ["src/dbfake.json"]
            }),
            success: function(data) {
                let users = data.result.users;

                let found = users.find((user) => {
                    return (user.email == document.getElementById('emailLogin').value && user.senha == document.getElementById('senhaLogin').value);
                });

                if (found == undefined) {
                    alert('Credenciais de acesso inválidas!');
                    evento.preventDefault();
                } else {
                    sessionStorage.setItem('userAtual', JSON.stringify(found));
                }
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                console.log(err.Message);
            }
        });
    };
    // cadastra o usuario
    cadastro.onsubmit = (evento) => {
        jQuery.ajax({
            type: "POST",
            url: '../../index.php',
            dataType: 'json',
            async: !1,
            data: JSON.stringify({
                functionname: "getJson",
                arguments: ["src/dbfake.json"]
            }),
            success: function(data) {
                let users = data.result.users;

                let user = {
                    id: users.length + 1,
                    nome: nomeCadastro.value,
                    email: emailCadastro.value,
                    senha: senhaCadastro.value
                };
                let found = users.find((user) => {
                    return (user.email == document.getElementById('emailCadastro').value);
                });
                if (found == undefined) {
                    users.push(user);
                    jQuery.ajax({
                        type: "POST",
                        url: '../../index.php',
                        dataType: 'json',
                        async: !1,
                        data: JSON.stringify({
                            functionname: "writeJson",
                            arguments: ["src/dbfake.json", JSON.stringify(data.result)]
                        }),
                        success: function(data) {
                            $('#modalCadastro').modal('toggle');
                            $('#modalLogin').modal('toggle');
                            evento.preventDefault();
                        },
                        error: function(xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                            console.log(err.Message);
                        }
                    });
                } else {
                    alert("Esse email já está cadastrado, por favor tente outro!");
                }
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                console.log(err.Message);
            }
        });

    };
};