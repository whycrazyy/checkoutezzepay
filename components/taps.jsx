import React, { useState } from 'react';

const Checkout = () => {
    const [step, setStep] = useState(1); // Controle do passo atual
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        cpf: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    return (
        <div className="checkout-container">
            {step === 1 && (
                <div className="identificacao">
                    <h2>Identifique-se</h2>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="E-mail" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Nome completo" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="text" 
                        name="cpf" 
                        placeholder="CPF" 
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
                    <button onClick={handleNextStep}>Continuar</button>
                </div>
            )}
            {step === 2 && (
                <div className="pagamento">
                    <h2>Pagamento</h2>
                    <div className="payment-option">
                        <button onClick={handleNextStep}>PIX</button>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="finalizacao">
                    <h2>Finalize o pagamento</h2>
                    <p>Uma mensagem informativa sobre o pagamento via PIX será exibida aqui.</p>
                    <button>Finalizar e gerar QR Code</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
