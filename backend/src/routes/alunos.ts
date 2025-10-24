import { Router, Request, Response } from "express";
import { pool } from "../db";
//testando commit
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, idade, serie, notas } = req.body;

    if (!nome || !idade || !serie || !notas)
      return res.status(400).json({ erro: "Dados incompletos." });

    const calcularMedia = (arr: number[]) =>
      arr.reduce((a, b) => a + b, 0) / arr.length;

    const mediaMatematica = calcularMedia(notas.matematica);
    const mediaHistoria = calcularMedia(notas.historia);
    const mediaGeografia = calcularMedia(notas.geografia);

    const result = await pool.query(
      `INSERT INTO alunos 
        (nome, idade, serie, notas_matematica, notas_historia, notas_geografia, media_matematica, media_historia, media_geografia)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        nome,
        idade,
        serie,
        JSON.stringify(notas.matematica),
        JSON.stringify(notas.historia),
        JSON.stringify(notas.geografia),
        mediaMatematica,
        mediaHistoria,
        mediaGeografia,
      ]
    );

    res.status(201).json({
      mensagem: "Aluno cadastrado com sucesso!",
      aluno: result.rows[0],
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar aluno." });
  }
});

export default router;
