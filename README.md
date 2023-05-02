# manga_api

Uma REST API de mangás usando Node.js, Typescript e MongoDB.

## Instalação (usando yarn)

Rodar o comando de instalação de bibliotecas:

`yarn`

OBS: em caso de desenvolvimento, para habilitar o commitlint é necessário executar o script "prepare":

`yarn prepare`

## Rotas

### Obter um único mangá

Esta rota retorna um mangá a partir de um id fornecido.

/mangas/:id

### Obter mangás mais populares [ainda não implementado]

Retorna uma lista com os mangás mais populares.

/mangas/populars

### Obter recentemente atualizados [ainda não implementado]

Retorna um lista com os mangás que foram atualizados recentemente.

/mangas/updates

### Buscar por mangá [ainda não implementado]

Faz uma busca na base de dados por mangás de acordo com o termo de busca fornecido.

/mangas/search/:searchTerm

### Obter listas de gêneros [ainda não implementado]

Retorna duas listas com os gêneros de mangás no banco de dados (em português e inglês).

/genres/list

### Obter mangás por gênero [ainda não implementado]

Retorna uma lista de mangás do gênero apontado.

/genres/:name
