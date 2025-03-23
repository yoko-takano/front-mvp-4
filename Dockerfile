# Usa uma imagem base do Node.js para build
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Faz o build da aplicação
RUN npm run build

# Usa a imagem do Node.js para rodar a aplicação
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos buildados
COPY --from=builder /app/build /app/build

# Exponha a porta em que o servidor da aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação usando o Node.js
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
