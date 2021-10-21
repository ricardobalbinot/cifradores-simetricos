const fs = require('fs')

const fromCharCode = String.fromCharCode

const geraChaveAleatoria = (frase) => {
  let chaveGerada = ''

  // Laço de repetição do tamanho da frase obtida
  for (i = 0; i < frase.length; i++) {
    // Cada caractere gerado corresponde a um CharCode aleatório de 1 a 1000
    chaveGerada += fromCharCode(Math.floor(Math.random() * 1000))
  }

  return chaveGerada
}

const geraCifra = (frase, chave) => {
  let fraseCifrada = ''
  const tamanhoFrase = frase.length

  // Executa a criptografia de Vernam utilizando o ou-exclusivo
  // \s - Corresponde a todo espaço em branco na frase
  // \S - Corresponde a todo espaço de caractere que não seja espaço na frase
  fraseCifrada = frase.replace(/[\s\S]/g, function (c, i) {
    return fromCharCode(chave.charCodeAt(i % tamanhoFrase) ^ c.charCodeAt(0))
  })

  // Printa no arquivo de saída fornecido a chave após criptografada
  process.stdout.write(fraseCifrada)
}

const armazenaChave = (chave, frase) => {
  // Busca o arquivo da chave fornecido por parâmetro
  const arquivoChave = process.argv[3]

  // Escreve a chave no arquivo fornecido
  fs.writeFile(arquivoChave, chave, (error) => {
    if (error) throw new Error('Arquivo não encontrado!')

    // Após salvar a chave, gera a frase cifrada
    geraCifra(frase, chave)
  })
}

const buscarChave = (frase) => {
  // Busca o arquivo da chave fornecido por parâmetro
  const arquivoChave = process.argv[3]

  // Busca a chave armazenada no arquivo fornecido
  fs.readFile(arquivoChave, 'UTF8', (error, chave) => {
    if (error) throw new Error('Arquivo não encontrado!')

    // Após buscar a chave, gera a decriptografia
    geraCifra(frase, chave)
  })
}

const cifradorVernam = () => {
  process.stdin.on('data', (fraseOriginal) => {
    const frase = fraseOriginal.toString()

    if (process.argv[2] === '-c') {
      // Se for uma operação de criptografia da frase
      // Gera a chave aleatória do tamanho da frase fornecida
      const chaveGerada = geraChaveAleatoria(frase)

      // Armazena a chave e gera a criptografia
      armazenaChave(chaveGerada, frase)
    } else if (process.argv[2] === '-d') {
      // Se for uma operação de decriptografia da frase
      // Busca a frase já gerada e gera a decriptografia
      buscarChave(frase)
    }
  })
}

// Invoca a função principal ao executar o arquivo
cifradorVernam()
