// NOTE: based on Material-UI Theme Typography API
// NOTE: unicode-range is set to WAREHOUSE letters only

const montserratSubrayada = {
  fontFamily: 'Montserrat Subrayada',
  fontStyle: 'normal',
  fontDisplay: 'block',
  fontWeight: 700,
  src: `
    local('MontserratSubrayada-Bold'),
    url(fonts/montserrat-subrayada-v9-latin-700.woff2) format('woff2'),
    url(fonts/montserrat-subrayada-v9-latin-700.woff) format('woff')
  `,
  unicodeRange:
    'U+0057, U+0041, U+0052, U+0045, U+0048, U+004F, U+0055, U+0053',
}

export default montserratSubrayada
