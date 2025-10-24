import readline from "readline";
import { pool } from "./db";

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
        if (!isNaN(nota) && nota >= 0 && nota <= 10) break;
        console.log("Nota inválida! Digite um valor entre 0 e 10.");
      }
      notas.push(nota);
    }
    return notas;
  };

  const notasMatematica = await lerNotas("Matemática");
  const notasHistoria = await lerNotas("História");
  const notasGeografia = await lerNotas("Geografia");

  const media = (notas: number[]) =>
    notas.reduce((a, b) => a + b, 0) / notas.length;

  const mediaMatematica = media(notasMatematica);
  const mediaHistoria = media(notasHistoria);
  const mediaGeografia = media(notasGeografia);

  const mediaGeral = (mediaMatematica + mediaHistoria + mediaGeografia) / 3;

  console.log("\n=== Resultado do Aluno ===");
  console.log(`Média Matemática: ${mediaMatematica.toFixed(2)}`);
  console.log(`Média História: ${mediaHistoria.toFixed(2)}`);
  console.log(`Média Geografia: ${mediaGeografia.toFixed(2)}`);
  console.log(`Média Geral: ${mediaGeral.toFixed(2)}`);

  try {
    await pool.query(
      `INSERT INTO pessoas (nome, idade, serie, media_matematica, media_historia, media_geografia)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nome, idade, serie, mediaMatematica, mediaHistoria, mediaGeografia]
    );

    console.log("\nAluno cadastrado com sucesso no banco!");
  } catch (err) {
    console.error("Erro ao salvar no banco:", err);
  } finally {
    rl.close();
    pool.end();
  }
}

cadastrarAluno();