# Obter mangás populares (GET)

`/mangas/populars/:origin/:page`

## Descrição

Retorna os mangás mais populares do site de origem especificado.

- Obs: requisição paginada. Cada página retorna, no máximo, 20 mangás.

## Formatos

### Request

**Headers**

| Field         | Format | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| authorization | string | Token de acesso concedido a usuários autenticados. |

**Params**

| Field  | Format            | Description                   |
| ------ | ----------------- | ----------------------------- |
| origin | string            | Site de origem do mangá       |
| page   | number (interger) | Página de resultados desejada |

### Response

**Data**

| Field       | Format                        | Description                           |
| ----------- | ----------------------------- | ------------------------------------- |
| mangas      | [Manga[ ]](../types/Manga.md) | Lista com os mangás                   |
| currentPage | string                        | Página de resultados atual            |
| totalPages  | string                        | Número total de páginas de resultados |
