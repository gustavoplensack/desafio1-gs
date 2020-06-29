const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const id = uuid();
  
  // Creating a new repo, with zero likes and the info from the req
  repo = { id: id, title: title, url: url,
    techs: techs, likes: 0 };

  // Appending this value to a list
  repositories.push(repo);
  
  response.send(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;

  const repoIndex = repositories.findIndex((repo)=>{ if (repo['id'] == id){
    return true;
  }})

  if (repoIndex < 0){
    response.status(400).send({error:"repository not found :("});
  }

  // fetching current likes
  const likes = repositories[repoIndex].likes

  // Updating repo
  repositories[repoIndex] = { id: id, title: title, url: url,
    techs: techs, likes: likes };

  response.status(200).send(repositories[repoIndex]);

});

app.delete("/repositories/:id", (request, response) => {

  const {id} = request.params;

  const repoIndex = repositories.findIndex((repo)=>{ if (repo['id'] == id){
    return true;
  }})

  if (repoIndex < 0){
    response.status(400).send({error:"repository not found :("});
  }

  // Deleting repo
  repositories.splice(repoIndex,1);

  response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {

  const {id} = request.params;

  const repoIndex = repositories.findIndex((repo)=>{ if (repo['id'] == id){
    return true;
  }})

  if (repoIndex < 0){
    response.status(400).send({error:"repository not found :("});
  }

  repositories[repoIndex].likes += 1 
  response.send({likes:repositories[repoIndex].likes})
});

module.exports = app;
