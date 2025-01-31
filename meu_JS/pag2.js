function MemoriaSecundaria(){
    if(!localStorage.usuarios){
        var usuarios = []
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
    if(!localStorage.auxiliares){
        var auxiliares = []
        localStorage.setItem('auxiliares', JSON.stringify(auxiliares))
    }
}

function Entrar(){
    if($("#formulario").valid()){
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))

        var usuario = new Object()
        var auxiliar = new Object()
        
        usuario.login = document.getElementById('login').value
        usuario.senha = document.getElementById('senha').value

        var x = VerificarLogin(usuarios, usuario)

        if(x == 0){
            alert('Usuário e/ou senha incorretos')
        }else{
            auxiliar.nome = usuario.login
            auxiliar.posicao = VerificarPosicaodoLogin(usuarios, usuario)
            auxiliares[0] = auxiliar
            localStorage.setItem('auxiliares', JSON.stringify(auxiliares))
            window.location.href = "pag3.html"
        }
    }
}

function VerificarLogin(usuarios, usuario){
    var i = 0
    var j = 0
    for(i = 0; i < usuarios.length; i++){
        if(usuarios[i].login == usuario.login && usuarios[i].senha == usuario.senha){
            j++
        }
    }
    return j
}

function VerificarPosicaodoLogin(usuarios, usuario){
    var i = 0
    for(i = 0; i < usuarios.length; i++){
        if(usuarios[i].login == usuario.login){
            return i
        }
    }
}

function Cadastrar(){
    window.location.href = "index.html"
}

$("#formulario").validate(
    {
        rules: {
            login: {
                required: true	   
            },
            senha: {
                required: true
            }
        },
        messages: {
            login: {
                required: "Campo obrigatório"
            },
            senha: {
                required: "Campo obrigatório"
            },
        }
    }
);