This is a tailor-made student-coaching application primarly build for **"Arel Akademi"**

### Structure

The project contains 2 subprojects:
- [**/client**](https://github.com/safakadir/student-coaching/tree/main/client) for the frontend.
  - **Technologies:** Next.js, React.js, TailwindCSS
  - **Deployment:** [Vercel](https://vercel.com)
- [**/server**](https://github.com/safakadir/student-coaching/tree/main/server) for the backend. 
  - **Technologies:** Nest.js
  - **Deployment:** [Cyclic](https://www.cyclic.sh)

Both projects has its own **README** files. Please feel free to check them out.


### Build Configurations

Since a single repository contains 2 different projects for backend and frontend, some additional configuration is required for deployment services.

- Set root path (/client for client deployment, /server for server deployment)
- Also build path needs to be set for *cyclic*. 
  - Cyclic looks for a *package.json* file inside build path.
  - Set the build path as `/server``
  - Make sure the `start` script in *package.json* is `node dist/main`. If you use `nest start` as start command, you will get error whenever trying to access your app, because development dependencies is pruned by cyclic. 


#### Feature Configurations

- Eliminate build & deploys when only the files under /server changed.
- Research generating a package.json file under server/dist folder and set *build path* at cyclic as `server/dist`
