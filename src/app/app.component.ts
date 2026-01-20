import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Consultoria para Óticas';

  formData = {
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  };

  // Sistema de alertas
  showAlert = false;
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';

  // Aplica máscara de telefone brasileiro (XX) XXXXX-XXXX
  formatPhone(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

    if (value.length <= 11) {
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length <= 10) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      }
    }

    this.formData.telefone = value;
  }

  // Mostra alerta customizado
  showCustomAlert(message: string, type: 'error' | 'success' = 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    // Auto-fecha após 5 segundos
    setTimeout(() => {
      this.hideAlert();
    }, 5000);
  }

  // Esconde o alerta
  hideAlert() {
    this.showAlert = false;
  }

  // Valida email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Valida celular brasileiro (11 dígitos: DDD + 9 dígitos)
  isValidCellphone(cellphone: string): boolean {
    const cellphoneLimpo = cellphone.replace(/\D/g, '');
    // Celular brasileiro: 11 dígitos (DDD + 9 dígitos começando com 9)
    if (cellphoneLimpo.length !== 11) {
      return false;
    }
    // Verifica se o 3º dígito (após DDD) é 9 (padrão de celular)
    return cellphoneLimpo[2] === '9';
  }

  onSubmit(form: NgForm) {
    // Validação dos campos obrigatórios
    if (!this.formData.nome || this.formData.nome.trim() === '') {
      this.showCustomAlert('Por favor, preencha o campo Nome.');
      return;
    }

    if (!this.formData.email || this.formData.email.trim() === '') {
      this.showCustomAlert('Por favor, preencha o campo Email.');
      return;
    }

    // Validação de email válido
    if (!this.isValidEmail(this.formData.email)) {
      this.showCustomAlert('Por favor, insira um email válido. Exemplo: seu@email.com');
      return;
    }

    // Validação de celular
    if (!this.formData.telefone || this.formData.telefone.trim() === '') {
      this.showCustomAlert('Por favor, preencha o campo Celular.');
      return;
    }

    if (!this.isValidCellphone(this.formData.telefone)) {
      this.showCustomAlert('Por favor, insira um celular válido com DDD. Exemplo: (11) 99999-9999');
      return;
    }

    // Validação de mensagem obrigatória
    if (!this.formData.mensagem || this.formData.mensagem.trim() === '') {
      this.showCustomAlert('Por favor, preencha o campo Mensagem.');
      return;
    }

    if (form.valid) {
      // Formata a mensagem para o WhatsApp
      const mensagem = `Olá! Meu nome é ${this.formData.nome}.\n\n` +
        `Email: ${this.formData.email}\n\n` +
        `Mensagem: ${this.formData.mensagem}`;

      // Codifica a mensagem para URL
      const mensagemEncoded = encodeURIComponent(mensagem);

      // Número do WhatsApp (apenas números, sem espaços ou caracteres especiais)
      const whatsappNumber = '5511983270236';

      // Cria o link do WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;

      // Abre o WhatsApp em uma nova aba
      window.open(whatsappUrl, '_blank');

      // Limpa o formulário após enviar
      form.resetForm();
      this.formData = {
        nome: '',
        email: '',
        telefone: '',
        mensagem: ''
      };
    }
  }
}
