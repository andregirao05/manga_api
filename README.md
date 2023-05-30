# Manga API

Uma REST API de mangás usando Node.js, Typescript e MongoDB.

## Instalação (usando yarn)

Rodar o comando de instalação de bibliotecas:

```
yarn
```

OBS: em caso de desenvolvimento, para habilitar o commitlint é necessário executar o script "prepare":

```
yarn prepare
```

## Execução da aplicação

A execução da api depende da conexão com o MongoDB. Para tal, é necessário configurar as varíaveis de ambiente. Crie um arquivo chamado `.env` com o seguinte conteúdo:

```
MONGO_URI=<colocar a url do mongodb aqui>
PORT=<colocar a porta de preferência aqui. Exemplo: 3333>
```

Para executar em modo de **_desenvolvimento_**:

```
yarn start:dev
```

ou em modo de escuta:

```
yarn dev
```

Para executar em modo de **_produção_**, é necessário primeiro fazer o **_build_** da aplicação:

```
yarn build
```

Depois de contruidos os arquivos de build, executar com o seguinte comando:

```
yarn start
```

## Autenticação

Para fazer requisições na api, é necessário ser um usuário autorizado.
Cada requisição deve ter um header chamado "authorization" com um token de acesso.

`authorization: <jwt token>`

## Rotas

### (POST) Autenticação

`/auth`

**Descrição:** retorna o token de autenticação do usuário.

**Corpo da requisição:**

`username`: nome de usuário cadastrado. <br>
`password`: senha do usuário. <br>

**Formato do resultado:**

```
{
  "data": string
}
```

### (POST) Adicionar um mangá

`/mangas/add`

**Descrição:** adiciona um novo mangá.

**Corpo da requisição:**

`title`: string <br>
`alternative_title`: string <br>
`author`: string | null <br>
`artist`: string | null <br>
`status`: string | null <br>
`rating`: number | null <br>
`url`: string <br>
`origin`: string <br>
`language`: string <br>
`thumbnail`: string <br>
`genres`: string[] <br>
`summary`: string | null <br>

**Formato do resultado:**

```
{
  "data": string
}
```

### (POST) Checar se um mangá existe

`/mangas/exist`

**Descrição:** Checa se um mangá existe. Se sim, retona o _id_ do mangá.

**Corpo da requisição:**

`url`: string -> url do mangá. <br>

**Formato do resultado:**

```
{
  "data": string
}
```

### Obter um único mangá

`/mangas/get/:id`

**Descrição:** obtem um único mangá a partir de um `id`.

**Parâmetros:**

`id`: uma string que representa o id do mangá. <br>

**Formato do resultado:**

```
{
  "data": {
    "id": string,
    "title": string,
    "alternative_title": string,
    "author": string | null,
    "artist": string | null,
    "status": string | null,
    "rating": number | null,
    "url": string,
    "origin": string,
    "language": string,
    "thumbnail": string,
    "genres": string[],
    "summary": string
  }
}
```

### (POST) Adicionar capítulos

`/chapters/add`

**Descrição:** adiciona uma lista de capítulos em mangá. Retona um booleano com o resultado da inserção.

**Corpo da requisição:**

`id`: string <br> -> ID do mangá
`chapters`: [
{
name: string,
pages: string[]
}
] <br>

**Formato do resultado:**

```
{
  "data": boolean
}
```

### (GET) Obter um capítulo específico

`/mangas/get/:id/chapters/:chapterName`

**Descrição:** retorna um capítulo específico do mangá (nome e páginas).

**Parâmetros:**

`id`: id do mangá. <br>
`chapterName`: uma string com o nome do capítulo. <br>

**Formato do resultado:**

```
{
  "data": {
    "name": string,
    "pages": string[]
  }
}
```

### (GET) Obter a lista de capítulos de um mangá

`/mangas/get/:id/chapter-names`

**Descrição:** retorna uma lista de strings com os _nomes dos capítulos_ do mangá.

**Parâmetros:**

`id`: id do mangá. <br>

**Formato do resultado:**

```
{
  "data": string[]
}
```

### (GET) Obter todos os capítulos de um mangá

`/mangas/get/:id/list-chapters`

**Descrição:** retorna todos os capítulos do mangá (nome e páginas).

**Parâmetros:**

`id`: id do mangá. <br>

**Formato do resultado:**

```
{
  "data": Chapter[]
}
```

### (GET) Obter mangás mais populares

`/info/populars/:origin/:page`

**Descrição:** retorna uma lista com os mangás mais populares.

**Parâmetros:**

`origin`: qual o site de origem do mangá ("manga_livre" ou "readm"). <br>
`page`: número da página de resultados (inicia sempre em 1). <br>

**Formato do resultado:**

```
{
  "data": Manga[],
  "currentPage": number,
  "totalPages": number
}
```

### (GET) Obter mangás recentemente atualizados

`/info/updates/:origin/:page`

**Descrição:** retorna uma lista com os mangás recentemente atualizados.

**Parâmetros:**

`origin`: qual o site de origem dos mangás ("manga_livre" ou "readm"). <br>
`page`: número da página de resultados (inicia sempre em 1). <br>

**Formato do resultado:**

```
{
  "data": Manga[],
  "currentPage": number,
  "totalPages": number
}
```

### (GET) Buscar por mangá

`/mangas/search/:origin/:searchTerm/:page`

**Descrição:** retorna uma lista de mangás com título (principal ou alternativo) igual ao termo procurado.

**Parâmetros:**

`origin`: site de origem dos mangás ("manga_livre" ou "readm"). <br>
`page`: número da página de resultados (inicia sempre em 1). <br>

`searchTerm`: uma string com o termo de busca.

**Formato do resultado:**

```
{
  "data": Manga[],
  "currentPage": number,
  "totalPages": number
}
```

### (GET) Obter listas de gêneros

`/genres/list/:language`

**Descrição:** retorna uma lista com os gêneros de mangás por idioma (português e inglês).

**Parâmetros:**

`language`: linguagem alvo ("english" ou "portuguese"). <br>

**Formato do resultado:**

```
{
  "data": string[]
}
```

### (GET) Obter mangás por gênero

`/genres/get/:genreName/:page`

**Descrição:** retorna uma lista com os mangás do gênero indicado.

**Parâmetros:**

`genreName`: nome do gênero procurado. <br>
`page`: número da página de resultados (inicia sempre em 1). <br>

**Formato do resultado:**

```
{
  "data": Manga[],
  "currentPage": number,
  "totalPages": number
}
```

### (POST) Adicionar informações de updates do site

`/info/add`

**Descrição:** Adiciona updates dos sites. Retorna o id do Update inserido.

**Corpo da requisição:**

`origin`: string -> site de origem <br>
`language`: string -> language <br>
`populars`: string[] -> urls dos mangás populares <br>
`latest_updates`: string[] -> urls dos sites recentemente atualizados <br>

**Formato do resultado:**

```
{
  "data": string
}
```

### (GET) Obter informções de updates do site

`/info/get/:origin`

**Descrição:** Retorna as informações de updates do site.

**Parâmetros:**

`origin`: string -> site de origem <br>

**Formato do resultado:**

```
{
  "data": {
    origin: string,
    language: string,
    populars: string[],
    latest_updates: string[]
  }
}
```

### (POST) Atualizar informações de updates do site

`/info/set`

**Descrição:** Altera as informações de updates do site de origem e retorna o resultado (booleano) da operação.

**Corpo da requisição:**

`origin`: string -> site de origem <br>
`language`: string -> language <br>
`populars`: string[] -> urls dos mangás populares <br>
`latest_updates`: string[] -> urls dos sites recentemente atualizados <br>

**Formato do resultado:**

```
{
  "data": boolean
}
```
