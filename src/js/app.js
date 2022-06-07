const form = document.querySelector('.form')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    inssCalc()

})


const inssCalc = () => {
    const res = document.querySelector('.res')
    const descontos = []
    // ATRIBUINDO O INPUT A UMA VARIÁVEL, EM SEGUIDA PEGANDO SEU VALOR
    const salario = document.querySelector('#salario')
    const salarioVal = salario.value


    // OS VALORES MÁXIMOS DE CADA FAIXA
    const teto1 = 1212
    const teto2 = 2427.35
    const teto3 = 3641.03
    const teto4 = 7087.22

    // A PORCERNTAGEM DE DESCONDO DE CADA FAIXA
    const porCent1 = 0.075
    const porCent2 = 0.09
    const porCent3 = 0.12
    const porCent4 = 0.14

    // OS DESCONTOS "PADRÃO" DE CADA FAIXA, CASO O VALOR DO SALÁRIO AS ULTRAPASSE
    const desconto1 = teto1 * porCent1
    const desconto2 = (teto2 - (teto1 + .01)) * porCent2
    const desconto3 = (teto3 - (teto2 + .01)) * porCent3
    const desconto4 = (teto4 - (teto3 + .01)) * porCent4

    // ADICIONANDO ESSES DESCONTOS A UMA LISTA
    descontos.push(desconto1)
    descontos.push(desconto2)
    descontos.push(desconto3)
    descontos.push(desconto4)


    if (salarioVal > 0 && salarioVal <= teto1) {
        const descontoFaixa1 = (salarioVal * porCent1).toFixed(2)
        const salarioLiq = salarioVal - descontoFaixa1
        res.innerHTML = `Após o desconto de <span>R$${descontoFaixa1}</span> do INSS,<br> o seu salário líquido será de <span>R$${salarioLiq.toFixed(2)}</span>`
    } else if (salarioVal > teto1 && salarioVal <= teto2) {
        const descontoFaixa2 = ((salarioVal - (teto1 + .01)) * porCent2) + Number(descontos[0])
        const salarioLiq = salarioVal - descontoFaixa2
        res.innerHTML = `Após o desconto de <span>R$${descontoFaixa2.toFixed(2)}</span> do INSS,<br> o seu salário líquido será de <span>R$${salarioLiq.toFixed(2)}</span>`
    } else if (salarioVal > teto2 && salarioVal <= teto3) {
        const descontoFaixa3 = (((salarioVal - (teto2 + .01)) * porCent3) + Number(descontos[0]) + Number(descontos[1]))
        const salarioLiq = salarioVal - descontoFaixa3
        res.innerHTML = `Após o desconto de <span>R$${descontoFaixa3.toFixed(2)}</span> do INSS,<br> o seu salário líquido será de <span>R$${salarioLiq.toFixed(2)}</span>`
    } else if (salarioVal > teto3 && salarioVal <= teto4) {
        const descontoFaixa4 = (((salarioVal - (teto3 + .01)) * porCent4) + Number(descontos[0]) + Number(descontos[1]) + Number(descontos[2]))
        const salarioLiq = salarioVal - descontoFaixa4
        res.innerHTML = `Após o desconto de <span>R$${descontoFaixa4.toFixed(2)}</span> do INSS,<br> o seu salário líquido será de <span>R$${salarioLiq.toFixed(2)}</span>`
    } else if (salarioVal > teto4) {
        const descontoTeto = (Number(descontos[0]) + Number(descontos[1]) + Number(descontos[2]) + Number(descontos[3]))
        const salarioLiq = salarioVal - descontoTeto
        res.innerHTML = `Após o desconto de <span>R$${descontoTeto.toFixed(2)}</span> do INSS,<br> o seu salário líquido será de <span>R$${salarioLiq.toFixed(2)}</span>`
    } else if (salarioVal == "" || typeof salarioVal == 'string') {
        res.innerHTML = `Digite um valor válido!!!`
        // ANIMAÇÃO DE ERRO CASO O VALOR DIGITADO SEJA INVÁLIDO
        const animation = (cont) => {
            var cont = document.querySelector('.container')
            cont.classList.add('error-animation')
            setTimeout(function () {
                cont.classList.remove('error-animation')
                res.innerHTML = ""
            }, 500)
        }
        animation()
    }


    clear(res, salario)
}

// LIMPA  O RESULTADO ANTERIOR
const clear = (res, salario) => {
    const btnClear = document.querySelector('.form__input--clear')
    btnClear.addEventListener('click', (e) => {
        e.preventDefault();
        res.innerHTML = ""
        salario.value = ""
        salario.focus()
    })
}