# Inventory and Staff Manager

A React-based SaaS web application designed to help organizations efficiently manage their staff, inventory, training, tasks, and reporting — all in one platform. Built with scalability and compliance in mind, this application is especially suited for industries like healthcare, emergency services, logistics, and field operations.

## 🔧 Features

- ✅ Staff management with role-based access control
- 🧾 Inventory tracking with detailed item categorization
- 🎓 Training progress monitoring and certification tracking
- 📆 Task assignment and calendar integration
- 📊 Dashboards with key metrics and bar charts
- 📑 Filterable reports (staff, training, purchase orders, inventory)
- 🔒 AWS-ready for secure data storage (backend integration coming soon)

## 📁 Folder Structure

src/
├── assets/ # Static images and icons
├── components/ # Reusable UI components
├── pages/ # Page views (Dashboard, Staff, Inventory, etc.)
├── data/ # Sample/mock data files
├── styles/ # Global and modular stylesheets
├── App.js # Main App component
├── index.js # Entry point

bash
Copy code

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Git

### Installation

# Clone the repository
git clone https://github.com/DMART19/InventoryAndStaffManager.git

# Navigate into the project directory
cd InventoryAndStaffManager

# Install dependencies
npm install
# or
yarn install
Running Locally
bash
Copy code
npm start
# or
yarn start
The app will run on http://localhost:3000/.

🌐 Deployment
This project is Vercel-compatible. To update a Vercel deployment:

bash
Copy code
vercel --prod
You can also host on Netlify, GitHub Pages, or your preferred platform.

🛠 AWS Integration (Planned)
The application is designed to be integrated with an AWS backend using services like:

Amazon S3 (for file uploads)

DynamoDB or RDS (for database)

Cognito (for authentication)

Lambda (for serverless functions)

Sensitive credentials are managed via environment variables (.env), which are excluded from version control via .gitignore.

👥 Contributing
Contributions are welcome! You can help by:

Reviewing and cleaning up code

Improving component structure

Integrating AWS services

Creating new features or improving existing ones

Steps to Contribute
Fork the repository

Create a new branch: git checkout -b feature-name

Make your changes

Commit and push: git push origin feature-name

Submit a pull request

📫 Contact
David Martinez
📍 Elk Grove, CA
📧 martinezda1283@gmail.com
🔗 GitHub Profile

Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
