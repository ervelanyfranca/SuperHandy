document.addEventListener("DOMContentLoaded", () => {
    const $ = id => document.getElementById(id);

    // Elementos de login/modal
    const loginBtn = $("loginBtn");
    const loginText = $("loginText");
    const loginModal = $("loginModal");
    const closeModal = $("closeModal");
    const loginForm = $("loginForm");
    const loginEmail = $("loginEmail");
    const loginSenha = $("loginSenha");

    // Elementos de cadastro
    const cadastroForm = $("cadastroForm");
    const tipoCadastro = $("tipoCadastro");
    const extraPrestador = $("extraPrestador");

    // — Funções de modal/login —

    const openLoginModal = (ev) => {
        if (ev) ev.preventDefault();
        if (!loginModal) return;
        loginModal.style.display = "flex";
        loginModal.setAttribute("aria-hidden", "false");
        if (loginEmail) loginEmail.focus();
    };

    const closeLoginModal = () => {
        if (!loginModal) return;
        loginModal.style.display = "none";
        loginModal.setAttribute("aria-hidden", "true");
    };

    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openLoginModal(e);
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", (e) => {
            e.preventDefault();
            closeLoginModal();
        });
    }

    if (loginModal) {
        loginModal.addEventListener("click", (e) => {
            if (e.target === loginModal) closeLoginModal();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = loginEmail ? loginEmail.value.trim() : "";
            const senha = loginSenha ? loginSenha.value : "";

            if (!email || !senha) {
                alert("Preencha email e senha.");
                return;
            }

            alert("Login (fictício) bem‐sucedido!");

            if (loginBtn) {
                loginBtn.innerHTML = '<i class="fa-solid fa-user"></i>';
            }

            closeLoginModal();
        });
    }

    if (tipoCadastro && extraPrestador) {
        tipoCadastro.addEventListener("change", () => {
            if (tipoCadastro.value === "prestador") {
                extraPrestador.style.display = "block";
            } else {
                extraPrestador.style.display = "none";
            }
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputsObrigatorios = cadastroForm.querySelectorAll("input[required], select[required]");
            let valido = true;
            inputsObrigatorios.forEach(inp => {
                if (!inp.value.trim()) {
                    inp.style.border = "2px solid red";
                    valido = false;
                } else {
                    inp.style.border = "1px solid #ccc";
                }
            });
            if (!valido) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }

            const dados = {};
            const todosCampos = cadastroForm.querySelectorAll("input, select");
            todosCampos.forEach(c => {
                if (c.id) {
                    dados[c.id] = c.value;
                }
            });

            console.log("Dados do cadastro:", dados);

            alert("Cadastro realizado com sucesso!");

            if (loginBtn) {
                loginBtn.innerHTML = '<i class="fa-solid fa-user"></i>';
            }

            cadastroForm.reset();
            if (extraPrestador) {
                extraPrestador.style.display = "none";
            }
        });
    }
});
