# Adicionar recomendações de mangás (POST)

`/mangas/recommendations`

## Descrição

Adiciona os IDS de mangás que se deseja recomendar.

## Formatos

### Request

**Headers**

| Field         | Format | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| authorization | string | Token de acesso concedido a usuários autenticados. |

**Body**

| Field  | Format    | Description                             |
| ------ | --------- | --------------------------------------- |
| origin | string    | Site de origem dos mangás               |
| ids    | string[ ] | IDs dos mangás que se deseja recomendar |

### Response

**Data**

| Format  | Description                                                                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| boolean | Resultado é `true` se a inserção da recomendação tiver sido concluída com sucesso. Retorna `false` caso a operação falhe ou os dados passados sejam iguais aos já registrados |
