


/*
Adicionar ao fim        push            poe no fim da lista.
Tocar depois dessa      unshift         toca agora
Remover da fila         splice          tira do meio da lista.
Desfazer última         pop             tira do fim da lista.
(musica repetida)         includes         já está na lista? 
*/


function montarItensDaEspera(musicas) {
    let itens = '';
    for (let i = 0; i < musicas.length; i++) {
        itens = itens + `<li>${musicas[i]}</li>`;
    }
    return itens;
}
function mostrarEspera(quantidade) {
    if (quantidade === 0) {
        return 'Nenhuma música na fila';
    }
    if (quantidade === 1) {
        return '1 música na fila';
    }
    return quantidade + ' músicas na fila';
}
function mostrarAvisodoNovoNome(nomeMusica, comandos) {
    if (nomeMusica === '') {
        return 'Escreva o nome da música.';
    }
    if (comandos.includes(nomeMusica)) {
        return nomeMusica + ' já está na lista.';
    }
    return '';
}   
/*---------------------------------------------------------------------------------
selecionar e lembrar
-----------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------
html
------------------------------------------------------------------------------------*/
const topoFila = document.querySelector('.topoFila');
const tocandoAgora = document.querySelector('.TocandoAgora');
const telaContagem = document.querySelector('.contagem');
const telaASeguir = document.querySelector('.Aseguir');
const telaLista = document.querySelector('.ProximaMúsica');
const campoNome = document.getElementById('nomeMusica');
const aviso = document.querySelector('.aviso');
/*-------------------------------------------------------------------------------------
botoes
----------------------------------------------------------------------------------------*/
const botaoproxima = document.querySelector('.botao-proxima');
const botaoAdicionarAoFim = document.querySelector('.botao-adicionar-ao-fim');
const botaoTocarDepoisDessa = document.querySelector('.botao-tocar-depois-dessa');
const botaoRemoverDaFila = document.querySelector('.botao-remover-da-fila');
const botaoDesfazerUltima = document.querySelector('.botao-desfazer-ultima');
const botaoFurar = document.querySelector

const musicas = ['Perfect Soul', 'Caramel', 'Bring me back to Eden']; // array com os nomes das músicas.
/*---------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------
funções que só devolvem
-------------------------------------------------------------------------------------------*/
function montarItensDaFila(.topofila) {
    let itens = '';
    for (let i = 0; i < topoFila.length; i++) {
        itens = itens + `<li>${topoFila[i]}</li>`;
    }
    return itens;
}

function montarTextoDaContagem(Quantidade) {
    if (Quantidade === 0) {
        return 'Fila vazia';
    }
    if (Quantidade === 1) {
        return '1 música na fila';
    }
    return Quantidade + 'músicas na fila';
}

/*----------------------------------------------------------------------------------
funções que mexem na tela 
-----------------------------------------------------------------------------------*/
function mostrarProximaMusica() {
    const lista = document.querySelector('.lista');
    lista.innerHTML = montarItensDaEspera(musicas);
}

function lerNomeMusica() {
    return campoNome.value.trim();
}

function limparCampo() {
    campoNome.value = '';
}

function montarAvisoDoNovoNome(nome, espera) {
    if (nome === '') {
        return 'Escreva o nome.';
    }
    if (espera.includes(nome)) {
        return nome + ' já está na lista.';
    }
    return '';
}

mostrarProximaMusica();

function mostrarFila () {
    telaLista.innerHTML = montarItensDaFila(topoFila);
    telaContagem.textContent = montarTextoDaContagem(topoFila.length);
    botaoproxima.disabled = FileReader.length === 0;
}
/*--------------------------------------------------------------------------------
Escutar
-----------------------------------------------------------------------------------*/

campoNome.addEventListener('input', function () {
    aviso.textContent = '';
});

botaoTocarDepoisDessa.addEventListener('click', function () {
    //const nomeMusica = campoNome.value;
    const nomeMusica = lerNomeMusica();
    aviso.textContent = mostrarAvisodoNovoNome(nomeMusica, musicas);

    if (aviso.textContent === '') {
        musicas.unshift(nomeMusica);
        limparCampo();
        mostrarProximaMusica();
    }
});

botaoRemoverDaFila.addEventListener('click', function () {
    const nomeMusica = lerNomeMusica();
    const posicao = musicas.indexOf(nomeMusica);

    if (nomeMusica === '') {
        aviso.textContent = 'Escreva o nome.';
    } else if (posicao === -1) {
        aviso.textContent = nomeMusica + ' não está na lista.';
    } else {
        musicas.splice(posicao, 1); // Remove do meio corretamente
        aviso.textContent = nomeMusica + ' foi removido da lista.';
        limparCampo();
        mostrarProximaMusica();
    }
});

botaoDesfazerUltima.addEventListener('click', function () {
    if (musicas.length === 0) {
        aviso.textContent = 'Não tem nenhuma música na fila.';
    } else {
        const removido = musicas.pop();
        aviso.textContent = removido + ' saiu da lista.';
        mostrarProximaMusica();
    }});
topoFila.addEventListener('input', function () {
    console.log(topoFila.value + 'Musicas na fila');
});
botaoproxima.addEventListener('click', function () {
    tocandoAgora.textContent = topoFila.shift();
    aviso.textContent= '';
    mostrarProximaMusica();
    /*else (musicas.length === 0) {
        aviso.textContent = 'Nenhuma música na fila para avançar.';
        return; */
    }

    const tocando = musicas.shift();
    tocandoAgora.textContent = tocando;
    aviso.textContent = 'Tocando agora: ' + tocando;
    limparCampo();
    mostrarProximaMusica(); 
});

//comandos, lista de adicionar ao fim, tocar depois dessa, remover da fila e desfazer última.
botaoAdicionarAoFim.addEventListener('click', function () {
    //const nomeMusica = campoNome.value;
    const nomeMusica = lerNomeMusica();
    aviso.textContent = montarAvisoDoNovoNome(nomeMusica, musicas);
    console.log(`aviso.textContent: "${aviso.textContent}"`);
    
        
    if (musicas.includes(nomeMusica)) {
        return nomeMusica + ' já está na lista.';
    }

    if (aviso.textContent === '') {
        musicas.push(nomeMusica);
        mostrarEspera();
        mostrarProximaMusica();
        limparCampo();
    }
});
botao


