# Checar se mangá existe (POST)

`/mangas/exists` 

## Descrição

Adiciona um novo mangá e retorna o seu id.

## Formatos

### Request

**Headers**

| Field | Format | Description |
|-------|-------|-------------|
|authorization| string | Token de acesso concedido a usuários autenticados. |

**Body**

| Field | Format | Description |
|-------|-------|-------------|
| url | string | Endereço de origem do mangá |

### Response

**Data**

| Format | Description |
|-------|-------------|
|string ou null | ID do mangá (se o mangá estiver cadastrado). Null se o mangá não existir | 