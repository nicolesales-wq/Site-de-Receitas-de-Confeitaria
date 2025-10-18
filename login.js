window.addEventListener('load', () => {
    setTimeout(() => {
        alert('🔐 Bem-vindo ao Açúcar & Afeto! \n\nFaça login para acessar recursos exclusivos e salvar suas receitas favoritas.');
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    
    emailInput.addEventListener('keyup', (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.length > 0) {
            if (emailRegex.test(email)) {
                emailInput.style.borderColor = '#28a745';
                emailInput.style.backgroundColor = 'rgba(40, 167, 69, 0.05)';
                
                if (!emailInput.parentElement.querySelector('.validation-icon')) {
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-check-circle validation-icon';
                    icon.style.cssText = `
                        position: absolute;
                        right: 15px;
                        top: 38px;
                        color: #28a745;
                        font-size: 1.2rem;
                    `;
                    emailInput.parentElement.style.position = 'relative';
                    emailInput.parentElement.appendChild(icon);
                }
            } else {
                emailInput.style.borderColor = '#dc3545';
                emailInput.style.backgroundColor = 'rgba(220, 53, 69, 0.05)';
                
                const icon = emailInput.parentElement.querySelector('.validation-icon');
                if (icon) icon.remove();
            }
        } else {
            emailInput.style.borderColor = '#ddd';
            emailInput.style.backgroundColor = 'white';
            const icon = emailInput.parentElement.querySelector('.validation-icon');
            if (icon) icon.remove();
        }
    });
    
    senhaInput.addEventListener('keyup', (e) => {
        const senha = e.target.value;
        
        if (senha.length > 0) {
            let strength = 0;
            if (senha.length >= 8) strength++;
            if (senha.match(/[a-z]+/)) strength++;
            if (senha.match(/[A-Z]+/)) strength++;
            if (senha.match(/[0-9]+/)) strength++;
            if (senha.match(/[$@#&!]+/)) strength++;
            
            const existingIndicator = senhaInput.parentElement.querySelector('.password-strength');
            if (existingIndicator) existingIndicator.remove();
            
            const indicator = document.createElement('div');
            indicator.className = 'password-strength';
            indicator.style.cssText = `
                height: 4px;
                margin-top: 5px;
                border-radius: 2px;
                transition: all 0.3s ease;
            `;
            
            if (strength <= 2) {
                indicator.style.width = '33%';
                indicator.style.backgroundColor = '#dc3545';
                senhaInput.style.borderColor = '#dc3545';
            } else if (strength <= 4) {
                indicator.style.width = '66%';
                indicator.style.backgroundColor = '#ffc107';
                senhaInput.style.borderColor = '#ffc107';
            } else {
                indicator.style.width = '100%';
                indicator.style.backgroundColor = '#28a745';
                senhaInput.style.borderColor = '#28a745';
            }
            
            senhaInput.parentElement.appendChild(indicator);
        } else {
            senhaInput.style.borderColor = '#ddd';
            const indicator = senhaInput.parentElement.querySelector('.password-strength');
            if (indicator) indicator.remove();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const senhaInput = document.getElementById('senha');
    const senhaLabel = senhaInput.previousElementSibling;
    
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    toggleBtn.style.cssText = `
        position: absolute;
        right: 10px;
        top: 38px;
        background: transparent;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 5px 10px;
        transition: color 0.3s ease;
    `;
    
    senhaInput.parentElement.style.position = 'relative';
    senhaInput.parentElement.appendChild(toggleBtn);
    
    let passwordVisible = false;
    toggleBtn.addEventListener('click', () => {
        passwordVisible = !passwordVisible;
        
        if (passwordVisible) {
            senhaInput.type = 'text';
            toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            toggleBtn.style.color = '#f06292';
        } else {
            senhaInput.type = 'password';
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            toggleBtn.style.color = '#666';
        }
    });
    
    toggleBtn.addEventListener('mouseover', () => {
        toggleBtn.style.color = '#f06292';
    });
    
    toggleBtn.addEventListener('mouseout', () => {
        if (!passwordVisible) {
            toggleBtn.style.color = '#666';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const loginBtn = document.querySelector('.btn-login');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        
        if (!email || !senha) {
            showAlert('Por favor, preencha todos os campos!', 'warning');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Por favor, insira um e-mail válido!', 'error');
            emailInput.focus();
            return;
        }
        
        if (senha.length < 6) {
            showAlert('A senha deve ter no mínimo 6 caracteres!', 'error');
            senhaInput.focus();
            return;
        }
        
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENTRANDO...';
        loginBtn.disabled = true;
        
        setTimeout(() => {
            showAlert('Login realizado com sucesso! Bem-vindo(a) de volta! 🎉', 'success');
            loginBtn.innerHTML = 'ENTRAR <i class="fas fa-sign-in-alt ms-2"></i>';
            loginBtn.disabled = false;
            
            form.reset();
            emailInput.style.borderColor = '#ddd';
            emailInput.style.backgroundColor = 'white';
            senhaInput.style.borderColor = '#ddd';
            
            const icons = document.querySelectorAll('.validation-icon, .password-strength');
            icons.forEach(icon => icon.remove());
        }, 2000);
    });
});

function showAlert(message, type) {
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
}

document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.querySelector('.btn-google-custom');
    const cadastroBtn = document.querySelector('.btn-cadastro-custom');
    
    googleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando...';
        
        setTimeout(() => {
            showAlert('Conectando com o Google...', 'success');
            googleBtn.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/100px-Google_%22G%22_logo.svg.png" 
                     alt="Google Logo" class="google-logo" style="width: 20px; height: 20px;">
                Entrar com Google
            `;
        }, 1500);
    });
    
    cadastroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAlert('Redirecionando para página de cadastro...', 'success');
    });
    
    [googleBtn, cadastroBtn].forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            position: relative;
            animation: scaleIn 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <button id="close-modal" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: transparent;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
            ">
                <i class="fas fa-times"></i>
            </button>
            <h3 style="color: #f06292; font-family: 'Dancing Script', cursive; font-size: 2rem; margin-bottom: 1rem;">
                Recuperar Senha
            </h3>
            <p style="color: #666; margin-bottom: 1.5rem;">
                Digite seu e-mail cadastrado e enviaremos instruções para redefinir sua senha.
            </p>
            <form id="reset-form">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">
                        E-mail
                    </label>
                    <input type="email" id="reset-email" required style="
                        width: 100%;
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1rem;
                    " placeholder="seu@email.com">
                </div>
                <button type="submit" style="
                    width: 100%;
                    padding: 12px;
                    background: #f06292;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background 0.3s ease;
                ">
                    ENVIAR INSTRUÇÕES <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const closeBtn = document.getElementById('close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.color = '#f06292';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            if (!passwordVisible) {
                closeBtn.style.color = '#666';
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        const resetForm = document.getElementById('reset-form');
        resetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            
            showAlert(`Instruções enviadas para ${email}! Verifique sua caixa de entrada.`, 'success');
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const rememberCheckbox = document.getElementById('lembrar');
    const checkboxLabel = document.querySelector('label[for="lembrar"]');
    
    rememberCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            checkboxLabel.style.color = '#f06292';
            checkboxLabel.style.fontWeight = '600';
            showToast('✓ Você será lembrado neste dispositivo');
        } else {
            checkboxLabel.style.color = '#333';
            checkboxLabel.style.fontWeight = '400';
        }
    });
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideLeft 0.3s ease;
        font-size: 0.95rem;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translate(-50%, -100px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100px); opacity: 0; }
    }
    @keyframes slideLeft {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('🔐 Página de Login - Script carregado com sucesso!');
