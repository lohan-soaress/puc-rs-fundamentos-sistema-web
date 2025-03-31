document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', validarFormularioCadastro);
    }
    
    const formAgendamento = document.getElementById('form-agendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', validarFormularioAgendamento);
        
        const servicoRetirada = document.getElementById('retirada');
        const servicoEntrega = document.getElementById('entrega');
        const enderecoEntrega = document.getElementById('endereco-entrega');
        
        if (servicoRetirada && servicoEntrega && enderecoEntrega) {
            servicoRetirada.addEventListener('change', function() {
                enderecoEntrega.style.display = 'none';
            });
            
            servicoEntrega.addEventListener('change', function() {
                enderecoEntrega.style.display = 'block';
            });
        }
    }

    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            if (validarFormatoCPF(this.value)) {
                this.classList.remove('is-invalid');
            }
        });
    }
    
    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('input', function() {
            if (validarFormatoCelular(this.value)) {
                this.classList.remove('is-invalid');
            }
        });
    }
});

function validarFormatoCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    return cpfLimpo.length == 11
}

function validarFormatoCelular(celular) {
    const celularLimpo = celular.replace(/\D/g, '');
    
    if (celularLimpo.length !== 11) {
        return false;
    }
    
    if (celularLimpo.charAt(2) !== '9') {
        return false;
    }
    
    return true;
}

function validarFormularioCadastro(event) {
    const form = event.target;
    let formValido = form.checkValidity();
    
    const cpfInput = document.getElementById('cpf');
    if (cpfInput && cpfInput.value) {
        if (!validarFormatoCPF(cpfInput.value)){
            cpfInput.classList.add('is-invalid');
            formValido = false;
        }
        else {
            cpfInput.classList.remove('is-invalid');
        }
    }
    
    const celularInput = document.getElementById('celular');
    if (celularInput && celularInput.value) {
        if (!validarFormatoCelular(celularInput.value)) {
            celularInput.classList.add('is-invalid');
            formValido = false;
        } else {
            celularInput.classList.remove('is-invalid');
        }
    }
    
    if (!formValido) {
        event.preventDefault();
        event.stopPropagation();
        destacarCamposInvalidos(form);
    } else {
        alert('Cadastro realizado com sucesso!');
    }
}

function validarFormularioAgendamento(event) {
    const form = event.target;
    
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        
        destacarCamposInvalidos(form);
    } else {
        alert('Agendamento realizado com sucesso!');
    }
}

function destacarCamposInvalidos(form) {
    const camposInvalidos = form.querySelectorAll(':invalid');
    
    camposInvalidos.forEach(campo => {
        campo.classList.add('is-invalid');
        
        campo.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
            }
        });
    });
}

function atualizarHorariosDisponiveis() {
    const dataInput = document.getElementById('data-agendamento');
    const horarioSelect = document.getElementById('horario-agendamento');
    
    if (!dataInput || !horarioSelect) return;
    
    horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
    
    for (let hora = 8; hora < 20; hora++) {
        const horaFormatada = `${hora}:00`;
        const option = document.createElement('option');
        option.value = horaFormatada;
        option.textContent = horaFormatada;
        horarioSelect.appendChild(option);
    }
}