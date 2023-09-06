import {createResponseAdapter} from "./adapters";


export const handler = async (event: any) => {
    return createResponseAdapter(200,{success:true, message: 'Api test 1.0'})
};
