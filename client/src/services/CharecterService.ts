import { AppState } from "../AppState"

type CharacterResponse = {
  results: CharacterData[]
}
class CharacterService {
  async changeSearchPage(pageNumber, characterQuery) {
    const response = await rickAndMortyApi.get(`api/character/?page=${pageNumber}&name=${characterQuery}`)
    AppState.characterQuery = characterQuery
    this.handleResponseData(response.data)
  }

  async searchCharacter(characterQuery) {
    const response = await rickAndMortyApi.get(`api/character/?name=${characterQuery}`)
    console.log('SEACRHED character 🔍', response.data.results);
    AppState.characterQuery = characterQuery
    this.handleResponseData(response.data)
  }

  clearCharacter() {
    AppState.character = []
    AppState.currentPage = 0
    AppState.totalPages = 0
  }

  clearSearchQuery() {
    AppState.characterQuery = ''
  }

  async changePage(pageNumber) {

    const response = await rickAndMortyApi.get(`api/character/?page=${pageNumber}`)
    console.log('CHANGED PAGE 🧍', response.data);
    this.handleResponseData(response.data)

  }


  async getAllCharacter() {
    const response = await rickAndMortyApi.get('api/character')

    AppState.character = response.data.results
    logger.log("ALL CHARACTER'S", response.data.results)
    AppState.totalPages = response.data.info.pages
  }

  async getCharacterById(characterId) {
    AppState.characterById = null
    const response = await rickAndMortyApi.get(`api/character/${characterId}`)
    AppState.characterById = response.data
    logger.log(response.data)

  }

  handleResponseData(responseData) {
    const newCharacters = responseData.results.map(characterPOJO => new Character(characterPOJO));

    AppState.character = newCharacters;
    AppState.totalPages = responseData.info.pages;
  }
}


export const characterService = new CharacterService()
