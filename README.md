# manga_api

Uma REST API de mangás usando Node.js, Typescript e MongoDB.

## Instalação (usando yarn)

Rodar o comando de instalação de bibliotecas:

`yarn`

OBS: em caso de desenvolvimento, para habilitar o commitlint é necessário executar o script "prepare":

`yarn prepare`

## Execução da aplicação

Para executar em modo de desenvolvimento:

`yarn start:dev`

ou em modo de escuta:

`yarn dev`

Para executar em modo de produção, é necessário primeiro fazer o build da aplicação:

`yarn build`

Depois de contruidos os arquivos de build, executar com o seguinte comando:

`yarn start`

## Rotas

### Obter um único mangá

Esta rota devolve um único mangá. É necessário, para tal, fornecer o seu id.

`/mangas/get/:id`

### Obter mangás mais populares

Retorna uma lista com os mangás mais populares de acordo com o site de origem (parâmetro origin deve ser "readm" ou "manga_livre").

`/info/populars/:origin`

### Obter mangás recentemente atualizados

Retorna uma lista com os mangás recentemente atualizados de acordo com o site de origem (parâmetro origin deve ser "readm" ou "manga_livre").

`/info/updates/:origin`

### Obter a lista de capítulos de um mangá [ainda não implementado]

Para obter a lista com os **nomes dos capítulos** de um mangá, deve-se utilizar a rota:

`/mangas/get/:id/chapters-names`

### Obter todos os capítulos de um mangá [ainda não implementado]

Para obter todos os capítulos de um mangá, use:

`/mangas/get/:id/list-chapters`

### Obter um capítulo específico [ainda não implementado]

Para obter apenas um capítulo específico (necessário fornecer o nome do capítulo):

`/mangas/get/:id/chapters/:chapterName`

### Buscar por mangá [ainda não implementado]

Faz uma busca na base de dados por mangás de acordo com o termo de busca fornecido.

`/mangas/search/:searchTerm`

### Obter listas de gêneros [ainda não implementado]

Retorna duas listas com os gêneros de mangás no banco de dados (language deve ser "portuguese" e "english").

`/genres/list/:language`

### Obter mangás por gênero [ainda não implementado]

Retorna uma lista de mangás do gênero apontado.

`/genres/get/:genreName`
