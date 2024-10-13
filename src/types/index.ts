export interface Source {
  src: string;
  repeat?: boolean;
}
export interface Sound {
  source: Source[];
  counter?: number;
}
export interface SoundState {
  isMuted: boolean;
  sounds: { [key: string]: Sound };
}
