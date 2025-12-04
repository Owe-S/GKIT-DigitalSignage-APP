# Ofte Stilte Spørsmål (FAQ)

Her samler vi teknisk informasjon og veiledninger for oppsett av integrasjoner.

## GolfBox Integrasjon

Vi har foreløpig ikke direkte API-tilgang til GolfBox, men integrasjon kan gjøres via scripts og iframes som GolfBox tilbyr.

### Hvordan viser jeg klubbens turneringsliste?
For å vise en liste over kommende turneringer, kan du bruke GolfBox sin "Tournament List" plugin.
Dette krever at du legger inn en spesifikk URL eller script på nettsiden (eller i en widget).

*   **Dokumentasjon**: [Få klubbens turneringsliste på klubbens egen webside](https://golfbox.zendesk.com/hc/no/articles/201807463-F%C3%A5-klubbens-turneringsliste-p%C3%A5-klubbens-egen-webside)
*   **Metode**: Iframe eller JavaScript embed.

### Hvordan setter jeg opp GolfBox Innlogging?
For å la medlemmer logge inn i GolfBox direkte fra infoskjermen (f.eks. for scoreinntasting eller bestilling), brukes et eget login-script.

*   **Dokumentasjon**: [Innlogging til Golfbox fra din nettside](https://golfbox.zendesk.com/hc/no/articles/4411707548434-Innlogging-til-Golfbox-fra-din-nettside)
*   **Viktig**: Dette krever at du laster ned og inkluderer `golfbox_login.js` og `golfbox_login.css` fra Norsk Golf.

### Hva trenger jeg for full API-tilgang?
For å bygge helt egne widgets (utenom GolfBox sitt standard design), trenger vi API-nøkler.
Kontakt GolfBox support for å få tilgang til deres REST API eller SOAP API hvis du ønsker dypere integrasjon.
