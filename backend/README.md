# NAYA Backend - Guide de Déploiement sur Render

## 🚀 Déploiement sur Render

### 1. Prérequis
- Compte Render.com
- Base de données MongoDB (MongoDB Atlas recommandé)
- Variables d'environnement configurées

### 2. Variables d'Environnement Requises

Dans votre dashboard Render, configurez ces variables :

```bash
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/naya
JWT_SECRET=votre_secret_jwt_tres_securise
GOOGLE_MAPS_API_KEY=votre_cle_api_google_maps
STRIPE_SECRET_KEY=votre_cle_secrete_stripe
TWILIO_ACCOUNT_SID=votre_account_sid_twilio
TWILIO_AUTH_TOKEN=votre_auth_token_twilio
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

### 3. Configuration Render

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node.js
- **Node Version**: 18.x ou supérieur

### 4. Déploiement

1. Connectez votre repository GitHub à Render
2. Sélectionnez le dossier `backend`
3. Configurez les variables d'environnement
4. Déployez !

### 5. Vérification

Après le déploiement, testez votre API :
```
https://votre-app.onrender.com/
```

## 🔧 Développement Local

```bash
cd backend
npm install
npm run dev
```

## 📝 Notes Importantes

- Assurez-vous que MongoDB est accessible depuis Render
- Le port sera automatiquement configuré par Render
- Utilisez HTTPS en production
- Configurez CORS pour votre frontend
