# Obter nomes dos capítulos de um mangá (GET)

`/chapters/names/:id` 

## Descrição

Retorna os nomes dos capítulos de um mangá.

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
| string[ ] | Lista com os nomes dos capítulos |