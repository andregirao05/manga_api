# Obter gêneros de mangás (GET)

`/genres/get/:origin`

## Descrição

Retorna os gêneros dos gêneros disponíveis para um determinado site de origem.

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

|        | Format                       | Description       |
| ------ | ---------------------------- | ----------------- |
| genres | [Genre[]](../types/Genre.md) | Lista de Gêneros. |
