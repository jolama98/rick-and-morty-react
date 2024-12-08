import { observer } from "mobx-react"
import { AppState } from "../AppState"
import Pop from "../utils/Pop";
import { characterService } from "../services/CharecterService";
import { useEffect } from "react";
import CharacterList from "../components/CharacterList";
import Modal from "../components/Modal";
import CharacterDetails from "../components/CharacterDetails";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";


function HomePage() {

  async function getCharacters() {
    try {
      await characterService.getAllCharacter()
    }
    catch (error) {
      Pop.error(error as Error);
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  const CharacterModalContent = () => (
    AppState.activeCharacter ?
      <CharacterDetails character={AppState.activeCharacter} />
      :
      <></>
  )

  return (
    <div className="home-page">
      <div className="container">
        <div className="row my-4">
          <SearchBar />
          <Pagination />
        </div>

        <div className="row">
          <CharacterList character={AppState.character} />
        </div>
      </div>

      <Modal id='characterModal' name={AppState.activeCharacter?.name || ''} >
        <CharacterModalContent />
      </Modal>

    </div>
  )
}

export default observer(HomePage)
