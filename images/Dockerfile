FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN mkdir -p uploads
EXPOSE 4005
CMD ["node", "app.js"]
