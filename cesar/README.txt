Para executar o bash, certifique-se de estar com um terminal aberto na pasta:
/cesar

Já na pasta, os seguintes comandos devem ser utilizados para cifrar o código fornecido:
• Para cifrar:
– ./cesar -c -k 5 < texto-aberto.txt > texto-cifrado.txt

• Para decifrar:
– ./cesar -d -k 5 < texto-cifrado.txt > texto-aberto.txt

Sendo cada parâmetro:
./cesar - Comando para executar o bash ligado a pasta
-c ou -d - Parâmetro que indica se será feita a criptografia (-c) ou decriptografia (-d)
-k n - Parâmetro que indica qual o deslocamento que será utilizado na criptografia (no exemplo, 5)
< texto-aberto.txt - Arquivo de origem da frase
> texto-cifrado.txt - Arquivo de destino da frase cifrada