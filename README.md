![Group 4](https://cdn.jsdelivr.net/gh/gaurangrshah/_shots@master/scrnshots/Group%204-20210804.png)

### Overview

Mongolikes is a [demo application](https://mongolikes-hybrid.vercel.app/) mocking the behavior of a standard social micro blogging application.

You can view the demo [here](http://mongolikes-hybrid.vercel.app/).

The application demonstrates the use of a basic auth implementation using `magic links` and jwt based authentication along with sessions powered by [next-auth](https://next-auth.js.org/).

At it's core the application contains the ability for users to post content and like each others content. In order to optimize the feel of the application we've implemented a simple but effective client-side only caching strategy using [SWR](https://swr.vercel.app/) data-fetching hooks.

The front-end of the application utilizes [Chakra-UI](https://chakra-ui.com/) for its clean accessible components and easy theming capabilities which allow fast iteration when building out an MVP.

The backend of the application is is completely built on top of [Next.JS](https://nextjs.org/)'s built-in page-base API routes. Although here we've introduced [next-connect](https://github.com/hoangvvo/next-connect), to allow for better ("[connect-style](https://github.com/senchalabs/connect)") middleware management and api method chaining.

The database being used is a [MongoDB Atlas](https://www.mongodb.com/cloud) instance and we use [mongoose](https://mongoosejs.com/) as an ODM to better manage and work with the data.

Other libraries being used:

- [ ] [faker](https://github.com/marak/Faker.js/)
- [ ] [focus-visible](https://github.com/WICG/focus-visible)
- [ ] [framer-motion](https://www.framer.com/motion/)
- [ ] [morgan](https://github.com/expressjs/morgan#readme)
- [ ] [use-debounce](https://github.com/xnimorz/use-debounce)

### API

Some of the API Routes are exposed as public endpoints and can be queried using a http-client, which is the method we've used for testing our endpoints:

| METHOD    | ENDPOINT               | DESCRIPTION                                        |
| --------- | ---------------------- | -------------------------------------------------- |
| **[GET]** | /api/posts             | returns an array of all public posts               |
| **[GET]** | /api/user/id/:id/posts | returns an array a user's published posts          |
| **[GET]** | /api/post/id/:postId   | returns a single published post that matches by id |
| **[GET]** | /api/author/:id        | returns an array an author's published posts       |
|           |                        |                                                    |
