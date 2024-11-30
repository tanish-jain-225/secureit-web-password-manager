## To Deploy MERN App on Vercel

- Create an initial github public repository and add local code. 
- Make sure that mongodb credentials are proper
- Now make changes in code and divide backend and frontend as 'client' and 'server' folders.
- Add vercel.json in backend 'server' folder.
- Write json code in vercel.json file: 
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
- Server code be in 'index.js' of 'server' folder. 
- Ensure cors is active in app. as 'app.use(cors())'. 
- Push work upto here on github public repository. 
- Deploy on vercel as root 'server' from github as backend side of project by adding new-project. Ex. backend-MERN-App-api 
- Now copy backend functioning server link. 
- Go to frontend client and go into code which connects to backend. 
- In connecting code whereever we see links directed to localhost, replace that with deployed backend link. Ex. GET, POST and all other requests. 
- Now Push all changes in github repository. 
- Again deploy on vercel as root 'client' from github as frontend side of project by adding new-project. Ex. frontend-MERN-App-ui
- Finally App is ready and deployed and one can use frontend deployed link anywhere and anytime to use the app. Ex. https://my-mern-app-ui.vercel.app
