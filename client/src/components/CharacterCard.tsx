import { AppState } from "../AppState"
import { Character } from "../models/Charecter"

type CharacterCardProps = {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  function setActive() {
    AppState.activeCharacter = character
  }
  const textShadow = {
    textShadow: '1px 1px 2px rgb(0, 0, 0)'
  }

  return (
    <div className="CharacterCard card pb-4" data-bs-toggle="modal" data-bs-target="#characterModal" onClick={setActive}>
      <img className='img-fluid rounded shadow' src={character.image} alt={character.name} title={character.name} />
      <div className="card-img-overlay d-flex flex-column justify-content-end">
        <p style={textShadow} className="card-text text-light  fs-4 m-1">{character.name}</p>
      </div>

    </div >
  )

}
