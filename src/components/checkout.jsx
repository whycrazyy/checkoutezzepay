import React, { useState } from 'react';
import './App.css';

function formatCPF(cpf) {
    // Remove qualquer caractere que não seja número
    cpf = cpf.replace(/\D/g, "");
    
    // Adiciona os pontos e o hífen conforme o usuário digita
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    
    return cpf;
}

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '', // Adicionando CPF ao estado
        phone: '',
        address: '',
        country: '',
        state: '',
        zip: ''
    });

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Aplica a formatação ao campo CPF
        if (name === 'cpf') {
            value = formatCPF(value);
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (

        <div className='geral-circle'>

            <div className='tela-um'>
                <div className="checkout-container">
                    <div className="content-container">
                        <div className="customer-info card">
                            <h2>Informações do Cliente</h2>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome completo"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="cpf"
                                placeholder="CPF"
                                maxlength="14"
                                value={formData.cpf}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Celular / WhatsApp"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                              <div className="finalize-payment">
                                 <button className="finalize-button">Finalizar Pagamento</button>
                             </div>
                        </div>

                    <div className='tela-dois'>
                        <div className="order-summary card">
                            <h2>Resumo do Pedido</h2>
                            <p>Produto: Nike Dunk High Retro</p>
                            <p>Subtotal: R$ 149,00</p>
                            <p>Frete: R$ 11,76</p>
                            <h3>Total: R$ 160,76</h3>
                        </div>
                    </div>
            </div>

                </div>
            </div>

        </div>
    );
};

export default Checkout;
