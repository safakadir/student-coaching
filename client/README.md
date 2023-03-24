This is a tailor-made student-coaching application primarly build for **"Arel Akademi"**

## Getting Started

If it's first time, install the dependencies

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser.



## Deployment

The application is deployed to [Vercel](https://vercel.com/dashboard)
Simple **git push** will deploy the app automatically.

Visit [live deployment](https://student-coaching.vercel.app)



## Environment Variables

During local development, environment varibales are taken from **.env.local**
Put required environment variables in *Vercel deployment* 



## Development Tools

To learn more about the tools used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Tailwind CSS](https://tailwindcss.com/docs) - check the documentation of Tailwind CSS.
- [Flowbite](https://flowbite.com/docs/) - examples of components with Tailwind CSS
- [React Icons](https://react-icons.github.io/react-icons) - icon library with as many icons as you want that is used in the project.
- [Cloud Firestore](https://firebase.google.com/docs/firestore) - flexible no-sql database with connectionless and serverless features. [MongoDB](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb) is disused because of frasturating connection overhead in serverless functions, for each initial request

Bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
