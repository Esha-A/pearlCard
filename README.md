out-of-the-box for demos and tests.
# PearlCard Project

## Demo & Test Data Notes

- For demo purposes, the frontend config is set to use an already instantiated user (see `src/config.js`).
- In test mode (local development), the backend will automatically instantiate the User, TrainFare, and PearlCard tables with default/demo data if they do not exist. This ensures the app is ready to use 

## Project Folder Structure

```
pearlCard/
├── Pipfile
├── Pipfile.lock
├── README.md
├── backend/
│   ├── db.sqlite3
│   ├── manage.py
│   ├── mydatabase.db
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   ├── journeys/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── zones.py
│   ├── pearlCard/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── views.py
│   ├── source/
│   │   ├── bin/
│   │   ├── include/
│   │   ├── lib/
│   │   └── pyvenv.cfg
│   ├── trainFares/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── fares.json
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   ├── zones.py
│   ├── users/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── permissions.py
│   │   ├── roles.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── views.py
│   └── venv/
├── eslint.config.js
├── frontend/
│   ├── .babelrc
│   ├── .git/
│   ├── .gitignore
│   ├── .vscode/
│   ├── README.md
│   ├── jest.config.js
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── AuthContext.js
│   │   ├── components
│   │   │   ├── header/
│   │   │   └── journey
│   │   │       ├── helpers
│   │   │       ├── hooks
│   │   │       ├── utils
│   │   ├── config.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── vite.config.js
├── index.html
├── package.json
├── public/
├── vite.config.js
```

---

## Backend Setup (Django)

### Backend Requirements

- **Python**: 3.9
- **Django**: (from Pipfile)
	- django
	- djangorestframework
	- django-cors-headers
	- djangorestframework-simplejwt

All backend dependencies are specified in the `Pipfile`. Install them using `pipenv install` (recommended) or convert to `requirements.txt` if needed.



### Installation & Running
1. **Navigate to the backend directory:**
	```sh
	cd backend
	```
2. **(Recommended) Activate the virtual environment:**
	- With pipenv:
	  ```sh
	  pipenv shell
	  ```
	- With venv:
	  ```sh
	  source venv/bin/activate  # macOS/Linux
	  # or
	  venv\Scripts\activate    # Windows
	  ```
3. **Install dependencies:**
	```sh
	pipenv install --dev
	# or, if using pip:
	pip install -r requirements.txt
	```
4. **Apply migrations:**
	```sh
 	python manage.py makemigrations
	python manage.py migrate
	```
5. **(Optional) Create a superuser:**
	```sh
	python manage.py createsuperuser
	```
6. **Run the development server:**
	```sh
	python manage.py runserver
	```
7. **API will be available at:**
	- http://localhost:8000/api/
	- Django admin: http://localhost:8000/admin/

### Running Backend Tests
```
python manage.py test
```
---

## Frontend Setup (React)

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)

### Installation & Running
1. **Navigate to the frontend directory:**
	```sh
	cd frontend
	```
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Start the development server:**
	```sh
	npm start
	```
4. **The app will be available at:**
	- http://localhost:3000/

### Running Frontend Tests
```sh
npm test
```

---

## Notes
- The frontend is configured to proxy API requests to the backend at http://localhost:8000.
- Make sure both backend and frontend servers are running for full functionality.
- For production, build the frontend with `npm run build` and serve the static files as needed.

---

## Troubleshooting
- If you encounter migration issues, try deleting the `db.sqlite3` file and the `migrations/` folders (except `__init__.py`), then re-run migrations.
- For CORS/API issues, ensure the backend is running and accessible at the expected port.
- For any dependency issues, ensure you are using compatible versions of Python and Node.js.

---

## Contact
For further help, contact the project maintainer or check the code comments for guidance.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
