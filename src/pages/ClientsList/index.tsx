import React, { useState, useEffect } from 'react';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import ClientItem, { Client } from '../../components/ClientItem';
import Input from '../../components/Input';
import Api, { FormData } from '../../services/api';
import Pagination from '../../components/Pagination';


function ClientList(){

    const [clientsTotal, setClientsTotal] = useState<FormData[]>([]); //all clients

    const [clientsPage, setClientsPage] = useState<FormData[]>([]); //clients at the page

    const [filter, setFilter] = useState('');

    const [current, setCurrent] = useState(1); //page

    const paginate = (pageNumber: number) => setCurrent(pageNumber); //to set the current page when click on pagination

    const handleDelete = (cpf: string) => {
        const api = new Api();
        const restant = api.delete(cpf);

        restant && setClientsTotal(restant);
    }

    useEffect(() => {
        const api = new Api();
        const cli = api.get(filter);

        cli && setClientsTotal(cli);
    }, [filter]);

    useEffect(() => {
        setClientsPage(clientsTotal.slice((current - 1) * 10 , current * 10)) //to get the clients of the correct page
    }, [current, clientsTotal])
   
    return(
        <div id="page-client-list" className="container">
            <PageHeader title="Lista de Clientes">
                <form id="search-term" >
                    <Input 
                        name="filter" 
                        label="Filtro" 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)} 
                    />
                </form>
            </PageHeader>

            <Pagination 
                postsPerPage={10}
                totalPosts={clientsTotal.length}  
                paginate={paginate}
                current={current}
            />

            <main>
                {clientsPage.map((client: Client) => {
                    return(
                        <ClientItem key={client.cpf} client={client} remove={handleDelete} />
                    )})
                }
                
            </main>
        </div>
    )
}
export default ClientList