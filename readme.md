## QA Test Task

All commands should be run in the root directory of the project. If you have any questions contact Vilius via vilius@podbase.com or https://www.linkedin.com/in/vilius-zurauskas/.

First time startup process:
1. start the database: `docker-compose up`
2. install dependencies: `npm i`
3. build the application: `npm run build`
4. create `.env` file with copied content from `.env.example`
5. populate the database with data: `node -r dotenv/config populate-db.js`
6. run the application: `npm run start`

Afterwards you should only need the 6th step to restart the application. You can also reset all data in the database with 5th step whenever you want.

To run the application you will need these programs: Docker, Docker Compose, Node v20, npm v10.