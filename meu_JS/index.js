function MemoriaSecundaria(){
    if(!localStorage.usuarios){
        var usuarios = []
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
}

function Cadastrar(){
    if($("#formulario").valid()){
        var usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var usuario = new Object()
        usuario.login = document.getElementById('login').value
        usuario.senha = document.getElementById('senha').value
        usuario.tarefa = []
        usuario.data = []
        usuario.horario = []
        usuario.categoria = []
        usuario.status = []
        usuario.codigo = []
        usuario.descricao = []
        usuario.cronometro = []

        
        var x = 0
        x = VerificarUsuario(usuarios, usuario)
        if (x == 1){
            alert("Usuário já cadastrado!")
        }else{
            alert("Usuário cadastrado com sucesso!")
            usuarios[usuarios.length] = usuario

            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            window.location.href = "pag2.html"
        }
    }
}

function VerificarUsuario(usuarios, usuario){
    var i = 0
    for(i = 0; i < usuarios.length; i++){
        if(usuarios[i].login == usuario.login){
            return 1
        }
    }
}

function Autenticar(){
    window.location.href = "pag2.html"
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