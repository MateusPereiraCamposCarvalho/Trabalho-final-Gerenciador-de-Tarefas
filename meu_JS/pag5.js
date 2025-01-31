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

function SalvarInfos(){
    if($("#formulario").valid()){
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))
        var x = auxiliares[0].posicao
        cod = document.getElementById('codigo').value
        var c = ConfCodigo(usuarios, x, cod)
        if(c == -1){
            alert("Código não encontrado!")
        }else{
            if(document.getElementById('tarefa').value != ""){
                usuarios[x].tarefa[c] = document.getElementById('tarefa').value
            }
            if(document.getElementById('data').value != ""){
                usuarios[x].data[c] = document.getElementById('data').value
            }
            if(document.getElementById('horario').value != ""){
                usuarios[x].horario[c] = document.getElementById('horario').value
            }
            if(document.getElementById('categoria').value != ""){
                usuarios[x].categoria[c] = document.getElementById('categoria').value
            }
            if(document.getElementById('descricao').value != ""){
                usuarios[x].descricao[c] = document.getElementById('descricao').value
            }
            alert("Informações alteradas com sucesso!")

            Ordenar(usuarios, x)

            localStorage.setItem('usuarios', JSON.stringify(usuarios))
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

function SalvarStatus(){
    if($("#formulario2").valid()){
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))
        var x = auxiliares[0].posicao
        cod = document.getElementById('codigo2').value
        var c = ConfCodigo(usuarios, x, cod)
        if(c == -1){
            alert("Código não encontrado!")
        }else{

            usuarios[x].status[c] = document.getElementById('status').value
            alert("Status alterado com sucesso!")

            localStorage.setItem('usuarios', JSON.stringify(usuarios))
        }
    }
}

$("#formulario").validate(
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

$("#formulario2").validate(
    {
        rules: {
            codigo2: {
                required: true,
                minlength: 6
            },
            status: {
                required: true
            }
        },
        messages: {
            codigo2: {
                required: "Campo obrigatório",
                minlength: "Código deve ter no mínimo 6 caracteres"
            },
            status: {
                required: "Campo obrigatório"
            }
        }
    }
);