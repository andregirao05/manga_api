# Obter um capítulo específico de um mangá (GET)

`/chapters/get/:id/:chapterName`

## Descrição

Retorna um capítulo específico de um mangá.

## Formatos

### Request

**Headers**

| Field         | Format | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| authorization | string | Token de acesso concedido a usuários autenticados. |

**Params**

| Field       | Format | Description      |
| ----------- | ------ | ---------------- |
| id          | string | ID do mangá      |
| chapterName | string | Nome do capítulo |

### Response

**Data**

| Field | Format    | Description                  |
| ----- | --------- | ---------------------------- |
| name  | string    | Nome do capítulo             |
| pages | string[ ] | URLs das imagens do capítulo |
