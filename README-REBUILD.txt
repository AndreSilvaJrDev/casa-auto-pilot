CASA NO AUTOMÁTICO — REBUILD V1

Este pacote substitui a camada visual principal do quiz e mantém:
- lógica do diagnóstico
- tracking existente
- checkout Kiwify
- fluxo do quiz
- conceito Peso x Paz

Também adiciona:
- nova hero baseada na referência enviada
- perguntas com layout semelhante ao ritmo do Rainha da Casa
- ícones próprios na pergunta "Você cuida da casa e de mais quem?"
- menos repetição de imagens
- novo diagnóstico visual
- nova revelação do app
- nova oferta

COMO APLICAR

1) Coloque este ZIP na raiz do projeto:
C:\Projetos\casa-auto-pilot

2) Confirme que está na branch:
rebuild/rainha-v1

3) Extraia:
Expand-Archive .\casa-auto-pilot-rebuild-v1.zip -DestinationPath . -Force

4) Rode:
npm.cmd run build

5) Se passar:
npm.cmd run dev

IMPORTANTE:
Não faça commit antes de olhar o quiz inteiro no navegador.
