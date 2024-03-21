FROM node:20.9.0
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=5555
ENV MONGO_URI=mongodb+srv://rjoseph3742:cfmeoFtRvGcWk0Qn@cluster0.kzeepqi.mongodb.net/books-collection?retryWrites=true&w=majority

EXPOSE 5555
CMD ["npm","run","dev"]