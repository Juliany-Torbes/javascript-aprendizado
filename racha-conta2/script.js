/* ===========================================================
Pra onde foi meu dinheiro? — GABARITO da primeira etapa

Só o que a turma já viu: const, let, if/else if/else,
acumulador, contador, querySelector, addEventListener,
.value, textContent e classList.

Três coisas novas, pequenas:
    - evento.preventDefault()   impede o formulário de
                                recarregar a página
    - .trim()                   tira os espaços das pontas
    - .replace('.', ',')        troca o ponto pela vírgula

Nada de arrays nem funções declaradas. A formatação de
valores se repete várias vezes de propósito — é o gancho
para funções mais adiante.
   ========================================================== */


/* -----------------------------------------------------------
Selecionar
   ----------------------------------------------------------- */
const botaoRemover = document.querySelector('.botao-remover');
const botaoDesfazerUltimoGasto = document.querySelector('.botao-desfazer');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');
const formulario = document.querySelector('.formulario');

/*----------------------------------------------------------------------------
/*----------------------------------------------------------------------------
painel
------------------------------------------------------------------------------*/
const telaTotal = document.querySelector('.total');
const telaQuantidade = document.querySelector('.quantidade');
const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaLinhas = document.querySelector('.linhas');
const telaRestante = document.querySelector('.restante');
const telaHistorico = document.querySelector('.listas');
const telaMediaRodape = document.querySelector('.rodape');
const telaMenor = document.querySelector('.menor');

const listas = [
    {'descricao':'lanche','valor':12.50},
    {'descricao':'onibus','valor':4.35},
    {'descricao':'cinema','valor':30.00},
    {'descricao':'pipoca','valor':12.50}
];


if (campoValor >= 0){
    console.log('valor positivo');
}else{
    console.log('valor negativo');
}


function montarItensHistorico(listas) {
    let itens = '';
    for (let index = 0; index < listas.length; index++) {
        itens = itens + `<li>${listas[index].descricao} - ${listas[index].valor}</li>`;
        
    }
    return itens;
}

function formatarReais(valor) {
    return  valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* -----------------------------------------------------------
Valores fixos
   ----------------------------------------------------------- */

const ORCAMENTO = 50;


/* -----------------------------------------------------------
O que o programa precisa lembrar entre um gasto e outro.

Ficam FORA do ouvinte: se ficassem dentro, nasceriam de
novo a cada gasto e o total nunca passaria de um valor.
   ----------------------------------------------------------- */

let total = 0;              // acumulador
let quantidade = 0;         // contador
let maiorValor = 0;         // o maior visto até agora
let maiorDescricao = '';
let historico = '';         // acumulador de texto


/* -----------------------------------------------------------
Escutar e alterar
   ----------------------------------------------------------- */

   function calcularTotal (gastos) {
    let soma = 0;
    for (let i = 0; i < gastos.length; i++) {
        soma = soma + gastos[i].valor;
    }
    return soma;
   }
formulario.addEventListener('submit', function (evento) {

    /* Sem esta linha, o formulário tenta enviar os dados e a
       página recarrega — e tudo o que foi somado some. */
    evento.preventDefault();

    /* trim() tira os espaços do começo e do fim. Sem ele, uma
       descrição com três espaços passaria na validação. */
    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);

    /* Validação: o primeiro teste verdadeiro para a cadeia.
       Só chega no else quem passou por todos. */
    if (descricao === '') {
        erro.textContent = 'Escreva uma descrição.';
    } else if (campoValor.value === '') {
        erro.textContent = 'Informe o valor.';
    } else if (valor <= 0) {
        erro.textContent = 'O valor precisa ser maior que zero.';
    } else {
        listas.push({'descricao': descricao, 'valor': valor});
        erro.textContent = '';

        // ===== ANTES DO INTERVALO — guiado =================

        // o total
        total = total + valor;

        // o maior gasto
        /* Com > (e não >=), em caso de empate fica o
           primeiro gasto que chegou naquele valor. */
        if (valor > maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;

        if (valor < maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;
        }
        }



        // ===== DEPOIS DO INTERVALO — atividade =============

        // parte 1: quantidade
        quantidade = quantidade + 1;

        // parte 2: média — calculada na hora, não precisa
        // ser lembrada entre um gasto e outro
        const media = total / quantidade;

        // parte 3: histórico
        historico = historico + descricao + ' — R$ ' + formatarReais(valor) + '\n';

        // parte 4: orçamento
        const restante = ORCAMENTO - total;

        if (restante >= 0) {
            telaRestante.textContent = 'R$ ' + formatarReais(restante) + ' disponíveis';
        } else {
            telaRestante.textContent = 'Passou R$ ' + formatarReais(-restante) + ' do orçamento';
        }

        if (total > ORCAMENTO) {
            telaTotal.classList.add('estourado');
            telaRestante.classList.add('estourado');
        } else {
            telaTotal.classList.remove('estourado');
            telaRestante.classList.remove('estourado');
        }

        function montarItens(historico){
            let itens= '';
            for (let i = 0; i < historico.length; i++){
                itens += '<li>' + historico[i].descricao + ' — R$ ' + formatarReais(historico[i].valor) + '</li>';
            }
            return itens;
        }
        function mostrarHistorico(quantidade) {
            if (quantidade === 0) {
                return 'Nenhum gasto';
            }
                if (quantidade === 1) {
                return '1 gasto total';
            }
                return quantidade + 'gastos totais';
        }

        botaoDesfazerUltimoGasto.addEventListener('click', function () {
            if (listas.length === 0) {
                aviso.textContent = removido + 'removido do historico.';
                mostrarproximogasto();
            }
        });

        function formatarGasto(listas) {
            return listas.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1});
        }
        function calcularSoma(listas) {
            let soma = 0;
            for (let i = 0; i < listas.length; i++) {
                soma = soma + listas[i].valor;
            
            }
            return soma;
        }

        function calcularMedia(soma, quantidade) {
            if (quantidade === 0) {
                return 0;
            }
            return soma / quantidade;
        }

        function encontrarMaiorGasto(listas) {
            let maior = listas[0];
            for (let i = 1; i < listas.length; i++) {
                if (listas[i].valor > maior.valor) {
                    maior = listas[i];
                }
            }
            return maior;
        }

        function encontrarMenorGasto(listas) {
            let menor = listas[0];
            for (let i = 1; i < listas.length; i++) {
                if (listas[i].valor < menor.valor) {
                menor = listas[i];
                }
            }
            return menor;
        }

        function montarLinhasDaTabela(gastos) {
            let linhas= '';
            for (let i = 0; i < gastos.length; i++) {
                linhas += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${listas[i].descricao}</td>
                    <td>${formatarGasto(listas[i].valor)}</td>
                    </tr>`;
            }
            return linhas;
        }

        function renderizacao () {
            const total = calcularTotal(listas);
            const quantidade = listas.length;
            const media = quantidade > 0 ? total / quantidade : 0;
            const maior = calcularMaiorGasto(listas);
            const menor = calcularMenorGasto(listas);
            const restante = ORCAMENTO - total;
            
            telaTotal.textContent = 'R$' + formatarReais(restante) + 'dispoíveis';
            telaQuantidade.textContent = quantidade;
            telaMedia.textContent = 'R$' + formatarReais(media);
            if (quantidade === 0) {
                telaMaior.textContent = '-';
                telaMenor.textContent = '-';
            
            } else {
                telaMaior.textContent = `${maiorDescricao} - R$ ${formatarReais(maior.valoralor)}`;
                telaMenor.textContent = `${menorDescricao} - R$ ${formatarReais(menor.valor)}`;
            }
        }
        if (telaLinhas) {
        telaLinhas.innerHTML = montarLinhasTabela(listas);
        }
        botaoDesfazerUltimoGasto.disabled = (quantidade === 0);
    }

    renderizacao();

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const descricap = campoDescricao.value.trim();
        const valor = Number(campoValor.value);

        if (descricao === '') {
            erro.textContent = 'Escreva um texto.';
        } else if (campoValor.value === '') {
            erro.textContent = 'Informe o valor.';
        } else if (valor <= 0) {
            erro.textContent = 'O valor precisa ser maior que zero.';
        } else {
            erro.textContent= '';
            
            listas.push({'descricao': descricao, 'valor': valor});
            renderizacao();
            campoDescricao.value = '';
            campoValor.value = '';
        }
    });
        
        function montarTextoDoGasto(item) {
            return item.descricao + ' - ' + formatarGasto(item.valor);
        }

        const telaLinhas = document.querySelector('.linhas');

        function mostrarResumo() {
            const soma = calcularSoma(listas);
            const media = calcularMedia(soma, listas.length);

            telaLinhas.innerHTMl = montarLinhasDaTabela(listas);

            if (listas.length === 0) {
                telaMedia.textContent= '-';
                telaMediaRodape.textContent = '-';
                telaMaior.textContent = '-';
                telaMenor.textContent = '-';
            } else {
                telaMedia.textContent = formatarGasto(media);
                telaMediaRodape.textContent = formatarGasto(media);
                telaMaior.textContent = montarTextoDoGasto(encontrarMaiorGasto(listas));
                telaMenor.textContent = montarTextoDoGasto(encontrarMenorGasto(listas));
            }
            botaoDesfazerUltimoGasto.disabled = listas.length === 0;
        }

        //mostrarGastos();

        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
            const item = {
                descricao: campoDescricao.value.trim(),
                valor: Number(campoValor.value)
            };
            if (item.descricao !== '' && campoDescricao.value !== '') {
                listas.push(item);
                campoDescricao.value = '';
                campoValor.value= '';
                //mostrarGastos();
            }
        });

        

        botaoRemover.addEventListener('click', function () {
            listas.pop();
            //mostrarGastos();
        });



        
        
        //media 
        //let media = 0;
        //calcularMedia
        //const telaTotal = valor + formatarReais(total);
    //const telaQuantidade = 
    //const telaMedia = 
    //const telaMaior = 

    //const TelaTotal = '.campo-valor + formatarReais(campo-valor) + '\n';

        // ===== mostrar na tela ============================

        telaTotal.textContent = 'R$ ' + formatarReais(total);
        telaQuantidade.textContent = quantidade;
        telaMedia.textContent = 'R$ ' + formatarReais(media);
        telaMaior.textContent = maiorDescricao + ' — R$ ' + formatarReais(maiorValor);
        telaHistorico.innerHTMl = montarItensHistorico(listas);

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';
});
