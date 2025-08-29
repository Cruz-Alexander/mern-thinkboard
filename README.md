# Check it out -> https://mern-thinkboard-3n0b.onrender.com/

## Thought Process as I was building...

First commit we have created the backend/frontend folders and installed all of the necessary dependencies. We worked on getting node installed so that we could use npm to install express.
Express.js (often shortened to Express) is a popular, minimalistic web framework for Node.js that simplifies the creation of fast, scalable, and flexible web applications and APIs.

Next commit we have created in the server.js, our very own api. This one is very simple and it is a get request that once the url is entered, the server sends back a message.
We think about api's as the middle man so that clients don't have direct access to the database. A good example is a waiter at a restaurant who will take your order then tell the kitchen. Once the kitchen has made your food the waiter will bring
it back to you. It isn't always safe for the client or customer to directly speak to the kitchen because they may have malicious intent so that is why we need a waiter/API.

Next commit we have added installed nodemon using npm. This allows us to update the code in our development mode and save it so that we don't have to restart the server every single time to see the changes.
We have also added a 'npm run start' script which will be used instead of 'npm run dev' when we deploy our app. Main difference is that start uses node and dev uses nodemon. Last but not least we created some more routes that go along with
the first route we originally added (also known as our api). These routes now include, get, put, post, and delete.

Next commit we have added a bunch of routing and controllers to keep our code clean and minimal. If we piled everything up within our server.js file it would end up taking lots of lines of code. Doing this the way we did,
we also allowed for future pages to be added in a much more robust/compact way, where we just add another line of code to our server.js (like this one 'app.use("/api/notes", notesRoutes);') and then we can create a new routing file and controller file for our http request and responses. Last but not least we also threw everything in our src folder for common practice.

Next commit we have added our MongoDB database where we will store our information for our notes. We have also added a models folder which holds the Note.js. This file contains the values that a note will hold, such as the title, content, and timestamps. We can choose to make these fields required if we'd like to do so. Last but not least we replace our port and mongoDB url (username & password), with values that are stored in our dotenv file. This will be private and not shown to the public by using git ignore later.

Next commit we have finished up our notesController so that we can use all 5 of our new functions (getAllNotes, getNoteById, createNote, updateNote, deleteNote). These are all used as the baseline code of what is performed when a function is called. So based on our noteSchema we could create a note with the title and content. The ID will automatically be generated and we can find that ID from the req.params.id. We also added some code for middleware to our server.js file 'app.use(express.json())' but haven't used it much yet.

Next commit we have worked on the middleware. This is performed between the requeswt and the response, typically right before the response is sent back. So in the server.js file when we use the 'app.use(express.json())' this allows us to request some field, in which case we request the body in our controller, ex 'const {title, content} = req.body'. A great usecase for middleware would be an auth check to see if a user is allowed to make a post on some site. Another important usecase is rate limiting which is a way to control how often someone can do something on a website or app. Such as how many times they can refresh a page or make requests to an API. We have also changed the format of our mongoDB connection within our server.js file to come before the application starts 'connectDB().then(() => {'. This is common production grade practice because there is no point in starting our application if it can not connect to the database and retrieve/store/modify information for the client.

In this commit we have created a react application using vite. We have setup the BrowserRouter which is the react-router, as well as the react-hot-toast inside our main.jsx. Then we created our pages (CreatePage, HomePage, and NoteDetailPage). We then setup our tailwind and daisyUI so that we can implement lots of widgets, themes, and features with ease.

In this commit we have created the HomePage. This includes some rate limiting handling, adding in NoteCards, and a NavBar that is used to add new notes. The useEffect in our HomePage fetches the notes from the api in order to display them on the home page. The API allows this because we went into the backend, and under server.js we added some more middle ware. This is seen as 'app.use(cors({origin:"http://localhost:5173", }));'. This is telling the API that http://localhost:5173 is allowed to access data from it otherwise it would be restricted. We are fetching the API data from http://localhost:5001/api/notes. For our displayed notes we have chosen a grid layout 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' so that we can adjust the size of the screen, and the notes will follow accordingly. Our notecard displays the title, content, date, and then it has the PenSquareIcon & Trash2Icon which are used to edit and delete. We also format the date in our utils to clean up nicely rather than the standard military time with timezone output.

In this commit we have finished our CreatePage. This includes a place where we create a new note that has a title, content, and create note button. We ensure that all of the fields are required by checking if there is a valid title and content body. We also added some rate limiting within our try and catch block by checking if we are left with error code 429. This means that there are too many requests and we tell the user to slow down, so they have to wait before creating more notes. One last thing we did is create an axios.js file inside of the lib folder where we added the baseURL for our api. That way we don't have to type it out every single time and we can just use the api.get() or api.post() wherever we want to go to. So for example 'await api.post("/notes").

In this commit we have added the delete functionality within the NoteCard.jsx file. This ensures that the notes are deleted with a confirmation screen off of the homescreen. We have also added a line of code that makes is so that when we delete a note, our page is automatically updated rather than having to refresh every single time (setNotes((prev) => prev.filter(note => note._id !== id))). We also created a NotesNotFound component, where if we have not created any notes yet or have deleted them all, then we have a prompt on the screen that tells us there's no notes yet, lets create a note.

In this commit we have finished the NoteDetailPage where we will edit each note individually. We also have the ability to delete the notes from this page. We use the 'const { id } = useParams();' to find which post we want to modify. Once we are doing editing or deleting a post we also use the 'const navigate = useNavigate();' to go back to the home page. This page has a title field, content field, and save changes button. If the databse may be taking a while to fetch a note, we also have added a loading icon.

# Adding User Authentication
## Backend Setup

We began by extending the backend with a User model in MongoDB. This schema included a username, email, and password. We added a pre("save") hook so that passwords would be securely hashed with bcrypt before being stored. This ensures no plain-text passwords are ever written to the database.

Next, we created auth routes (/api/auth/register and /api/auth/login). On registration, the backend checks for duplicates, saves the new user, and generates a JWT token signed with a secret (JWT_SECRET) from your .env file. On login, it verifies the user’s email and password, and if valid, returns that same kind of token.

We then wrote an auth middleware that checks for the presence of a token in the Authorization header (Bearer <token>), verifies it, and attaches the decoded user.id to the req object. This middleware was added to all notes routes, ensuring that only authenticated requests can access or manipulate notes. The Note schema was updated to include a user field so each note belongs to the user who created it. Controllers were then modified to filter queries by req.user.id, so users can only see or edit their own notes.

## Frontend Integration

On the React side, we built an AuthContext to manage authentication state across the app. It stores both user and token in state, persists them in localStorage, and exposes login() and logout() methods. A ready flag was added to prevent premature redirects before the app finishes loading stored credentials.

We then created Login and Register pages. These pages render forms that send requests to /auth/login and /auth/register. On success, they call login(user, token) from AuthContext, which updates state and storage.

To protect frontend routes, we added a PrivateRoute component. It checks whether a valid token exists in context or localStorage. If the user is authenticated, the child component is rendered; otherwise, they’re redirected to /login. This was applied to /create and /note/:id. The HomePage remained public, but its data-fetching still relies on the token-aware axios instance.

## Axios Interceptors

We updated your shared axios.js instance so that it automatically attaches the JWT token to every request via the Authorization header. A response interceptor was also added so that if the backend responds with a 401 Unauthorized, the client clears the token and redirects back to /login. This ensures consistent token management without needing to repeat headers everywhere in your code.

## UI Updates

We modified the Navbar to be authentication-aware. When logged out, it shows Login and Register links. When logged in, it shows a New Note button, a greeting, and a Logout button. The logout function clears the token and user data from both state and storage, then navigates to /login.

We also added convenience links between Login and Register pages (e.g., “Don’t have an account? Create one” and “Already have an account? Log in”).

## Bug Fixes Along the Way

Fixed a mismatch where the frontend was sending name while the backend expected username.

Solved the error "secretOrPrivateKey must have a value" by setting JWT_SECRET in your .env.

Fixed "undefined is not valid JSON" by hardening AuthContext to safely parse localStorage.

Solved the redirect issue on /create by ensuring the app used the proper imported PrivateRoute that checks tokens, not the outdated inline version in App.jsx.

## Final Result

We now have a full authentication system.

Users can register and log in securely.

JWTs are stored and attached to every request.

Notes are scoped per user on the backend.

React routes are protected on the frontend.

Navbar and UI respond to auth state.

Logout works cleanly.

This brings ThinkBoard from a simple notes app to a production-ready multi-user platform with secure authentication and session handling.
