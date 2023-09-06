export enum CARD_EXCEPTION_CODE {
  SUCCESS = 100,
  UNSPECIFIED_ERROR = 101,
  INVALID_DATA = 102,
  CARD_NUMBER_ERROR = 103,
  CVV_AMEX_ERROR = 104,
  CVV_VISA_MASTERCARD_ERROR = 105,
  EMAIL_ERROR = 106,
  INTERNAL_SERVER_ERROR = 107,
  EXPIRATION_YEAR_ERROR = 108,
  EXPIRATION_MONTH_ERROR = 109,
  ERROR_PROCESS_REQUEST = 111,
  TOKEN_EXPIRED_ERROR = 119
}

export enum CARD_EXCEPTION_MESSAGE {
  SUCCESS = 'Solicitud exitosa',
  UNSPECIFIED_ERROR = 'Error no especificado. Intente nuevamente.',
  INVALID_DATA = 'Datos inválidos',
  CARD_NUMBER_ERROR = 'Número de tarjeta inválido',
  CVV_AMEX_ERROR = 'Amex solo soporta 4 digitos en su "cvv"',
  CVV_VISA_MASTERCARD_ERROR = 'Visa / Mastercard solo soporta 3 digitos en su "cvv"',
  EMAIL_ERROR = 'El correo no cuenta con los criterios requeridos',
  INTERNAL_SERVER_ERROR = 'Error en solicitud de pin',
  EXPIRATION_YEAR_ERROR = 'El año de caducidad de la tarjeta, no puede exceder los 5 años desde el año actual',
  EXPIRATION_MONTH_ERROR = 'Debe ingresar un mes válido',
  ERROR_PROCESS_REQUEST = 'Error procesando la solicitud',
  TOKEN_EXPIRED_ERROR = 'Token expirado, ha superado los 15 min de retención'
}
