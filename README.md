# Hibrid Shopp - Kutyatenyésztő Weboldal

## 📋 Projekt leírás

Professzionális kutyatenyésztő weboldal React és Vite használatával. Az oldal különböző kutyafajták (Maltipoo, Cavapoo, Goldendoodle) bemutatására és időpontfoglalásra szolgál.

## 🚀 Funkciók

- **Reszponzív dizájn** - Mobil és asztali eszközökön is tökéletesen működik
- **Kutyafajta bemutató** - Részletes információk a különböző fajtákról
- **Eladó kutyák galériája** - Képek és információk a jelenleg eladó kutyákról
- **Időpontfoglalás** - Online időpontfoglalási rendszer
- **Kapcsolat** - WhatsApp és telefon kapcsolat egy kattintással
- **Modern UI** - Tailwind CSS és shadcn/ui komponensekkel

## 🛠️ Technológiai stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Backend**: FastAPI (Python) - booking rendszerhez

## 📁 Projekt struktúra

```
hibrid-shopp-website/
├── dog-website/          # React frontend
│   ├── src/
│   │   ├── components/   # UI komponensek
│   │   ├── assets/       # Képek és egyéb erőforrások
│   │   └── App.jsx       # Fő alkalmazás komponens
│   ├── public/           # Statikus fájlok
│   └── package.json      # Frontend függőségek
├── booking-backend/      # FastAPI backend
│   ├── src/
│   │   ├── routes/       # API végpontok
│   │   ├── models/       # Adatbázis modellek
│   │   └── main.py       # Backend alkalmazás
│   └── requirements.txt  # Backend függőségek
└── README.md            # Projekt dokumentáció
```

## 🚀 Telepítés és futtatás

### Frontend (React)

```bash
cd dog-website
npm install
npm run dev
```

A frontend elérhető lesz: http://localhost:5173

### Backend (FastAPI)

```bash
cd booking-backend
pip install -r requirements.txt
python src/main.py
```

A backend API elérhető lesz: http://localhost:8000

## 📱 Fő funkciók részletesen

### 1. Főoldal
- Hero szekció imádnivaló kutyákkal
- Szolgáltatások bemutatása
- Kiemelt kutyák előnézet

### 2. Fajták
- Maltipoo, Uszkár, Cavapoo, Goldendoodle
- Részletes leírások és tulajdonságok
- Elérhető kölykök listája

### 3. Eladó kutyák
- Képek és részletes információk
- Árak és tulajdonságok
- Kattintható kártyák részletekkel

### 4. Időpontfoglalás
- Online űrlap
- Dátum és időpont választás
- Automatikus visszaigazolás

### 5. Kapcsolat
- WhatsApp egy kattintással
- Telefon hívás közvetlenül
- Email és social media linkek

## 🎨 Design jellemzők

- **Színséma**: Narancs-amber-sárga gradiensek
- **Tipográfia**: Modern, olvasható betűtípusok
- **Animációk**: Smooth hover effektek és átmenetek
- **Reszponzivitás**: Mobil-first megközelítés

## 📞 Kapcsolat

- **Telefon**: +36 70 217 885
- **WhatsApp**: https://wa.me/3670217885
- **Email**: shoppdogg583@gmail.com
- **Instagram**: @hibridshopp

## 🔧 Fejlesztői információk

### Kód minőség
- ESLint konfiguráció
- Prettier formázás
- TypeScript támogatás (jsconfig.json)

### Teljesítmény
- Vite build tool
- Code splitting
- Optimized images
- Lazy loading

### SEO
- Meta tagek
- Open Graph
- Structured data
- Sitemap

## 📄 Licenc

Ez a projekt privát használatra készült a Hibrid Shopp számára.

---

**Fejlesztve szeretettel és gondossággal** ❤️ 