// document.onreadystatechange = function(e) {

// };

const CLIENT_ID = "633cbef0cd25ac41d3097c337394df3f";

const CLIENT_SECRET = "c72eeb4fb754bfa986bdd60acd7f7fbd588a4d7aae0a2b96711680d4b1ec52a0";

SEC_BASE = "compilers.widgets.sphere-engine.com";
SEC_HTTPS = true;
(function(d, s, id) {
    SEC = window.SEC || (window.SEC = []);
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = (SEC_HTTPS ? "https" : "http") + "://compilers.widgets.sphere-engine.com/static/sdk/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    // js.on('keyup', function(event) {
    //     // grab text for sending as a message to collaborate
    //     var sharedtext = js.html()
    //         //alert(sharedtext)
    //     if (TogetherJS.running) {
    //         TogetherJS.send({
    //             type: "text-send",
    //             output: sharedtext
    //         });
    //         console.log(sharedtext)
    //     }
    // });
}(document, "script", "sphere-engine-compilers-jssdk"));

onload = () => {
    if (document.readyState === 'complete') {
        if (window.location.pathname != "/index.html" && sessionStorage.getItem('userAtual') == null) {
            window.location.search = "";
            window.location.pathname = "/index.html";
        }
    }
    let params = new URLSearchParams(window.location.search);
    // if (params.get('togetherjs') != null || params.get('togetherjs') != undefined) {
    //     TogetherJSConfig_hubBase = "https://togetherjs-hub.glitch.me/";
    // }
    let response = jQuery.ajax({
        type: "POST",
        url: '../index.php',
        dataType: 'json',
        async: !1,
        data: JSON.stringify({
            functionname: "getJson",
            arguments: ["dbfake.json"]
        }),
        success: function(data) {},
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
            console.log(err.Message);
        }
    });
    let rooms = response.responseJSON.result.rooms;
    let found = rooms.find((room) => {
        return ((room.nome == params.get('nomeSalaEntrar') && room.senha == params.get('senhaSalaEntrar')) || (room.nome == params.get('nomeSalaCriar') && room.senha == params.get('senhaSalaCriar')) || (room.id == params.get('idSala')));
    });
    let userAtual = JSON.parse(sessionStorage.getItem('userAtual'));
    if (found != undefined && userAtual.id == found.criadoPor) {
        TowTruck(this);
    }
    // return false;

    sair.onclick = (evento) => {
        sessionStorage.clear();
        window.location.search = "";
        window.location.pathname = "/index.html";
    }

    run.onclick = (evento) => {
        let response = jQuery.ajax({
            type: "POST",
            url: 'https://api.jdoodle.com/v1/execute',
            dataType: 'json',
            async: !1,
            data: JSON.stringify({
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                script: "",
                language: "php",
                versionIndex: "0"
            }),
            success: function(data) {},
            error: function(xhr, status, error) {
                // var err = eval("(" + xhr.statusText + ")");
                // alert(err.Message);
                console.log(xhr.statusText);
            }
        });
        console.log(response);
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
            success: function(data) {},
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

let test = $('#codeText iframe').contents().find('#widget_form_source');
$('#codeText').on('keyup', function(event) {
    // grab text for sending as a message to collaborate
    var sharedtext = $('#codeText').html()
        //alert(sharedtext)
    if (TogetherJS.running) {
        TogetherJS.send({
            type: "text-send",
            output: sharedtext
        });
        console.log(sharedtext)
    }
});

var iFrameDOM = $("iframe#codeText").contents();
console.log(iFrameDOM);
let a = $("#codeText").contents().find("#widget_form_source");
$('#widget_form_source', frames["codeText"].document).keyup(function(event) {
    // grab text for sending as a message to collaborate
    var sharedtext = $('#codeText').html()
        //alert(sharedtext)
    if (TogetherJS.running) {
        TogetherJS.send({
            type: "text-send",
            output: sharedtext
        });
        console.log(sharedtext)
    }
});

TogetherJS.hub.on("text-send", function(msg) {
    if (!msg.sameUrl) {
        return;
    }
    console.log('evento recebido');
    // $('#codeText iframe').html(msg.output);

    console.log(msg.output)
});