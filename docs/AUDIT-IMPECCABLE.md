# Audit Impeccable et contrôles de qualité

Pages auditées : accueil (`/`), mentions légales, confidentialité. Version : direction « une de journal », 3 octobre 2026.
Outils : `impeccable detect` (détecteur), audit en 5 dimensions (fiche `audit` d'Impeccable), passe de finition `polish`,
Lighthouse 13.5 (mobile), mesures dans un vrai navigateur (Chrome).

## Résultat

| # | Dimension | Note | Point clé |
|---|-----------|------|-----------|
| 1 | Accessibilité | 4 / 4 | Contrastes mesurés sur chaque texte, zones tactiles de 44 px, clavier, un seul `<h1>` par page |
| 2 | Performance | 4 / 4 | Lighthouse mobile 100 ; 133 Kio sur l'accueil ; aucune requête vers un autre site |
| 3 | Thème | 3 / 4 | Aucune couleur écrite en dur hors des jetons ; pas de mode sombre (choix : un seul thème « papier ») |
| 4 | Adaptation aux écrans | 4 / 4 | Aucun débordement sur 54 combinaisons (3 pages × 6 largeurs × 3 tailles de texte) |
| 5 | Intégrité de l'implémentation | 4 / 4 | Détecteur Impeccable : `[]` (aucune alerte) ; aucun code CSS mort |
| | **Total** | **19 / 20** | Excellent |

Aucune alerte P0, P1 ni P2 ne reste ouverte.

## Contrastes (calculés, formule WCAG 2.1)

Minimum visé : 4,5:1 pour le texte, 3:1 pour le gros texte (24 px et plus) et les éléments d'interface.

| Paire | Rapport | Usage |
|-------|---------|-------|
| encre `#0E1B5E` sur crème `#F8F4EC` | 14,32 | texte courant, titres |
| encre sur voile `#EFE7D8` | 12,78 | rubrique « Aller plus loin » |
| marine `#162996` sur crème | 10,68 | filets, cadres, liens, bouton |
| marine sur voile | 9,54 | |
| crème sur marine | 10,68 | pied de page |
| crème-doux `#CBCBDB` sur marine | 7,31 | texte secondaire du pied de page |
| marine-doux `#3F4EA5` sur crème / voile | 6,73 / 6,01 | légendes, sources |
| **orange foncé `#94500F` sur crème / voile** | **5,61 / 5,01** | surtitres des rubriques (le texte orange) |
| encre sur orange `#DB8839` | 5,68 | marqueurs `[À CONFIRMER]`, texte du bouton survolé |
| orange `#DB8839` sur crème | 2,52 | **jamais du texte** : seulement de petits traits décoratifs |

Mesure réelle dans le navigateur (chaque élément de texte, avec son vrai fond) : le pire texte courant est à **5,01:1**
(orange foncé sur voile), le pire gros texte à **10,68:1**. Aucune violation, sur les 3 pages et à 375, 768 et 1440 px.

## Lighthouse (mobile, version construite)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|------|-------------|---------------|------------------|-----|
| Accueil | 100 | 100 | 100 | 100 |
| Mentions légales | 100 | 100 | 100 | 100 |
| Confidentialité | 100 | 100 | 100 | 100 |

Accueil : premier affichage 0,9 s, plus grand élément 1,5 s, blocage 0 ms, décalage de mise en page 0,004.

## Trouvé et corrigé pendant ce passage

| Trouvé | Corrigé |
|--------|---------|
| Chiffres de Playfair « à l'ancienne » (le 9 et le 4 descendent) | chiffres alignés forcés partout |
| Page plus large que l'écran à 768 px (« 235 000 » trop grand dans une case étroite) | la taille des chiffres suit la largeur de leur case (unité `cqi`) |
| Ligne de rubriques sur deux lignes à 768 px | espaces resserrés sur tablette |
| Détecteur Impeccable : trait orange au survol des étapes pris pour un « liseré de carte » | remplacé par un soulignement du titre de l'étape |
| Apostrophes droites (`l'Ouest`) | apostrophes de typographe sur tout le texte visible |
| Débordements quand le texte est agrandi à 150 / 200 % (bandeau, e-mail du pied, grands titres, bouton, étapes, communes) | retours à la ligne automatiques, grilles rétrécissables |
| Liens du pied de page de 39 à 42 px de haut | zone tactile de 44 px |
| Espaces manquants avant des liens (« dans lapolitique ») | rétablis |
| Fiche d'un pin qui sortait de la carte sur téléphone | fiche en bandeau dans la carte |
| Noms de classes sans style | retirés |

## Restant (choix assumés ou limites)

- **[P3] Surtitre au-dessus de chaque titre de rubrique** : la fiche de qualité d'Impeccable le déconseille d'habitude. La correction du 03/10/2026 le demande
  explicitement (« un surtitre en petites capitales »). Gardé, car la consigne du brief l'emporte.
- **[P3] Chiffres en grille** (« gros chiffre, petite légende ») : même remarque, demandé par le brief et rendu en grille à filets verticaux, pas en cartes.
- **[P3] Pas de mode sombre** : un journal sur papier crème, un seul thème. `color-scheme: light` est déclaré.
- **[P3] Colonnes de texte à 768 px** : deux colonnes dès 768 px comme demandé, mais cela donne environ 40 à 45 caractères par ligne sur tablette
  étroite (65 à 70 sur grand écran). Le menu n'est pas fermé par la touche Échap (comportement normal d'un `<details>`).
- **Info** : Lighthouse signale seulement, sans note, la « chaîne de dépendances réseau » des polices (hébergées chez nous, rien d'extérieur).

## Non vérifié

- Parcours complet au clavier, élément par élément : j'ai contrôlé que chacun des 17 éléments cliquables de l'accueil montre un cadre de focus épais
  et assez contrasté, et fait de vrais appuis sur Tab pour les premiers (lien « Aller au contenu », rubriques). Je n'ai pas rejoué toute la tabulation de bout en bout.
- Lecteur d'écran réel (NVDA, VoiceOver) : seule la structure (repères, titres, noms accessibles) a été contrôlée par programme.
- Safari et Firefox : mesures faites avec Chrome. Les fonctions utilisées (`:has`, `cqi`, `text-wrap`, `details`) sont récentes mais bien prises en charge.
- Le comportement du site une fois en ligne chez Cloudflare (cookies, en-têtes).
- Un vrai téléphone : les mesures sont faites avec un navigateur qui simule la taille et le toucher.

---

# Passe « renforcement » : effet journal et contraste bleu / orange (3 octobre 2026)

Point de départ : étiquette Git `avant-renforcement` (retour : `git reset --hard avant-renforcement`).
Rien n'a changé dans `src/data/` (empreintes SHA-256 identiques avant / après sur les 7 fichiers).

## Contrastes calculés (formule WCAG 2.1) pour le bleu et l'orange

| Paire | Rapport | Verdict | Valeur retenue |
|-------|---------|---------|----------------|
| orange `#DB8839` sur bleu marine `#162996` | 4,24 | **gros texte et éléments d'interface seulement** (3:1) | prix, grands chiffres, « 1 h 30 », filets, fond du bouton |
| bleu marine `#162996` sur orange (texte du bouton) | 4,24 | trop juste pour du petit texte | **bleu très foncé `#0E1B5E` sur orange : 5,68** |
| orange foncé `#94500F` sur crème | 5,61 | OK | surtitres, numéros d'étapes |
| crème `#F8F4EC` sur bleu marine | 10,68 | OK | texte des blocs bleus |
| petit texte orange sur bleu marine | 4,24 avec l'orange du logo | trop juste | **orange éclairci `#E5993F` : 5,00** (6,70 sur `#0E1B5E`) |
| crème sur `#0E1B5E` (bouton survolé) | 14,32 | OK | |

Les valeurs retenues sont écrites en commentaire dans `src/styles/tokens.css`. Les couleurs de la marque ne sont changées nulle part ailleurs.
Mesure réelle dans le navigateur, sur 137 textes avec leur vrai fond : **0 violation**. Pire petit texte : 5,00:1 (date « 31 octobre 2026 » sur bleu).
Pire gros texte : 4,24:1 (orange du logo sur bleu, minimum demandé 3:1).

## Résultat des contrôles

| Contrôle | Résultat |
|----------|----------|
| Détecteur Impeccable (`detect`) | `[]` : aucune alerte |
| Lighthouse mobile, 3 pages | 100 / 100 / 100 / 100 partout (accueil : premier affichage 0,9 s, plus grand élément 1,7 s, blocage 0 ms, décalage 0) |
| Débordement horizontal | 0 sur 54 combinaisons (3 pages × 6 largeurs de 320 à 1440 px × 3 tailles de texte : 100, 150, 200 %) |
| Zones tactiles | 16 éléments cliquables, tous ≥ 44 px (mesuré à 375 et à 1440 px) |
| Un seul bouton d'action visible à la fois | 3 boutons dans la page (à 630, 3 069 et 6 486 px du haut à 1440 px), 1 visible au maximum à tout moment (mesuré à 375 et à 1440 px) |
| Clavier | 17 éléments focalisables, tous avec un anneau de 3 px (marine sur crème, crème sur bleu) ; vrai appui sur Tab vérifié sur le premier élément |
| Mouvement réduit | toutes les transitions sont dans `@media (prefers-reduced-motion: no-preference)` (7 règles, 0 en dehors) |
| Cookies, stockage, ressources tierces | aucun cookie, aucun stockage local, 0 ressource chargée hors du site |

## Trouvé et corrigé pendant ce passage

| Trouvé | Corrigé |
|--------|---------|
| Surtitre avec numéro et pointillé : débordement horizontal de 13 px à 375 px quand le texte est agrandi à 200 % | le surtitre passe à la ligne (`flex-wrap`) |
| Double trait en trop sous l'exergue (ses filets + le filet du duo) | le filet du duo est retiré juste après l'exergue |
| Chiffres de rubrique en Playfair (« 01 » ressemblait à « OI ») | chiffres en Libre Franklin, alignés |
| Pied de page devenu orange épais après le passage au thème bleu | filets du pied remis en crème comme avant |
| Apostrophes droites dans les textes venant de `src/data/` (Astro écrit `&#39;`) et dans le titre | apostrophes de typographe partout |

## Restant (choix assumés ou limites)

- **[P3] Beaucoup de filets épais** : un filet de 6 px ouvre chaque rubrique, l'exergue et les blocs bleus. C'est le langage graphique d'un journal, mais à regarder avec la cliente.
- **[P3] Sommaire sans « Pourquoi » ni « Le processus »** : 5 entrées au maximum, et les deux rubriques manquantes sont dans la page. À valider.
- **[P3] Sur téléphone et tablette étroite, le Sommaire est sous le bouton** (et non à côté du titre comme à partir de 992 px) : il commence juste sous le premier écran.
- **[P3] Traits de 1 px dans les blocs bleus** : sur certaines captures ils semblent plus pâles que le reste. Les couleurs mesurées sont bien celles de l'orange du logo ; la cause de cet effet visuel n'est pas vérifiée.

## Non vérifié

- Safari et Firefox, et un vrai téléphone (mesures faites avec Chrome qui simule la taille et le toucher).
- Lecteur d'écran réel : seule la structure (repères, titres, noms accessibles) a été lue par programme. L'exergue est volontairement caché aux lecteurs d'écran (même phrase que le chapeau de la une).
- Le comportement du site une fois en ligne chez Cloudflare (cookies, en-têtes).
- Parcours complet à la touche Tab, élément par élément : j'ai fait un vrai appui sur Tab pour le premier élément, et vérifié les 16 autres en les focalisant par programme.