document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    const whatsappInput = document.getElementById('whatsapp');
    const paisSelect = document.getElementById('pais');
    const termosCheckbox = document.getElementById('termos');
    const submitBtn = document.getElementById('submit-btn');

    const inputs = [nomeInput, emailInput, senhaInput, confirmarSenhaInput, paisSelect];
    const passwordRequirements = document.querySelectorAll('.password-requirements li');
    const passwordChecks = {
        length: false,
        uppercase: false,
        number: false,
        special: false
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const phoneMask = (value) => {
        value = value.replace(/\D/g, "");
        value = value.substring(0, 12);

        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = "(" + value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ") " + value.substring(2, 7);
        }
        if (value.length > 7) {
            formattedValue += "-" + value.substring(7, 12);
        }
        
        return formattedValue;
    };

    const validateNome = () => {
        const value = nomeInput.value.trim();
        const errorElement = document.getElementById('error-nome');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'O nome completo é obrigatório.';
        } else if (value.length < 3) {
            isValid = false;
            errorMessage = 'O nome deve ter no mínimo 3 caracteres.';
        } else if (value.length > 100) {
            isValid = false;
            errorMessage = 'O nome deve ter no máximo 100 caracteres.';
        } else if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(value)) {
            isValid = false;
            errorMessage = 'O nome deve conter apenas letras.';
        } else {
            const palavras = value.split(' ').filter(p => p.length > 0);
            if (palavras.length < 2) {
                isValid = false;
                errorMessage = 'Por favor, insira seu nome completo (nome e sobrenome).';
            }
        }

        errorElement.textContent = errorMessage;
        nomeInput.classList.toggle('is-invalid', !isValid);
        nomeInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const errorElement = document.getElementById('error-email');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'O e-mail é obrigatório.';
        } else if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um e-mail válido.';
        } else if (value.length > 100) {
            isValid = false;
            errorMessage = 'O e-mail deve ter no máximo 100 caracteres.';
        }

        errorElement.textContent = errorMessage;
        emailInput.classList.toggle('is-invalid', !isValid);
        emailInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const updatePasswordValidation = () => {
        const senha = senhaInput.value;
        const errorElement = document.getElementById('error-senha');
        
        passwordChecks.length = senha.length >= 8;
        passwordChecks.uppercase = /[A-Z]/.test(senha);
        passwordChecks.number = /[0-9]/.test(senha);
        passwordChecks.special = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        passwordRequirements.forEach(li => {
            const check = li.getAttribute('data-check');
            const isValid = passwordChecks[check];
            li.classList.toggle('valid', isValid);
            const icon = li.querySelector('i');
            if (isValid) {
                icon.className = 'fas fa-check-circle';
            } else {
                icon.className = 'fas fa-times-circle';
            }
        });

        const isPasswordValid = Object.values(passwordChecks).every(val => val);
        
        if (senha.length === 0) {
            errorElement.textContent = '';
            senhaInput.classList.remove('is-invalid', 'is-valid');
            return false;
        } else if (!isPasswordValid) {
            errorElement.textContent = 'A senha não atende a todos os requisitos.';
            senhaInput.classList.remove('is-valid');
            senhaInput.classList.add('is-invalid');
            return false;
        } else {
            errorElement.textContent = '';
            senhaInput.classList.remove('is-invalid');
            senhaInput.classList.add('is-valid');
            return true;
        }
    };

    const validateConfirmarSenha = () => {
        const value = confirmarSenhaInput.value;
        const errorElement = document.getElementById('error-confirmar-senha');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'Por favor, confirme sua senha.';
        } else if (value !== senhaInput.value) {
            isValid = false;
            errorMessage = 'As senhas não coincidem.';
        }

        errorElement.textContent = errorMessage;
        confirmarSenhaInput.classList.toggle('is-invalid', !isValid);
        confirmarSenhaInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validatePais = () => {
        const value = paisSelect.value;
        const errorElement = document.getElementById('error-pais');
        const isValid = value !== '';

        if (!isValid) {
            errorElement.textContent = 'Por favor, selecione um país.';
        } else {
            errorElement.textContent = '';
        }

        paisSelect.classList.toggle('is-invalid', !isValid);
        paisSelect.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateTermos = () => {
        const errorElement = document.getElementById('error-termos');
        const isValid = termosCheckbox.checked;
        
        if (!isValid) {
            errorElement.textContent = 'Você deve aceitar os Termos de Serviço.';
            termosCheckbox.classList.add('is-invalid');
        } else {
            errorElement.textContent = '';
            termosCheckbox.classList.remove('is-invalid');
        }
        return isValid;
    };

    const checkFormValidity = () => {
        
        const isNomeValid = nomeInput.value.trim().length > 0 ? validateNome() : false;
        const isEmailValid = emailInput.value.trim().length > 0 ? validateEmail() : false;
        const isPasswordValid = senhaInput.value.length > 0 ? updatePasswordValidation() : false;
        const isConfirmarSenhaValid = confirmarSenhaInput.value.length > 0 ? validateConfirmarSenha() : false;
        const isPaisValid = paisSelect.value !== '';
        const isTermsChecked = termosCheckbox.checked;

        const allValid = isNomeValid && isEmailValid && isPasswordValid && isConfirmarSenhaValid && isPaisValid && isTermsChecked;
        submitBtn.disabled = !allValid;
    };

    nomeInput.addEventListener('input', checkFormValidity);
    nomeInput.addEventListener('blur', validateNome);

    emailInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('blur', validateEmail);

    senhaInput.addEventListener('input', () => {
        updatePasswordValidation();
        if (confirmarSenhaInput.value.length > 0) {
            validateConfirmarSenha();
        }
        checkFormValidity();
    });

    confirmarSenhaInput.addEventListener('input', () => {
        validateConfirmarSenha();
        checkFormValidity();
    });
    confirmarSenhaInput.addEventListener('blur', validateConfirmarSenha);

    paisSelect.addEventListener('change', () => {
        validatePais();
        checkFormValidity();
    });

    termosCheckbox.addEventListener('change', () => {
        validateTermos();
        checkFormValidity();
    });

    whatsappInput.addEventListener('input', (e) => {
        e.target.value = phoneMask(e.target.value);
    });

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = e.currentTarget.querySelector('i');
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                e.currentTarget.classList.add('active');
            } else {
                targetInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                e.currentTarget.classList.remove('active');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isPasswordValid = updatePasswordValidation();
        const isConfirmarSenhaValid = validateConfirmarSenha();
        const isPaisValid = validatePais();
        const isTermsValid = validateTermos();

        const allValid = isNomeValid && isEmailValid && isPasswordValid && isConfirmarSenhaValid && isPaisValid && isTermsValid;

        if (!allValid) {
            showAlert('❌ Por favor, corrija os erros no formulário antes de continuar!', 'error');
            
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> CADASTRANDO...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showAlert('✅ Cadastro realizado com sucesso! Redirecionando para a página inicial...', 'success');
            
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> CONTA CRIADA';
            submitBtn.classList.remove('btn-cadastro');
            submitBtn.classList.add('btn-success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        }, 2000);
    });

    const showAlert = (message, type) => {
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            min-width: 300px;
            max-width: 500px;
            text-align: center;
            animation: slideDown 0.4s ease;
            font-family: 'Inter', sans-serif;
        `;
        
        if (type === 'success') {
            alertDiv.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            alertDiv.style.color = 'white';
            alertDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        } else if (type === 'error') {
            alertDiv.style.background = 'linear-gradient(135deg, #dc3545, #e74c3c)';
            alertDiv.style.color = 'white';
            alertDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        } else if (type === 'warning') {
            alertDiv.style.background = 'linear-gradient(135deg, #ffc107, #ff9800)';
            alertDiv.style.color = '#333';
            alertDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        }
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideUp 0.4s ease';
            setTimeout(() => alertDiv.remove(), 400);
        }, 4000);
    };

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translate(-50%, -100px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, -100px); opacity: 0; }
        }
        .password-requirements li {
            color: #dc3545;
            transition: color 0.3s ease;
        }
        .password-requirements li.valid {
            color: #28a745;
        }
        .toggle-password.active {
            color: #f06292;
        }
    `;
    document.head.appendChild(style);

    checkFormValidity();
});
