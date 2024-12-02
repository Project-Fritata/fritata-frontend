
![Logo](github-header-image.png)


# Fritata frontend

Fritata is a web application that provides access to the Fritata platform. It features user authentication, profile management, creating posts, and a responsive design for both mobile and desktop users.
## Documentation

**Change backend API URLs**

Change the `URL_API_CLIENT` value to your API url in files:
- [AuthApi.ts](src/internal/api/AuthApi.ts)
- [PostsApi.ts](src/internal/api/PostsApi.ts)
- [UsersApi.ts](src/internal/api/UsersApi.ts)
## Run Locally

**Clone the project** (Prerequesite: git)
```bash
  git clone https://github.com/Project-Fritata/fritata-frontend.git
```

**Go to the project directory**
```bash
  cd fritata-frontend
```

**Install dependencies** (Prerequesite: npm)
```bash
  npm install
```

**Start the server**
```bash
  npm run dev
```

**Access the application**

Access application on `http://localhost:5173/fritata-frontend/`
## Deployment to GitHub pages

**Setup respository settings**

Follow [GitHub docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) for publishing a website to Github actions with a custom GitHub Actions workflow

**Push local code to GitHub**

When pushing code to `main` branch, the `deploy.yml` GitHub Actions script will run and deploy the site.

**Access the application**

Access application on `https://<YOUR-REPO-NAME>.github.io/fritata-frontend/`
## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

