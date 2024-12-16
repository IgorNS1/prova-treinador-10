const startGameButton = document.querySelector('.start-game')
const title = document.querySelector('h1')
const questionContainer = document.querySelector('.question-container')
const questionText = document.querySelector('.question')
const answersContainer = document.querySelector('.answers-container')
const nextQuestionButton = document.querySelector('.next-question')

startGameButton.addEventListener('click', startGame)
nextQuestionButton.addEventListener('click', displayNextQuestion)

let currentQuestionIndex = 0 // contador das questões
let totalCorrect = 0

function startGame() {
    startGameButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    title.classList.add('hide')
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions_page_10.length === currentQuestionIndex) {
        return finishGame()
    }

    questionText.textContent = questions_page_10[currentQuestionIndex].question
    questions_page_10[currentQuestionIndex].answer.forEach(answer => {
        const newAnswer = document.createElement('button')

        newAnswer.classList.add('button', 'answer')
        newAnswer.textContent = answer.text

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }

        answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener('click', selectAnswer)
    })
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild)
    }

    document.body.removeAttribute('class')
    nextQuestionButton.classList.add('hide')
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add('correct')
        document.body.classList.remove('incorrect')
        totalCorrect++
    } else {
        document.body.classList.add('incorrect')
        document.body.classList.remove('correct')
    }

    document.querySelectorAll('.answer').forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct')
        } else {
            button.classList.add('incorrect')
        }
        button.disabled = true
    })

    nextQuestionButton.classList.remove('hide')
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions_page_10.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ''

    switch (true) {
        case (performance >= 90):
            message = 'Execelente :D'
            break
        case (performance >= 70):
            message = 'Muito Bom :)'
            break
        case (performance >= 50):
            message = 'Bom :|'
            break
        case (performance >= 30):
            message = 'Precisa Melhorar :('
            break
        default:
            message = 'Precisa Melhorar MUITO D:'
    }

    questionContainer.innerHTML =
        `
            <p class="final-message">
                Você acertou ${totalCorrect} de ${totalQuestion} questôes!
                <span>Resultado: ${message}</span>
            </p>
        
            <button onclick="window.location.reload()" class="button">Refazer teste</button>

        `
}

const questions_page_10 = [
    {
        question: 'Quais itens devemos garantir na cozinha sobre Segurança do Alimento?',
        answer: [
            { text: 'Sempre use produtos congelados em todas as receitas.', correct: false },
            { text: 'Armazene todos os alimentos em temperatura ambiente.', correct: false },
            { text: 'Mantenha todos os alimentos no local de armazenamento correto e nunca sirva comida crua ou mal cozida.', correct: true },
            { text: 'Utilize todos os ingredientes sem verificar a validade.', correct: false },
        ]
    },
    {
        question: 'Quais os 3 comportamentos principais do pilar "Cumprimos o que prometemos"?',
        answer: [
            { text: 'Fazer bem, Fazer simples e Fazer eficiente.', correct: false },
            { text: 'Fazer bem, Fazer especial e Fazer rápido.', correct: true },
            { text: 'Fazer rápido, Fazer barato e Fazer especial.', correct: false },
            { text: 'Fazer especial, Fazer simples e Fazer rápido.', correct: false },
        ]
    },
    {
        question: 'Quais os cuidados para prevenir quedas?',
        answer: [
            { text: 'Utilizar sinalização visível em pisos escorregadios.', correct: false },
            { text: 'Manter áreas de passagem desobstruídas e limpas.', correct: false },
            { text: 'Usar sapatos antiderrapantes.', correct: false },
            { text: 'Todas as demais alternativas estão corretas.', correct: true },
        ]
    },
    {
        question: 'Quais os Equipamentos de Proteção para áreas quentes como Chapas e Fritadeiras?',
        answer: [
            { text: 'Usar apenas avental e luvas.', correct: false },
            { text: 'Usar apenas luvas e botas.', correct: false },
            { text: 'Usar uniforme completo e proteção para a cabeça.', correct: false },
            { text: 'Usar mangotes, avental e calçado de segurança.', correct: true },
        ]
    },
    {
        question: 'Quais são as causas de um pão ressecado?',
        answer: [
            { text: 'Todas as alternativas estão corretas.', correct: true },
            { text: 'Exposição ao ar por muito tempo.', correct: false },
            { text: 'Armazenamento incorreto em temperaturas inadequadas.', correct: false },
            { text: 'Uso de ingredientes de baixa qualidade.', correct: false },
        ]
    },
    {
        question: 'Quais são as etapas da jornada do cliente no restaurante?',
        answer: [
            { text: 'Chega; Pede; Come; Paga; Saí.', correct: false },
            { text: 'Chega; Pede; Recebe; Come; Paga.', correct: false },
            { text: 'Chega; Pede e pega; Recebe; Come; Saí.', correct: true },
            { text: 'Chega; Recebe; Come; Paga; Saí.', correct: false },
        ]
    },
    {
        question: 'Quais são as ferramentas para limpeza de pisos?',
        answer: [
            { text: 'Vassouras, pás de lixo, esfregões, placas de aviso "cuidado chão molhado" e solução para pisos.', correct: true },
            { text: 'Balde, panos, vassoura e produtos químicos.', correct: false },
            { text: 'Esfregão, mop, vassoura e balde.', correct: false },
            { text: 'Aspirador de pó, esfregão e solução para pisos.', correct: false },
        ]
    },
    {
        question: 'Quais são as formas de cumprir a promessa da Experiência do Cliente utilizando o Pilar: Fazer Bem?',
        answer: [
            { text: 'Faça sempre o processo mais rápido possível, sem comprometer a qualidade.', correct: false },
            { text: 'Siga os procedimentos de preparo/Manipule corretamente os produtos/Não segure os alimentos por muito tempo/Siga os procedimentos de segurança do alimento/Se algo estiver errado, avise imediatamente.', correct: true },
            { text: 'Use ingredientes frescos e nunca repita um prato.', correct: false },
            { text: 'Siga os padrões de serviço e ofereça sempre descontos para fidelizar clientes.', correct: false },
        ]
    },
    {
        question: 'Quais são as situações diferentes que precisamos ficar atentos durante o trabalho?',
        answer: [
            { text: 'Devemos nos concentrar somente em atender os clientes rapidamente.', correct: false },
            { text: 'Precisamos ficar atentos a situações como derramamentos de produtos, condições inseguras para os funcionários e clientes ou itens que necessitem de manutenção e reparo.', correct: true },
            { text: 'Precisamos focar apenas na limpeza da cozinha.', correct: false },
            { text: 'Devemos prestar atenção apenas em falhas de equipamentos.', correct: false },
        ]
    },
    {
        question: 'Quais são as zonas de perigo da UHC?',
        answer: [
            { text: 'Se a temperatura interna da UHC for superior a 50°C, a comida pode estar contaminada.', correct: false },
            { text: 'Se houver alimentos fora de temperatura, eles devem ser descartados.', correct: false },
            { text: 'Se as gavetas estiverem cheias, deve-se verificar a qualidade do alimento.', correct: false },
            { text: 'Se houver 3 ou mais gavetas vazias de produtos na UHC, peça ajuda para recuperar o nível.', correct: true },
        ]
    },
    {
        question: 'Quais são os diferentes tamanhos de sacos disponíveis?',
        answer: [
            { text: 'Tamanhos de sacos pequenos, médios e grandes.', correct: false },
            { text: 'Sacos grandes e sacos gigantes.', correct: false },
            { text: '"Sacos A, B, C e D".', correct: true },
            { text: 'Sacolas de papel, sacos plásticos e sacos ecológicos.', correct: false },
        ]
    },
    {
        question: 'Quais são os equipamentos que você deve conhecer na sua área?',
        answer: [
            { text: 'Apenas o menu digital e a caixa (POS).', correct: false },
            { text: 'O scanner, a impressora de cupom fiscal e a caixa (POS).', correct: false },
            { text: 'Apenas o leitor de cartões e o POS.', correct: false },
            { text: 'Menu digital e físico, caixa (POS), scanner, leitor de cartões, impressora de cupom fiscal e localizadores de mesa.', correct: true },
        ]
    },
    {
        question: 'Quais são os inimigos da gordura?',
        answer: [
            { text: 'Resíduos de carbono, água, ar, sal, alta temperatura e detergente.', correct: true },
            { text: 'Água e óleo.', correct: false },
            { text: 'Alimentos frios e gordurosos.', correct: false },
            { text: 'Temperaturas baixas e altas pressões.', correct: false },
        ]
    },
    {
        question: 'Quais são os passos que devem ser feitos para receber os pagamentos dos pedidos?',
        answer: [
            { text: 'Informe o valor total devido - Receba o pagamento - Conclua o pagamento - (se necessário) Entregue o troco.', correct: true },
            { text: 'Verifique o pagamento antes de informar o valor total.', correct: false },
            { text: 'Receba o pagamento e finalize o pedido sem dar troco.', correct: false },
            { text: 'Informe o valor total, receba o pagamento e entregue os itens antes de concluir o pagamento.', correct: false },
        ]
    },
    {
        question: 'Quais são os tipos de extintores existentes nos restaurantes?',
        answer: [
            { text: 'Extintores apenas de dióxido de carbono (CO2).', correct: false },
            { text: 'Extintores de água e pó apenas.', correct: false },
            { text: 'Extintores de água, dióxido de carbono (CO2) e pó ABC ou BC são utilizados.', correct: true },
            { text: 'Extintores de água, pó e óleo.', correct: false },
        ]
    },
    {
        question: 'Quais são os três pilares para garantir a experiência do cliente?',
        answer: [
            { text: 'Fazer especial, Fazer rápido, Fazer simples.', correct: false },
            { text: 'Fazer bem, Fazer especial, Fazer rápido.', correct: true },
            { text: 'Fazer rápido, Fazer barato, Fazer bem.', correct: false },
            { text: 'Fazer bem, Fazer simples, Fazer rápido.', correct: false },
        ]
    },
    {
        question: 'Quais sinais corporais devem ser EVITADOS?',
        answer: [
            { text: 'Sorrir e fazer contato visual.', correct: false },
            { text: 'Postura aberta e receptiva.', correct: false },
            { text: 'Manter os braços na altura da cintura.', correct: false },
            { text: 'Braços Cruzados e falta de contato visual.', correct: true },
        ]
    },
    {
        question: 'Qual a afirmação correta?',
        answer: [
            { text: 'Todos os nossos sanduíches são preparados na hora com ingredientes frescos.', correct: false },
            { text: 'Alguns dos sanduíches ou bebidas que vendemos têm ingredientes que precisam ser tratados ou preparados antes de usá-los.', correct: true },
            { text: 'Não há necessidade de preparo de ingredientes antes de usá-los.', correct: false },
            { text: 'Os ingredientes são sempre servidos diretamente do fornecedor para os clientes.', correct: false },
        ]
    },
    {
        question: 'Qual a cebola usamos para o Cheeseburger?',
        answer: [
            { text: 'Usamos cebola fresca.', correct: false },
            { text: 'Usamos cebola desidratada.', correct: false },
            { text: 'Usamos a cebola reidratada.', correct: true },
            { text: 'Usamos cebola caramelizada.', correct: false },
        ]
    },
];
