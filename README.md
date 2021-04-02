# Test technique

Bonjour Pierre,

Voici un projet autour du cookie consent :).

Pour faire tourner cette page : npm i + npm run serve > c’est expliqué plus bas.
l’url de la page est ici :
- en local : http://0.0.0.0:3001/post.html
- en public : http://192.168.1.xxx:3001/post.html (à remplacer par ton ip locale)

## Exercice de code review

Vous trouverez la PR ici : https://github.com/mediaparttech/test-pierre/pull/1

### Focus sur le code
- Indiquez ce qui manque à cette PR pour respecter les standards qualité que vous souhaitez respecter.
- Indiquez des anti-patterns.

### Tester cette modale

## Correctifs suite à la review

Proposez des corrections.
Pour éviter de perdre du temps avec les confs ssl, vous nous présenterez vos solutions en partage d’écran.

## Développer le deuxième écran

À partir du document Figma envoyé par mail, proposer une intégration du deuxième écran.

# Tooling

## Principe
Le tooling d'intégration a été pensé pour être le plus proche possible de l'app SF :

- les règles de lint sont identiques pour Eslint, Stylelint et Prettier
- l'HTML est généré à partir de fichiers Twig
- le contenu provient de fichiers JSON

## Installation

Depuis la racine du projet lancer `npm install` pour installer les dépendances en local.

## Modes

### `npm run upgrade`
Permet de mettre à jour interactivement les dépendances NPM.

### `npm run lint`
Lint les fichiers JS et SCSS avec ESlint, Stylelint.

### `npm run icon`
Compile toutes les icons SVG sous forme de sprite dans un template Twig.

### `npm run build`
Compile toutes les assets statiques `css / fonts / images / js` dans le dossier `public/dist`.
Compile toutes les assets du contenu `images / son / video` dans le dossier `public/content`.
Compile toutes les templates `html` dans le dossier `public`.

### `npm run watch`
Pareil que `npm run build` mais en mode watch.

### `npm run serve`
Lance un serveur de développement avec hot-reload et watch. (aucun fichier ne sera enregistré, ils sont chargés depuis la mémoire)

**⚠️ la page affiche `Cannot GET /`**
> C'est "normal" pour le moment. Ce bug est lié à l'option [devServer.serveIndex](https://webpack.js.org/configuration/dev-server/#devserverserveindex) de **webpack-dev-server** qui ne fonctionne pas comme prévu.
Normalement, sans `index.html` la page doit afficher une liste des fichiers compilés et donc des templates HTML.
Ce bug devrait prochainement être résolu avec le passage à la version 4 de **webpack-dev-server**.
En attendant pour afficher les templates il faut se rendre sur : http://0.0.0.0:3001/webpack-dev-server

### `npm run preview`
Lance un serveur de prévisualisation des templates compilés dans le dossier `public`.

## Sources

Les sources se trouvent dans le dossier `src` et disposent tous d'un alias :

- `~fonts` => `src/fonts`
- `~images` => `src/images`
- `~js` => `src/js`
- `~scss` => `src/scss`
- `@views` => `src/views`

## Content

Dossier pour placer des assets de contenu pour tester l'intégration (image / son / vidéo)
Ce dossier dispose d'un alias :

- `~content` => `content`

## Data

Dossier pour placer des fichiers JSON qui contiennent les données de test pour l'intégration.
