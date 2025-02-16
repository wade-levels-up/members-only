# Members-Only

📝 Notes: This project relies on having a PostgreSQL database to pull information from. It takes information from three tables, session, users and messages. If forking this repository you'll need to set up an environment variables in a .env file for the connection string to your own local database. As part of these env variables the project requires an ADMIN_PASSCODE, SECRET_PASSCODE and a SESSION_SECRET.

⛰️ Objective: The objective of this project was to create an Express web app that allows users to sign up to become an unverified member of the site. When a user signs up, their credentials along with a hashed (and salted) password are stored securely in the database. When a user signs in, their username and password are validated using Passport's LocalStrategy to authenticate the user, if authenticated a cookie is stored on their broswer and a session is stored in the session database. This allows a user (who hasn't logged out) to return to the site within 30 days and the site still remembers who they are because the session is maintained.
Once users are logged in they are able to view messages on the message board from other members, however if their membership status is unverified they can't see the poster's name or the date it was posted. Users can verifiy their membership by entering a secret passcode into an internal form. Once verified the user can see all the details of other user's messages.
In a nutshell this project is about user authentication and providing different levels of access depending on whether users are unverified, verified OR an admin (Admins can delete user messages!).

⚙️ Technologies Used: HTML, CSS, JavaScript, Node.js, Express, EJS, PostgreSQL, Passport, Express-Session

A live version of the project can be found here. Hosted by Railway: https://members-only-production-f053.up.railway.app/ 🚅
