const fs = require('fs');
const readlineSync = require('readline-sync');

const nomeArquivo = 'palavras.txt';

function escolherPalavraAleatoria(callback) {
    fs.readFile(nomeArquivo, 'utf8', (err, data) => {
        if (err) {
            console.error(`Erro ao ler o arquivo ${nomeArquivo}: ${err.message}`);
            return;
        }

        const palavras = data.split('\n');
        const palavraAleatoria = escolherElementoAleatorio(palavras);

        callback(palavraAleatoria.trim());
    });
}

// Escolhe de forma aleatória uma posicao do array de palavras
function escolherElementoAleatorio(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

function iniciarJogo(palavraCorreta) {
    const palavraEscondida = Array(palavraCorreta.length).fill('_'); // cada letra da palavra é representado por '_"
    let tentativas = 10; // Quantidade de tentativas

    console.log('- - - JOGO DA FORCA - - -');

    function mostrarPalavra() {
        console.log('Palavra: ' + palavraEscondida.join(' '));
    }

    function verificarLetra(letra) {
        if (!letra.match(/[a-zA-Z]/)) {
            console.log('Por favor, insira uma letra válida.');
            return;
        }

        letra = letra.toLowerCase();

        if (palavraCorreta.includes(letra)) {
            console.log(`Ótimo! A letra "${letra}" está na palavra.`);
            for (let i = 0; i < palavraCorreta.length; i++) {
                if (palavraCorreta[i] === letra) {
                    palavraEscondida[i] = letra;
                }
            }
        } else {
            tentativas--;
            console.log(`Ops! A letra "${letra}" não está na palavra. Tentativas restantes: ${tentativas}`);
        }

        mostrarPalavra();

        if (!palavraEscondida.includes('_')) {
            console.log(`Parabéns! Você acertou a palavra. Restaram ${tentativas}`);
            process.exit();
        }

        if (tentativas === 0) {
            console.log(`Você perdeu! A palavra correta era "${palavraCorreta}".`);
            process.exit();
        }
    }

    while (tentativas > 0) {
        const letra = readlineSync.question('Digite uma letra: ');
        verificarLetra(letra);
    }
}

// Iniciar o jogo da forca
escolherPalavraAleatoria((palavraCorreta) => {
    iniciarJogo(palavraCorreta);
});
