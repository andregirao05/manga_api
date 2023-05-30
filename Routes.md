Mangás:
  GET:
    /mangas/get?id=<id>
    /mangas/search?searchTerm=<term>&origin=<site>&page=<page>
    /mangas/populars?origin=<site>&page=<page>
    /mangas/latest-updates?origin=<site>&page=<page>
    /mangas/by-genre?genreName=<genre name>&page=<page>
    

  POST:
    /mangas/add
    /mangas/exists


Capítulos:
  GET:
    /chapters/names?id=<id>
    /chapters/all?id=<id>
    /chapters/get?id=<id>&chapterName=<chapter name>

  POST:
    /chapters/add


Gêneros:
  /genres/names?language=<language>


Informações:
  GET:
    /info/get

  POST:
    /info/add
    /info/update


Usuários:
  POST:
    /users/auth

