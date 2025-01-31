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

function Salvar(){
    if($("#formulario").valid()){
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))
        var x = auxiliares[0].posicao
        cod = document.getElementById('codigo').value
        var c = ConfCodigo(usuarios, x, cod)
        if(c == 1){
            alert("Código já cadastrado!")
        }else{
            usuarios[x].codigo[usuarios[x].codigo.length] = document.getElementById('codigo').value
            usuarios[x].tarefa[usuarios[x].tarefa.length] = document.getElementById('tarefa').value
            usuarios[x].data[usuarios[x].data.length] = document.getElementById('data').value
            usuarios[x].horario[usuarios[x].horario.length] = document.getElementById('horario').value
            usuarios[x].categoria[usuarios[x].categoria.length] = document.getElementById('categoria').value
            usuarios[x].status[usuarios[x].status.length] = "Pendente"
            usuarios[x].descricao[usuarios[x].descricao.length] = document.getElementById('descricao').value
            usuarios[x].cronometro[usuarios[x].cronometro.length] = "Não registrado"

            Ordenar(usuarios, x)

            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            window.location.href = "pag4.html"
        } 
    }
}

function ConfCodigo(usuarios, x, cod){
    var i = 0
    for(i = 0; i < usuarios[x].tarefa.length; i++){
        if(usuarios[x].codigo[i] == cod){
            return 1
        }else{
            return 0
        }
    }
}

function Ordenar(usuarios, x){
    var i = 0
    for(i = 0; i < usuarios[x].tarefa.length; i++){
        for(j = i; j < usuarios[x].tarefa.length; j++){
            if(usuarios[x].horario[i] > usuarios[x].horario[j]){
                var aux = usuarios[x].tarefa[i]
                usuarios[x].tarefa[i] = usuarios[x].tarefa[j]
                usuarios[x].tarefa[j] = aux

                var auxData = usuarios[x].data[i]
                usuarios[x].data[i] = usuarios[x].data[j]
                usuarios[x].data[j] = auxData

                var auxHorario = usuarios[x].horario[i]
                usuarios[x].horario[i] = usuarios[x].horario[j]
                usuarios[x].horario[j] = auxHorario

                var auxCategoria = usuarios[x].categoria[i]
                usuarios[x].categoria[i] = usuarios[x].categoria[j]
                usuarios[x].categoria[j] = auxCategoria

                var auxStatus = usuarios[x].status[i]
                usuarios[x].status[i] = usuarios[x].status[j]
                usuarios[x].status[j] = auxStatus

                var auxCodigo = usuarios[x].codigo[i]
                usuarios[x].codigo[i] = usuarios[x].codigo[j]
                usuarios[x].codigo[j] = auxCodigo

                var auxDescricao = usuarios[x].descricao[i]
                usuarios[x].descricao[i] = usuarios[x].descricao[j]
                usuarios[x].descricao[j] = auxDescricao

            }
        }
    }
}

$(document).ready(function () {
    $('#codigo').mask('000000');
});

$("#formulario").validate(
    {
        rules: {
            codigo: {
                required: true,
                minlength: 6
            },
            tarefa: {
                required: true
            },
            data: {
                required: true
            },
            horario: {
                required: true
            },
            categoria: {
                required: true
            },
            descricao: {
                required: true
            }
        },
        messages: {
            codigo: {
                required: "Campo obrigatório",
                minlength: "Código deve ter no mínimo 6 caracteres"
            },
            tarefa: {
                required: "Campo obrigatório"
            },
            data: {
                required: "Campo obrigatório"
            },
            horario: {
                required: "Campo obrigatório"
            },
            categoria: {
                required: "Campo obrigatório"
            },
            descricao: {
                required: "Campo obrigatório"
            }
        }
    }
);