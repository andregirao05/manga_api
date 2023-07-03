# Obter nomes dos gêneros de mangás (GET)

`/genres/names/:origin`

## Descrição

Retorna os nomes dos gêneros disponíveis para um determinado idioma.

## Formatos

### Request

**Headers**

| Field         | Format | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| authorization | string | Token de acesso concedido a usuários autenticados. |

**Params**

| Field  | Format | Description             |
| ------ | ------ | ----------------------- |
| origin | string | Site de origem desejado |

### Response

**Data**

| Format    | Description                    |
| --------- | ------------------------------ |
| string[ ] | Lista com os nomes dos gêneros |
