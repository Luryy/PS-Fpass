interface FormData {
        name: string;
        born: string;
        cpf: string;
        number: string;
        mail: string;
        adress: string;
        obs: string;
}

class Api{

    get(){

        const clients = window.localStorage.getItem('client');

        if(clients){
            const clientsParsed = JSON.parse(clients);
        }

    }

    post(route: string, content: FormData){
        return new Promise((resolve, reject) => {

            try{
                const clientsArray: FormData[] = [];

                const clients = localStorage.getItem(route);

                clients && JSON.parse(clients).forEach((client: typeof content) => clientsArray.push(client)); // if have clients, add all clients to array
                
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
    }

}

export default Api;
