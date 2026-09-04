CASA NO AUTOMÁTICO — INDEPENDÊNCIA LOVABLE + VERCEL

OBJETIVO
- remover @lovable.dev/vite-tanstack-config
- usar a configuração oficial do TanStack Start + Nitro
- preparar o projeto para Vercel
- manter o app rodando na porta 8080 localmente

ARQUIVOS
- vite.config.ts
- vercel.json
- apply-independent-vercel.cjs

COMO APLICAR

1. Coloque este ZIP na raiz:
C:\Projetos\casa-auto-pilot

2. Confirme que está na branch:
rebuild/rainha-v1

3. Extraia:
Expand-Archive .\casa-auto-pilot-independent-vercel-v1.zip -DestinationPath . -Force

4. Atualize package.json:
node .\apply-independent-vercel.cjs

5. Instale/reconcilie dependências:
npm.cmd install

6. Teste:
npm.cmd run build

7. Se o build passar:
npm.cmd run dev

8. Abra:
http://localhost:8080/

9. Depois valide:
git status

NÃO faça commit antes de o build e o quiz local funcionarem.

ROLLBACK:
Se der qualquer problema antes do commit:
git reset --hard HEAD

REFERÊNCIA:
A configuração segue o padrão oficial atual do TanStack Start para Vite + Nitro/Vercel.
