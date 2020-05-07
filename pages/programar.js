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
        console.log('eai');
    }
}

function getUserAtual() {
    return JSON.parse(sessionStorage.getItem('userAtual'));
}

function getNomeSala() {
    let params = new URLSearchParams(window.location.search);
    return params.get('idSala');
}
$('#tlkio').attr('data-nickname', getUserAtual().nome);
$('#tlkio').attr('data-channel', 'dev-lab-' + getNomeSala());