First commit we have created the backend/frontend folders and installed all of the necessary dependencies. We worked on getting node installed so that we could use npm to install express.
Express.js (often shortened to Express) is a popular, minimalistic web framework for Node.js that simplifies the creation of fast, scalable, and flexible web applications and APIs.

Next commit we have created in the server.js, our very own api. This one is very simple and it is a get request that once the url is entered, the server sends back a message.
We think about api's as the middle man so that clients don't have direct access to the database. A good example is a waiter at a restaurant who will take your order then tell the kitchen. Once the kitchen has made your food the waiter will bring
it back to you. It isn't always safe for the client or customer to directly speak to the kitchen because they may have malicious intent so that is why we need a waiter/API.