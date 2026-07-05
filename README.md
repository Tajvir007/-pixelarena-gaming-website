# PixelArena - Gaming Website (Jenkins Practice Project)

A minimal Node.js/Express gaming website with:
- Static homepage listing games
- A playable Tic-Tac-Toe game
- REST endpoints (`/api/games`, `/api/health`)
- Jest + Supertest test suite
- Dockerfile for containerization
- Jenkinsfile with a full CI/CD pipeline (Checkout -> Install -> Test -> Build Image -> Deploy)

## Run locally
```bash
npm install
npm start
```
Visit http://localhost:3000

## Run tests
```bash
npm test
```

## Build & run with Docker
```bash
docker build -t pixelarena-gaming-website .
docker run -d -p 3000:3000 pixelarena-gaming-website
```

## Jenkins
See the accompanying Jenkinsfile. Configure a Pipeline job pointing to this
repository and Jenkins will run install -> test -> docker build -> deploy automatically.
