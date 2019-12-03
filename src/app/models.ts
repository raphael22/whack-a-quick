
export interface ILevel {
  name: string
  matrix: number
}

export interface IConfig {
  level: ILevel,
  timeout: number
}

export interface IQuik {
  index: number
  row: number
  level: ILevel
  active: boolean
}

export const IMAGES: string[] = [
  './assets/quiks/né.png',
  './assets/quiks/caddic.png',
  './assets/quiks/lorcy.png',
  './assets/quiks/pellier.png',
  './assets/quiks/gousset.png',
  './assets/quiks/caron.png'
];

export const enum ELevel {
  john = 1,
  facile = 2,
  normal = 3,
  difficile = 4,
  infernal = 5,
}

export const LEVELS: ILevel[] = [
  {
    name: "john",
    matrix: ELevel.john
  },
  {
    name: "facile",
    matrix: ELevel.facile
  },
  {
    name: "normal",
    matrix: ELevel.normal
  },
  {
    name: "difficile",
    matrix: ELevel.difficile
  },
  {
    name: "infernal",
    matrix: ELevel.infernal
  }
]