var TimerId = null; //var que armazena chama de timeout


function iniciarJogo() {
    var url = window.location.search;
    
    var nivel_jogo = url.replace("?", "")
    

    var tempo_segundos = 0;

    if(nivel_jogo == 1) { //1 Fácil -> 120 segundos
        tempo_segundos = 120;
    }

    if(nivel_jogo == 2) { //2 Normal -> 60 segundos
        tempo_segundos = 60;
    }

    if(nivel_jogo == 3) { //3 Difícil -> 30 segundos
        tempo_segundos = 30;
    }


    //inserindo segundos no span

    document.getElementById('cronometro').innerHTML = tempo_segundos;


    //quantidade de balões

    var qtde_baloes = 50;

    cria_baloes(qtde_baloes);

    //imprimir qted baloes inteiros

    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);

}


function contagem_tempo(segundos) {

    segundos = segundos -1;

    if(segundos == -1) {
        clearTimeout(timerId) // para parar a execução da função do settimeout
        game_over()
        return false;
    }
    
    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
    alert('What a pity, you lost... You did not manage to blow up all the balloons in the time')
}

function cria_baloes(qtde_baloes) {

    for(var i = 1; i <= qtde_baloes; i++) {

        var balao = document.createElement("img");
        balao.src = 'img/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' +i;
        balao.onclick = function () { estourar(this); };

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar (e) {

    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute ("onclick","")
    document.getElementById(id_balao). src = 'img/balao_azul_pequeno_estourado.png';

    pontuacao(-1);
}

function pontuacao(acao) {
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    condicao_jogo (baloes_inteiros, baloes_estourados);
}

function condicao_jogo (baloes_inteiros) {
    if(baloes_inteiros == 0) {
        alert('Congratulations, you are the winner! He managed to pop all the balloons in time! ;)')
        parar_jogo();
    }
}

function parar_jogo (){
    clearTimeout(timerId);

}