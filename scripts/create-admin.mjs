import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prisma = new PrismaClient();

async function main() {
  const rl = readline.createInterface({ input, output });

  const email = (await rl.question("Email admin : ")).trim();
  const name = (await rl.question("Nom (optionnel) : ")).trim() || null;
  const password = (await rl.question("Mot de passe (min 8 caractères) : ")).trim();

  rl.close();

  if (!email.includes("@")) throw new Error("Email invalide");
  if (password.length < 8) throw new Error("Mot de passe trop court");

  const hash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hash, name, role: "admin" },
    create: { email, password: hash, name, role: "admin" },
  });

  console.log(`\nAdmin créé/mis à jour : ${user.email} (id: ${user.id})`);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
