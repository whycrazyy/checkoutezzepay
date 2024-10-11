const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const app = express();
const { getToken } = require('../auth'); // Caminho para o arquivo auth.js


const webhookUser = "techersmartceo@gmail.com";  // Substitua pelo seu usuário
const webhookPassword = "Wrk8na0v@";  // Substitua pela sua senha
const signatureSecret = 'my-signature-secret'; // Valor do Signature Secret, obtido na criação do webhook
const encodedWebhookAuth = Buffer.from(`${webhookUser}:${webhookPassword}`).toString('base64');

// Função para registrar o webhook
async function registrarWebhook() {
    const token = await getToken(); // Função que você já tem para obter o token
    const webhookUrl = "http://localhost:3000/webhooks"; // Substitua pela URL real do seu endpoint

    try {
        const response = await axios.post('https://api.ezzebank.com/v2/webhooks/register', {
            url: webhookUrl,
            event: 'pix_payment', // Verifique na documentação os eventos disponíveis
            auth: {
                user: webhookUser,
                password: webhookPassword
            }
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        console.log('Webhook registrado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao registrar o webhook:', error.response ? error.response.data : error.message);
    }
}

// Função para validar a assinatura recebida no webhook
function validarAssinatura(verifySignatureHeader, payload) {
    const [timestampPart, vsignPart] = verifySignatureHeader.split(',').map(part => part.split('=')[1]);

    const signedPayload = crypto
        .createHmac('sha256', signatureSecret)
        .update(`${timestampPart}.${payload}`)
        .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signedPayload), Buffer.from(vsignPart));
}

// Endpoint para o webhook
app.use(express.json());

app.post('/webhook', (req, res) => {
    const payload = JSON.stringify(req.body);
    const verifySignatureHeader = req.headers['verify-signature'];

    if (!verifySignatureHeader) {
        return res.status(400).send('Signature missing');
    }

    if (validarAssinatura(verifySignatureHeader, payload)) {
        console.log('Assinatura válida, processando payload:', req.body);
        // Adicione aqui o processamento da notificação
        res.sendStatus(200);
    } else {
        console.log('Assinatura inválida');
        res.sendStatus(403);
    }
});

app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000');
});

// Chama a função para registrar o webhook
registrarWebhook();

// Outras funções e configurações

module.exports = { registrarWebhook };


