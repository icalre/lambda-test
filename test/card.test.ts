import * as jestPlugin from 'serverless-jest-plugin';
import * as getCardMod from '../src/route/cardToken';
import * as registerCardMod from '../src/route/registerCard';
import {getConfig} from "../src/utilities";

const card_test = {
    email: "jronaldcll@gmail.com",
    card_number: "4111111111111111",
    cvv: "123",
    expiration_year: "2025",
    expiration_month: "09"
};

describe('Api Test', () => {
    const wrappedRegisterCard = jestPlugin.lambdaWrapper.wrap(registerCardMod, {handler: 'handler'});
    const wrappedGetCard = jestPlugin.lambdaWrapper.wrap(getCardMod, {handler: 'handler'});

    let auth_token: string = getConfig("SECRET");
    let card_token: string = '';

    it('Validate Card Number', () => {
        return wrappedRegisterCard.run({
            headers: {
                contentType: 'application/json',
                authorization: 'Bearer ' + auth_token,
                accept: '*/*',
            },
            body: {... card_test, card_token: '411111111111111'}
        }).then((response: any) => {
            const _data = JSON.parse(response.body);
            card_token = _data.token;
            expect(_data.success).toEqual(false);
        });
    });

    it('Validate CVV', () => {
        return wrappedRegisterCard.run({
            headers: {
                contentType: 'application/json',
                authorization: 'Bearer ' + auth_token,
                accept: '*/*',
            },
            body: {... card_test, cvv: '12'}
        }).then((response: any) => {
            const _data = JSON.parse(response.body);
            card_token = _data.token;
            expect(_data.success).toEqual(false);
        });
    });

    it('Validate Email', () => {
        return wrappedRegisterCard.run({
            headers: {
                contentType: 'application/json',
                authorization: 'Bearer ' + auth_token,
                accept: '*/*',
            },
            body: {... card_test, email: 'prueba@test.com'}
        }).then((response: any) => {
            const _data = JSON.parse(response.body);
            card_token = _data.token;
            expect(_data.success).toEqual(false);
        });
    });

    it('Validate Month', () => {
        return wrappedRegisterCard.run({
            headers: {
                contentType: 'application/json',
                authorization: 'Bearer ' + auth_token,
                accept: '*/*',
            },
            body: {... card_test, expiration_month: '14'}
        }).then((response: any) => {
            const _data = JSON.parse(response.body);
            card_token = _data.token;
            expect(_data.success).toEqual(false);
        });
    });

    it('Validate Year', () => {
        return wrappedRegisterCard.run({
            headers: {
                contentType: 'application/json',
                authorization: 'Bearer ' + auth_token,
                accept: '*/*',
            },
            body: {... card_test, expiration_year: '2021'}
        }).then((response: any) => {
            const _data = JSON.parse(response.body);
            card_token = _data.token;
            expect(_data.success).toEqual(false);
        });
    });


    it('Generate Card Token', () => {
        return wrappedRegisterCard.run({
            headers: {
                contentType: 'application/json',
                authorization: 'Bearer ' + auth_token,
                accept: '*/*',
            },
            body: card_test
        }).then((response: any) => {
            const _data = JSON.parse(response.body);
            card_token = _data.token;
            expect(_data.success).toEqual(true);
        });
    });

    it('Validate Card Token', () => {
        return wrappedGetCard.run({
            headers: {
                contentType: 'application/json',
                authorization: 'Bearer ' + auth_token,
                accept: '*/*',
            },
            queryStringParameters: {
                token: card_token
            }
        }).then((response: any) => {
            const _data = JSON.parse(response.body);
            expect(_data.success).toEqual(true);
        });
    });
});
