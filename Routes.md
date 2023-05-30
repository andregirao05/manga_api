Mangás:
  GET:
    /mangas/get/:id
    /mangas/search/:origin/:searchTerm/:page
    /mangas/populars/:origin/:page
    /mangas/latest-updates/:origin/:page
    /mangas/by-genre/:genreName/:page
    

  POST:
    /mangas/add
    /mangas/exists


Capítulos:
  GET:
    /chapters/names/:id
    /chapters/all/:id
    /chapters/get/:id/:chapterName

  POST:
    /chapters/add


Gêneros:
  GET:
  /genres/names/:language


Informações:
  GET:
    /info/get/:origin

  POST:
    /info/add
    /info/update


Usuários:
  POST:
    /users/auth

