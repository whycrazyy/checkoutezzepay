const axios = require('axios');

const clientId = "eyJpZCI6ImI2NzI1NmVkLTYwYWQtMTFlZi1hMzY0LTQyMDEwYTYwNjAwZCIsIm5hbWUiOiJUZWNoZXIgU21hcnQifQ==";
const clientSecret = "Ou7p0Aoi6MDSBjGv4PKeZWYQTnIqs2CLEVwzF18mtXkNhyr9fxalUcbRHd3J5g";

const credentials = `${clientId}:${clientSecret}`;
const encodedCredentials = Buffer.from(credentials).toString('base64');

let token = null;
let tokenExpiry = null;

async function gerarToken() {
    const authUrl = "https://api.ezzebank.com/v2/oauth/token";

    try {
        const response = await axios({
            method: 'post',
            url: authUrl,
            headers: {
                "Authorization": `Basic ${encodedCredentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "grant_type=client_credentials"
        });

        console.log("Token de acesso gerado com sucesso:", response.data.access_token);
        token = response.data.access_token;
        tokenExpiry = Date.now() + 30 * 60 * 1000;
        return token;
    } catch (error) {
        console.error("Erro ao gerar token:", error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getToken() {
    if (!token || Date.now() > tokenExpiry) {
        await gerarToken();
    }
    return token;
}

module.exports = { getToken };
