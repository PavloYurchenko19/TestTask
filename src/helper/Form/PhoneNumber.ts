export  function formatPhoneNumber(number: string): string {
  const digitsOnly = number?.replace(/\D/g, "");
  const numberWithOutCode =  digitsOnly.slice(2, digitsOnly.length);
  if (!digitsOnly) return ''

  const formattedNumber = `+38${numberWithOutCode.slice(0,3) ? ` (${numberWithOutCode.slice(0, 3)}` : ''}${numberWithOutCode.slice(3, 6) ? `) ${numberWithOutCode.slice(3, 6)}` : ''}${numberWithOutCode.slice(6, 8) ? `-${numberWithOutCode.slice(6, 8)}` : ''}${numberWithOutCode.slice(8, 10) ? `-${numberWithOutCode.slice(8, 10)}` : ''}`
  return formattedNumber;
}
