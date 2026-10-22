# Messa in linea di naturalia.cc

Da fare una volta sola, in quest'ordine. Nessun segreto va scritto nel repo: chiavi e token vanno solo nei pannelli indicati.

## 1. Accesso GitHub (push dal Mac)

Il Mac usa già `gh` con l'account **fuzzybear62**. Oggi `naturalia-dev/website` risponde "Repository not found" perché quell'account non vi ha accesso.
Non servono chiavi nuove: basta dare l'accesso a fuzzybear62.

- Se `naturalia-dev` è un **utente**: entra come naturalia-dev → repo `website` → Settings → Collaborators → *Add people* → `fuzzybear62`.
  Poi accetta l'invito da fuzzybear62 (email o github.com/notifications).
- Se `naturalia-dev` è un'**organizzazione**: Settings dell'organizzazione → People → invita `fuzzybear62`, oppure, nel repo, Settings → Collaborators and teams → aggiungi fuzzybear62 con ruolo **Write**.

Verifica: `git -C /Users/aldo/repo/naturalia-web ls-remote origin` non deve più dare errore.
Alternativa solo se non vuoi legare fuzzybear62: una *deploy key* SSH con accesso in scrittura sul solo repo (te la preparo io su richiesta).

## 2. reCAPTCHA v2 (chiavi proprie)

1. google.com/recaptcha/admin → **+** (nuovo sito).
2. Etichetta `naturalia.cc`; tipo **reCAPTCHA v2 → casella di spunta "Non sono un robot"**.
3. Domini: `naturalia.cc` e il sottodominio Netlify (`<nome>.netlify.app`, dal punto 3) per provare il modulo sulle anteprime.
4. Copia **chiave del sito** e **chiave segreta**: servono al punto 3. Le istruzioni di integrazione di Google non servono: la verifica la fa Netlify.

## 3. Netlify (account dedicato)

1. *Add new project* → *Import an existing project* → GitHub → autorizza l'app Netlify su `naturalia-dev`, limitandola al repo `website`.
2. Build: lascia i valori letti da `netlify.toml` (`npm run build`, cartella `dist`, Node 22).
3. Prima del primo deploy: Project configuration → Environment variables:
   - `SITE_RECAPTCHA_KEY` = chiave del sito (scope Builds + Runtime)
   - `SITE_RECAPTCHA_SECRET` = chiave segreta (scope Runtime; "Contains secret values")
4. Forms: se Netlify lo chiede, *Enable form detection*, poi rilancia il deploy. Devono comparire `contact-it` e `contact-en`.
5. Notifiche: Project configuration → Notifications → Emails and webhooks → *Form submission notifications* → *Add notification* → Email → l'indirizzo dell'amministrazione (non scriverlo qui: il repo è pubblico), form: *Any form*.
6. Domain management → *Add a domain* → `naturalia.cc` (Netlify aggiunge anche `www`). HTTPS si attiva da solo dopo il DNS.

## 4. DNS su Cloudflare (sempre DNS-only, nuvola grigia)

| Tipo  | Nome  | Valore                          | Proxy    |
| :---- | :---- | :------------------------------ | :------- |
| CNAME | `@`   | `apex-loadbalancer.netlify.com` | DNS only |
| CNAME | `www` | `<nome>.netlify.app`            | DNS only |

Cloudflare "appiattisce" il CNAME sull'apex: è il record consigliato da Netlify; in alternativa un **A** `@` → `75.2.60.5`.
Togli eventuali record A/AAAA/CNAME preesistenti su `@` e `www`. Mai la nuvola arancione: aggiunge latenza davanti a Netlify.
I valori esatti per il tuo sito sono in Netlify → Domain management → *Pending DNS verification*.

## 5. CMS (/admin)

1. github.com → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → *Generate new token*.
2. Resource owner `naturalia-dev`; *Only select repositories* → `website`; Permissions → Repository → **Contents: Read and write**. Scadenza a scelta.
3. Su `https://naturalia.cc/admin/` → *Sign In Using Access Token* → incolla il token (resta solo in quel browser).

Se `naturalia-dev` è un'organizzazione, potrebbe dover approvare il token (Settings → Personal access tokens → Pending requests).
