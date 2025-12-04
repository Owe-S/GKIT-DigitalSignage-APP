# GKIT Digital Signage App - Admin Guide

**Versjon:** 2.0  
**Dato:** Desember 2025

---

## Innhold

- [Kom i gang](#kom-i-gang)
- [Logge inn](#logge-inn)
- [Dashboard](#dashboard)
- [Opprette skjermer](#opprette-skjermer)
- [Redigere skjerminnhold](#redigere-skjerminnhold)
- [Klubbinnstillinger](#klubbinnstillinger)
- [Feilsøking](#feilsøking)

---

## Kom i gang

GKIT Digital Signage App lar deg enkelt administrere digitale infoskjermer på golfklubben. Du kan:
- Opprette flere skjermer for ulike steder (resepsjon, restaurant, proshop)
- Redigere innhold med widgets (værmelding, starttider, tilbud)
- Laste opp bilder direkte
- Sette opp klubbens logo og info

**URL til Admin:** [https://gkit-digital-signage.web.app/#/admin](https://gkit-digital-signage.web.app/#/admin)

---

## Logge inn

### Metode 1: Google Workspace (anbefalt)
1. Gå til [https://gkit-digital-signage.web.app/#/admin/login](https://gkit-digital-signage.web.app/#/admin/login)
2. Klikk **"Logg inn med Google / Workspace"**
3. Velg din klubb-account
4. Du blir sendt til Dashboard

### Metode 2: E-post og passord
1. Skriv inn e-post og passord
2. Klikk **"Logg inn"**

> **Tips:** Bruk Google Workspace hvis mulig, det er raskere og tryggere.

---

## Dashboard

Dashboardet viser en oversikt over alle skjermene dine.

### Skjermkort
Hvert kort viser:
- **Skjermnavn** (f.eks. "Resepsjon")
- **Status** (Online/Offline)
- **Sist aktiv**
- **Handlinger:**
  - **Rediger Innhold** - Åpne screen editor
  - **Visning** - Se forhåndsvisning i ny fane
  - **Kopier URL** - Kopier URL for å åpne på TV/display

### Topplinjen
- **Innstillinger** - Klubbinnstillinger (logo, navn)
- **Tilbake til Visning** - Gå til display-modus
- **Klubbnavn** (vises øverst til høyre)
- **Logg ut** (ikon)

---

## Opprette skjermer

1. Klikk **"Ny Skjerm"** (blå knapp øverst til høyre)
2. Skriv inn navn/plassering (f.eks. "Restaurant", "Hull 1 Tee")
3. Klikk **"Opprett Skjerm"**
4. Skjermen opprettes med standardinnstillinger
5. Klikk **"Rediger Innhold"** for å sette opp lysbilder

> **Info:** Hver skjerm får en unik URL som du kan åpne på en TV eller skjerm.

---

## Redigere skjerminnhold

### Åpne Screen Editor
Fra Dashboard → Velg skjerm → Klikk **"Rediger Innhold"**

### Venstre panel: Lysbilder
- Se alle lysbilder for skjermen
- Klikk på et lysbilde for å redigere
- Klikk **"+" (Ny Skjerm)** for å legge til lysbilde
- Klikk **🗑️** for å slette lysbilde

### Høyre panel: Innstillinger

#### 1. Layout
Velg layout for lysbildet:
- **Fullscreen** - Ett stort widget (f.eks. tilbud, bilde)
- **Split Vertical** - To kolonner side-ved-side
- **Sidebar Right** - Stort widget til venstre + sidebar høyre
- **Grid 2x2** - Fire widgets i rutenett

#### 2. Varighet
Sett hvor lenge lysbildet vises (sekunder).

#### 3. Widgets
Legg til innhold i layouten:
- **Weather (Yr)** - Værmelding fra Yr.no
- **GolfBox Tee Times** - Starttider (krever GolfBox-kobling)
- **GolfBox Tournaments** - Turneringer
- **News (RSS)** - Nyheter fra RSS-feed
- **Manual Offer** - Egendefinert tilbud/bilde
- **Header** - Overskrift/bilde

#### Redigere widgets
1. Klikk **blyant-ikonet** (✏️) ved widgeten
2. **For bilder:**
   - Dra/slipp bilde i opplastingsboksen
   - ELLER lim inn URL manuelt
3. **For tekst:**
   - Skriv inn overskrift, pris, etc.
4. Klikk **"Lagre Endringer"**

### Lagre
Klikk **"Lagre"** (øverst til høyre) når du er ferdig.

---

## Klubbinnstillinger

**URL:** [https://gkit-digital-signage.web.app/#/admin/settings](https://gkit-digital-signage.web.app/#/admin/settings)

### Klubbinformasjon
- **Klubbnavn** - Standard navn for alle skjermer
- **Nettside (URL)** - Klubbens hjemmeside

### Klubblogo
1. Klikk **"Last opp bilde"** eller dra/slipp bildefila
2. Anbefalt: PNG med gjennomsiktig bakgrunn
3. Se forhåndsvisning nederst

> **Tips:** Disse innstillingene brukes som standard for alle nye skjermer. Du kan overstyre dem per skjerm i Screen Editor.

---

## Feilsøking

### Problem: Skjermen viser gammelt innhold
**Løsning:** Refresh skjermen (F5 på tastatur eller restart TV).

### Problem: Kan ikke logge inn med Google
**Løsning:** 
- Sjekk at du bruker riktig Google-konto
- Prøv e-post/passord i stedet
- Kontakt support

### Problem: Bildet lastes ikke opp
**Løsning:**
- Sjekk at bildet er under 5MB
- Bruk JPG, PNG eller GIF
- Prøv å lime inn URL manuelt i stedet

### Problem: Widgets vises ikke
**Løsning:**
- Sjekk at du har lagret endringene
- Refresh displayet
- Sjekk at widgeten har riktig data (f.eks. GolfBox GUID)

---

## Kontakt

**Support:** admin-2025@golfklubb-it.com  
**Dokumentasjon:** [GitHub Repository](https://github.com/Owe-S/GKIT-DigitalSignage-APP)

---

**God fornøyelse med GKIT Digital Signage! 🏌️**
