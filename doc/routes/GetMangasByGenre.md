# Obter mangás por gênero (GET)

`/mangas/by-genre/:genreName/:page`

## Descrição

Retorna os mangás do gênero especificado.

- Obs: requisição paginada. Cada página retorna, no máximo, 20 mangás.

## Formatos

### Request

**Headers**

| Field         | Format | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| authorization | string | Token de acesso concedido a usuários autenticados. |

**Params**

| Field     | Format            | Description                   |
| --------- | ----------------- | ----------------------------- |
| genreName | string            | Nome do gênero desejado       |
| page      | number (interger) | Página de resultados desejada |

### Response

**Data**

| Field       | Format                        | Description                           |
| ----------- | ----------------------------- | ------------------------------------- |
| mangas      | [Manga[ ]](../types/Manga.md) | Lista com os mangás                   |
| currentPage | string                        | Página de resultados atual            |
| totalPages  | string                        | Número total de páginas de resultados |
