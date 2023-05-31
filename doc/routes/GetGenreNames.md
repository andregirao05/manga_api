# Obter nomes dos gêneros de mangás (GET)

`/genres/names/:language` 

## Descrição

Retorna os nomes dos gêneros disponíveis para um determinado idioma.

## Formatos

### Request

**Headers**

| Field | Format | Description |
|-------|-------|-------------|
|authorization| string | Token de acesso concedido a usuários autenticados. |


**Params**

| Field | Format | Description |
|-------|-------|-------------|
|language| string | Idioma desejado |

### Response

**Data**

| Format | Description |
|-------|-------------|
| string[ ] | Lista com os nomes dos gêneros |