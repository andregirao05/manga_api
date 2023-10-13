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
PORT=<colocar a porta de preferência aqui>
TOKEN_GENERATOR_SECRET=<MD5 hash para gerar tokens>
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

---

## Formato de resposta

| Field | Format | Description                                                                                                        |
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| data  | any    | Campo destinado para os dados de resposta (o tipo depende da rota). Em caso de erro, valor deste campo será `null` |
| error | string | Mensagem de erro (caso ocorra). Se não houver erro, este campo será `null`                                         |

## Rotas

### Autenticação

Para fazer requisições na api, é necessário ser um usuário autorizado.
Cada requisição **deve ter um header chamado "authorization" com um token de acesso**.

`authorization: <jwt token>`

- [Autenticação](/doc/routes/Authenticate.md)

### Mangás

- [Obter um mangá](/doc/routes/GetManga.md)
- [Buscar um mangá](/doc/routes/SearchMangas.md)
- [Listar mangás populares](/doc/routes/GetPopularMangas.md)
- [Listar mangás recentemente atualizados](/doc/routes/GetLatestUpdatedMangas.md)
- [Listar mangás por gênero](/doc/routes/GetMangasByGenre.md)
- [Adicionar um novo mangá](/doc/routes/AddManga.md)
- [Checar se mangá existe](/doc/routes/MangaExists.md)
- [Adicionar Recomendações de Mangas](/doc/routes/AddRecommendations.md)
- [Obter Mangas Recomendados](/doc/routes/GetRecommendations.md)

### Capítulos

- [Obter nomes dos capítulos de um mangá](/doc/routes/GetChapterNames.md)
- [Listar todos os capítulos de um mangá](/doc/routes/GetChapters.md)
- [Obter um capítulo específico](/doc/routes/GetSingleChapter.md)
- [Adicionar capítulos a um mangá](/doc/routes/AddChapters.md)

### Gêneros

- [Obter nomes de gêneros de mangás](/doc/routes/GetGenreNames.md)
- [Obter nomes de gêneros de mangás adultos](/doc/routes/GetAdultGenreNames.md)
- [Obter gêneros (com atributos: is_adult, image_url)](/doc/routes/GetGenres.md)

### Informações dos sites dos mangás

- [Obter informações de um site de origem](/doc/routes/GetUpdate.md)
- [Adicionar informações de um novo site de origem](/doc/routes/AddUpdate.md)
- [Atualizar as informações de um site de origem](/doc/routes/SetUpdate.md)
