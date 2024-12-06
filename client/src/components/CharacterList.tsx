import { Character } from "../models/Charecter"
import CharacterCard from "./CharacterCard"

type CharacterProps = {
  character: Character[]
}

function CharacterList({ character }: CharacterProps) {

  return character.map(char =>

    <div className="col-md-3 md-4" key={char.id}>
      <CharacterCard character={char} />
    </div>
  )

}
export default CharacterList
