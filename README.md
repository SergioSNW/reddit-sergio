# Reddit Sergio (Reddit Client)

Please if you have anything to share with me, email me @ synssn@gmail.com

## How to use locally.

First you need to get the Repository on your machine, open it with your Favorite IDE, I use VSCode. Have in mind that you need to go into getRedditToken.js and change the URL for your local backend URL. First, open a Terminal, go to the /server folder and launch <node server.js>, this will let you know the localhost port that the backend works on. Use this with your OAUTH 2.0 Reddit credentials to fetch your access token. For launching the FrontEnd, just open a terminal on root and launch <npm start>.

## Technologies Used

For the Front End:

- React: Quick, Modern and Reliable Javascript Framework for building User Interfaces.
- Reddux: Used to manage and centralize all state and complex data within a React Application. Reddux hold the "truth" of the Application.

For the Back End:

- Initially, the Back end was not suppose to be a part of this project, but Reddit API changed its policy and now an authentication token is needed for fetching results. I had to create credentials for my App. You can do the same for free and it's not a tedious process. https://www.reddit.com/r/reddit.com/wiki/api/
- The BackEnd is simple yet effective, built with only one Route in mind, which is the /api/reddit-token needed to extract your authentication token. This token is then used by the Front End to inject the Authentication credentials on the headers of the Request.
- For the BackEnd I used Express.js, a Javascript library used for routing, middleware and back-end in general.

## Features

- Post and Media Viewing: Reddit Sergio enables you to browse and view Reddit posts, including text, images, and else.

- Popular Subreddits: Explore a curated list of popular subreddits conveniently displayed on Reddit Sergio.

- Subreddit Search: Reddit Sergio provides a robust search functionality to help you find specific subreddits.

## Future Work

CTRL + SHIFT + V for good reading in VSCode
