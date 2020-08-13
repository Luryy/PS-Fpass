import { removeCpfMask } from "./masks";

function validate(validate: string, regex: RegExp){
    const test = regex;
    const verify = test.test(validate);

    return verify
}

function TestCPF(strCPF: string) { //function from internet
    var Soma;
    var Resto;
    Soma = 0;
  
  strCPF = removeCpfMask(strCPF);
  
  if (strCPF === "00000000000") return false;

  for (let i: number=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (let i: number = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11))  Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export function validatename(name: string){
    const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/i;
    return validate(name, regex);
}

export function validateborn(born: string){
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/i; 
    return validate(born, regex);
}

export function validatecpf(cpf: string){
    const regex = /\d{3}[-.]?\d{3}[.-]?\d{3}[.-]?\d{2}/i  
    const test1 = validate(cpf, regex);
    const test2 = TestCPF(cpf);

    return (test1 && test2); // to be valid, both should be true
}

export function validatenumber(number: string){
    const regex = /^\(\d{2}\) 9\d{4}-\d{4}$/i ; 
    return validate(number, regex);
}

export function validatemail(mail: string){
    const regex = /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/i //regex to validate emails more precise; 
    return validate(mail, regex);
}

export function validateadress(adress: string){

    return (adress.length > 0); //just validate if isn't empty
}

export function validateobs(obs: string){
    return (obs.length <= 300); //just validate if hava less than 300 characters
}