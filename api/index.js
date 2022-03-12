import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/todos", async (req, res) => {
  const posts = await prisma.todoItem.findMany({
    where: {
      author: {
        email: "cristian.penarrieta@gmail.com",
      },
    },
  });
  res.json(posts);
});

// creates a todo item
app.post("/todos", async (req, res) => {
  const { title, authorEmail } = req.body;

  const todoItem = await prisma.todoItem.create({
    data: {
      title,
      author: { connect: { email: authorEmail } },
    },
  });

  res.status(201).json(todoItem);
});

// deletes a todo item by id
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  const deleteItem = await prisma.todoItem.delete({
    where: {
      id,
    },
  });

  res.json(deleteItem);
});

// get a todo item by id
app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;

  const todoItem = await prisma.todoItem.findUnique({
    where: {
      id,
    },
  });

  res.json(todoItem);
});

// updates a todo item by id
app.put("/todos", async (req, res) => {
  const { id, title } = req.body;

  const todoItem = await prisma.todoItem.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  res.json(todoItem);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});
