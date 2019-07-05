import React from 'react';

const Home: React.SFC = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <h2>
        Welcome to the Redux 4 + TypeScript 2.9 example! This example site shows
        you the ideal project structure, recommended libraries, as well as
        design pattern on writing type-safe React + Redux app with TypeScript.
      </h2>
      <h3>
        This project is intended as a supplement to{' '}
        <a
          href="https://resir014.xyz/posts/2018/07/06/redux-4-plus-typescript/"
          target="blank"
          rel="noopener noreferrer"
        >
          this post
        </a>
        . To demonstrate it, I created a website which pulls data from the{' '}
        <a
          href="https://docs.opendota.com"
          target="blank"
          rel="noopener noreferrer"
        >
          OpenDota API
        </a>
        , and display information like professional teams, heroes, as well as
        top players by hero. This will also demonstrate how to structure your
        stores for each feature/module in a Redux-enabled app.
      </h3>
      <p>
        Modals have become integral parts of applications across all devices,
        but their implementations vary greatly. I think that the common opinion
        is that it requires a little bit of CSS wizardry (something to do with
        the z-index or something right??), but I’ve come up with a method that
        has been working for me quite successfully in a few of my projects, and
        I’d like to share it with you (it does use a littttle bit of CSS magic
        though, of course). As the title suggests, there will be no class-based
        components involved, as I’m an avid fan of React Hooks (if you don’t
        know about Hooks, check out one of my other posts or reference the React
        docs to learn more about them). So let’s get started. We will make use
        of my favorite library when it comes to styling React,
        styled-components. For simplicity, I’m going to explain the use-case for
        this type of the component in the context of a React app built with
        create-react-app. In your public directory (where you likely rarely ever
        venture), inside index.html add an anchor point for our soon-to-be Modal
        component right below that for our App.
      </p>
    </>
  );
};
export default Home;
