# Manga API

Uma REST API de mangás usando Node.js, Typescript e MongoDB.

## Instalação (usando yarn)

Rodar o comando de instalação de bibliotecas:

`yarn`

OBS: em caso de desenvolvimento, para habilitar o commitlint é necessário executar o script "prepare":

`yarn prepare`

## Execução da aplicação

A execução da api depende da conexão com o MongoDB. Para tal, é necessário configurar as varíaveis de ambiente. Crie um arquivo chamado `.env` com o seguinte conteúdo:

```
MONGO_URI=<colocar a url do mongodb aqui>
PORT=<colocar a porta de preferência aqui. Exemplo: 3333>
```

Para executar em modo de **_desenvolvimento_**:

`yarn start:dev`

ou em modo de escuta:

`yarn dev`

Para executar em modo de **_produção_**, é necessário primeiro fazer o **_build_** da aplicação:

`yarn build`

Depois de contruidos os arquivos de build, executar com o seguinte comando:

`yarn start`

## Rotas

### Obter um único mangá

`/mangas/get/:id`

**Descrição:** bbtem um único mangá a partir de um `id`.

**Parâmetros:**

`id`: uma string que representa o id do mangá.

**Formato do retorno:**

```
{
  "_id": string,
  "title": string,
  "alternative_title": string,
  "author": string | null,
  "artist": string | null,
  "status": string | null,
  "rating": number | null,
  "url": string,
  "origin": "manga_livre" | "readm",
  "language": "english" | "portuguese",
  "thumbnail": string,
  "genres": string[],
  "summary": string
}
```

### Obter um capítulo específico

`/mangas/get/:id/chapters/:chapterName`

**Descrição:** retorna um capítulo específico do mangá (nome e páginas).

**Parâmetros:**

`id`: id do mangá.
`chapterName`: uma string com o nome do capítulo.

**Formato do retorno:**

```
{
  "name": string,
  "pages": string[]
}
```

### Obter a lista de capítulos de um mangá

`/mangas/get/:id/chapters-names`

**Descrição:** retorna uma lista de strings com os _nomes dos capítulos_ do mangá.

**Parâmetros:**

`id`: id do mangá.

**Formato do retorno:**

```
{
  "chapterNames": string[]
}
```

### Obter todos os capítulos de um mangá

`/mangas/get/:id/list-chapters`

**Descrição:** retorna todos os capítulos do mangá (nome e páginas).

**Parâmetros:**

`id`: id do mangá.

**Formato do retorno:**

```
{
  "chapters": Chapter[]
}
```

### Obter mangás mais populares

`/info/populars/:origin`

**Descrição:** retorna uma lista com os mangás mais populares.

**Parâmetros:**

`origin`: qual o site de origem do mangá ("manga_livre" ou "readm").

**Formato do retorno:**

```
{
  "mangas": Manga[]
}
```

### Obter mangás recentemente atualizados

`/info/updates/:origin`

**Descrição:** retorna uma lista com os mangás recentemente atualizados.

**Parâmetros:**

`origin`: qual o site de origem dos mangás ("manga_livre" ou "readm").

**Formato do retorno:**

```
{
  "mangas": Manga[]
}
```

### Buscar por mangá

`/mangas/search/:searchTerm`

**Descrição:** retorna uma lista de mangás com título (principal ou alternativo) igual ao termo procurado.

**Parâmetros:**

`searchTerm`: uma string com o termo de busca.

**Formato do retorno:**

```
{
  "mangas": Manga[]
}
```

### Obter listas de gêneros

`/genres/list/:language`

**Descrição:** retorna uma lista com os gêneros de mangás por idioma (português e inglês).

**Parâmetros:**

`language`: linguagem alvo ("english" ou "portuguese").

**Formato do retorno:**

```
{
  "genres": string[]
}
```

### Obter mangás por gênero

`/genres/get/:genreName`

**Descrição:** retorna uma lista com os mangás do gênero indicado.

**Parâmetros:**

`genreName`: nome do gênero procurado.

**Formato do retorno:**

```
{
  "mangas": Manga[]
}
```
