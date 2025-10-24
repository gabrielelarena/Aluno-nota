import readline from "readline";
import { pool } from "./db";
import { Aluno } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(pergunta: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => resolve(resposta));
  });
}

async function cadastrarAluno() {
  console.log("=== Cadastro de Aluno ===");

  const nome = await perguntar("Nome: ");
  const idade = parseInt(await perguntar("Idade: "), 10);
  const serie = parseInt(await perguntar("Série (número): "), 10);

  const lerNotas = async (materia: string): Promise<number[]> => {
    const notas: number[] = [];
    for (let i = 1; i <= 8; i++) {
      let nota: number;
      while (true) {
        const input = await perguntar(`Nota ${i} de ${materia} (0-10): `);
        nota = parseFloat(input);

        if (!isNaN(nota) && nota >= 0 && nota <= 10) {
          break; // nota válida
        } else {
          console.log("Nota inválida! Digite um valor entre 0 e 10.");
        }
      }
      notas.push(nota);
    }
    return notas;
  };

  const notasMatematica = await lerNotas("Matemática");
  const notasHistoria = await lerNotas("História");
  const notasGeografia = await lerNotas("Geografia");

  const aluno: Aluno = {
    nome,
    idade,
    serie,
    notasMatematica,
    notasHistoria,
    notasGeografia,
  };

  const media = (notas: number[]) =>
    notas.reduce((a, b) => a + b, 0) / notas.length;

  const mediaMatematica = media(aluno.notasMatematica);
  const mediaHistoria = media(aluno.notasHistoria);
  const mediaGeografia = media(aluno.notasGeografia);

  try {
    await pool.query(
      `INSERT INTO alunos (nome, idade, serie, media_matematica, media_historia, media_geografia)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nome, idade, serie, mediaMatematica, mediaHistoria, mediaGeografia]
    );

    console.log("\nAluno cadastrado com sucesso!");
    console.log("Médias:");
    console.log(`Matemática: ${mediaMatematica.toFixed(2)}`);
    console.log(`História: ${mediaHistoria.toFixed(2)}`);
    console.log(`Geografia: ${mediaGeografia.toFixed(2)}`);
  } catch (err) {
    console.error("Erro ao salvar no banco:", err);
  } finally {
    rl.close();
    pool.end();
  }
}

cadastrarAluno();
