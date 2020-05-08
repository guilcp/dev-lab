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
            errors: [],
            data: {},
            roomsCriadas: {},
            roomsParticipadas: {},
            userAtual: JSON.parse(sessionStorage.getItem('userAtual'))
        },
        created: function() {
            axios.post('../index.php', {
                    functionname: "getJson",
                    arguments: ["dbfake.json"]
                })
                .then(returned => {
                    this.data = returned.data.result;
                    this.roomsCriadas = this.data.rooms.filter((room) => {
                        return (room.criadoPor == JSON.parse(sessionStorage.getItem('userAtual')).id);
                    });
                    this.roomsParticipadas = this.data.rooms.filter((room) => {
                        return (room.invites.find((user) => {
                            return (user.id == JSON.parse(sessionStorage.getItem('userAtual')).id);
                        }));
                    });
                })
                .catch(e => {
                    this.errors.push(e)
                });
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
                return this.data.users.find((user) => {
                    return (user.id == id);
                });
            },
            getNomeSala() {
                let params = new URLSearchParams(window.location.search);
                return params.get('idSala');
            },
            findRoom() {
                let found = this.data.rooms.find((room) => {
                    return (nomeSalaEntrar.value == room.nome && senhaSalaEntrar.value == room.senha);
                });
                if (found != undefined) return found.id;
            },
            getData() {
                axios.post('../index.php', {
                        functionname: "getJson",
                        arguments: ["dbfake.json"]
                    })
                    .then(data => {
                        this.data = data.result;
                        this.roomsCriadas = this.data.rooms.filter((room) => {
                            return (room.criadoPor == JSON.parse(sessionStorage.getItem('userAtual')).id);
                        });
                        this.roomsParticipadas = this.data.rooms.filter((room) => {
                            return (room.invites.find((user) => {
                                return (user.id == JSON.parse(sessionStorage.getItem('userAtual')).id);
                            }));
                        });
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            setData(dados) {
                axios.post('../index.php', {
                        functionname: "writeJson",
                        arguments: ["dbfake.json", JSON.stringify(dados)]
                    })
                    .then(data => {
                        if (data == true) {
                            this.getData();
                        } else {
                            console.log(data);
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            entrarSala(event) {
                if (nomeSalaEntrar.value != "" && senhaSalaEntrar.value != "") {
                    // let rooms = JSON.parse(localStorage.getItem('rooms'));
                    let found = this.data.rooms.find((room) => {
                        return (room.nome == document.getElementById('nomeSalaEntrar').value);
                    });
                    if (found == undefined) {
                        alert('Essa sala não existe, deseja criá-la?');
                        event.preventDefault();
                    } else {
                        if (found.senha == document.getElementById('senhaSalaEntrar').value) {
                            let userAtual = JSON.parse(sessionStorage.getItem('userAtual'));
                            let indexFound = this.data.rooms.findIndex((room) => {
                                return (room.nome == document.getElementById('nomeSalaEntrar').value);
                            });
                            if (found.criadoPor != userAtual.id) {
                                this.data.rooms[indexFound].invites.push(userAtual);
                                // localStorage.setItem('rooms', JSON.stringify(rooms));
                                this.setData(this.data);
                            }
                            event.target.action = event.target.action.replace("undefined", found.id);
                        } else {
                            alert('A senha inserida é inválida!');
                            event.preventDefault();
                        }
                        // sessionStorage.setItem('userAtual', JSON.stringify(found));
                    }
                } else {
                    alert("Digite as credenciais para entrar na sala!");
                    event.preventDefault();
                }
            },
            criarSala(event) {
                if (nomeSalaCriar.value != "" && senhaSalaCriar.value != "") {
                    // let rooms = JSON.parse(localStorage.getItem('rooms'));
                    let found = this.data.rooms.find((room) => {
                        return (room.nome == document.getElementById('nomeSalaCriar').value);
                    });
                    let userAtual = JSON.parse(sessionStorage.getItem('userAtual'));
                    if (found == undefined) {
                        let dataAgora = new Date();
                        let newRoom = {
                            id: this.data.rooms.length + 1,
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
                        this.data.rooms.push(newRoom);
                        this.setData(this.data);
                        event.target.action.replace("undefined", found.id);
                    } else {
                        alert('Já existe uma sala com esse nome, tente novamente!');
                        event.preventDefault();
                    }
                } else {
                    alert("Digite as credenciais para criar na sala!");
                    event.preventDefault();
                }
            }
        }
    });





    sair.onclick = (evento) => {
        sessionStorage.clear();
        window.location.search = "";
        window.location.pathname = "/index.html";
    }


}