# PROGETTO PRATICO - Comparatore di Eventi 🎶

**NoizeGuide** è una web app interattiva che permette agli utenti di scoprire, confrontare e gestire una selezione di eventi di musica elettronica. L'app offre una panoramica dettagliata degli eventi disponibili, con funzionalità avanzate di ricerca, filtro e ordinamento per facilitare la navigazione. Gli utenti possono visualizzare le informazioni complete di ciascun evento, confrontare due eventi affiancati e salvare i propri preferiti per un accesso rapido e personalizzato. L'interfaccia intuitiva e reattiva garantisce un'esperienza utente fluida sia su desktop che su dispositivi mobili. 🚀

## Tecnologie Utilizzate 🛠️

- **React 18** – Libreria per la creazione di interfacce utente reattive.
- **Vite** – Strumento di build e sviluppo rapido per progetti frontend.
- **JavaScript (ES6+)** – Linguaggio di programmazione principale.
- **Tailwind CSS** – Framework utility-first per la stilizzazione rapida e responsive.
- **React Router** – Gestione delle rotte e navigazione tra le pagine.
- **Axios** – Client HTTP per la comunicazione con il backend.
- **localStorage** – Persistenza dei dati lato client (preferiti).
- **Git & GitHub** – Controllo versione e collaborazione.
- **npm** – Gestione delle dipendenze del progetto.

Il [backend](https://github.com/boolean-it/progetto-finale-spec-frontend-back) era stato già realizzato.  

## Tematica 🎧
Spinto dalla mia passione per la musica elettronica, ho deciso di sviluppare una web app che consenta agli utenti di esplorare, confrontare e gestire una selezione di eventi dedicati a questo genere musicale.

## Funzionalità principali ✨

- Visualizzazione della lista di Eventi 📋
- Ricerca per titolo 🔍
- Filtro per categoria musicale 🎼
- Ordinamento alfabetico A-Z / Z-A per titolo e categoria 🔄
- Pagina dettaglio del singolo evento con informazioni complete 📝
- Comparatore affiancato di 2 eventi ⚖️
- Sistema di preferiti accessibile da ogni sezione ⭐
  
L’utente non può creare, modificare o cancellare record.  

## Requisiti minimi (obbligatori) ✅

- Risorsa definita nel file types.ts posizionato nella cartella *backend*  
- Home page con la lista di tutti i vinili con:
  - dettaglio delle proprietà *title* e *category*  
  - barra di ricerca (per *title*)  
  - filtro per *category*  
  - ordinamento per *title* e *category* dall A-Z e dalla Z-A  
- Pagina dettaglio con tutte le proprietà del evento selezionato  
- Pagina comparatore di 2 eventi (affiancati)  
- Pagina dei preferiti, sempre accessibile

## Requisiti opzionali (facoltativi) 🌟

- Debounce sulla ricerca, per migliorare la UX ed evitare chiamate API inutili
- Persistenza dei preferiti (es. salvataggio in localStorage), così che rimangano anche dopo il refresh della pagina
- Gestione degli stati vuoti, come:
    - Nessun risultato trovato 😕
    - Lista preferiti vuota 📭
    - Nessun elemento selezionato nel comparatore 🕳️

