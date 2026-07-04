# LibriAI - AI Library Assistant

LibriAI is a complete, production-ready, AI-powered web application built with a **Java Spring Boot** backend, **MySQL** database, and a **React (Vite + Bootstrap 5)** frontend. It integrates Google's **Gemini AI** to act as an intelligent virtual librarian that helps students search books, check stock, find physical shelf layout maps, and request natural language book recommendations based strictly on the library's live database inventory.

---

## 🏗️ Project Architecture & Layout

```
ai-library-assistant/
├── docker-compose.yml           # Runs MySQL 8.0 local database
├── README.md                    # Setup guide & API documentation
├── setup_maven.ps1              # PowerShell script to download Maven
├── backend/                     # Java Spring Boot Backend
│   ├── pom.xml                  # Maven Configuration
│   ├── mvnw / mvnw.cmd          # Maven Wrapper scripts
│   └── src/main/
│       ├── java/com/library/assistant/
│       │   ├── AiLibraryAssistantApplication.java
│       │   ├── config/          # CORS configurations
│       │   ├── controller/      # REST API Controllers (Book, AI)
│       │   ├── dto/             # Validation DTOs (BookDTO, ChatRequest, ChatResponse)
│       │   ├── entity/          # JPA Hibernate Entities (Book)
│       │   ├── exception/       # custom exception handler & exceptions
│       │   ├── repository/      # MySQL Database operations
│       │   └── service/         # Business logic & Gemini API integration
│       └── resources/
│           ├── application.properties
│           └── data.sql         # Seed data inserting 30 books
└── frontend/                    # React Vite Frontend SPA
    ├── package.json             # NPM dependencies (Bootstrap, Axios, React Router)
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx              # Main routing & Dark Theme switch
        ├── index.css            # Custom glassmorphic styling, animations, colors
        ├── components/          # Reusable Navbar, Footer, BookCard, RecommendationCard
        ├── pages/               # Home, BookList, BookDetails, AIChat, FAQ, Admin pages
        └── services/            # Axios API client integrations
```

---

## ⚡ Setup & Run Instructions

### Prerequisites
1. **Java 25 JDK**: Required for the upgraded backend runtime.
2. **Node.js & NPM**: Node v26 and NPM are installed.
3. **Docker Desktop** (or a local MySQL server running on port 3306).

---

### Step 1: Start the MySQL Database
A `docker-compose.yml` file is provided in the project root to run MySQL 8.0.
1. Open a terminal in the root directory: `ai-library-assistant`
2. Spin up the MySQL database container:
   ```bash
   docker-compose up -d
   ```
   *Note: This creates a database named `library_db` with username `root` and password `root` on port `3306`.*

---

### Step 2: Configure Gemini AI API Key
The AI Library Assistant utilizes Google Gemini. To enable AI replies, configure your API key as an environment variable:
* **Windows (PowerShell)**:
  ```powershell
  $env:GEMINI_API_KEY="your-gemini-api-key-here"
  ```
* **macOS/Linux**:
  ```bash
  export GEMINI_API_KEY="your-gemini-api-key-here"
  ```
* **Offline Fallback**: If the key is not set, LibriAI runs in **Offline Fallback Mode**. The AI will politely notify you that the Gemini service is offline, but it will still fetch and list database book matches for your queries!

---

### Step 3: Run the Backend
The backend utilizes the Maven wrapper. Configure your Java 25 JDK path before running it.

1. Open PowerShell and navigate to the `backend` folder:
   ```powershell
   cd backend
   ```
2. Set the `JAVA_HOME` path for this terminal session:
   ```powershell
   $env:JAVA_HOME = "C:\Users\afrin\Downloads\java-25-openjdk-25.x.x\bin"
   $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
   ```
3. Run the Spring Boot application:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
   *Note: On first startup, Hibernate will automatically build the tables, and the `data.sql` script will automatically seed 30 high-quality tech books covering Java, Python, Databases, AI, and Software Engineering.*

---

### Step 4: Run the Frontend
1. Open a new terminal in the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Start the Vite React development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

---

## 🛠️ Librarian (Admin) Portal Credentials
To manage inventory, update shelf locations, upload cover images, or change quantities, login with:
- **Username**: `admin`
- **Password**: `admin`

---

## 📖 REST API Documentation

### 📚 Book Catalog Endpoints
| HTTP Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/books` | Get all books (sorted) | `sortBy` (default: title), `direction` (default: asc) |
| **GET** | `/api/books/{id}` | Get book details by ID | None |
| **POST** | `/api/books` | Add a new book (Admin only) | `BookDTO` (JSON) |
| **PUT** | `/api/books/{id}` | Update existing book (Admin) | `BookDTO` (JSON) |
| **DELETE** | `/api/books/{id}` | Delete a book (Admin only) | None |
| **GET** | `/api/books/search` | Search catalog by text | `query=keyword` |
| **GET** | `/api/books/category/{cat}` | Filter books by category | None |
| **GET** | `/api/books/categories` | Get list of distinct categories | None |
| **GET** | `/api/books/stats` | Retrieve inventory statistics | None |

### 🤖 AI Integration Endpoints
| HTTP Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/ai/chat` | Send question to AI Assistant | `{ "question": "Recommend Java books" }` |

**AI Chat Response Format:**
```json
{
  "response": "Here are the top Java books available in our library...",
  "recommendedBooks": [
    {
      "id": 1,
      "title": "Effective Java",
      "author": "Joshua Bloch",
      "category": "Java",
      "shelfNumber": "A-101",
      "quantity": 5,
      "availability": true,
      "imageUrl": "..."
    }
  ]
}
```
*Note: Returning the matching book objects in the JSON payload allows the React frontend to display rich "AI Recommendation Cards" dynamically below each chat response!*

---

## 🌟 Premium Features Implemented
1. **Interactive Floor Map**: Book detail pages render a dynamic layout of the library's shelves, highlighting the exact block corresponding to the book's shelf code letter.
2. **Context-Aware AI recommendation**: MySQL is queried first for keyword matches. If found, only those matching books are sent to Gemini to prevent model hallucinations.
3. **Responsive Dark Mode**: Smooth HSL variable shifting between light and dark backgrounds.
4. **Offline Resilience**: The system remains functional without a Gemini API Key.
5. **Live Inventory Control**: Statistics dashboard displays live counts of borrowed/available stock.
