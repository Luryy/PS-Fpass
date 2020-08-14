import React from 'react';
import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import mailIcon from '../../assets/images/icons/mail.svg';

export interface Client{ 
    name: string;
    born: string;
    cpf: string;
    number: string;
    mail: string;
    adress: string;
    obs?: string; 
}

interface ClientItemProps{
    client: Client,
    remove: Function
}

const ClientItem: React.FC<ClientItemProps> = ({ client, remove }) => {

    return(
        <article className="client-item">
                <header>
                    <div>
                        <strong>
                            {client.name}
                        </strong>
                        <div className="info">
                            <span>CPF: {client.cpf}</span>
                            <span>Nascimento: {client.born}</span>
                        </div>
                    </div>
                    <button onClick={() => remove(client.cpf)}> Excluir </button>
                </header>
                <p>
                    Endereço: {client.adress}
                </p>
                {client.obs && 
                <p> Observação: {client.obs}</p>
                }
                <footer>
                    <a className="mail" target="_blank"  rel="noopener noreferrer" href={`mailto:${client.mail}`}>
                        <img src={mailIcon} alt="Mail Icon"/>
                        Contato
                    </a>

                    <a className="number" target="_blank"  rel="noopener noreferrer" href={`https://wa.me/+55${(client.number).replace(/[\s-())]/g, '')}`}> {/* regex to remove the mask and link correctly to whatsapp */}
                        <img src={whatsappIcon} alt="WhatsApp Icon"/>
                        Contato
                    </a>
                </footer>
            </article>
    )
}
export default ClientItem;