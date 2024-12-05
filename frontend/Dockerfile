FROM node:23-slim

# Install CA certificates
RUN apt-get update && apt-get install -y ca-certificates

# Set environment variables to ensure the CA certificates are correctly recognized
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

WORKDIR /frontend

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]
