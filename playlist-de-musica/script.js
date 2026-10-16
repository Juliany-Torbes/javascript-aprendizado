


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
const nomeChamada = document.querySelector('.nome-chamado');

const iconeRemover = `
<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
<path d="M6 6 L18 18 M18 6 L6 18"
stroke="currentColor" stroke=width="3" stroke-linecap="round" />
</svg>`;

const musicas = ['Perfect Soul', 'Caramel', 'Bring me back to Eden']; // array com os nomes das músicas.
/*---------------------------------------------------------------------------------*/

const chamadas = []/
/*-------------------------------------------------------------------------------------------
funções que só devolvem
-------------------------------------------------------------------------------------------*/
function montarItensDaFila(topoFila) {
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
function criarItemDaEspera(nome, posicao) {
    const item = document.createElement('li');

    const textoDoNome = document.createElement('button');
    textoDoNome.type = 'button';
    textoDoNome.textContent = nome;

    const botaoDesistiu = document.createElement('button');
    botaoDesistiu.type = 'button';
    botaoDesistiu.classList.add('botao-remover');
    
    botaoDesistiu.innerHTML = iconeRemover;

    botaoDesistiu.setAttribute('aria-label', 'Tirar ' + nome + ' da fila');
    botaoDesistiu.addEventListener('click', function () {
        espera.splice(posicao, 1);
        aviso.textContent = nome + ' foi removido.';
        renderizar();
    });

    item.appendChild(textoDoNome);
    if (posicao === 0) {
        const etiqueta = document.createElement('span');
        etiqueta.textContent = 'proximo';
        etiqueta.classList.add('etiqueta');
        item.appendChild(etiqueta);
    }
    item.appendChild(botaoDesistiu);
    return item;
}
function criarItemDaChamada(nomeMusica) {
    const item = document.createElement('li');
    item.textContent = nomeMusica;
    return item;
}


function renderizar() {
        telaLista.innerHTML= '';
        for (let i = 0; i < espera.length; i++) {
            telaLista.appendChild(criarItemDaEspera(espera[i], i));
        
        }
        telaChamadas.innerHTML= '';
        for (let i = 0; i < chamadas.length; i++) {
            telaChamadas.appendChild(criarItemDaChamada(chamadas[i]));
        }
        if (chamadas.length === 0) {
            telaNomeChamada.textContent = 'Nenhuma música';
        } else {
            telaNomeChamada.textContent = chamadas [chamadas.length - 1];
        }
        telaContagem.textContent = montarTextoDaContagem(espera.length);
        
        botaoproxima.disabled = espera.length === 0;

    }

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
renderizar();

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


