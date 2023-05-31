# Adicionar novos capítulos (POST)

`/chapters/add`

## Descrição

Adiciona uma lista de capítulos.

## Formatos

### Request

**Headers**

| Field         | Format | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| authorization | string | Token de acesso concedido a usuários autenticados. |

**Body**

| Field    | Format                            | Description                                            |
| -------- | --------------------------------- | ------------------------------------------------------ |
| id       | string                            | ID do mangá no qual os capítulos devem ser adicionados |
| chapters | [Chapter[ ]](../types/Chapter.md) | Capítulos que devem ser inseridos                      |

### Response

**Data**

| Format  | Description                                                 |
| ------- | ----------------------------------------------------------- |
| boolean | Resultado é `true` se capítulos forem inseridos com sucesso |
