# 🎬 Movie Dashboard (React + Django)

A full-stack project that visualizes movie data fetched from TMDB API and stores user-saved movies in a PostgreSQL database.  
The frontend is built with **React 19 + Vite**, and the backend uses **Django REST Framework**.

---

## 🧩 Features

- 🔍 Fetch movies from TMDB API  
- ➕ Add / ➖ Remove movies to your personal list  
- 📈 View saved movies and visualize ratings using charts  
- 🐘 Connected to PostgreSQL via `neon.tech`

---

## 🛠️ Project Structure

Movies-View/
├── starterpyproject/
│   ├── client/              
│   ├── server/
│   │   └── demoProject/     
│   └── .venv/               
└── README.md

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/v-ju/Movies-View.git
cd Movies-View

Frontend Setup (React)

cd starterpyproject/client
npm install       # install dependencies
npm run dev       # run frontend

The React app will start at:

http://localhost:5173/

Backend Setup (Django)

cd starterpyproject/server/demoProject
python -m venv .venv              # create virtual environment
source .venv/bin/activate         # macOS/Linux
# or
.venv\Scripts\activate            # Windows

pip install -r requirements.txt   # install dependencies
python manage.py migrate          # apply database migrations
python manage.py runserver        # start backend server

Create a .env file inside starterpyproject/server/demoProject/ with:

DATABASE_URL=your_neon_postgres_url
DEBUG=True
SECRET_KEY=your_secret_key


Method	Endpoint	                        Description
GET	    /api/movies/	                    Fetch movies from TMDB
POST	/api/movies/add/	                Add movie to DB
GET	    /api/movies/list/	                List saved movies
DELETE	/api/movies/delete/?tmdb_id=123	    Delete movie by TMDB ID