import React, {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';

import './styles.css';

import { validatename, validateborn, validatecpf, validatenumber, validatemail, validateadress, validateobs } from '../../utils/validation';
import { cpfMask, numberMask, bornMask } from '../../utils/masks';
import Api from '../../services/api';

function ClientForm(){
   const history = useHistory();

   const formMask: {[key: string]: Function} = { //obj with the functions to mask the fields
        born: bornMask, 
        cpf: cpfMask, 
        number: numberMask, 
    }

    const formFunctions: {[key: string]: Function} = { //obj with the functions to validate the fields
        name: validatename,
        born: validateborn, 
        cpf: validatecpf, 
        number: validatenumber, 
        mail: validatemail,
        adress: validateadress,
        obs: validateobs,
    }

   const [formData, setFormData] = useState({
        name: '',
        born: '', 
        cpf: '', 
        number: '', 
        mail: '',
        adress: '',
        obs: ''
   })

   const [formValidation, setFormValidation] = useState({ // obj with the state of validation true-- invalid false --valid (starts false to dont appears the error mensage when open the forms, but you cant submit because the fields are empty)
        name: false,
        born: false, 
        cpf: false, 
        number: false, 
        mail: false,
        adress: false,
        obs: false
    })

    const [buttonDisable, setButtonDisable] = useState(true);

    useEffect(() => { // useEffect to able/disable the submit button based on the validations
        if ((formData.name && formData.born && formData.cpf && formData.number && formData.mail && formData.adress) // verify if all (exept obs) isn't empty
         && (!formValidation.name && !formValidation.born && !formValidation.cpf && !formValidation.number && !formValidation.mail && !formValidation.adress && !formValidation.obs)){ //verify if all are valid (should be false)
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [formData, formValidation])

    function handleFormData(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        let {name, value} = event.target;

        if(Object.keys(formMask).includes(name)){ // to put masks
            const mask = formMask[name]
            value = mask(value)
        }

        setFormData({...formData, [name]:value});
        
        if(Object.keys(formValidation).includes(name)){ //verify only the fields inside formValidation
            const functionVerify = formFunctions[name]

            setFormValidation({...formValidation, [name]:!(functionVerify(value))})      
        }
    }

    function handleCreateClient(e: FormEvent){
        e.preventDefault();

        const api = new Api();

        api.post('client', formData )
          .then((sucess) => {
            alert(sucess);
            history.push('/');
            })
          .catch((err) => alert(err));

    }

    return(
        <div id="page-client-form" className="container">
            <PageHeader 
                title="Cadastro de Clientes"
                description="Cadastre seu cliente através do formulário abaixo"
            />

            <main>
                <form onSubmit={handleCreateClient}>
                    <fieldset>
                        <legend>Dados do Cliente</legend>
                        <Input 
                            name="name" 
                            label="Nome"
                            invalidate={formValidation.name}
                            textInvalidate="Caracteres especiais não são permitidos, somente letras com ou sem acento"
                            value={formData.name}
                            onChange={handleFormData} 
                        />
                        <Input 
                            name="born" 
                            label="Nascimento"
                            invalidate={formValidation.born}
                            textInvalidate="Data deve estar no formato dd/mm/aaaa"
                            value={formData.born}
                            onChange={handleFormData} 
                        />
                        <Input 
                            name="cpf" 
                            label="CPF"
                            invalidate={formValidation.cpf}
                            textInvalidate="CPF inválido"
                            value={formData.cpf}
                            onChange={handleFormData} 
                        />
                        <Input 
                            name="number" 
                            label="Número"
                            invalidate={formValidation.number}
                            textInvalidate="Número inválido"
                            value={formData.number}
                            onChange={handleFormData} 
                        />
                        <Input
                            name="mail" 
                            label="E-mail"
                            invalidate={formValidation.mail}
                            textInvalidate="E-mail inválido"
                            value={formData.mail}
                            onChange={handleFormData} 
                        />
                        <Input
                            name="adress" 
                            label="Endereço"
                            invalidate={formValidation.adress}
                            textInvalidate="Preencha esse campo"
                            value={formData.adress}
                            onChange={handleFormData} 
                        />
                        <TextArea 
                            name="obs" 
                            label="Observações"
                            invalidate={formValidation.obs}
                            textInvalidate="Máximo de 300 caracteres"
                            maxLength={300} // to not exceed 300 characters
                            value={formData.obs}
                            onChange={handleFormData} 
                        />

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante <br />
                            Preecha todos os dados
                        </p>
                        <button type="submit" disabled={buttonDisable}> {/* only submit the forms when the button is avaible*/}
                            Salvar Cadastro
                        </button>

                    </footer>
                </form>
            </main>
        </div>
    )
}
export default ClientForm;