export interface FormData {
        name: string;
        born: string;
        cpf: string;
        number: string;
        mail: string;
        adress: string;
        obs: string;
}

class Api{

    get(filter: string){

        const clients = localStorage.getItem('client');

        if(clients){
            var regexFilter = new RegExp(filter, "i");
            const clientsParsed: FormData[] = JSON.parse(clients);
            return clientsParsed.filter((client: FormData)=> regexFilter.test(client.name)) //just returns the clients whose match on the filter
        }

        return null

    }

    getTotal(){ // return total of clients
        const clients = localStorage.getItem('client');
        const clientsTotal = clients ? JSON.parse(clients) : [];

        return clientsTotal.length
    }

    post(route: string, content: FormData){
        return new Promise((resolve, reject) => {

            try{
                const clientsArray: FormData[] = [];

                const clients = localStorage.getItem(route);

                clients && JSON.parse(clients).forEach((client: FormData) => clientsArray.push(client)); // if have clients, add all clients to array
                
                if(clientsArray.find(element => element.cpf === content.cpf)){ //verify if the user have already been submitted
                    throw new Error('Usuario existente');
                }

                clientsArray.push(content);

                localStorage.setItem(route, JSON.stringify(clientsArray));
                resolve('Cadastro realizado com sucesso');

            }catch(err){
                
                reject(err);
            }
        });
    };

    delete(cpf: string){
        const clients = localStorage.getItem('client');

        const clientsArray: FormData[] = [];

        clients && JSON.parse(clients)
            .filter((client: FormData) => client.cpf !== cpf) //remove the client
            .forEach((client: FormData) => clientsArray.push(client)); //push all clients, but the remove

        localStorage.setItem('client', JSON.stringify(clientsArray));

        return clientsArray
    }

}

export default Api;
