function MemoriaSecundaria(){
    if(!localStorage.tempo){
        var tempo = new Object()
        localStorage.setItem('tempo', JSON.stringify(tempo))
    }
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
    
    var tempo = JSON.parse(localStorage.getItem('tempo'))

    tempo.segundos = 0
    tempo.minutos = 0
    tempo.horas = 0
    tempo.intervalo = null
    tempo.registro = 0

    localStorage.setItem('tempo', JSON.stringify(tempo))
    AtualizarTela();
}


function DoisDigitos(digito){
    if(digito < 10){
        return('0'+ digito)
    }else{
        return(digito)
    }
}

function Iniciar(){
    Contagem()
    var tempo = JSON.parse(localStorage.getItem('tempo'))
    if(!tempo.intervalo){
        tempo.intervalo = setInterval(Contagem, 1000);
        localStorage.setItem('tempo', JSON.stringify(tempo))
        document.getElementById("iniciar").disabled = true;
        document.getElementById("pausar").disabled = false;
        document.getElementById("parar").disabled = false;
    }
}

function Pausar(){
    var tempo = JSON.parse(localStorage.getItem('tempo'))
    clearInterval(tempo.intervalo);
    tempo.intervalo = null;
    localStorage.setItem('tempo', JSON.stringify(tempo))
    document.getElementById("iniciar").disabled = false;
    document.getElementById("pausar").disabled = true;
}

function Parar(){
    var tempo = JSON.parse(localStorage.getItem('tempo'))
    var usuarios = JSON.parse(localStorage.getItem('usuarios'))
    var auxiliares = JSON.parse(localStorage.getItem('auxiliares'))
    clearInterval(tempo.intervalo);
    tempo.intervalo = null;
    localStorage.setItem('tempo', JSON.stringify(tempo))
    document.getElementById("iniciar").disabled = false;
    document.getElementById("pausar").disabled = true;
    document.getElementById("parar").disabled = true;
    
    alert("Você parou em: " + document.getElementById('contagem').innerText);
    
    cod = document.getElementById('codigo').value
    if(cod != ""){
        var c = ConfCodigo(usuarios, auxiliares[0].posicao, cod)
        if(c == -1){
            alert("Código não encontrado!")
        }else{
            usuarios[auxiliares[0].posicao].cronometro[c] = document.getElementById('contagem').innerText
        }
    }

    tempo.registro++
    EscreverTabela(tempo.registro, document.getElementById('contagem').innerText)

    tempo.segundos = 0;
    tempo.minutos = 0;
    tempo.horas = 0;
    localStorage.setItem('tempo', JSON.stringify(tempo))
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    AtualizarTela();
}

function Contagem(){
    var tempo = JSON.parse(localStorage.getItem('tempo'))
    tempo.segundos++;
    if(tempo.segundos == 60){
        tempo.minutos++;
        tempo.segundos = 0;
        if(tempo.minutos == 60){
            tempo.horas++;
            tempo.minutos = 0;
        }
    }
    localStorage.setItem('tempo', JSON.stringify(tempo))
    AtualizarTela();
}

function AtualizarTela(){
    var tempo = JSON.parse(localStorage.getItem('tempo'))
    document.getElementById('contagem').innerText = DoisDigitos(tempo.horas) + ':' + DoisDigitos(tempo.minutos) + ':' + DoisDigitos(tempo.segundos);
}

function EscreverTabela(registro, tempo){
    var tabela = document.getElementById("tabela")
    var linha = tabela.getElementsByTagName("tr")
    var ndelinhas = linha.length

    var linhas = tabela.insertRow(ndelinhas)
    var coluna1 = linhas.insertCell(0)
    var coluna2 = linhas.insertCell(1)

    coluna1.innerText = registro
    coluna2.innerText = tempo
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