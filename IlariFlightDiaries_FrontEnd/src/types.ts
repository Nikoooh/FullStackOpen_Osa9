
export interface DiaryEntry {
  date: string
  id: number
  visibility: string
  weather: string
}

export interface DiaryWithComment extends DiaryEntry {
  comment: string
}

export interface ValidationError {
  code: number
  error: string
}

export interface Notification {
  isError: boolean
  message: string
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}