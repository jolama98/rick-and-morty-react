import { Character } from "../models/Charecter"

export default function CharacterDetails({ character }: { character: Character }) {

  return (
    <div className="CharacterDetails row">
      <div className="col-md-5 col-12 d-flex justify-content-center justify-content-md-start pb-md-0 pb-5">
        <img className="img-fluid" src={character.image} alt={character.name} />
      </div>
      <div className="col-md-7 col-12 fs-5 fw-bold">
        <p>Gender: {character.gender}</p>
        <p>Species: {character.species}</p>
        <p>Status: {character.status}</p>
        <p>Type: {character.type}</p>
        <p>Created At: {character.created}</p>
      </div>
    </div>
  )

}
