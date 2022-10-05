# Finite Loop Club - Official Repo
<p align="left">
<img src="https://res.cloudinary.com/dpfpk49oa/image/upload/v1661426779/logo1_gyjvor.png" width="501" height="94">
</p>

## Built with:

<p align="left">
<img src="https://ui-lib.com/blog/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://www.svgrepo.com/show/374118/tailwind.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://www.svgrepo.com/show/374002/prisma.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://www.svgrepo.com/show/354200/postgresql.svg" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://avatars.githubusercontent.com/u/7713209?s=280&v=4" height="50px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

### Running the Project

1. Clone the repo
```bash
git clone https://github.com/FiniteLoop-NMAMIT/flc-website
```
2. Install the dependencies:

```bash
npm i
```

3. Create & start a DB on postgres. Run Prisma migrations which will create SQL tables from `schema.prisma`
```bash
npx prisma migrate dev
```

4. Create an .env file in the root directory and fill the essential vars
```env
DATABASE_URL="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
AUTH_SECRET="..."
RAZORPAY_KEY="..."
RAZORPAY_SECRET="..."
```

5. Run the development server:

```bash
npm run dev
```

Open [port 3000 on localhost](http://localhost:3000) with your browser to see the result.

Additional: 
```bash
npx prisma studio
``` 
to use Prisma Studio(visual editor).

Open [port 5555 on localhost](http://localhost:5555) with your browser.

### Dependencies
```json
    "@next-auth/prisma-adapter": "^1.0.4",
    "@prisma/client": "^4.2.1",
    "axios": "^0.27.2",
    "next": "12.2.5",
    "next-auth": "^4.10.3",
    "next-auth-sanity": "^1.4.4",
    "next-themes": "^0.2.1",
    "razorpay": "^2.8.3",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "^4.4.0",
    "react-reveal": "^1.2.2",
    "shortid": "^2.2.16"
```