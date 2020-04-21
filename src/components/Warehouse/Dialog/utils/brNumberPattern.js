// A-Z | a-z | vogais acentuadas caixa-alta e caixa-baixa
// const nameRegex = /([\u0041-\u005A\u0061-\u007A\u00C0-\u00FF])+/gu
// ao menos um numero | pode ter ponto para dividir centenas | pode ter virgula para dividir decimal
// const numberRegex = /^\d+(?:\.\d{3})*(?:,\d{1,2})?$/

const BR_NUMBER_PATTERN = '\\d+(?:\\.\\d{3})*(?:,\\d{1,2})?'

export default BR_NUMBER_PATTERN
