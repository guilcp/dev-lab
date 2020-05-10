const CLIENT_ID = "633cbef0cd25ac41d3097c337394df3f";
const CLIENT_SECRET = "c72eeb4fb754bfa986bdd60acd7f7fbd588a4d7aae0a2b96711680d4b1ec52a0";
const proxy = "https://cors-anywhere.herokuapp.com/";
const urlApi = "https://api.jdoodle.com/v1/execute/";


onload = () => {
    $(function() {
        $('[data-toggle="popover"]').popover()
    });
    let app = new Vue({
        el: '#app',
        data: {
            languages: [{
                id: "java",
                nome: "Java"
            }, {
                id: "c",
                nome: "C"
            }, {
                id: "c99",
                nome: "C-99"
            }, {
                id: "cpp",
                nome: "C++"
            }, {
                id: "cpp14",
                nome: "C++ 14"
            }, {
                id: "cpp17",
                nome: "C++ 17"
            }, {
                id: "php",
                nome: "PHP"
            }, {
                id: "perl",
                nome: "Perl"
            }, {
                id: "python2",
                nome: "Python 2"
            }, {
                id: "python3",
                nome: "Python 3"
            }, {
                id: "ruby",
                nome: "Ruby"
            }, {
                id: "go",
                nome: "Go Lang"
            }, {
                id: "scala",
                nome: "Scala"
            }, {
                id: "bash",
                nome: "Bash Shell"
            }, {
                id: "sql",
                nome: "SQL"
            }, {
                id: "pascal",
                nome: "Pascal"
            }, {
                id: "csharp",
                nome: "C#"
            }, {
                id: "vbn",
                nome: "VB.Net"
            }, {
                id: "haskell",
                nome: "Haskell"
            }, {
                id: "objc",
                nome: "Objective C"
            }, {
                id: "swift",
                nome: "Swift"
            }, {
                id: "groovy",
                nome: "Groovy"
            }, {
                id: "fortran",
                nome: "Fortran"
            }, {
                id: "brainfuck",
                nome: "Brainf**k"
            }, {
                id: "lua",
                nome: "Lua"
            }, {
                id: "tcl",
                nome: "TCL"
            }, {
                id: "hack",
                nome: "Hack"
            }, {
                id: "rust",
                nome: "Rust"
            }, {
                id: "d",
                nome: "D"
            }, {
                id: "ada",
                nome: "Ada"
            }, {
                id: "r",
                nome: "R Language"
            }, {
                id: "freebasic",
                nome: "FREE BASIC"
            }, {
                id: "verilog",
                nome: "VERILOG"
            }, {
                id: "cobol",
                nome: "COBOL"
            }, {
                id: "dart",
                nome: "Dart"
            }, {
                id: "yabasic",
                nome: "YaBasic"
            }, {
                id: "clojure",
                nome: "Clojure"
            }, {
                id: "nodejs",
                nome: "NodeJS"
            }, {
                id: "scheme",
                nome: "Scheme"
            }, {
                id: "forth",
                nome: "Forth"
            }, {
                id: "prolog",
                nome: "Prolog"
            }, {
                id: "octave",
                nome: "Octave"
            }, {
                id: "coffescript",
                nome: "CoffeScript"
            }, {
                id: "icon",
                nome: "Icon"
            }, {
                id: "fsharp",
                nome: "F#"
            }, {
                id: "nasm",
                nome: "Assembler - NASM"
            }, {
                id: "gccasm",
                nome: "Assembler - GCC"
            }, {
                id: "intercal",
                nome: "Intercal"
            }, {
                id: "nemerle",
                nome: "Nemerle"
            }, {
                id: "ocaml",
                nome: "Ocaml"
            }, {
                id: "unlambda",
                nome: "Unlambda"
            }, {
                id: "picolisp",
                nome: "Picolisp"
            }, {
                id: "spidermonkey",
                nome: "SpiderMonkey"
            }, {
                id: "rhino",
                nome: "Rhino JS"
            }, {
                id: "bc",
                nome: "BC"
            }, {
                id: "clisp",
                nome: "CLISP"
            }, {
                id: "elixir",
                nome: "Elixir"
            }, {
                id: "factor",
                nome: "Factor"
            }, {
                id: "falcon",
                nome: "Falcon"
            }, {
                id: "fantom",
                nome: "Fantom"
            }, {
                id: "nim",
                nome: "Nim"
            }, {
                id: "pike",
                nome: "Pike"
            }, {
                id: "smalltalk",
                nome: "SmallTalk"
            }, {
                id: "mozart",
                nome: "OZ Mozart"
            }, {
                id: "lolcode",
                nome: "LOLCODE"
            }, {
                id: "racket",
                nome: "Racket"
            }, {
                id: "kotlin",
                nome: "Kotlin"
            }, {
                id: "whitespace",
                nome: "Whitespace"
            }, {
                id: "erlang",
                nome: "Erlang"
            }, {
                id: "jlang",
                nome: "J"
            }]
        },
        methods: {
            selectChange(event) {
                let found = this.languages.find((language) => {
                    return (language.nome == $('.custom-select').val());
                });
                $('#nav-tab-principal .active').text('main.' + found.id);
            },
            runCode(event) {
                if ($('.custom-select').val() == "Selecione a linguagem") {
                    alert("Selecione a linguagem para executar o código!");
                } else {
                    $.ajaxSetup({
                        contentType: "application/json; charset=utf-8"
                    })
                    let found = this.languages.find((language) => {
                        return (language.nome == $('.custom-select').val());
                    });
                    let languageSelected = found.id;
                    jQuery.ajax({
                        type: "POST",
                        url: proxy + urlApi,
                        dataType: 'json',
                        async: !1,
                        data: JSON.stringify({
                            clientId: CLIENT_ID,
                            clientSecret: CLIENT_SECRET,
                            script: document.getElementById('code').value,
                            stdin: $('#input-1 textarea').val(),
                            language: languageSelected,
                            versionIndex: "0"
                        }),
                        success: function(data) {
                            console.log(data);
                            if (data.output != null) $('#output-1 textarea').val() = data.output;
                        },
                        error: function(xhr, status, error) {
                            console.log(xhr.statusText);
                        }
                    });
                }
            },
            sharePage(event) {
                $('#' + event.target.id).attr('data-content', $('.togetherjs-not-mobile .togetherjs-share-link').val());
                $('#' + event.target.id).popover('show');
            },
            download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent($('#code').val()));
                element.setAttribute('download', $('#nav-tab-principal .active').text());

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }
        }
    });

    if (document.readyState === 'complete') {
        if (window.location.pathname != "/index.html" && sessionStorage.getItem('userAtual') == null) {
            window.location.search = "";
            window.location.pathname = "/index.html";
        }
    }
    let response = jQuery.ajax({
        type: "POST",
        url: 'index.php',
        dataType: 'json',
        async: !1,
        data: JSON.stringify({
            functionname: "getJson",
            arguments: ["src/dbfake.json"]
        }),
        success: function(data) {},
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
            console.log(err.Message);
        }
    });
    let rooms = response.responseJSON.result.rooms;
    let params = new URLSearchParams(window.location.search);
    let found = rooms.find((room) => {
        return ((room.nome == params.get('nomeSalaEntrar') && room.senha == params.get('senhaSalaEntrar')) || (room.nome == params.get('nomeSalaCriar') && room.senha == params.get('senhaSalaCriar')) || (room.id == params.get('idSala')));
    });
    let userAtual = JSON.parse(sessionStorage.getItem('userAtual'));
    if (found != undefined && userAtual.id == found.criadoPor) {
        TogetherJS(this);

    }

    sair.onclick = (evento) => {
        sessionStorage.clear();
        window.location.search = "";
        window.location.pathname = "/index.html";
    }

    $('.output').on("change", function(event) {
        var sharedtext = $(event.target.id).html()
        if (TogetherJS.running) {
            TogetherJS.send({
                type: "form-update",
                output: sharedtext
            });
        }
    });
    TogetherJS.hub.on("form-update", function(msg) {
        if (!msg.sameUrl) {
            return;
        }
        console.log('evento recebido');
    });

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
            url: 'index.php',
            dataType: 'json',
            async: !1,
            data: JSON.stringify({
                functionname: "getJson",
                arguments: ["src/dbfake.json"]
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

setInterval(() => {
    if (TogetherJS.running) {
        document.getElementById('togetherjs-container').style.display = 'none';
        document.getElementById('togetherjs-template-cursor').style.display = 'none';
        document.getElementsByClassName('togetherjs-clicking').style.display = 'none';
        document.getElementsByClassName('togetherjs-cursor').style.display = 'none';
        document.getElementsByClassName('togetherjs').style.display = 'none';
        document.getElementsByClassName('togetherjs-scrolled-normal').style.display = 'none';
    }
}, 1);