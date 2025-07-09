export type Event = {
  readonly title: string;
  readonly category: 'Hard Techno' | 'Techno' | 'Industrial' | 'Rave' | string;
  readonly date: string; // formato ISO (es. "2025-07-15T22:00:00")
  readonly location: string; // es. città, club, warehouse
  artists: string[]; // lista di DJ/performer
  ticketLink?: string; // URL per acquistare i biglietti
  coverImage?: string; // URL dell’immagine di copertina
  isAfterparty?: boolean; // indica se è un afterparty
  isSoldOut?: boolean; // stato dei biglietti
  ageRestriction?: number; // es. 18 o 21
  description?: string; // descrizione dell’evento
  tags?: string[]; // es. ["open air", "underground", "live set"]
};
