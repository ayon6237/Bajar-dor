# 🛒 BazarDor — বাংলাদেশের নিত্যপণ্যের বাজারদর

**BazarDor** is a responsive web application that helps users explore the prices of everyday essential products in Bangladesh. Users can browse products, explore categories, view price changes, and compare market-wise prices through a clean and user-friendly interface.

The project is built with Next.js and Tailwind CSS, with product and category information provided by an external API.

## 🌐 Live Demo

- **Live Website:** [Add your deployed website URL here]
- **GitHub Repository:** [Add your GitHub repository URL here]

## ✨ Features

- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- **Today's Market Prices:** Browse the latest available prices of essential products.
- **Product Categories:** Explore products by category, such as rice, lentils, oil, vegetables, fish, meat, eggs, and spices, depending on the available API data.
- **Product Details:** View individual product information and price summaries.
- **Market-wise Price Comparison:** Compare minimum, maximum, and average prices across available markets.
- **Price Change Indicators:** View price increase or decrease indicators where data is available.
- **Dynamic Category Navigation:** Navigate between categories with active-link highlighting.
- **Authentication:** Sign up, sign in, and sign out using the configured authentication methods.
- **Social Login:** Google and GitHub sign-in integration.
- **Profile Management:** View and update supported user profile information.
- **Loading States:** Loading indicators and skeleton UI improve the browsing experience.
- **Error Handling:** User-friendly error messages and retry options for supported error states.
- **Custom 404 Handling:** Handle invalid product and category routes.
- **Bengali Interface:** Designed for Bengali-speaking users.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and routing |
| React | User interface |
| Tailwind CSS | Responsive styling |
| Better Auth | Authentication |
| MongoDB | Authentication and user data storage, as configured |
| External REST API | Product, category, and market-price data |
| React Hot Toast | Success and error notifications |
| Vercel | Deployment |

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── loading.jsx
│   ├── error.jsx
│   ├── not-found.jsx
│   ├── globals.css
│   ├── products/
│   │   ├── page.jsx
│   │   ├── loading.jsx
│   │   ├── error.jsx
│   │   └── [slug]/
│   │       ├── page.jsx
│   │       └── loading.jsx
│   ├── category/
│   │   └── [category]/
│   │       ├── page.jsx
│   │       ├── loading.jsx
│   │       └── error.jsx
│   ├── login/
│   │   └── page.jsx
│   ├── register/
│   │   └── page.jsx
│   └── profile/
│       └── page.jsx
├── components/
│   ├── Header.jsx
│   ├── Navlinks.jsx
│   ├── NavlinksClient.jsx
│   ├── Hero.jsx
│   ├── Marquee.jsx
│   ├── Footer.jsx
│   └── ...
└── lib/
    └── auth-client.js
```

*Note: This is a representative structure. Adjust it to match the actual files and routes in your repository.*

## ⚙️ Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

Make sure you have installed:

- Node.js (a version supported by your installed Next.js version)
- npm
- Git
- A MongoDB database configured for Better Auth
- The required OAuth credentials if you want to enable Google or GitHub sign-in

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Navigate to the Project

```bash
cd your-project-folder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the environment variables required by your authentication and database configuration.

Example placeholders:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

DATABASE_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Important:** These are example names only. Use the exact environment variable names expected by your project's Better Auth configuration. Never commit real secrets, database credentials, or OAuth client secrets to GitHub.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 🔌 API Integration

BazarDor retrieves product and category information from the following API:

**Base URL:**

```text
https://api.abcz.workers.dev/api/bazardor
```

| Endpoint | Description |
|---|---|
| `/categories` | Retrieves available product categories |
| `/products` | Retrieves the available product list |
| `/products?category=chal` | Retrieves products filtered by category |
| `/products/:id` | Retrieves details for a specific product |

The available fields and response formats depend on the API. The application handles supported response structures and displays the available product and market-price information.

## 🧭 Main Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/products` | All products |
| `/products/[slug]` | Product details |
| `/category/[category]` | Products by category |
| `/login` | Sign in |
| `/register` | Create an account |
| `/profile` | User profile |

## 🎨 User Experience

BazarDor focuses on simplicity, accessibility, and responsive design. The interface uses Bengali text, clear price indicators, category navigation, loading skeletons, error messages, and empty states to help users navigate the available market information.

## 🔒 Security

- Authentication is handled through Better Auth.
- Secrets and credentials should be stored in environment variables.
- OAuth credentials must be configured securely.
- Private routes and user-specific operations should be protected by server-side authentication checks.

## 🚀 Deployment

The application can be deployed on Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in Vercel project settings.
4. Verify the OAuth callback URLs and production authentication configuration.
5. Deploy the application.
6. Test the live site, authentication, product pages, category routes, and error handling.

## 🔮 Future Improvements

- Search products by name.
- Add product sorting and filtering options.
- Show historical price trends using charts.
- Add more market locations and price information.
- Improve accessibility and page performance.
- Add automated testing for important routes and authentication flows.

## 👨‍💻 Author

**Ayon Banerjee**

- GitHub: [Add your GitHub profile URL]
- LinkedIn: [Add your LinkedIn profile URL]

## 📄 License

This project is intended for learning and development purposes. Add an appropriate open-source license if you plan to distribute the source code publicly.

---

**BazarDor — Know the market price, make informed decisions.**