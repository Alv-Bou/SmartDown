# SmartDown — Éditeur Markdown Live

## Description du projet

SmartDown est un éditeur Markdown en temps réel, simple et élégant, qui permet de visualiser instantanément la conversion Markdown vers HTML. Il intègre un mode clair/sombre, la possibilité de copier le HTML généré, ainsi qu’un export complet en fichier HTML. Le tout sécurisé contre les failles XSS grâce à DOMPurify.

## Fonctionnalités clés

- Édition live de Markdown avec aperçu HTML immédiat
- Mode clair / mode sombre basculable
- Copier le HTML rendu dans le presse-papiers en un clic
- Module d'accessibilité
- Exporter l’aperçu en fichier HTML complet
- Sauvegarde automatique du contenu et du thème dans le localStorage
- Interface responsive pour un usage sur mobile et desktop
- Sécurisation du HTML généré avec DOMPurify

## Comment lancer / tester

1. Cloner ce dépôt :
   ```bash
   git clone https://github.com/AlvynBoulay/SmartDown.git
   ```
2. Ouvrir le fichier `index.html` dans un navigateur moderne (Chrome, Firefox, Edge…)
3. Commencer à écrire du Markdown dans la zone d’édition et voir l’aperçu se mettre à jour en temps réel
4. Utiliser les boutons pour copier le HTML ou l’exporter

## Tech stack utilisée

- HTML5 & CSS3 modernes avec variables CSS pour thème dynamique
- JavaScript ES6+ avec DOMPurify pour la sécurité
- Librairie marked.js pour parser le Markdown
- Responsive design avec CSS Grid et Flexbox
