import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import registerIcon from '../../assets/images/icons/register.svg';
import pasteIcon from '../../assets/images/icons/paste.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import Api from '../../services/api'

function Landing(){

    const [totalClients, setTotalClients] = useState(0);

    useEffect(() => {
        const api = new Api();
        const total = api.getTotal();
        setTotalClients(total);
    }, [])

    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de cadastro de clientes.</h2>
                </div>

                <img src={landingImg} alt="plataforma de estudos" className="hero-img"/>

                <div className="buttons-container">
                    <Link to="/form" className="study">
                        <img src={registerIcon} alt="Estudar"/>
                        Cadastrar
                    </Link>

                    <Link to="/list" className="give-classes">
                        <img src={pasteIcon} alt="Dar Aulas" />
                        Listar
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalClients} clientes cadastrados
                    <img src={purpleHeartIcon} alt="Coração Roxo"/>
                </span>
            </div>
        </div>
    )
}

export default Landing;