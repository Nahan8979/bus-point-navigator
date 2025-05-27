
export interface Route {
  id: string;
  name: string;
  stops: string[];
}

export interface Bus {
  id: string;
  number: string;
  route: string;
  arrival: string;
  fair: number;
  distance: string;
  time: string;
  isUpcoming?: boolean;
}

export interface Language {
  code: 'en' | 'hi' | 'ml';
  name: string;
  nativeName: string;
}

export interface Location {
  name: string;
  coordinates?: [number, number];
}
