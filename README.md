<p align="center">
<img src="https://res.cloudinary.com/dpfpk49oa/image/upload/v1661426779/logo1_gyjvor.png" width="501" height="94">
<h3 align="center">Official website of Finite Loop Club!✨️</h3>
</p>

<p align="center">
<a href="https://github.com/FiniteLoop-NMAMIT/flc-website/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/FiniteLoop-NMAMIT/flc-website"></a>
<a href="https://github.com/FiniteLoop-NMAMIT/flc-website/"><img alt="GitHub stars" src="https://img.shields.io/github/last-commit/FiniteLoop-NMAMIT/flc-website"></a>
</p>

## Features

- Custom public user profile pages
- Admin panel
  - Create/Delete Core team members
  - Create/Delete Events
  - Award certificates to participants and winners
  - Create teams and members [coming soon]
  - Other functions [Export data, etc.]
- Teams & tasks feature
- Razorpay payment gateway integration
- Beautiful frontend with modern UI

## Built with:

<p align="left">
<img src="https://ui-lib.com/blog/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png" height="50px">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png?20221110153201" height="50px">
<img src="https://www.svgrepo.com/show/374118/tailwind.svg" height="50px">
<img src="https://pbs.twimg.com/profile_images/1504919223168077836/RSsCSpKf_400x400.jpg" height="50px">
<img src="https://trpc.io/img/logo.svg" height="50px">
<img src="https://www.svgrepo.com/show/374002/prisma.svg" height="50px">
</p>

- [**Next JS**](https://nextjs.org/): React-based framework for building server-side rendered and statically exported web apps.
- [**Typescript**](https://www.typescriptlang.org/): Statically typed superset of JavaScript, adds type annotations to enhance code reliability & readability
- [**TailwindCSS**](https://tailwindcss.com/): Utility-first CSS framework
- [**Planetscale**](https://planetscale.com/): Highly scalable, globally distributed database
- [**tRPC**](https://trpc.io/): Provides a simple, type-safe way to build APIs for TS & JS
- [**zod**](https://zod.dev/): Type-safe, instance-based validation library for JavaScript.
- [**React-query**](https://tanstack.com/query/latest): Library for fetching, caching and updating asynchronous data in React apps
- [**Prisma ORM**](https://www.prisma.io/): Modern, type-safe ORM for Node.js and TS
- [**Razorpay**](https://razorpay.com/): Payment gateway
- [**React awesome reveal**](https://react-awesome-reveal.morello.dev/): Library for adding reveal animations to React components.
- [**nProgress**](https://rstacruz.github.io/nprogress/): Slim progress bar library for the loading progress.
- [**superjson**](https://github.com/blitz-js/superjson): Fast JSON serializer and deserializer.
- [**react-hot-toast**](https://react-hot-toast.com/): Library for creating lightweight toasts
> **Note**
> This project was bootstrapped with [create-t3-app](https://create.t3.gg/)

### Running the Project

1. Clone the repo

```bash
git clone https://github.com/FiniteLoop-NMAMIT/flc-website
```

2. Install the dependencies:
> **Note**
> Install pnpm if you do not have it already `npm i -g pnpm`

```bash
pnpm i
```

3. Generate prisma client

```bash
pnpm exec prisma generate
```

4. Copy and Rename the .env.example to .env, place it in the root directory and fill the essential vars.

```bash
cp .env.example .env
```

> **Warning**
> Do not rename the original .env.example, it is used to keep track for env vars list as .env with values is gitignored

5. Run the development server:

```bash
pnpm dev
```

Open [port 3000 on localhost](http://localhost:3000) with your browser to see the result.

Additional:

```bash
pnpm exec prisma studio
```

to use Prisma Studio(visual editor).

Open [port 5555 on localhost](http://localhost:5555) with your browser.

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
   > **Warning**
   > Don't give a PR to the `main` branch, we accept PRs only on develop branch.
5. Wait for the pull request to be reviewed by a maintainer and make changes to the pull request if the reviewing maintainer recommends them.

### Contributors

<a href="https://github.com/FiniteLoop-NMAMIT/flc-website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FiniteLoop-NMAMIT/flc-website" />
</a>
