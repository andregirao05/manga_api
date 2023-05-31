# Listar todos os capítulos de um mangá (GET)

`/chapters/all/:id` 

## Descrição

Retorna todos os capítulos de um mangá (nome e páginas).

## Formatos

### Request

**Headers**

| Field | Format | Description |
|-------|-------|-------------|
|authorization| string | Token de acesso concedido a usuários autenticados. |


**Params**

| Field | Format | Description |
|-------|-------|-------------|
|id| string | ID do mangá |

### Response

**Data**

| Format | Description |
|-------|-------------|
| [Chapter[]](/doc/types/Chapter.md) | Lista com os nomes dos capítulos |