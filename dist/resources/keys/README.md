# How to Generate RSA Keys Using OpenSSL

## Generate a Private Key:
```bash
openssl genrsa -out private-key.pem 3072
```

## Generate the Corresponding Public Key:
```bash
openssl rsa -in private-key.pem -pubout -out public-key.pem
```