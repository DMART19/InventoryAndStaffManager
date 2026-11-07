# Production status: prototype

This repository is a prototype/predecessor for OpsManagerPro, not an approved production service. Its README states that backend integration is planned, and the application includes sample/mock data. Do not use it to store real staff, inventory, or customer information.

If development resumes, first define the product owner and data model, select an authoritative backend and identity provider, enforce organization-level authorization server-side, and add audit, retention, export, deletion, backup, and restore behavior. Until those controls and release gates are implemented and verified, deploy only with synthetic data.

The intended active operations product is `DMART19/opsmanagerpro`. Keep this repository clearly marked as a prototype unless that product decision changes.
