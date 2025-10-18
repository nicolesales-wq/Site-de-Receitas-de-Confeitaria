document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('receita-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const cidadeInput = document.getElementById('cidade');
    const tituloReceitaInput = document.getElementById('titulo-receita');
    const categoriaSelect = document.getElementById('categoria');
    const porcoesInput = document.getElementById('porcoes');
    const tempoPreparoInput = document.getElementById('tempo-preparo');
    const dificuldadeSelect = document.getElementById('dificuldade');
    const descricaoInput = document.getElementById('descricao');
    const ingredientesInput = document.getElementById('ingredientes');
    const modoPreparoInput = document.getElementById('modo-preparo');
    const dicasInput = document.getElementById('dicas');
    const linkFotoInput = document.getElementById('link-foto');
    const termosCheckbox = document.getElementById('termos');
    const submitBtn = document.getElementById('submit-btn');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^https?:\/\/.+\..+/i;

    const phoneMask = (value) => {
        value = value.replace(/\D/g, "");
        value = value.substring(0, 11);

        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = "(" + value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ") " + value.substring(2, 7);
        }
        if (value.length > 7) {
            formattedValue += "-" + value.substring(7, 11);
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
            errorMessage = 'O nome é obrigatório.';
        } else if (value.length < 3) {
            isValid = false;
            errorMessage = 'O nome deve ter no mínimo 3 caracteres.';
        } else if (value.length > 100) {
            isValid = false;
            errorMessage = 'O nome deve ter no máximo 100 caracteres.';
        } else if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(value)) {
            isValid = false;
            errorMessage = 'O nome deve conter apenas letras.';
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

    const validateTelefone = () => {
        const value = telefoneInput.value.replace(/\D/g, '');
        const errorElement = document.getElementById('error-telefone');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'O telefone é obrigatório.';
        } else if (value.length < 10 || value.length > 11) {
            isValid = false;
            errorMessage = 'Por favor, insira um telefone válido.';
        }

        errorElement.textContent = errorMessage;
        telefoneInput.classList.toggle('is-invalid', !isValid);
        telefoneInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateTituloReceita = () => {
        const value = tituloReceitaInput.value.trim();
        const errorElement = document.getElementById('error-titulo-receita');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'O título da receita é obrigatório.';
        } else if (value.length < 5) {
            isValid = false;
            errorMessage = 'O título deve ter no mínimo 5 caracteres.';
        } else if (value.length > 100) {
            isValid = false;
            errorMessage = 'O título deve ter no máximo 100 caracteres.';
        }

        errorElement.textContent = errorMessage;
        tituloReceitaInput.classList.toggle('is-invalid', !isValid);
        tituloReceitaInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateCategoria = () => {
        const value = categoriaSelect.value;
        const errorElement = document.getElementById('error-categoria');
        const isValid = value !== '';

        if (!isValid) {
            errorElement.textContent = 'Por favor, selecione uma categoria.';
        } else {
            errorElement.textContent = '';
        }

        categoriaSelect.classList.toggle('is-invalid', !isValid);
        categoriaSelect.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validatePorcoes = () => {
        const value = porcoesInput.value.trim();
        const errorElement = document.getElementById('error-porcoes');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'O rendimento é obrigatório.';
        } else if (value.length < 2) {
            isValid = false;
            errorMessage = 'Insira um rendimento válido (ex: 12 porções).';
        }

        errorElement.textContent = errorMessage;
        porcoesInput.classList.toggle('is-invalid', !isValid);
        porcoesInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateTempoPreparo = () => {
        const value = tempoPreparoInput.value.trim();
        const errorElement = document.getElementById('error-tempo-preparo');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'O tempo de preparo é obrigatório.';
        } else if (value.length < 2) {
            isValid = false;
            errorMessage = 'Insira um tempo válido (ex: 45 minutos).';
        }

        errorElement.textContent = errorMessage;
        tempoPreparoInput.classList.toggle('is-invalid', !isValid);
        tempoPreparoInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateDificuldade = () => {
        const value = dificuldadeSelect.value;
        const errorElement = document.getElementById('error-dificuldade');
        const isValid = value !== '';

        if (!isValid) {
            errorElement.textContent = 'Por favor, selecione o nível de dificuldade.';
        } else {
            errorElement.textContent = '';
        }

        dificuldadeSelect.classList.toggle('is-invalid', !isValid);
        dificuldadeSelect.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateDescricao = () => {
        const value = descricaoInput.value.trim();
        const errorElement = document.getElementById('error-descricao');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'A descrição é obrigatória.';
        } else if (value.length < 20) {
            isValid = false;
            errorMessage = 'A descrição deve ter no mínimo 20 caracteres.';
        } else if (value.length > 500) {
            isValid = false;
            errorMessage = 'A descrição deve ter no máximo 500 caracteres.';
        }

        errorElement.textContent = errorMessage;
        descricaoInput.classList.toggle('is-invalid', !isValid);
        descricaoInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateIngredientes = () => {
        const value = ingredientesInput.value.trim();
        const errorElement = document.getElementById('error-ingredientes');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'Os ingredientes são obrigatórios.';
        } else if (value.length < 50) {
            isValid = false;
            errorMessage = 'Liste os ingredientes com mais detalhes (mínimo 50 caracteres).';
        } else if (value.length > 2000) {
            isValid = false;
            errorMessage = 'A lista de ingredientes deve ter no máximo 2000 caracteres.';
        }

        errorElement.textContent = errorMessage;
        ingredientesInput.classList.toggle('is-invalid', !isValid);
        ingredientesInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateModoPreparo = () => {
        const value = modoPreparoInput.value.trim();
        const errorElement = document.getElementById('error-modo-preparo');
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'O modo de preparo é obrigatório.';
        } else if (value.length < 100) {
            isValid = false;
            errorMessage = 'Descreva o modo de preparo com mais detalhes (mínimo 100 caracteres).';
        } else if (value.length > 5000) {
            isValid = false;
            errorMessage = 'O modo de preparo deve ter no máximo 5000 caracteres.';
        }

        errorElement.textContent = errorMessage;
        modoPreparoInput.classList.toggle('is-invalid', !isValid);
        modoPreparoInput.classList.toggle('is-valid', isValid);
        return isValid;
    };

    const validateLinkFoto = () => {
        const value = linkFotoInput.value.trim();
        const errorElement = document.getElementById('error-link-foto');
        let isValid = true;
        let errorMessage = '';

        if (value && !urlRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um link válido (ex: https://exemplo.com/foto.jpg).';
        }

        errorElement.textContent = errorMessage;
        linkFotoInput.classList.toggle('is-invalid', !isValid);
        linkFotoInput.classList.toggle('is-valid', value && isValid);
        return isValid;
    };

    const validateTermos = () => {
        const errorElement = document.getElementById('error-termos');
        const isValid = termosCheckbox.checked;
        
        if (!isValid) {
            errorElement.textContent = 'Você deve concordar com os termos.';
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
        const isTelefoneValid = telefoneInput.value.trim().length > 0 ? validateTelefone() : false;
        const isTituloValid = tituloReceitaInput.value.trim().length > 0 ? validateTituloReceita() : false;
        const isCategoriaValid = categoriaSelect.value !== '';
        const isPorcoesValid = porcoesInput.value.trim().length > 0 ? validatePorcoes() : false;
        const isTempoValid = tempoPreparoInput.value.trim().length > 0 ? validateTempoPreparo() : false;
        const isDificuldadeValid = dificuldadeSelect.value !== '';
        const isDescricaoValid = descricaoInput.value.trim().length > 0 ? validateDescricao() : false;
        const isIngredientesValid = ingredientesInput.value.trim().length > 0 ? validateIngredientes() : false;
        const isModoPreparoValid = modoPreparoInput.value.trim().length > 0 ? validateModoPreparo() : false;
        const isTermosValid = termosCheckbox.checked;

        const allValid = isNomeValid && isEmailValid && isTelefoneValid && isTituloValid && 
                             isCategoriaValid && isPorcoesValid && isTempoValid && isDificuldadeValid && 
                             isDescricaoValid && isIngredientesValid && isModoPreparoValid && isTermosValid;
        
        submitBtn.disabled = !allValid;
    };

    nomeInput.addEventListener('input', checkFormValidity);
    nomeInput.addEventListener('blur', validateNome);

    emailInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('blur', validateEmail);

    telefoneInput.addEventListener('input', (e) => {
        e.target.value = phoneMask(e.target.value);
        checkFormValidity();
    });
    telefoneInput.addEventListener('blur', validateTelefone);

    tituloReceitaInput.addEventListener('input', checkFormValidity);
    tituloReceitaInput.addEventListener('blur', validateTituloReceita);

    categoriaSelect.addEventListener('change', () => {
        validateCategoria();
        checkFormValidity();
    });

    porcoesInput.addEventListener('input', checkFormValidity);
    porcoesInput.addEventListener('blur', validatePorcoes);

    tempoPreparoInput.addEventListener('input', checkFormValidity);
    tempoPreparoInput.addEventListener('blur', validateTempoPreparo);

    dificuldadeSelect.addEventListener('change', () => {
        validateDificuldade();
        checkFormValidity();
    });

    descricaoInput.addEventListener('input', checkFormValidity);
    descricaoInput.addEventListener('blur', validateDescricao);

    ingredientesInput.addEventListener('input', checkFormValidity);
    ingredientesInput.addEventListener('blur', validateIngredientes);

    modoPreparoInput.addEventListener('input', checkFormValidity);
    modoPreparoInput.addEventListener('blur', validateModoPreparo);

    linkFotoInput.addEventListener('blur', validateLinkFoto);

    termosCheckbox.addEventListener('change', () => {
        validateTermos();
        checkFormValidity();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isTelefoneValid = validateTelefone();
        const isTituloValid = validateTituloReceita();
        const isCategoriaValid = validateCategoria();
        const isPorcoesValid = validatePorcoes();
        const isTempoValid = validateTempoPreparo();
        const isDificuldadeValid = validateDificuldade();
        const isDescricaoValid = validateDescricao();
        const isIngredientesValid = validateIngredientes();
        const isModoPreparoValid = validateModoPreparo();
        const isLinkFotoValid = validateLinkFoto();
        const isTermosValid = validateTermos();

        const allValid = isNomeValid && isEmailValid && isTelefoneValid && isTituloValid && 
                             isCategoriaValid && isPorcoesValid && isTempoValid && isDificuldadeValid && 
                             isDescricaoValid && isIngredientesValid && isModoPreparoValid && 
                             isLinkFotoValid && isTermosValid;

        if (!allValid) {
            showAlert('❌ Por favor, corrija os erros no formulário antes de continuar!', 'error');
            
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> ENVIANDO...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showAlert('✅ Receita enviada com sucesso! Obrigado por compartilhar conosco! 🎉', 'success');
            
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> RECEITA ENVIADA';
            submitBtn.classList.remove('btn-enviar');
            submitBtn.classList.add('btn-success');
            
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                    el.classList.remove('is-valid', 'is-invalid');
                });
                submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> ENVIAR RECEITA';
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-enviar');
                submitBtn.disabled = true;
                showAlert('Você pode enviar outra receita quando quiser! 😊', 'info');
            }, 3000);
            
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
        } else if (type === 'info') {
            alertDiv.style.background = 'linear-gradient(135deg, #f06292, #ff92b4)';
            alertDiv.style.color = 'white';
            alertDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
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
    `;
    document.head.appendChild(style);

    checkFormValidity();
});
