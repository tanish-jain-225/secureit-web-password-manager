# SecureIt Web Password Manager

## Deployment on Vercel

Follow these steps to deploy the MERN app on Vercel.

### Prerequisites

- Ensure MongoDB credentials are correct.
- Divide the backend and frontend code into `client` and `server` folders.

### Steps

1. **Create GitHub Repository**
   - Create an initial GitHub public repository and add local code.

2. **Backend Setup**
   - Add a `vercel.json` file in the `server` folder with the following content:
     ```json
     {
       "version": 2,
       "builds": [{ "src": "*.js", "use": "@vercel/node" }],
       "routes": [
         {
           "src": "/(.*)",
           "dest": "/"
         }
       ]
     }
     ```
   - Ensure CORS is active in the app:
     ```javascript
     app.use(cors());
     ```
   - Push the changes to the GitHub repository.

3. **Deploy Backend on Vercel**
   - Deploy the backend from GitHub to Vercel by creating a new project (e.g., `backend-MERN-App-api`).
   - Copy the backend server link provided by Vercel.

4. **Frontend Setup**
   - Update the frontend code to connect to the deployed backend. Replace all instances of `localhost` with the deployed backend link in your GET, POST, and other requests.
   - Push the changes to the GitHub repository.

5. **Deploy Frontend on Vercel**
   - Deploy the frontend from GitHub to Vercel by creating a new project (e.g., `frontend-MERN-App-ui`).

### Final Step

- Your app is now ready and deployed. You can use the frontend deployed link to access the app:
  ```
  https://my-mern-app-ui.vercel.app
  ```
