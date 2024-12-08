import { useState } from "react"
import { characterService } from "../services/CharecterService"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"



export default function SearchBar() {
  const [searching, setSearching] = useState('')


  function delayedSearch(form: HTMLFormElement) {
    setSearching('searching')
    setTimeout(async () => {
      await characterService.searchCharacter(form.query.value)
      form.reset()
      setSearching('done')
    }, 2500)
  }

  async function findCharacters() {
    try {
      event?.preventDefault()
      const form = event?.target as HTMLFormElement
      console.log(form.query.value)
      AppState.characterQuery = form.query.value
      delayedSearch(form)
    } catch (error) {
      Pop.error(error as Error)
    }
  }

  function SearchResults() {
    switch (searching) {
      case '':
        return <></>
      case 'searching':
        return <p>finding characters with title {AppState.characterQuery}</p>
      case 'done':
        return AppState.character.length
          ? <p>Found {AppState.totalResults} characters for <kbd className='badge bg-black'>"{AppState.characterQuery}"</kbd></p>
          : <p className='alert alert-danger p-0' >No results found for <kbd className='badge bg-dark'>"{AppState.characterQuery}"</kbd></p>
    }
  }

  return (

    <form className="SearchBar" onSubmit={findCharacters}>
      <div className="input-group mb-2">
        <input className='form-control' type="text" required placeholder='Find a characters' name="query" />
        <button className='btn' type='submit' disabled={searching == 'searching'}>
          <i className={`mdi ${searching == 'searching' ? 'mdi-loading mdi-spin' : 'mdi-magnify'} `}></i>
        </button>
      </div>
      <SearchResults />
    </form>

  )

}
