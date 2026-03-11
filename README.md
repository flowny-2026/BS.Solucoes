# Flowny - Desenvolvimento Web Profissional

Site institucional da Flowny, empresa especializada em desenvolvimento de sites profissionais, responsivos e de alto impacto.

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3 (Mobile-First, Flexbox, Grid)
- JavaScript (Vanilla)
- EmailJS (para formulário de contato)

## 📱 Características

- ✅ Design totalmente responsivo (mobile, tablet, desktop)
- ✅ Menu hambúrguer funcional
- ✅ Navegação suave entre seções
- ✅ Ícones de redes sociais flutuantes
- ✅ Formulário de contato integrado
- ✅ Otimizado para performance
- ✅ Acessibilidade (WCAG)

## 📂 Estrutura do Projeto

```
flowny/
├── index.html          # Página principal
├── css/
│   ├── global.css      # Estilos globais e variáveis
│   ├── header.css      # Cabeçalho e navegação
│   ├── main.css        # Seção hero/home
│   ├── services.css    # Seção de serviços
│   ├── portfolio.css   # Seção sobre e portfólio
│   ├── contact.css     # Formulário de contato
│   ├── footer.css      # Rodapé e ícones sociais
│   ├── mobile-menu.css # Menu mobile
│   ├── privacy.css     # Política de privacidade
│   └── ocultas.css     # Seções ocultas
├── js/
│   ├── init.js         # Inicialização da página
│   ├── main.js         # Navegação e menu
│   ├── mobile-menu.js  # Funcionalidades do menu mobile
│   └── contato.js      # Formulário de contato
└── img/                # Imagens e assets
```

## 🔧 Configuração do EmailJS

Para ativar o formulário de contato:

1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie um template de email
4. No arquivo `js/contato.js`, descomente e configure:
   ```javascript
   emailjs.init('SUA_CHAVE_PUBLICA');
   emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', formData);
   ```

## 🌐 Deploy no GitHub Pages

1. Faça upload dos arquivos para um repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch `main` e pasta `/ (root)`
4. Clique em Save
5. Seu site estará disponível em: `https://seu-usuario.github.io/nome-do-repo/`

## 📱 Responsividade

O site é otimizado para:
- 📱 Mobile: 320px - 767px
- 📱 Tablet: 768px - 1023px
- 💻 Desktop: 1024px+

## 🎨 Paleta de Cores

- Primary: #2563EB (Azul)
- Primary Dark: #1E3A8A (Azul escuro)
- Accent: #6366F1 (Roxo)
- CTA: #F59E0B (Laranja)
- Background: #F8FAFC (Cinza claro)

## 📞 Contato

- WhatsApp: (16) 99291-5540
- Instagram: [@flowly_sites](https://www.instagram.com/flowly_sites)
- Email: contato@flowny.com.br

## 📄 Licença

© 2025 Flowny. Todos os direitos reservados.

---

Desenvolvido com ❤️ pela equipe Flowny
