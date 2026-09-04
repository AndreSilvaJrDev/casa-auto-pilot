CASA NO AUTOMÁTICO — REBUILD V3

Alterações:
- corrige o bug de voltar no quiz e ficar preso na pergunta
- usa os 8 novos ícones enviados para bônus e presentes da oferta
- corrige os textos da etapa editorial/notícia
- mantém os ícones bonitos da pergunta “Você cuida da casa e de mais quem?”
- mantém a estrutura visual aprovada do V2
- corrige o preço exibido para R$37, igual ao checkout configurado
- usa nova chave de estado do quiz (cna_funnel_state_v4) para testar do zero

COMO APLICAR

1) Baixe este ZIP para:
C:\Projetos\casa-auto-pilot

2) No terminal:
Expand-Archive .\casa-auto-pilot-rebuild-v3.zip -DestinationPath . -Force
npm.cmd run build
npm.cmd run dev

3) Abra:
http://localhost:8080/

TESTE IMPORTANTE:
- responda 3 ou 4 perguntas
- clique em voltar
- escolha qualquer resposta novamente
- confirme que o quiz avança normalmente

Não faça commit antes de validar no navegador.
