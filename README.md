> **Prototype only:** This repository is a predecessor/experiment, not a production service. It uses sample/mock data and has no approved production backend or server-enforced tenant authorization. Do not enter real staff, inventory, or customer data. The active operations product is [OpsManagerPro](https://github.com/DMART19/opsmanagerpro).

# Inventory and Staff Manager

A React-based web application designed to help organizations efficiently manage their staff, inventory, training, tasks, and reporting — all in one platform. Built with scalability and compliance in mind, this application is especially suited for industries like healthcare, emergency services, logistics, and field operations.

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

## Getting Started

This prototype was bootstrapped with Create React App. Use synthetic data only.

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Git

### Installation

```bash
git clone https://github.com/DMART19/InventoryAndStaffManager.git
cd InventoryAndStaffManager
npm install
npm start
```

The app will run on http://localhost:3000/.

## Deployment

Do not deploy this repository as a production service. If someone needs a temporary preview, use synthetic data and disable public access to any non-demo environment. Production deployment requires a separate approval after backend, authentication, organization authorization, audit, retention/deletion, backup/restore, and release gates are implemented and verified.

## Planned backend ideas

AWS S3, DynamoDB or RDS, Cognito, and Lambda were previously listed as possible future choices. No backend has been selected or approved.
