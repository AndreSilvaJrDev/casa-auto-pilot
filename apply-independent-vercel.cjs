const fs = require("fs");

const packagePath = "package.json";

if (!fs.existsSync(packagePath)) {
  throw new Error("package.json nao encontrado. Rode este script na raiz do projeto.");
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

pkg.scripts ??= {};
pkg.dependencies ??= {};
pkg.devDependencies ??= {};

delete pkg.devDependencies["@lovable.dev/vite-tanstack-config"];
delete pkg.dependencies["@lovable.dev/vite-tanstack-config"];

delete pkg.dependencies["vite-tsconfig-paths"];
delete pkg.devDependencies["vite-tsconfig-paths"];

pkg.scripts.dev = "vite dev";
pkg.scripts.build = "vite build";
pkg.scripts.preview = "vite preview";
pkg.scripts.start = "node .output/server/index.mjs";

const required = [
  ["dependencies", "@tanstack/react-start"],
  ["devDependencies", "@vitejs/plugin-react"],
  ["devDependencies", "@tailwindcss/vite"],
  ["devDependencies", "nitro"],
  ["devDependencies", "vite"],
];

for (const [group, name] of required) {
  if (!pkg[group]?.[name]) {
    throw new Error(`Dependencia necessaria ausente: ${name}`);
  }
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

console.log("OK: dependencia do Lovable removida");
console.log("OK: vite-tsconfig-paths removido (Vite 8 resolve paths nativamente)");
console.log("OK: scripts de build/start atualizados");
console.log("");
console.log("Agora rode:");
console.log("  npm.cmd install");
console.log("  npm.cmd run build");
