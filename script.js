// DADOS DAS SUBCATEGORIAS
const subcategoriesData = {
    'Conserto': ['Móveis Danificados', 'Portas e Janelas', 'Estruturas de Madeira', 'Objetos de Metal', 'Brinquedos', 'Solicitar Orçamento'],
    'Montagem': ['Móveis Planos', 'Prateleiras', 'Bicicletas', 'Equipamentos Esportivos', 'Berços', 'Solicitar Orçamento'],
    'Transporte': ['Mudanças Residenciais', 'Entregas Locais', 'Transporte de Móveis', 'Objetos Grandes', 'Plantas', 'Solicitar Orçamento'],
    'Elétrica': ['Instalação de Tomadas', 'Reparo de Fiações', 'Quadros de Distribuição', 'Lâmpadas e Lustres', 'Disjuntores', 'Solicitar Orçamento'],
    'Hidráulica': ['Desentupimento', 'Reparo de Torneiras', 'Instalação de Chuveiros', 'Vazamentos em Canos', 'Caixas dÁgua', 'Solicitar Orçamento'],
    'Pintura': ['Paredes Internas', 'Fachadas Externas', 'Móveis Antigos', 'Portões e Grades', 'Pintura Artística', 'Solicitar Orçamento'],
    'Limpeza': ['Pós-obra', 'Limpeza Pesada', 'Organização de Ambientes', 'Limpeza de Estofados', 'Vidros e Janelas', 'Solicitar Orçamento'],
    'Jardim': ['Paisagismo', 'Podas de Árvores', 'Plantio de Grama', 'Sistemas de Irrigação', 'Jardins Verticais', 'Solicitar Orçamento'],
    'SmartTech': ['Instalação de Câmeras', 'Configuração Wi-Fi', 'Smart TVs e Sons', 'Automação Residencial', 'Assistência em Apps', 'Solicitar Orçamento']
};

// ===== SISTEMA DE LOGIN UNIVERSAL =====
class LoginSystem {
    constructor() {
        this.loginModal = null;
        this.loginBtn = null;
        this.loginText = null;
        this.init();
    }

    init() {
        this.setupLoginModal();
        this.checkLoggedInUser();
    }

    setupLoginModal() {
        // Encontrar elementos em QUALQUER página
        this.loginBtn = document.getElementById('loginBtn');
        this.loginText = document.getElementById('loginText');
        this.loginModal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');
        const loginForm = document.getElementById('loginForm');
        const loginEmail = document.getElementById('loginEmail');
        const loginSenha = document.getElementById('loginSenha');

        // Se não existir modal de login na página, não fazer nada
        if (!this.loginModal) return;

        const openLoginModal = (ev) => {
            if (ev) ev.preventDefault();
            this.loginModal.style.display = "flex";
            this.loginModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            if (loginEmail) loginEmail.focus();
        };

        const closeLoginModal = () => {
            this.loginModal.style.display = "none";
            this.loginModal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "auto";
            if (loginForm) loginForm.reset();
        };

        // Event listeners - só adiciona se os elementos existirem
        if (this.loginBtn) {
            this.loginBtn.addEventListener("click", openLoginModal);
        }

        if (closeModal) {
            closeModal.addEventListener("click", closeLoginModal);
        }

        if (this.loginModal) {
            this.loginModal.addEventListener("click", (e) => {
                if (e.target === this.loginModal) closeLoginModal();
            });
        }

        // Fechar com ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.loginModal && this.loginModal.style.display === "flex") {
                closeLoginModal();
            }
        });

        // Formulário de login
        if (loginForm) {
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const email = loginEmail.value.trim();
                const senha = loginSenha.value.trim();

                if (!email || !senha) {
                    this.showMessage("Preencha todos os campos!", "error");
                    return;
                }

                if (!this.isValidEmail(email)) {
                    this.showMessage("Digite um email válido!", "error");
                    return;
                }

                this.simulateLogin(email, senha, loginForm);
            });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    simulateLogin(email, senha, loginForm) {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Entrando...";
        submitBtn.disabled = true;

        setTimeout(() => {
            const nome = email.split("@")[0];

            // Salvar no sessionStorage
            sessionStorage.setItem("nomeUsuario", nome);
            sessionStorage.setItem("usuarioLogado", "true");

            // Atualizar texto do botão em TODAS as páginas
            this.updateLoginText(nome);

            this.showMessage(`Bem-vindo de volta, ${nome}!`, "success");
            this.closeLoginModal();

            // Restaurar botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    updateLoginText(nome) {
        // Atualiza em TODOS os elementos loginText na página
        const allLoginTexts = document.querySelectorAll('#loginText');
        allLoginTexts.forEach(element => {
            element.textContent = nome;
        });
    }

    closeLoginModal() {
        if (this.loginModal) {
            this.loginModal.style.display = "none";
            this.loginModal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "auto";
        }
    }

    showMessage(message, type) {
        const existingMessage = document.querySelector('.modal-message');
        if (existingMessage) existingMessage.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = `modal-message ${type}`;
        messageDiv.textContent = message;

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.insertBefore(messageDiv, loginForm.firstChild);
        }

        setTimeout(() => {
            if (messageDiv.parentNode) messageDiv.remove();
        }, 5000);
    }

    checkLoggedInUser() {
        const nomeSalvo = sessionStorage.getItem("nomeUsuario");
        const usuarioLogado = sessionStorage.getItem("usuarioLogado");

        if (nomeSalvo && usuarioLogado === "true" && this.loginText) {
            this.updateLoginText(nomeSalvo);
        }
    }
}

// ===== SISTEMA PRINCIPAL =====
document.addEventListener("DOMContentLoaded", function () {

    // ===== INICIALIZAR CARROSSEL (apenas se existir) =====
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        new Carousel(carouselElement);
    }

    // ===== INICIALIZAR SISTEMA DE LOGIN (funciona em TODAS as páginas) =====
    new LoginSystem();

    // ===== MENU MOBILE =====
    function setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('nav ul');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', function () {
                navMenu.classList.toggle('show');
            });

            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('show');
                });
            });
        }
    }

    // ===== SUBCATEGORIAS (apenas na home) =====
    function setupSubcategories() {
        const serviceButtons = document.querySelectorAll('.service-btn');

        // Só inicializa se estiver na página home (onde existem os botões de serviço)
        if (serviceButtons.length === 0) return;

        let currentOpenSubcategories = null;

        serviceButtons.forEach(button => {
            const subcategoriesContainer = document.createElement('div');
            subcategoriesContainer.className = 'subcategories-container';

            const subcategoriesList = document.createElement('div');
            subcategoriesList.className = 'subcategories-list';
            subcategoriesContainer.appendChild(subcategoriesList);

            button.parentNode.appendChild(subcategoriesContainer);

            button.addEventListener('click', function (e) {
                e.stopPropagation();
                const serviceName = this.querySelector('span').textContent;

                if (currentOpenSubcategories && currentOpenSubcategories !== subcategoriesContainer) {
                    currentOpenSubcategories.classList.remove('active');
                }

                if (subcategoriesContainer.classList.contains('active')) {
                    subcategoriesContainer.classList.remove('active');
                    currentOpenSubcategories = null;
                } else {
                    loadSubcategories(serviceName, subcategoriesList);
                    subcategoriesContainer.classList.add('active');
                    currentOpenSubcategories = subcategoriesContainer;
                }
            });
        });

        function loadSubcategories(serviceName, container) {
            const subcategories = subcategoriesData[serviceName] || ['Nenhuma subcategoria disponível'];

            container.innerHTML = '';

            subcategories.forEach(sub => {
                const subItem = document.createElement('div');
                subItem.className = 'subcategory-item';
                subItem.textContent = sub;
                subItem.addEventListener('click', function (e) {
                    e.stopPropagation();
                    alert(`Você selecionou: ${sub} (${serviceName})`);
                    if (currentOpenSubcategories) {
                        currentOpenSubcategories.classList.remove('active');
                        currentOpenSubcategories = null;
                    }
                });
                container.appendChild(subItem);
            });
        }

        document.addEventListener('click', function () {
            if (currentOpenSubcategories) {
                currentOpenSubcategories.classList.remove('active');
                currentOpenSubcategories = null;
            }
        });
    }

    // ===== BUSCA SIMPLES =====
    function setupSearch() {
        const searchForms = document.querySelectorAll('.search-box');

        searchForms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const searchInput = this.querySelector('input[type="search"]');
                const searchTerm = searchInput.value.trim();

                if (searchTerm) {
                    alert(`Buscando por: "${searchTerm}"\n\n(Esta é uma demonstração. Em um site real, aqui iria para resultados de busca.)`);
                    searchInput.value = '';
                }
            });
        });
    }

    // ===== FORMULÁRIOS DE CONTATO =====
    function setupContactForms() {
        const devContactForm = document.getElementById('devContactForm');
        if (devContactForm) {
            devContactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('📧 Mensagem enviada para os desenvolvedores! (Simulação)');
                this.reset();
            });
        }

        const suggestCategoryForm = document.getElementById('suggestCategoryForm');
        if (suggestCategoryForm) {
            suggestCategoryForm.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('💡 Sugestão de categoria enviada! Obrigado pela contribuição! (Simulação)');
                this.reset();
            });
        }
    }

    // ===== FORMULÁRIO DE CADASTRO =====
    function setupCadastroForm() {
        const cadastroForm = document.getElementById('cadastroForm');
        const tipoUsuario = document.getElementById('tipoUsuario');
        const prestadorExtra = document.getElementById('prestadorExtra');

        if (!cadastroForm) return;

        // Mostrar/ocultar campos de prestador
        if (tipoUsuario && prestadorExtra) {
            tipoUsuario.addEventListener('change', function () {
                prestadorExtra.style.display = this.value === 'prestador' ? 'block' : 'none';
            });
        }

        // Validação do formulário
        cadastroForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const camposObrig = cadastroForm.querySelectorAll("input[required], select[required]");
            let valido = true;

            camposObrig.forEach(campo => {
                if (!campo.value.trim()) {
                    campo.style.border = "2px solid red";
                    valido = false;
                } else {
                    campo.style.border = "1px solid #ccc";
                }
            });

            if (!valido) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }

            alert("Cadastro realizado com sucesso! (fictício)");
            cadastroForm.reset();
            if (prestadorExtra) prestadorExtra.style.display = "none";
        });
    }

    // ===== INICIALIZAR TUDO =====
    setupMobileMenu();
    setupSubcategories();
    setupSearch();
    setupContactForms();
    setupCadastroForm();


});