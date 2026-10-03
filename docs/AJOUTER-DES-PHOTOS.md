# Ajouter une photo au site, pas à pas

Aujourd'hui le site n'a **aucune photo** : Léane et Louison n'ont pas les droits sur leurs images.
Quand des photos libres de droits (ou avec accord écrit des personnes visibles) seront prêtes, voici comment les ajouter.
Les emplacements existent déjà et restent **invisibles tant qu'il n'y a pas de photo** : aucun cadre vide.

## Avant de commencer : 3 questions

1. Les droits de la photo sont-ils confirmés (c'est une photo de Matteo, ou libre de droits avec la source notée) ?
2. Si des personnes sont visibles (commerçants, clients, passants) : ont-elles donné leur **accord écrit** ?
3. As-tu écrit une phrase qui décrit ce qu'on voit sur la photo ?

Si une réponse est « non » : on n'ajoute pas la photo.

## Les 4 emplacements

| Emplacement | Où ça s'affiche | Combien |
|-------------|-----------------|---------|
| `hero` | À droite du grand titre de la une, au-dessus de la citation | 1 |
| `concept` | À gauche du texte du concept (sur grand écran), au-dessus du texte sur téléphone | 1 |
| `offre` | En bandeau, au-dessus de l'encadré de l'offre vidéo | 1 |
| `galerie` | Une nouvelle section « En images » | de 1 à 8 |

Dès qu'une photo est ajoutée, la section change de mise en page toute seule (avec photo / sans photo).

## Étape 1 : déposer le fichier

Mets la photo dans le dossier `src/assets/photos/`.
Formats acceptés : `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
Donne un nom simple, sans espaces ni accents : `boulangerie-vitrine.jpg` (pas `photo1.jpg`).

Le site fabrique tout seul les versions légères (WebP) et renseigne la largeur et la hauteur. Pas besoin de redimensionner.
Pour une photo plus grande que 1 600 px de large, c'est parfait ; plus petite, elle sera moins nette.

## Étape 2 : ajouter une ligne dans `src/data/photos.js`

Ouvre `src/data/photos.js`. Il contient une liste vide : `export const photos = [];`.
Ajoute une entrée entre les crochets.

### Exemple complet

```js
export const photos = [
  {
    fichier: 'boulangerie-vitrine.jpg',
    alt: 'Vitrine de la boulangerie : des pains et des viennoiseries alignés sur des planches en bois',
    legende: 'La vitrine de la boulangerie, un samedi matin',
    credit: 'Photo : Matteo Grael',
    emplacement: 'concept',
    autorisation: true,
  },
];
```

### Ce que veut dire chaque ligne

- `fichier` : le nom exact du fichier déposé à l'étape 1.
- `alt` : **obligatoire**. Une phrase qui décrit la photo pour les personnes qui ne la voient pas. Jamais « photo1 ». Sans `alt`, la photo n'est pas affichée.
- `legende` : facultatif. Le petit texte sous la photo.
- `credit` : qui a pris la photo, ou d'où elle vient (source libre de droits).
- `emplacement` : `'hero'`, `'concept'`, `'offre'` ou `'galerie'`.
- `autorisation` : mets `true` **seulement** si les droits ET l'accord écrit des personnes visibles sont confirmés. Avec `false`, la photo n'est jamais affichée.
- `lienPublication` : facultatif, pour une **vidéo** (voir plus bas).

## Étape 3 : vérifier

Dans le terminal, à la racine du projet :

```bash
npm run dev
```

Ouvre l'adresse indiquée (en général `http://localhost:4321`) et regarde :

- la photo apparaît-elle au bon endroit ?
- le texte autour est-il toujours bien lisible, sur téléphone aussi (réduis la fenêtre) ?
- si elle n'apparaît pas : le terminal affiche une ligne `[photos] « … » ignorée : raison` qui dit pourquoi (pas de `alt`, mauvais nom de fichier, `autorisation` absent).

Puis vérifie que le site se construit sans erreur :

```bash
npm run build
```

## Les vidéos

Pas de lecture automatique, et **aucune intégration Instagram ou YouTube** (elles déposent des cookies et suivent les visiteurs).
On montre une **image d'aperçu** de la vidéo, avec un lien vers la publication :

```js
{
  fichier: 'apercu-video-boulangerie.jpg',
  alt: 'Image de la vidéo tournée à la boulangerie : le boulanger enfourne des pains',
  credit: 'Capture de notre vidéo',
  emplacement: 'galerie',
  autorisation: true,
  lienPublication: 'https://www.instagram.com/p/XXXXXXXX/',
}
```

Le visiteur clique sur l'image, et la publication s'ouvre dans un nouvel onglet.

## Retirer une photo

Supprime son entrée dans `src/data/photos.js` (ou mets `autorisation: false`). La section reprend sa mise en page sans photo.
Tu peux ensuite supprimer le fichier de `src/assets/photos/`.
