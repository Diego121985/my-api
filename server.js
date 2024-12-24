
import express from "express";
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// Rota GET para obter todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota POST para criar um novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name
      }
    });
 
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rota PUT para atualizar um usuário existente
app.put('/usuarios/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),  // Converter o ID para número
      },
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
      }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Rota DELETE para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
  
    await prisma.user.delete({
      where: {
        id:(req.params.id),  // Converter o ID para número
      }
    });
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
 
  
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
