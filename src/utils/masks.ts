export function cpfMask(cpf: string) {
    return cpf
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export function removeCpfMask(cpf: string) {
    return cpf
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '$1$2$3$4')
}

export function numberMask(number: string) {
    return number
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/^(\d)(\d)/, '($1$2)') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\(\d{2}\))(\d)/, '$1 $2')
      .replace(/(\(\d{2}\) \d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export function bornMask(born: string) {
    return born
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/^(\d{2})(\d)/, '$1/$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
      .replace(/(\/\d{4})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}