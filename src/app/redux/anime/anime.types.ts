export interface Root {
  list: AnimeList[]
  pagination: Pagination
}

export interface AnimeList {
  id: number
  code: string
  names: Names
  genres: string[]
  type: Type
  status: Status
  player: Player
  posters: Posters
}

export interface RootSchedule {
  day: number
  list: List[]
}

export interface IRandomAnime {
  code: string
}

export interface IAnime {
  id: number
  code: string
  names: Names
  genres: string[]
  type: Type
  status: Status
  player: Player
  posters: Posters
  description: string
  season: Season
}

export interface ISearchRoot {
  list: ISearchAnime[]
}

export interface ISearchAnime {
  id: number
  genres: string[]
  code: string
  posters: { small: { url: string } }
  names: { ru: string, en: string }
}


export interface Names {
  ru: string
}

export interface Type {
  episodes?: number
}

export interface Status {
  code: number
  string?: string
}

export interface Player {
  episodes: Episodes
}

export interface Episodes {
  first: number
  last: number
  string: string
}

export interface Posters {
  small: Small
  medium: Medium
  original: Original
}

export interface Small {
  url: string
  raw_base64_file: any
}

export interface Medium {
  url: string
  raw_base64_file: any
}

export interface Original {
  url: string
  raw_base64_file: any
}

export interface Pagination {
  pages: number
  current_page: number
  items_per_page: number
  total_items: number
}

export interface Season {
  string: string
  code: number
  year: number
  week_day: number
}

export interface Player {
  alternative_player: string
  host: string
  is_rutube: boolean
  episodes: Episodes
  list: any
}

export interface List {
  id: number
  code: string
  names: Names
  genres: string[]
  type: Type
  status: Status
  player: Player
  posters: Posters
}


