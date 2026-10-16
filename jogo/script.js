/* ===========================================================
    Clique no alvo — versão final

    - Math.random() sorteia a posição do alvo.
    - setInterval é o cronômetro: roda a cada segundo, sozinho.
    - setTimeout faz o alvo fugir se a pessoa demorar.
    - clearInterval e clearTimeout cancelam os dois.
   =========================================================== */

    const niveis = {
    facil:   { nome: "Fácil",   tempoDoAlvo: 2000, duracaoDoJogo: 30 },
    medio:   { nome: "Médio",   tempoDoAlvo: 1200, duracaoDoJogo: 25 },
    dificil: { nome: "Difícil", tempoDoAlvo: 700,  duracaoDoJogo: 20 }
};
//const DURACAO = 30;          // segundos de partida
//const TEMPO_DO_ALVO = 1200;  // milissegundos até o alvo fugir

let TEMPO_DO_ALVO = niveis.facil.tempoDoAlvo; // Começa no Fácil por padrão
let DURACAO = niveis.facil.duracaoDoJogo; // Começa no Fácil por padrão
/* -----------------------------------------------------------
    Funções que só devolvem
   ----------------------------------------------------------- */

// Sorteia um número inteiro entre o mínimo e o máximo, os dois
// incluídos. sortearNumero(1, 6) → 1, 2, 3, 4, 5 ou 6, como um dado.
//
// Lendo de dentro para fora, com sortearNumero(1, 6):
//
//   Math.random()          um número quebrado de 0 a 0,999...
//                          (pode dar 0, nunca dá 1)
//
//   maximo - minimo + 1    quantos números existem no intervalo:
//                          6 - 1 + 1 = 6. O + 1 é porque a
//                          subtração conta os vãos entre os
//                          números, não os números. Sem ele, o 6
//                          nunca sairia.
//
//   Math.random() * 6      estica: de 0 a 5,999... (nunca 6)
//
//   Math.floor(...)        corta a parte decimal: 0, 1, 2, 3, 4
//                          ou 5, todos com a mesma chance.
//                          (Math.round daria metade da chance
//                          para as pontas.)
//
//   + minimo               empurra para o começo certo: 1 a 6.
function sortearNumero(minimo, maximo) {    
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function bateuRecorde(pontos, recorde) {
    return pontos > recorde;
}

// montarMensagemDeFim(12, 15) → 'Fim! 12 pontos. O recorde é 15.'
function montarMensagemDeFim(pontos, recorde) {
    if (bateuRecorde(pontos, recorde)) {
        return 'Novo recorde: ' + pontos + ' pontos!';
    }
    return 'Fim! ' + pontos + ' pontos. O recorde é ' + recorde + '.';
}


/* -----------------------------------------------------------
    Selecionar e lembrar
   ----------------------------------------------------------- */

const alvo = document.querySelector('.alvo');
const botoesNivel = document.querySelectorAll('.btn-nivel');
const botaoComecar = document.querySelector('.botao-comecar');
const mensagem = document.querySelector('.mensagem');

const telaPontos = document.querySelector('.pontos');
const telaTempo = document.querySelector('.tempo');
const telaRecorde = document.querySelector('.recorde');


const jogo = {
    pontos: 0,
    tempoRestante: DURACAO,
    recorde: 0,
    Dourado: 3
};

// O número que o setInterval devolve: é com ele que o
// clearInterval sabe qual cronômetro parar.
let cronometro;

// O mesmo para o setTimeout da fuga do alvo.
let fuga;


/* -----------------------------------------------------------
    Funções que mexem na tela ou no jogo
   ----------------------------------------------------------- */

// Move o alvo e marca a próxima fuga. Se a pessoa acertar
// before, a fuga marcada é cancelada e outra é marcada.
    function sortearDourado() {
    return sortearNumero(1, 5) === 1;
}

// Move o alvo e marca a próxima fuga. Se a pessoa acertar
// before, a fuga marcada é cancelada e outra é marcada.
function moverAlvo() {
    alvo.style.left = sortearNumero(10, 90) + '%';
    alvo.style.top = sortearNumero(10, 90) + '%';
    if (sortearDourado()) {
        alvo.classList.add('dourado');
    } else {
        alvo.classList.remove('dourado');
    }
    
    //const ficouDourado = sortearDourado();
    //console.log("O alvo mudou de lugar! Sorteio dourado deu:", ficouDourado);
    //if (ficouDourado) {
    //    alvo.classList.add('dourado');
    //    console.log("Classe 'dourado' ADICIONADA ao botão!");
    //} else {
        //alvo.classList.remove('dourado');
        //console.log("Classe 'dourado' REMOVIDA do botão.");
   // }
    clearTimeout(fuga);
    fuga = setTimeout(function () {
        moverAlvo();
    }, TEMPO_DO_ALVO);
}
alvo.addEventListener('click', function () {
    if (alvo.classList.contains('dourado')) {
        jogo.pontos += 3; // Dourado vale 3 pontos
    } else {
        jogo.pontos += 1; // Normal vale 1 ponto
    }
    mostrarPlacar();
    moverAlvo();
});

function mostrarPlacar() {
    telaPontos.textContent = jogo.pontos;
    telaTempo.textContent = jogo.tempoRestante;
    telaRecorde.textContent = jogo.recorde;
}

function iniciarJogo() {
    jogo.pontos = 0;
    jogo.tempoRestante = DURACAO;

    // Sem isto, clicar duas vezes em Começar cria dois
    // cronômetros, e o tempo cai de dois em dois.
    botaoComecar.disabled = true;
    mensagem.textContent = 'Vai!';

    alvo.classList.remove('escondido');
    moverAlvo();
    mostrarPlacar();

    cronometro = setInterval(function () {
        passarUmSegundo();
    }, 1000);
}


function passarUmSegundo() {
    jogo.tempoRestante = jogo.tempoRestante - 1;
    mostrarPlacar();
    const elementoCronometro = document.querySelector(".tempo");
    if (jogo.tempoRestante <= 10) {
        elementoCronometro.style.color = 'red';
    } else {
        elementoCronometro.style.color = 'white';
    }
    if (jogo.tempoRestante === 0) {
        encerrarJogo();
    }
}

function encerrarJogo() {
    // Sem isto, o tempo continua: -1, -2, -3...
    clearInterval(cronometro);
    // Sem isto, o alvo escondido continua fugindo.
    clearTimeout(fuga);

    mensagem.textContent = montarMensagemDeFim(jogo.pontos, jogo.recorde);
    if (bateuRecorde(jogo.pontos, jogo.recorde)) {
        jogo.recorde = jogo.pontos;
    }

    alvo.classList.add('escondido');
    botaoComecar.disabled = false;
    botaoComecar.textContent = 'Jogar de novo';
    mostrarPlacar();
}

if (botoesNivel.length > 0) {
    botoesNivel.forEach(function(botao) {
        botao.addEventListener('click', function() {
            // Pega o texto do data-nivel: "facil", "medio" ou "dificil" [1]
            const nivelChave = botao.getAttribute('data-nivel');
            
            // Busca o objeto correspondente dentro da nossa lista de níveis
            const nivelSelecionado = niveis[nivelChave];

            if (nivelSelecionado) {
                // Atualiza as variáveis que controlam o jogo
                TEMPO_DO_ALVO = nivelSelecionado.tempoDoAlvo;
                DURACAO = nivelSelecionado.duracaoDoJogo;

                // Atualiza o texto na tela para o jogador ver
                mensagem.textContent = `Nível alterado para: ${nivelSelecionado.nome}!`;
                
                // Atualiza o relógio do placar para o tempo inicial do nível escolhido
                telaTempo.textContent = DURACAO;

                // Efeito visual opcional para destacar o botão clicado
                botoesNivel.forEach(b => b.classList.remove('ativo'));
                botao.classList.add('ativo');
            }
        });
    });
}
//const niveis = [
    //{ nome: "facil", tempo:1200, duracao: 30 },
    //{ nome: "medio", tempo: 700, duracao: 25 },
    //{ nome: "dificil", tempo: 400, duracao: 20 }
//];
//let TEMPO_DO_ALVO = niveis[0].tempo; // Começa no Fácil por padrão
//let DURACAO = niveis[0].duracao;
//onst botoesNivel = document.querySelectorAll('.btn-nivel');
//botoesNivel.forEach(botao) {
    //botao.addEventListener('click', function () {
        //const indiceSelecionado = parseInt(botao.getAttribute('data-nivel'));
        //const nivelSelecionado = niveis[indiceSelecionado];
        //TEMPO_DO_ALVO = nivelSelecionado.tempo;
        //DURACAO = nivelSelecionado.duracao;
        //mensagem.textContent = `Nível selecionado: ${nivelSelecionado.nome}. Tempo do alvo: ${TEMPO_DO_ALVO}ms, Duração do jogo: ${DURACAO}s.`;
        //botoesNivel.forEach(b => b.classList.remove('ativo'));
        //botao.classList.add('ativo');
    //});
//}

/* -----------------------------------------------------------
    Escutar
   ----------------------------------------------------------- */

botaoComecar.addEventListener('click', function () {
    iniciarJogo();
});


