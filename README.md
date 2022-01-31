# Farm Central (Client)
<!-- ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/alexchkliar/runlink) -->
FarmCentral is a full-stack marketplace web app connecting farmers selling fresh produce with consumers. For avoidance of doubt, it is a personal project and not an actual business.

Features include:
- REST API with MVC framework
- Authentication, validation and authorization (including Google integration)
- Screen size responsiveness
- Stripe payment integration
- Unit testing
- Infinite scrolling (dynamic fetching)
- Full range of CRUD operations

Coded with MERN stack (MongoDB, Express, React, Node). Deployed via AWS, Ubuntu, Nginx and Node on [farmcentral.store](https://farmcentral.store).

This repository stores the client source files. The backend repository can be accessed [here](https://github.com/alexchkliar/farm-central-backend).

## Installation
Run `npm install` to fetch dependencies.
Run `npm start` to fetch to run the app on your local server (set to http://localhost:3000).
Run `npm test` to run unit tests.

Connections to the backend are being proxied (remove proxy line in package.json to run in development without a proxy).

## License
[TBU – MIT](https://choosealicense.com/licenses/mit/)
