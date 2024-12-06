import { observer } from "mobx-react"
import { AppState } from "../AppState"
import Pop from "../utils/Pop";
import { characterService } from "../services/CharecterService";
import { useEffect } from "react";
import CharacterList from "../components/CharacterList";


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

  return (
    <div className="home-page">
      <CharacterList character={AppState.character} />
    </div>
  )
}

export default observer(HomePage)
