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
        if (value.length > 0) {
            value = "(" + value.substring(0, 2);
        }
        if (value.length > 3) {
            value += ") " + value.substring(2, 7);
        }
        if (value.length > 10) {
            value += "-" + value.substring(7, 11);
        }
        if (value.length > 15) {
            value = value.substring(0, 15);
        }
        return value;
    };

    const validateField = (input, message) => {
        const value = input.value.trim();
        const errorElement = document.getElementById(`error-${input.id}`);
        let isValid = true;

        if (input.required && !value) {
            isValid = false;
            errorElement.textContent = `O campo ${message} é obrigatório.`;
        } else {
            errorElement.textContent = '';
            if (input.id === 'email' && value && !emailRegex.test(value)) {
                isValid = false;
                errorElement.textContent = 'Por favor, insira um e-mail válido.';
            } else if (input.id === 'confirmar-senha' && value && value !== senhaInput.value) {
                isValid = false;
                errorElement.textContent = 'As senhas não coincidem.';
            } else if (input.id === 'pais' && input.required && !value) {
                isValid = false;
                errorElement.textContent = 'Por favor, selecione um país.';
            }
        }

        input.classList.toggle('is-invalid', !isValid);
        input.classList.toggle('is-valid', isValid && value.length > 0);
        return isValid;
    };

    const validateCheckbox = (checkbox, message) => {
        const errorElement = document.getElementById(`error-${checkbox.id}`);
        const isValid = checkbox.checked;
        
        if (!isValid) {
            errorElement.textContent = `Você deve aceitar os ${message}.`;
            checkbox.classList.add('is-invalid');
        } else {
            errorElement.textContent = '';
            checkbox.classList.remove('is-invalid');
        }
        return isValid;
    };

    const updatePasswordValidation = () => {
        const senha = senhaInput.value;
        
        passwordChecks.length = senha.length >= 8;
        passwordChecks.uppercase = /[A-Z]/.test(senha);
        passwordChecks.number = /[0-9]/.test(senha);
        passwordChecks.special = /[$@$!%*?&]/.test(senha);

        passwordRequirements.forEach(li => {
            const check = li.getAttribute('data-check');
            const isValid = passwordChecks[check];
            li.classList.toggle('valid', isValid);
        });

        const isPasswordValid = Object.values(passwordChecks).every(val => val);
        
        const errorElement = document.getElementById('error-senha');
        if (!isPasswordValid && senha.length > 0) {
            errorElement.textContent = 'A senha não atende a todos os requisitos.';
            senhaInput.classList.remove('is-valid');
            senhaInput.classList.add('is-invalid');
        } else if (senha.length > 0) {
            errorElement.textContent = '';
            senhaInput.classList.remove('is-invalid');
            senhaInput.classList.add('is-valid');
        } else {
            errorElement.textContent = '';
            senhaInput.classList.remove('is-invalid', 'is-valid');
        }

        if (confirmarSenhaInput.value.length > 0) {
            validateField(confirmarSenhaInput, 'Confirmação de Senha');
        }

        return isPasswordValid;
    };

    const checkFormValidity = () => {
        const allFieldsValid = inputs.every(input => validateField(input, input.placeholder || input.previousElementSibling.textContent.replace(' *', '')));
        const isPasswordValid = updatePasswordValidation();
        const isTermsChecked = validateCheckbox(termosCheckbox, 'Termos');

        submitBtn.disabled = !(allFieldsValid && isPasswordValid && isTermsChecked);
    };

    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
        input.addEventListener('blur', () => validateField(input, input.placeholder || input.previousElementSibling.textContent.replace(' *', '')));
    });

    whatsappInput.addEventListener('input', (e) => {
        e.target.value = phoneMask(e.target.value);
    });

    senhaInput.addEventListener('input', updatePasswordValidation);
    confirmarSenhaInput.addEventListener('input', () => validateField(confirmarSenhaInput, 'Confirmação de Senha'));

    termosCheckbox.addEventListener('change', checkFormValidity);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const allValid = inputs.every(input => validateField(input, input.placeholder || input.previousElementSibling.textContent.replace(' *', ''))) &&
                         updatePasswordValidation() &&
                         validateCheckbox(termosCheckbox, 'Termos');

        if (allValid) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> CADASTRANDO...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showAlert('Cadastro realizado com sucesso! Bem-vindo(a) ao Açúcar & Afeto! 🎉', 'success');
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> CONTA CRIADA';
                submitBtn.classList.remove('btn-cadastro');
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    window.location.href = 'login.html'; 
                }, 2000);
                
            }, 3000); 
        } else {
            showAlert('Por favor, corrija os erros do formulário.', 'error');
        }
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
            text-align: center;
            animation: slideDown 0.4s ease;
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
        }, 3000);
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
    `;
    document.head.appendChild(style);

    checkFormValidity();
});
