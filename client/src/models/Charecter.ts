export type CharacterData = {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  created: string
}

export class Character {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  created: string
  constructor(data: CharacterData) {
    this.id = data.id
    this.name = data.name
    this.status = data.status
    this.species = data.species
    this.gender = data.gender
    this.type = data.type
    this.image = data.image
    this.created = data.created
  }

  get backdropImgUrl() {
    return `url(https://rickandmortyapi.com/api/character/avatar/${this.id}.jpeg)`
  }
}
