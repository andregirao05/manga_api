# Obter informações de um site de origem (GET)

`/info/get/:origin` 

## Descrição

Retorna as informações de um site de origem específico.

## Formatos

### Request

**Headers**

| Field | Format | Description |
|-------|-------|-------------|
|authorization| string | Token de acesso concedido a usuários autenticados. |


**Params**

| Field | Format | Description |
|-------|-------|-------------|
|origin| string | Site de origem desejado |

### Response

**Data**

| Field | Format | Description |
|-------|-------|-------------|
|origin| string | Site de origem |
|language| string | Idioma do site |
|populars| string[ ] | URLs dos mangás mais populares |
|latest_updates| string[ ] | URLs dos mangás recentemente atualizados |