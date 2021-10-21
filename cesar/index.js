const deslocaCaractereASCII = (caractere, deslocamento, cifrando = true) => {
  const codigoASCII = caractere.charCodeAt(0)
  let codigoPrimeiroCarac
  let tamanhoAlfabeto = 26

  if (codigoASCII >= 65 && codigoASCII <= 90) {
    codigoPrimeiroCarac = cifrando ? 65 : 90
  } else if (codigoASCII >= 97 && codigoASCII <= 122) {
    codigoPrimeiroCarac = cifrando ? 97 : 122
  } else if (codigoASCII >= 48 && codigoASCII <= 57) {
    codigoPrimeiroCarac = cifrando ? 48 : 57
    tamanhoAlfabeto = 10
  } else {
    return caractere
  }

  // Subtrai-se o codigoPrimeiroCarac para saber o número do caractere no alfabeto
  // Após somar o deslocamento, utiliza-se o resto da divisão pelo tamanho do alfabeto para verificar se ultrapassou seu fim
  // Soma-se novamente o codigoPrimeiroCarac para voltar a conversão para um caractere ASCII
  return String.fromCharCode(
    ((codigoASCII - codigoPrimeiroCarac + deslocamento) % tamanhoAlfabeto) + codigoPrimeiroCarac
  )
}

const cifrarMensagem = (deslocamento, frase) => {
  let fraseCriptografada = ''

  Array(...frase).map((caractere) => {
    fraseCriptografada = fraseCriptografada.concat(deslocaCaractereASCII(caractere, deslocamento, true))
  })

  process.stdout.write(fraseCriptografada)
}

const decifrarMensagem = (deslocamento, frase) => {
  let fraseCriptografada = ''

  Array(...frase).map((caractere) => {
    fraseCriptografada = fraseCriptografada.concat(deslocaCaractereASCII(caractere, deslocamento, false))
  })

  process.stdout.write(fraseCriptografada)
}

const cifradorCesar = () => {
  process.stdin.on('data', (fraseOriginal) => {
    const frase = fraseOriginal.toString()

    const deslocamento = parseInt(process.argv[4])

    if (process.argv[2] === '-c' && process.argv[3] === '-k') {
      // Normalize - retorna a Forma de Normalização Unicode de uma string
      // Replace utilizado com um RegEx para considerar apenas as letras, números e esoaços
      const fraseSemAcentuacao = frase.normalize('NFD').replace(/[^[A-Za-z0-9\s]/g, '')

      // Invoca o método responsável por cifrar a frase
      cifrarMensagem(deslocamento, fraseSemAcentuacao)
    }

    if (process.argv[2] === '-d' && process.argv[3] === '-k') {
      // Invoca o método responsável por decifrar a frase
      decifrarMensagem(-deslocamento, frase)
    }
  })
}

// Invoca a função principal ao executar o arquivo
cifradorCesar()
