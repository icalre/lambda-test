import { EntitySchema} from "typeorm";


export const CardSchema = new EntitySchema({
    name: "cards",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        email: {
            type: String,
        },
        card_number: {
            type: String,
        },
        cvv: {
            type: String,
        },
        expiration_year: {
            type: String,
        },
        expiration_month: {
            type: String,
        },
    },
});

