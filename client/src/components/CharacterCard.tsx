import { AppState } from "../AppState"
import { Character } from "../models/Charecter"

type CharacterCardProps = {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  function setActive() {
    AppState.activeCharacter = character
  }

  return (
    <div className="CharacterCard">
      <div data-bs-toggle="modal" data-bs-target="#characterModal" onClick={setActive}>
        <img className='img-fluid rounded shadow' src={character.image} alt={character.name} title={character.name} />
        <p>{character.name}</p>
      </div>
    </div>
  )

}
