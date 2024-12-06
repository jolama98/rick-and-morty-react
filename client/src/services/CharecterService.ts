import { AppState } from "../AppState"
import { Character } from "../models/Charecter"
import { logger } from "../utils/Logger"
import { RMApi } from "./AxiosService"

type CharacterResponse = {
  results: CharacterData[]
  total_pages: number
  total_results: number
  info: number
  pages: number
}
class CharacterService {
  // async changeSearchPage(pageNumber: string, characterQuery: string) {
  //   const response = await RMApi.get(`api/character/?page=${pageNumber}&name=${characterQuery}`)
  //   AppState.characterQuery = characterQuery
  //   this.handleResponseData(response.data)
  // }

  // async searchCharacter(characterQuery: string) {
  //   const response = await RMApi.get(`api/character/?name=${characterQuery}`)
  //   console.log('SEACRHED character 🔍', response.data.results);
  //   AppState.characterQuery = characterQuery
  //   this.handleResponseData(response.data)
  // }

  clearCharacter() {
    AppState.character = []
    AppState.currentPage = 0
    AppState.totalPages = 0
  }

  clearSearchQuery() {
    AppState.characterQuery = ''
  }

  // async changePage(pageNumber: string) {

  //   const response = await RMApi.get(`api/character/?page=${pageNumber}`)
  //   console.log('CHANGED PAGE 🧍', response.data);
  //   this.handleResponseData(response.data)

  // }


  async getAllCharacter() {
    const response = await RMApi.get('api/character')

    AppState.character = response.data.results
    logger.log("ALL CHARACTER'S", response.data.results)
    AppState.totalPages = response.data.info.pages
  }

  async getCharacterById(characterId: string) {
    if (AppState.activeCharacter?.id == characterId) { return }
    AppState.activeCharacter = null
    const response = await RMApi.get(`api/character/${characterId}`)
    AppState.activeCharacter = response.data
    logger.log(response.data)

  }

  // handleResponseData(responseData: CharacterResponse) {
  //   const characters = responseData.results.map((characterData: CharacterData) => new Character(characterData))
  //   AppState.character = characters
  //   AppState.totalPages = responseData.pages
  //   AppState.totalResults = responseData.total_results
  // }
}


export const characterService = new CharacterService()
