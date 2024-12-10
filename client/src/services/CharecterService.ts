import { AppState } from "../AppState"
import { Character, CharacterData } from "../models/Charecter"
import { logger } from "../utils/Logger"
import { RMApi } from "./AxiosService"

type CharacterResponse = {
  page: number
  info: any
  results: CharacterData[]
  total_pages: number
  total_results: number
}

class CharacterService {
  async changeSearchPage(pageNumber: number, characterQuery: string) {
    const response = await RMApi.get(`api/character/?page=${pageNumber}&name=${characterQuery}`)
    this.handleResponseData(response.data)
  }

  async searchCharacter(characterQuery: string) {
    const response = await RMApi.get(`api/character/?name=${characterQuery}`)
    console.log('Search character 🔍', response.data.results);
    this.handleResponseData(response.data)
  }

  async changePage(pageNumber: number) {

    const response = await RMApi.get(`api/character/?page=${pageNumber}`)
    console.log('current Page 🎃', response.data.info.page);
    this.handleResponseData(response.data)

  }

  async getAllCharacter() {
    const response = await RMApi.get('api/character')

    AppState.character = response.data.results
    // logger.log("ALL CHARACTER'S", response.data.results)
    AppState.totalPages = response.data.info.pages
  }

  async getCharacterById(characterId: string) {
    if (AppState.activeCharacter?.id == characterId) { return }
    AppState.activeCharacter = null
    const response = await RMApi.get(`api/character/${characterId}`)
    AppState.activeCharacter = response.data
    logger.log(response.data)

  }

  handleResponseData(responseData: CharacterResponse) {
    const characters = responseData.results.map((characterData: CharacterData) => new Character(characterData))
    logger.log(responseData.info.next, '👻')
    AppState.character = characters
    AppState.currentPage = responseData.info.pages
    AppState.totalPages = responseData.total_pages
    AppState.totalResults = responseData.total_results
  }
}


export const characterService = new CharacterService()
