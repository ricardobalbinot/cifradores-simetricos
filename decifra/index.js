const frequenciaLetrasPtBr = [
  'A',
  'E',
  'O',
  'S',
  'R',
  'I',
  'N',
  'D',
  'M',
  'U',
  'T',
  'C',
  'L',
  'P',
  'V',
  'G',
  'H',
  'Q',
  'B',
  'F',
  'Z',
  'J',
  'X',
  'K',
  'Y',
  'W',
]

const incidencia = {}
const deslocamentoCaracteres = {}

const deslocaCaractereASCII = (caractere, deslocamento) => {
  const codigoASCII = caractere.charCodeAt(0)
  let codigoPrimeiroCarac
  let tamanhoAlfabeto = 26

  if (codigoASCII >= 65 && codigoASCII <= 90) {
    codigoPrimeiroCarac = 90
  } else if (codigoASCII >= 97 && codigoASCII <= 122) {
    codigoPrimeiroCarac = 122
  } else if (codigoASCII >= 48 && codigoASCII <= 57) {
    codigoPrimeiroCarac = 57
    tamanhoAlfabeto = 10
  } else {
    return caractere
  }

  return String.fromCharCode(
    ((codigoASCII - codigoPrimeiroCarac + deslocamento) % tamanhoAlfabeto) + codigoPrimeiroCarac
  )
}

const decifrarMensagem = (deslocamento, frase) => {
  let fraseDecifrada = ''

  // Desfaz o deslocamento de cada caractere
  Array(...frase).map((caractere) => {
    fraseDecifrada = fraseDecifrada.concat(deslocaCaractereASCII(caractere, deslocamento))
  })

  process.stdout.write(fraseDecifrada)
}

const calcularFrequencia = (frase) => {
  // Limpa a frase obtida para fazer a comparação de frequências apenas com letras
  const fraseSimplificada = frase.replace(/[^[A-Za-z]/g, '').toUpperCase()

  // Calcula a frequência relativa correspondente a cada caractere da frase
  const frequenciaPorCaractere = parseFloat((100 / fraseSimplificada.length).toFixed(2))

  // Calcula a indicência em % de cada caractere na frase
  Array(...fraseSimplificada).map((caractere) => {
    const valor = incidencia[caractere] + frequenciaPorCaractere || frequenciaPorCaractere
    incidencia[caractere] = parseFloat(valor.toFixed(2))
  })

  // Ordena as indicências pelo seu valor
  const incidenciaOrdenada = Object.entries(incidencia)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})

  // Faz a comparação com as inciências da Língua Portuguesa e
  Object.keys(incidenciaOrdenada).map((letra, index) => {
    const deslocamento = letra.charCodeAt(0) - frequenciaLetrasPtBr[index].charCodeAt(0)
    deslocamentoCaracteres[deslocamento] = deslocamentoCaracteres[deslocamento] + 1 || 1
  })

  let deslocamentoEncontrado = Object.keys(deslocamentoCaracteres)[0]
  let maiorFrequenciaDeslocamento = 1

  // Encontra o deslocamento com mais incidências
  Object.keys(deslocamentoCaracteres).map((deslocamento) => {
    if (parseInt(deslocamentoCaracteres[deslocamento]) > maiorFrequenciaDeslocamento) {
      maiorFrequenciaDeslocamento = parseInt(deslocamentoCaracteres[deslocamento])
      deslocamentoEncontrado = Math.abs(deslocamento)
    }
  })

  return deslocamentoEncontrado
}

const decifradorPorFrequencia = () => {
  process.stdin.on('data', (fraseOriginal) => {
    const frase = fraseOriginal.toString()

    // Busca o possível deslocamento utilizado para cifrar a mensagem
    const deslocamento = calcularFrequencia(frase)

    console.log('Chave: ' + deslocamento + '\n')

    // Utiliza o decodificador de deslocamento encontrado para decifrar utilizando César
    // Invoca o método responsável por decifrar a frase
    decifrarMensagem(-deslocamento, frase)
  })
}

// Invoca a função principal ao executar o arquivo
decifradorPorFrequencia()
