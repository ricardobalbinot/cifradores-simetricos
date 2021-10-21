Para executar o bash, certifique-se de estar com um terminal aberto na pasta:
/vernam

Já na pasta, os seguintes comandos devem ser utilizados para gerar as cifras:
• Para cifrar:
– ./vernam -c chave.dat < texto-aberto.txt > texto-cifrado.txt

• Para decifrar:
– ./vernam -d chave.dat < texto-cifrado.txt > texto-aberto.txt

Sendo cada parâmetro:
./vernam - Comando para executar o bash ligado a pasta
-c ou -d - Parâmetro que indica se será feita a criptografia (-c) ou decriptografia (-d)
chave.dat - Parâmetro que corresponde ao nome do arquivo que contém a chave gerada
< texto-aberto.txt - Arquivo de origem da frase
> texto-cifrado.txt - Arquivo de destino da frase cifrada

