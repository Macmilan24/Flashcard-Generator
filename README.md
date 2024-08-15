# Flashcard SaaS

Flashcard SaaS is a modern web application that allows users to create and manage flashcards using advanced AI technology. The platform is designed to be highly customizable and user-friendly, providing an efficient way to convert text into flashcards. This repository contains the codebase for the frontend built with Next.js, React, Firebase, and Groq API, styled using Material UI and advanced animations with Framer Motion.

## Features

- **Easy Text Input**: Quickly convert your text into flashcards.
- **Advanced AI**: Generate high-quality flashcards using cutting-edge AI.
- **Customizable**: Tailor your flashcards to suit your needs.
- **Modern Design**: A sleek, dark-themed interface with smooth animations.
- **Responsive Layout**: Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Material UI, CSS Modules, Framer Motion
- **Backend**: Firebase, Groq API
- **Authentication**: Clerk for user authentication and session management
- **Payments**: Stripe for handling subscription payments

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- Yarn or npm
- Firebase Account
- Clerk API Key
- Stripe Account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/flashcard-saas.git
   cd flashcard-saas
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your environment variables:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

### Deployment

To deploy the application, you can use platforms like Vercel or Netlify. Ensure that all environment variables are configured in your deployment settings.

## Folder Structure

```
├── public/           # Public assets
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Next.js pages
│   ├── styles/       # CSS Modules and global styles
│   ├── utils/        # Utility functions and helpers
│   └── ...
├── .env.local        # Environment variables (not committed to version control)
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

## Usage

- **Login/Signup**: Users can create an account or log in using the authentication provided by Clerk.
- **Flashcard Generation**: Enter text and generate flashcards using the `Generate` page.
- **Subscription**: Choose a pricing plan and handle payments via Stripe.
- **Customization**: Personalize flashcards to fit specific needs.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Next.js** for the awesome React framework.
- **Material UI** for the sleek and responsive UI components.
- **Framer Motion** for the advanced animations.
- **Clerk** for user authentication and management.
- **Stripe** for handling payments.
- **Firebase** for backend services.

### Summary:

- **Introduction**: Clear project description.
- **Features**: Highlighting the main features.
- **Tech Stack**: List of technologies used.
- **Getting Started**: Installation and setup instructions.
- **Folder Structure**: Overview of the project's directory structure.
- **Usage**: Key functionalities explained.
- **Contribution**: Invitation for community contributions.
- **License**: License information.
- **Acknowledgements**: Shoutout to tools and libraries used.
- **Contact**: Contact information for inquiries.
