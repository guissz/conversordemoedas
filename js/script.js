const listaPaises = document.querySelectorAll('.lista-drop select')
const converterDe = document.querySelector('.converter-de select')
const converterPara = document.querySelector('.converter-para select')
const botao = document.querySelector('button')

for (let i = 0; i < listaPaises.length; i++) {
    for (pais in paises) {
        let selecionado = ''
        if (i === 0 && pais === 'BRL') {
            selecionado = 'selected'
        } else if (i === 1 && pais === 'USD') {
            selecionado = 'selected'
        }
        let opcao = `<option value="${pais}" ${selecionado}>${pais}</option>`
        listaPaises[i].insertAdjacentHTML('beforeend', opcao)
    }
    listaPaises[i].addEventListener('change', e => {
        alterarBandeira(e.target)
    })
}

function alterarBandeira(elemento) {
    for (codigo in paises) {
        if (codigo == elemento.value) {
            let img = elemento.parentElement.querySelector('img')
            img.src = `https://flagsapi.com/${paises[codigo]}/flat/64.png`
        }
    }
}

botao.addEventListener('click', e => {
    e.preventDefault()
    converterMoedas()
});

const alterar = document.querySelector('.lista-drop i')
alterar.addEventListener('click', () => {
    let alterarCodigo = converterDe.value
    converterDe.value = converterPara.value
    converterPara.value = alterarCodigo
    alterarBandeira(converterDe)
    alterarBandeira(converterPara)
    converterMoedas()
})

function converterMoedas() {
    const quantidade = document.querySelector('.valor input');
    let valorQuantidade = quantidade.value
    if (valorQuantidade === '' || valorQuantidade === '0') {
        quantidade.value = '1'
        valorQuantidade = 1
    }
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${converterDe.value}`
    fetch(url).then(resposta => resposta.json()).then(resultado => {
        let taxaConversao = resultado.conversion_rates[converterPara.value]
        let total = (valorQuantidade * taxaConversao).toFixed(2)
        const texto = document.querySelector('.taxa-conversao')
        texto.innerHTML = `${valorQuantidade} ${converterDe.value} = ${total} ${converterPara.value}`
    })
}
