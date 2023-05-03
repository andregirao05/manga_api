# manga_api

Uma REST API de mangás usando Node.js, Typescript e MongoDB.

## Instalação (usando yarn)

Rodar o comando de instalação de bibliotecas:

`yarn`

OBS: em caso de desenvolvimento, para habilitar o commitlint é necessário executar o script "prepare":

`yarn prepare`

## Execução da aplicação

Para executar em mode de desenvolvimento:

`yarn start:dev`
ou

`yarn dev`

Para executar em modo de produção, é necessário primeiro fazer o build da aplicação:

`yarn build`

Depois de contruidos os arquivos de build, executar com o seguinte comando:

`yarn start`

## Rotas

### Obter um único mangá

Esta rota devolve um único mangá. É necessário, para tal, fornecer o seu id.

`/mangas/:id`

### Obter mangás mais populares

Retorna uma lista com os mangás mais populares de acordo com o site de origem ("readm" ou "manga_livre").

`/mangas/populars/:origin`

### Obter recentemente atualizados [ainda não implementado]

Retorna uma lista com os mangás recentemente atualizados de acordo com o site de origem ("readm" ou "manga_livre").

`/mangas/updates/:origin`

### Buscar por mangá [ainda não implementado]

Faz uma busca na base de dados por mangás de acordo com o termo de busca fornecido.

`/mangas/search/:searchTerm`

### Obter listas de gêneros [ainda não implementado]

Retorna duas listas com os gêneros de mangás no banco de dados (em português e inglês).

`/genres/list`

### Obter mangás por gênero [ainda não implementado]

Retorna uma lista de mangás do gênero apontado.

`/genres/:name`
