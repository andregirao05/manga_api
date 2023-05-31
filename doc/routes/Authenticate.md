## Obter token de acesso (POST)

`/users/auth`

## Descrição

Autentica um usuário e retorna seus dados, juntamente com o token de acesso.

## Formatos

### Request

**Body**

| Field    | Format | Description      |
| -------- | ------ | ---------------- |
| username | string | Nome de usuário  |
| password | string | Senha do usuário |

### Response

**Data**

| Field | Format                   | Description     |
| ----- | ------------------------ | --------------- |
| user  | [User](../types/User.md) | ID do mangá.    |
| token | string                   | Token de acesso |
