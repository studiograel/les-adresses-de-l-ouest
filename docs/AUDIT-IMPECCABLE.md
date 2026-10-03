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
