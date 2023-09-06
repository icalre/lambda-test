export const createCardAdapter = (data: any) => ( {
    id:data.id,
    email: data.email,
    card_number:data.card_number,
    cvv:'***',
    expiration_year:data.expiration_year,
    expiration_month:data.expiration_month
});
