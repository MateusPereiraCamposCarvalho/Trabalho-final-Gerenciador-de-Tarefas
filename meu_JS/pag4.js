function MemoriaSecundaria(){
    if(!localStorage.usuarios){
        var usuarios = []
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
    if(!localStorage.auxiliares){
        var auxiliares = []
        localStorage.setItem('auxiliares', JSON.stringify(auxiliares))
    }
    var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))
    document.getElementById('usuario').value = auxiliares[0].nome 
}

function Consultar(){
    if($("#formulario").valid()){
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))
        var x = auxiliares[0].posicao
        data = document.getElementById('data').value
        stats = document.getElementById('status').value
        categoria = document.getElementById('categoria').value

        ApagarTabela(usuarios, x)

        var i = 0
        for(i = 0; i < usuarios[x].tarefa.length; i++){
            if(stats == categoria){
                if(usuarios[x].status[i] != "Cancelada" && usuarios[x].data[i] == data){
                    EscreverTabela(usuarios, x, i)
                }
            }
            if(stats == "Todas" && categoria != "Todas"){
                if(usuarios[x].status[i] != "Cancelada" && usuarios[x].categoria[i] == categoria && usuarios[x].data[i] == data){
                    EscreverTabela(usuarios, x, i)
                }
            }
            if(stats != "Todas" && categoria == "Todas"){
                if(usuarios[x].status[i] == stats && usuarios[x].data[i] == data){
                    if(stats != "Cancelada"){
                        EscreverTabela(usuarios, x, i)
                    }else{
                        EscreverTabela(usuarios, x, i)
                    }
                }
            }
            if(stats != "Todas" && categoria != "Todas"){
                if(usuarios[x].status[i] == stats && usuarios[x].categoria[i] == categoria && usuarios[x].data[i] == data){
                    if(stats != "Cancelada"){
                        EscreverTabela(usuarios, x, i)
                    }else{
                        EscreverTabela(usuarios, x, i)
                    }
                }
            }
        }

    }
}

function ApagarTabela(usuarios, x){
    var i = 0
        for(i = 0; i < usuarios[x].tarefa.length; i++){
            var tabela = document.getElementById("tabela")
            var linha = tabela.getElementsByTagName("tr")
            var ndelinhas = linha.length

            var tabela2 = document.getElementById("tabela2")
            var linha2 = tabela2.getElementsByTagName("tr")
            var ndelinhas2 = linha2.length


            while(ndelinhas > 1 && ndelinhas2 > 1){
                tabela.deleteRow(ndelinhas - 1)
                ndelinhas--

                tabela2.deleteRow(ndelinhas2 - 1)
                ndelinhas2--
            }
        }
}

function EscreverTabela(usuarios, x, i){
    var tabela = document.getElementById("tabela")
    var linha = tabela.getElementsByTagName("tr")
    var ndelinhas = linha.length

    var linhas = tabela.insertRow(ndelinhas)
    var coluna1 = linhas.insertCell(0)
    var coluna2 = linhas.insertCell(1)
    var coluna3 = linhas.insertCell(2)
    var coluna4 = linhas.insertCell(3)

    coluna1.innerText = usuarios[x].tarefa[i]
    coluna2.innerText = usuarios[x].data[i]
    coluna3.innerText = usuarios[x].horario[i]
    coluna4.innerText = usuarios[x].cronometro[i]


    var tabela2 = document.getElementById("tabela2")
    var linha2 = tabela2.getElementsByTagName("tr")
    var ndelinhas2 = linha2.length

    var linhas2 = tabela2.insertRow(ndelinhas2)
    var coluna1 = linhas2.insertCell(0)
    var coluna2 = linhas2.insertCell(1)
    var coluna3 = linhas2.insertCell(2)
    var coluna4 = linhas2.insertCell(3)

    coluna1.innerText = usuarios[x].tarefa[i]
    coluna2.innerText = usuarios[x].categoria[i]
    coluna3.innerText = usuarios[x].status[i]
    coluna4.innerText = usuarios[x].codigo[i]
}

function Detalhar(){
    if($("#formulario2").valid()){
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))
        var x = auxiliares[0].posicao
        cod = document.getElementById('codigo').value
        var c = ConfCodigo(usuarios, x, cod)
        if(c == -1){
            alert("Código não encontrado!")
        }else{
            document.getElementById('confTarefa').value = usuarios[x].tarefa[c]
            document.getElementById('confDescricao').value = usuarios[x].descricao[c]
        }
    }
}

function ConfCodigo(usuarios, x, cod){
    var i = 0
    var j = 0
    var aux = 0
    for(i = 0; i < usuarios[x].tarefa.length; i++){
        if(usuarios[x].codigo[i] == cod){
            j++
            aux = i
        }
    }
    if(j == 0){
        return -1
    }else{
        return aux
    }
}

$(document).ready(function () {
    $('#codigo').mask('000000');
});

$("#formulario").validate(
    {
        rules: {
            data: {
                required: true
            },
            status: {
                required: true
            },
            categoria: {
                required: true
            }
        },
        messages: {
            data: {
                required: "Campo obrigatório"
            },
            status: {
                required: "Campo obrigatório"
            },
            categoria: {
                required: "Campo obrigatório"
            }
        }
    }
);

$("#formulario2").validate(
    {
        rules: {
            codigo: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            codigo: {
                required: "Campo obrigatório",
                minlength: "Código deve ter no mínimo 6 caracteres"
            }
        }
    }
);

