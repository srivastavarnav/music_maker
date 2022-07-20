# Written Report: Music Maker App
## Stack Used
- Next.js
- Tailwind CSS
- Typescript
- Tone.js
- React Icons

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
- Create music using polySynth notes with two octaves and drum beats on the music sheet
- You can play and pause the music.
- You can change the tempo of the beats using the slider.
- You can change the length of the music sheet by going to settings menu.
- This application is fully responsive for mobile devices, tablets as well as desktops, laptops and other bigger screens
- When the music sheet is played it is autoscrolled to keep the playing notes in the view on the screen.

Working on this app initially required few decisions on the design part, the major one being whether to use the canvas for creating the music sheet or to use the DOM elements for the same. Here the implementation is done using DOM because of two reasons - it's a fairly small sized app - Canvas is really fast and weighs more in performance than DOM but implementation using DOM can also be fairly good in an app this size since in terms of performance, also, it's optimized by itself and quite simple to use, thus saving some time. 
Also, there was a fair amount of thought went into the implementation of music features itself which was done using another JS library - Tone.js
        
Other than Tone.js, I was familiar with all the tools used in creating this project. Tone.js was the new tool which was required for the implementation of musical instruments and related functionality. Tone.js is a Web Audio framework for creating interactive music in the browser. It has a lot of functionality from using built in instruments to using custom sounds and gives a lots of flexibility, thus the reason to use the same in this project.

This app has the basic features implemented to be able to start creating the music. So in terms of basic functionality and usage on different devices it's a nice version 1.0.

The major challenges faced were in terms of usage of Tone.js. Since I was quite unfamiliar with the tool, a few things took more time than it should have otherwise. Also, a fair amount of time went into making the music sheet responsive and interactive.

There are a few features left which can be implemented and are important in terms of making this app a fully functional music creation tool, for example, having an option to change the note duration, musical scale, adding more octaves, giving an option to record and save the created music and many more.
        
## Rough estimation of time spent
 - 0.5 day - choosing the right project which can be completed withing stipulated time and showcase some skills.
 - 0.5 day - reading into Tone.js documentation and implement it into the project
 - 1.75 day - creating the app structure and features, this includes setting up the repo, creating the layout, responsiveness, functionalities, code structure and refactors
 - 0.25 day - Writing the documentation and code push

