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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. While sending the PR please mention the issue in the Comment. Thank you.

## Development

First, fork the project and clone it on your local machine. Follow the process given under [this section](#running-the-project) to run and configure the project.

1. Create a new branch

```bash
git checkout -b branch-name-here
```

2. Make the appropriate changes for the issue you are trying to address or the feature that you want to add.
3. Stage & commit the changes, and push them to your fork.

```bash
//Staging changes
git add insert-paths-of-changed-files-here
//Commiting changes
git commit -m "Insert a short message of the changes made here"
//Pushing changes
git push origin branch-name-here.
```

4. From your branch that you are working on, give a PR to our `develop` branch.
   Title the pull request with a short description of the changes made and the issue or bug number associated with your change. In the description of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer.
   > `!IMPORTANT`: Don't give a PR to the `main` branch, we accept PRs only on develop branch.
5. Wait for the pull request to be reviewed by a maintainer and make changes to the pull request if the reviewing maintainer recommends them.

### Contributors

<a href="https://github.com/FiniteLoop-NMAMIT/flc-website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FiniteLoop-NMAMIT/flc-website" />
</a>
