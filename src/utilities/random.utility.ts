import { generate } from 'randomstring';
export const generateRandomData = () =>{
    const now = new Date();
    const serialNumber: string = generate({
        length: 16,
        charset: ['alphanumeric', now.getTime()]
    });

    return serialNumber;
}
