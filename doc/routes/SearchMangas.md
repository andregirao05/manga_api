# Buscar mangás (GET)

`/mangas/search/:origin/:searchTerm/:page` 

## Descrição

Pesquisa por mangás com título (ou título alternativo) compatível com o termo de busca.

- Obs: requisição paginada. Cada página retorna, no máximo, 20 mangás.

## Formatos

### Request

**Headers**

| Field | Format | Description |
|-------|-------|-------------|
|authorization| string | Token de acesso concedido a usuários autenticados. |


**Params**

| Field | Format | Description |
|-------|-------|-------------|
|origin| string | Site de origem do mangá |
|searchTerm| string | Termo de busca |
|page| number (interger) | Página de resultados desejada |

### Response

**Data**

| Field | Format | Description |
|-------|-------|-------------|
| mangas | [Manga[ ]](../types/Manga.md) | Lista com os mangás |
| currentPage | string | Página de resultados atual |
| totalPages | string | Número total de páginas de resultados  |