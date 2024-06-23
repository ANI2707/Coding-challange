## 📦 Installation

You can clone the project directly from this repo to your local system.

### 1. Clone the Repo

```bash
git clone https://github.com/username/Devlabs.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
#or
npm run dev
```

### 4. Create Backend Environment

```bash
MONGODB_URI=<mongodb connection uri for the database>
PORT=<port number on which backend is running>
```

### 5. Create Frontend Environment

All the environment variables for react must be prefixed with `REACT_APP_`.

```bash
REACT_APP_BACKEND=<url of the backend>
```