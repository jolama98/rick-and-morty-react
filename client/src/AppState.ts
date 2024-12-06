import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.ts"
import { Account } from './models/Account.js'
import { Identity } from '@bcwdev/auth0provider-client'
import { Character } from "./models/Charecter.ts"


class ObservableAppState {

  identity: Identity | null = null
  account: Account | null = null

  character: Character[] = []
  activeCharacter: Character | null = null
  currentPage: number = 0
  totalPages: number = 0
  totalResults: number = 0
  characterQuery: string = ''

  constructor() {
    makeAutoObservable(this)
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop: string) {
    isValidProp(target, prop)
    // @ts-ignore
    return target[prop]
  },
  set(target, prop: string, value) {
    isValidProp(target, prop)
    action(() => {
      // @ts-ignore
      target[prop] = value
    })()
    return true
  }
})
