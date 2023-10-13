# Obter nomes dos gêneros de mangás adultos (GET)

`/genres/adult-names/:origin`

## Descrição

Retorna os nomes dos gêneros adultos disponíveis para um determinado site de origem.

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

| Format    | Description                            |
| --------- | -------------------------------------- |
| string[ ] | Lista com os nomes dos gêneros adultos |
