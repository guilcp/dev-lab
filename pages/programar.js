document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        if (window.location.pathname != "/index.html" && sessionStorage.getItem('userAtual') == null) {
            window.location.search = "";
            window.location.pathname = "/index.html";
        }
    }
};
onload = () => {
    // var app = new Vue({
    //     el: '#app',
    //     data: {
    //         roomsCriadas: (JSON.parse(localStorage.getItem('rooms')).filter((room) => {
    //             return (room.criadoPor == JSON.parse(sessionStorage.getItem('userAtual')).id);
    //         })),
    //         roomsParticipadas: JSON.parse(localStorage.getItem('rooms')).filter((room) => {
    //             return (room.invites.find((user) => {
    //                 return (user.id == JSON.parse(sessionStorage.getItem('userAtual')).id);
    //             }));
    //         }),
    //         rooms: JSON.parse(localStorage.getItem('rooms')),
    //         users: JSON.parse(localStorage.getItem('users')),
    //         userAtual: JSON.parse(sessionStorage.getItem('userAtual'))
    //     },
    //     methods: {
    //         concatenateUsersInvite(invites) {
    //             let names = "Você";
    //             invites.forEach((invite, i) => {
    //                 names += ", ";
    //                 names += invite.nome;
    //             });
    //             return names;
    //         },
    //         findUserById(id) {
    //             return this.users.find((user) => {
    //                 return (user.id == id);
    //             });
    //         },
    //         getNomeSala() {
    //             let params = new URLSearchParams(window.location.search);
    //             return params.get('idSala');
    //         }
    //     }
    // });



    sair.onclick = (evento) => {
        sessionStorage.clear();
        window.location.search = "";
        window.location.pathname = "/index.html";
    }
}

function getUserAtual() {
    return JSON.parse(sessionStorage.getItem('userAtual'));
}

function getNomeSala() {
    let params = new URLSearchParams(window.location.search);
    if (params.get('idSala') != undefined || params.get('idSala') != null) {
        return params.get('idSala');
    } else {
        let response = jQuery.ajax({
            type: "POST",
            url: '../index.php',
            dataType: 'json',
            async: !1,
            data: JSON.stringify({
                functionname: "getJson",
                arguments: ["dbfake.json"]
            }),
            success: function(data) {
                let rooms = data.result.rooms;
                let found = rooms.find((room) => {
                    return ((room.nome == params.get('nomeSalaEntrar') && room.senha == params.get('senhaSalaEntrar')) || room.nome == params.get('nomeSalaCriar') && room.senha == params.get('senhaSalaCriar'));
                });
                return found.id;
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                console.log(err.Message);
            }
        });
        let rooms = response.responseJSON.result.rooms;
        let found = rooms.find((room) => {
            return ((room.nome == params.get('nomeSalaEntrar') && room.senha == params.get('senhaSalaEntrar')) || room.nome == params.get('nomeSalaCriar') && room.senha == params.get('senhaSalaCriar'));
        });
        return found.id;
    }
}

$('#tlkio').attr('data-nickname', getUserAtual().nome);
$('#tlkio').attr('data-channel', 'dev-lab-' + getNomeSala());