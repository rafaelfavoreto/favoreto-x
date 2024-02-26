# Use a imagem base do Node.js
FROM node:21.6.2-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY . .

# Instale as dependências do projeto
RUN npm install

# Expõe a porta 3000 para acesso externo
EXPOSE 3000

# Inicia o servidor Next.js
CMD ["npm", "run", "dev"]
