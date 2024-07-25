// self executing function here
(function() {
  
  const marvel = (character) => {
    const characterName = character
    const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&ts=1&apikey=1f441d6a7ade8e6ee0fe4a916c42c2b3&hash=51792b74c6ff002b960327e8c32fe0c2`
    const container = document.querySelector('#app')
    let contentHTML = ''
    let contentButtons = ''

    fetch(urlAPI)
    .then(res => res.json())
    .then((json) => {
      if(json.data.results.length === 0){
        contentHTML += `
          <div class="no-results">
            <h3 class="name"><i class="fas fa-exclamation-triangle"></i> No results</h3>
          </div>`
        container.innerHTML = contentHTML
      } else {
        for(const hero of json.data.results){
          let heroNAME = hero.name
          let heroURL = hero.urls
          let heroDescription = hero.description
          let heroIMG = hero.thumbnail.path + '.' + hero.thumbnail.extension
          heroURL.forEach(link => {
            if(link.type === 'wiki'){
              contentButtons += `<a href="${link.url}" class="btn" target="_blank">${link.type}</a>`
            } else if (link.type === 'comiclink'){
              contentButtons += `<a href="${link.url}" class="btn" target="_blank">Appears on</a>`
            }
          })
          contentHTML += `
            <div class="hero">
              <img src="${heroIMG}" alt="" class="thumbnail">
              <h3 class="name">${heroNAME}</h3>
              <p class="description">${heroDescription}</p>
              <div class="buttons">
                ${contentButtons}
              </div>
            </div>`
        }
        container.innerHTML = contentHTML
      }
    })
  }

  marvel('iron man')

  const searchForm = document.querySelector('#searchHero')
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchValue = searchForm.querySelector('#heroName').value
    if(searchValue === ''){
      console.log('empty')
    } else{
      marvel(searchValue)
    }
  })

})();