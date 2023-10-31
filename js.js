function formatarComoPorcentagem(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    valor = valor.replace(/^0+/, ''); // Remove zeros à esquerda
    input.value = valor ? `${valor}%` : '';
}

function formatarComoMoeda(input) {
    let valor = input.value.replace(/\D/g, '').replace(/^0+/, '');
    if (valor.length === 0) {
        valor = '0,00';
    } else if (valor.length === 1) {
        valor = '0,0' + valor;
    } else if (valor.length === 2) {
        valor = '0,' + valor;
    } else {
        valor = valor.replace(/(\d+)(\d{2})$/, '$1,$2').replace(/\d(?=(\d{3})+(?!\d))/g, '$&,');
    }
    input.value = valor;
}

function calcularFaturamentoNecessario() {
    let margemDeLucroInput = document.getElementById('margemLucro');
    let perdaInput = document.getElementById('valorPerda');
    let resultadoDiv = document.getElementById('resultado');

    // Verifica se os campos estão vazios
    if (!margemDeLucroInput.value.trim() || !perdaInput.value.trim()) {
        resultadoDiv.innerText = "Por favor, preencha todos os campos.";
        return;
    }

    let margemDeLucro = margemDeLucroInput.value.replace('%', '') / 100;
    let perda = perdaInput.value.replace(/\D/g, '');

    if (isNaN(margemDeLucro) || isNaN(perda)) {
        resultadoDiv.innerText = "Por favor, insira valores numéricos válidos.";
        return;
    }

    let faturamentoNecessario = perda / margemDeLucro;

    // Formatação para o padrão brasileiro
    let resultadoFormatado = faturamentoNecessario.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    resultadoDiv.innerText = `Para cobrir uma perda de R$ ${parseFloat(perda).toLocaleString('pt-BR')}, a empresa precisa faturar ${resultadoFormatado}.`;
}