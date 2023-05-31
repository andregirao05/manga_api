# Obter mangá (GET)

`/mangas/get/:id` 

## Descrição

Recebe um ID e retorna o mangá correspondente.

## Formatos

### Request

**Headers**

| Field | Format | Description |
|-------|-------|-------------|
|authorization| string | Token de acesso concedido a usuários autenticados. |


**Params**

| Field | Format | Description |
|-------|-------|-------------|
|id| string | ID do mangá desejado. |

### Response

**Data**

| Field | Format | Description |
|-------|-------|-------------|
|id| string | ID do mangá. |
| title | string | Título do mangá |
| alternative_title | string | Título alternativo  |
| author | string ou null | Nome do author |
| artist | string ou null | Nome do artista |
| status | string ou null | Status de produção do mangá|
| rating | string ou null | Nota do mangá |
| url | string | Endereço de origem do mangá |
| origin | string | Tag do site de origem |
| language | string | Idioma do mangá |
| thumbnail | string | URL da imagem de capa |
| genres | string[ ] | Lista de gêneros do mangá |
| summary | string ou null | Descrição do mangá |
