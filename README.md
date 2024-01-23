# news-feed-app-using-server-sent-events

<h1>News Feed App Using Server Sent Events</h1>

This project is using angular to develop frontend and node-express to develop backend, front end shows news feed delivered through SSE from node express server

<hr />

A Node.js backend server (server directory) that implements a route for getting SSE requests, initial request from client at this route sets response headers
required to establish a connection for SSE.

In order to generate data for SSE demonstration the api from Newyork Times https://api.nytimes.com/svc/news/v3/content is used.

A simple http route is used to fetch all the sections from api, so client can subscribe for SSE against a particular section.

On request from client, server gets section name from SSE url and using API gets the details, server than start sending each news event at the interval of 1 second untill all the news sent.

An Angular application (client directory) implements news interface using tailwindcss https://tailwindcss.com

Following are highlights of this project:-

- SSE implmentation is based on browser's event source API https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events.
- for rapid development components from https://flowbite.com are used.
- implements RxJs observable https://rxjs.dev/guide/observable to subscribe to SSE events.
- header section shows fetched sections using badges component.
- body section shows news in a list view using cards component.
- footer sections shows incoming news as a continous slider using an animation.

<hr />

To set node version for the server and client, run `nvm use` in both the server and client directories.

Run `npm install` in both the server and client directories.

To initiate the server, execute `npm run start` within the server directory.

To launch the client, execute `ng serve` within the client directory.
