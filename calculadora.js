// scripts.js

// Obtenção de referências para os elementos HTML
const formIMC = document.getElementById('form-imc');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const valorIMCSpan = document.getElementById('valor-imc');
const classificacaoP = document.getElementById('classificacao');
const recomendacaoP = document.getElementById('recomendacao');
const resultadoDiv = document.getElementById('resultado');
const errorMessageDiv = document.getElementById('error-message');

// Função para exibir uma mensagem de erro
function showError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block'; // Mostra a div de erro
    resultadoDiv.style.display = 'none'; // Esconde a div de resultado
}

// Função para esconder a mensagem de erro
function hideError() {
    errorMessageDiv.textContent = '';
    errorMessageDiv.style.display = 'none'; // Esconde a div de erro
}

// Função principal para calcular o IMC
function calcularIMC(peso, alturaCm) {
    // Converte altura de centímetros para metros
    const alturaMetros = alturaCm / 100;
    // Fórmula do IMC: peso (kg) / (altura (m) * altura (m))
    return peso / (alturaMetros ** 2);
}

// Função para classificar o IMC e retornar a categoria
function classificarIMC(imc) {
    if (imc < 18.5) {
        return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        return 'Peso normal';
    } else if (imc >= 25.0 && imc <= 29.9) {
        return 'Sobrepeso';
    } else if (imc >= 30.0 && imc <= 34.9) {
        return 'Obesidade Grau I';
    } else if (imc >= 35.0 && imc <= 39.9) {
        return 'Obesidade Grau II (Severa)';
    } else { // imc >= 40.0
        return 'Obesidade Grau III (Mórbida)';
    }
}

// Função para fornecer uma recomendação básica com base na classificação do IMC
function recomendarBaseadoNoIMC(classificacao) {
    switch (classificacao) {
        case 'Abaixo do peso':
            return 'É importante buscar orientação médica para avaliar sua alimentação e saúde.';
        case 'Peso normal':
            return 'Parabéns! Mantenha hábitos saudáveis para preservar seu peso ideal.';
        case 'Sobrepeso':
            return 'É recomendável buscar orientação para ajustes na dieta e prática de exercícios.';
        case 'Obesidade Grau I':
            return 'Considere procurar um profissional de saúde para um plano de emagrecimento.';
        case 'Obesidade Grau II (Severa)':
            return 'Procure imediatamente um médico ou nutricionista para um plano de saúde.';
        case 'Obesidade Grau III (Mórbida)':
            return 'É crucial buscar ajuda médica especializada para tratamento e acompanhamento.';
        default:
            return '';
    }
}

// Adiciona um 'listener' de evento ao formulário de cálculo do IMC
formIMC.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

    // Esconde qualquer mensagem de erro anterior
    hideError();

    // Coleta os valores do formulário e tenta convertê-los para números decimais (float)
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    // Validação dos inputs
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        showError('Por favor, insira valores válidos e positivos para peso e altura.');
        return; // Sai da função se houver erro
    }

    // Validação adicional para valores absurdos (opcional, mas útil para UX)
    if (peso > 300 || peso < 10) { // Ex: Peso muito alto ou muito baixo
        showError('Peso inválido. Por favor, insira um peso mais realista (entre 10kg e 300kg).');
        return;
    }
    if (altura > 250 || altura < 50) { // Ex: Altura muito alta ou muito baixa
        showError('Altura inválida. Por favor, insira uma altura mais realista (entre 50cm e 250cm).');
        return;
    }

    // Calcula o IMC
    const imc = calcularIMC(peso, altura);
    // Classifica o IMC
    const classificacao = classificarIMC(imc);
    // Obtém a recomendação
    const recomendacao = recomendarBaseadoNoIMC(classificacao);

    // Exibe o resultado no HTML
    valorIMCSpan.textContent = imc.toFixed(2); // Formata o IMC com 2 casas decimais
    classificacaoP.textContent = `Classificação: ${classificacao}`;
    recomendacaoP.textContent = `Recomendação: ${recomendacao}`;

    resultadoDiv.style.display = 'block'; // Mostra a div de resultado
});

// Opcional: Adiciona um listener para limpar os resultados quando os inputs mudarem
// Isso esconde o resultado e a mensagem de erro se o usuário começar a digitar novamente
pesoInput.addEventListener('input', () => {
    resultadoDiv.style.display = 'none';
    hideError();
});
alturaInput.addEventListener('input', () => {
    resultadoDiv.style.display = 'none';
    hideError();
});