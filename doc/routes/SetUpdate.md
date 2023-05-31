# Atualizar informações de um site de origem (POST)

`/info/update` 

## Descrição

Atualiza informações de um site de origem.

## Formatos

### Request

**Headers**

| Field | Format | Description |
|-------|-------|-------------|
|authorization| string | Token de acesso concedido a usuários autenticados. |

**Body**

| Field | Format | Description |
|-------|-------|-------------|
|origin| string | Site de origem |
|language| string | Idioma do site |
|populars| string[ ] | URLs dos mangás mais populares |
|latest_updates| string[ ] | URLs dos mangás recentemente atualizados |

### Response

**Data**

| Format | Description |
|-------|-------------|
|boolean | É `true` se as informações forem atualizadas com sucesso | 