document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        if (window.location.pathname != "/index.html" && sessionStorage.getItem('userAtual') == null) {
            window.location.search = "";
            window.location.pathname = "/index.html";
        }
    }
};
onload = () => {
    var app = new Vue({
        el: '#app',
        data: {
            roomsCriadas: (JSON.parse(localStorage.getItem('rooms')).filter((room) => {
                return (room.criadoPor == JSON.parse(sessionStorage.getItem('userAtual')).id);
            })),
            roomsParticipadas: JSON.parse(localStorage.getItem('rooms')).filter((room) => {
                return (room.invites.find((user) => {
                    return (user.id == JSON.parse(sessionStorage.getItem('userAtual')).id);
                }));
            }),
            rooms: JSON.parse(localStorage.getItem('rooms')),
            users: JSON.parse(localStorage.getItem('users')),
            userAtual: JSON.parse(sessionStorage.getItem('userAtual'))
        },
        methods: {
            concatenateUsersInvite(invites) {
                let names = "Você";
                invites.forEach((invite, i) => {
                    names += ", ";
                    names += invite.nome;
                });
                return names;
            },
            findUserById(id) {
                return this.users.find((user) => {
                    return (user.id == id);
                });
            },
            getNomeSala() {
                let params = new URLSearchParams(window.location.search);
                return params.get('idSala');
            }
        }
    });

    entrarSala.onsubmit = (evento) => {
        alert('click entrar');
        if (nomeSalaEntrar.value != "" && senhaSalaEntrar.value != "") {
            let rooms = JSON.parse(localStorage.getItem('rooms'));
            let found = rooms.find((room) => {
                return (room.nome == document.getElementById('nomeSalaEntrar').value);
            });
            if (found == undefined) {
                alert('Essa sala não existe, deseja criá-la?');
                evento.preventDefault();
            } else {
                alert('achou');

                if (found.senha == document.getElementById('senhaSalaEntrar').value) {
                    let userAtual = JSON.parse(sessionStorage.getItem('userAtual'));
                    let indexFound = rooms.findIndex((room) => {
                        return (room.nome == document.getElementById('nomeSalaEntrar').value);
                    });
                    if (found.criadoPor != userAtual.id) {
                        rooms[indexFound].invites.push(userAtual);
                        localStorage.setItem('rooms', JSON.stringify(rooms));
                    }
                } else {
                    alert('A senha inserida é inválida!');
                    evento.preventDefault();
                }
                // sessionStorage.setItem('userAtual', JSON.stringify(found));
            }
        }
    };

    criarSala.onsubmit = (evento) => {
        // alert('click criar');
        if (nomeSalaCriar.value != "" && senhaSalaCriar.value != "") {
            let rooms = JSON.parse(localStorage.getItem('rooms'));
            let found = rooms.find((room) => {
                return (room.nome == document.getElementById('nomeSalaCriar').value);
            });
            let userAtual = JSON.parse(sessionStorage.getItem('userAtual'));
            if (found == undefined) {
                let dataAgora = new Date();
                let newRoom = {
                    id: rooms.length + 1,
                    nome: nomeSalaCriar.value,
                    senha: senhaSalaCriar.value,
                    criadoPor: userAtual.id,
                    dataCriado: dataAgora.getDate() + "/" +
                        (dataAgora.getMonth() + 1) + "/" +
                        dataAgora.getFullYear() + " " +
                        dataAgora.getHours() + ":" +
                        dataAgora.getMinutes() + ":" +
                        dataAgora.getSeconds(),
                    invites: []
                };
                rooms.push(newRoom);
                localStorage.setItem('rooms', JSON.stringify(rooms));
            } else {
                evento.preventDefault();
                alert('Já existe uma sala com esse nome, tente novamente!');
            }
        } else {
            alert("Digite as credenciais para entrar na sala!");
        }
    };

    sair.onclick = (evento) => {
        sessionStorage.clear();
        window.location.search = "";
        window.location.pathname = "/index.html";
        console.log('eai');
    }


}