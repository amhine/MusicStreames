# 🎵 MusicStream – Application de Gestion et Lecture de Musique Locale

MusicStream est une application web développée avec **Angular 17+** permettant aux utilisateurs de gérer, organiser et écouter leur musique locale.  
Le projet met l’accent sur une **architecture Angular propre**, une **gestion d’état réactive** avec **RxJS / Signals**, et une **expérience utilisateur fluide**.

---

## 🚀 Objectifs du projet

- Créer une application musicale simple et fonctionnelle
- Gérer efficacement les tracks audio locaux
- Implémenter une architecture maintenable basée sur les bonnes pratiques Angular
- Utiliser des services pour la gestion d’état (lecteur audio et tracks)
- Assurer la persistance des données côté client

---

## 🧩 Fonctionnalités principales

### 🎼 Gestion des tracks (CRUD)
Chaque track contient :
- Titre de la chanson (max 50 caractères)
- Nom de l’artiste
- Description optionnelle (max 200 caractères)
- Date d’ajout (automatique)
- Durée (calculée automatiquement)
- Catégorie musicale (pop, rock, rap, etc.)
- Fichier audio (MP3, WAV, OGG – max 10MB)

### 📚 Pages principales
- **Bibliothèque**
  - Liste complète des tracks
  - Recherche par titre / artiste
  - Filtres par catégorie
- **Page Track**
  - Détails du track sélectionné
  - Lecture audio
- **Lecteur Audio**
  - Play / Pause
  - Piste suivante / précédente
  - Contrôle du volume
  - Barre de progression

### 🎧 Audio
- Lecture via **HTMLAudioElement** ou **Web Audio API**
- Gestion des états du lecteur :
  - `playing`
  - `paused`
  - `buffering`
  - `stopped`

---

## 🏗️ Architecture & Services

### Services principaux

#### 🎵 AudioPlayerService
Gestion de l’état du lecteur audio :
- États réactifs via `BehaviorSubject` ou `Signals`
- Contrôles : play, pause, next, previous
- Gestion du volume et de la progression

#### 📀 TrackService
Gestion des tracks :
- CRUD complet (Create, Read, Update, Delete)
- États : `loading`, `success`, `error`
- Communication avec le `StorageService`

#### 💾 StorageService
Persistance côté client :
- Stockage des métadonnées
- Stockage des fichiers audio
- Gestion des erreurs de lecture/écriture
- Implémentation possible avec :
  - IndexedDB (recommandé)
  - localStorage / sessionStorage

---

## 📂 Gestion des fichiers audio

- Taille maximale : **10MB**
- Formats supportés :
  - MP3
  - WAV
  - OGG
- Validation automatique des fichiers
- Messages d’erreur UI en cas de problème

---

## ✅ Validations & Gestion d’erreurs

- Validation des champs de formulaire (Reactive Forms)
- Limites de caractères (titre, description)
- Validation des formats audio et images
- Gestion des erreurs de stockage
- Feedback utilisateur clair selon l’état de l’application

---

## 🧪 Bonus implémentables

- Image de couverture par track (PNG, JPEG)
- Drag & Drop pour réorganiser les tracks
- Tests unitaires et d’intégration (Jasmine / Karma)
- Intégration d’une API de lyrics
- Dockerisation de l’application

---

## 🛠️ Technologies utilisées

- **Angular 17+**
- **TypeScript**
- **RxJS / Observables**
- **Signals (Angular)**
- **Reactive Forms**
- **Angular Routing avec Lazy Loading**
- **Bootstrap / Tailwind CSS**
- **IndexedDB / localStorage**
- **HTMLAudioElement / Web Audio API**

---

## 📦 Installation et lancement

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
ng serve
