import cors from "cors";
import express from "express";
import { Tasks } from "./db.js";
import { validateTask } from "./validators.js";

const PORT = 9999;
const app = express();
app.use(cors(), express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await Tasks.findAll();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { body: newTask } = req;

  const error = validateTask(newTask);

  if (error) {
    res.status(403).send({ error });
    return;
  }

  const task = await Tasks.create(newTask);
  res.status(201).json(task);
});

app.delete("/tasks/:taskId", async (req, res) => {
  const {
    params: { taskId },
  } = req;

  const task = await Tasks.findById(taskId);

  if (!task) {
    res.status(400).send({ error: "Task with given 'id' does not exist" });
    return;
  }

  await Tasks.delete(taskId);
  res.status(204);
});

app.listen({ port: PORT }, () => {
  console.log(`Server is running on port ${PORT}`);
});
