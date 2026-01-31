const fs = require('fs');
const path = require('path');

module.exports = {
    name: "IA de Respostas DNT",
    init: (bot) => {
        const brainPath = path.join(process.cwd(), 'brain.json');

        bot.command({
            name: 'perguntar',
            description: 'Faça uma pergunta ao bot',
            options: [
                { name: 'texto', description: 'O que você quer saber?', type: 3, required: true }
            ],
            run: async (ctx) => {
                const pergunta = ctx.interaction.options.getString('texto').toLowerCase();
                
                if (!fs.existsSync(brainPath)) {
                    return ctx.reply("❌ Erro: O arquivo `brain.json` não foi encontrado.");
                }

                const brain = JSON.parse(fs.readFileSync(brainPath, 'utf8'));
                
                // Procura se alguma palavra-chave do JSON está na pergunta
                const chaveEncontrada = Object.keys(brain).find(key => pergunta.includes(key));

                if (chaveEncontrada) {
                    await ctx.reply(`🤖 ${brain[chaveEncontrada]}`);
                } else {
                    await ctx.reply("😅 Ainda não aprendi sobre isso. Peça para o meu dono me ensinar no `brain.json`!");
                }
            }
        });

        console.log("🧠 [Módulo] IA de Respostas Pré-definidas carregada!");
    }
};
          
