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

  onSubmit(form: NgForm) {
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
