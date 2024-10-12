const axios = require('axios');
const express = require('express');
const { registrarWebhook } = require('./webhooks/pixWebhook'); // Importe a função do webhook
const { getToken } = require('./auth'); // Caminho para o arquivo auth.js

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Outras rotas e middlewares do seu app

// Registra o webhook ao iniciar o servidor
registrarWebhook().then(() => {
  console.log('Webhook registrado com sucesso!');
}).catch(error => {
  console.error('Erro ao registrar o webhook:', error);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Função para gerar um QRCode PIX
async function gerarQRCodePix(amount, payerName, payerDocument, payerQuestion = "", externalId = "") {
    const accessToken = await getToken();
    const qrcodeUrl = "https://api.ezzebank.com/v2/pix/qrcode";

    const qrCodeData = {
        amount: amount,  // Valor da cobrança
        payerQuestion: payerQuestion,  // Informação adicional para o pagador
        external_id: externalId,  // Identificador único da sua aplicação
        payer: {
            name: payerName,  // Nome do pagador
            document: payerDocument  // CPF ou CNPJ do pagador
        }
    };

    try {
        const response = await axios({
            method: 'post',
            url: qrcodeUrl,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data: qrCodeData
        });

        console.log("QR Code gerado com sucesso:", response.data);
        return response.data;  // Retorna os detalhes do QR Code, incluindo a imagem ou URL
    } catch (error) {
        console.error("Erro ao gerar QR Code PIX:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Exemplo de chamada da função para gerar o QR Code PIX
gerarQRCodePix(2.50, "Roronoa Zoro", "01234567899", "Pagamento referente a X produto/serviço", "123456")
    .then(data => {
        console.log("Detalhes do QR Code:", data);
    })
    .catch(error => {
        console.error("Erro ao processar a geração do QR Code:", error);
    });
