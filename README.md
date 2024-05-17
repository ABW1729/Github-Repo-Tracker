# Github Repo Tracker

## Description

This project aims to find public repositories of a user given github username using Github API

## Features

1. **Angular Framework:** Developed with Angular for a robust and scalable frontend architecture.
   
2. **Server-Side Pagination:** Utilizes server-side pagination for efficient loading of repository data as users navigate through pages.
   
3. **Caching Mechanism:** Implements caching to optimize performance when navigating between pages, enhancing user experience.
   
4. **Customizable Display:** Allows users to select the number of repositories displayed per page, offering flexibility in viewing preferences.
   
5. **Sorting and Filtering:** Enables sorting and filtering of repositories based on various parameters, enhancing search capabilities.

## Local Deployement
### Prerequisites

- Node.js and npm,Angular installed
- GitHub Personal Access Token

### Installation

1. **Clone the Repository:**
  git clone <repo_url>
  cd repo
2. **Install necessary packages**
   npm i
3. **To avoid rate limiation Github API uses authentication**
  Create .env file and provide Personal Access token as environment variable
   githubToken=<your_personal_access_token>

## To deploy app locally use command
   npm start
## App will be available on http://localhost:4200

## Testing
  Tests for Github Component and Service are written in  respective test files and mock test data is taken from src/testData.ts
  ## To run tests run command
   ng test

## Live Deployement
The app is deployed at https://fyle-internship-challenge-23-rho-three.vercel.app/


