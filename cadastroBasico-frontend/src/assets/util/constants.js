import { addLocale } from 'primereact/api';
import React from 'react';
import { Dropdown } from 'primereact/dropdown';

export const localePT = locale => {
    if (locale === 'pt') {
        addLocale('pt', {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
            dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
            today: 'Hoje',
            clear: 'Claro'
        })
    }
    return locale
}

export const codeResponseHttp = {
    CODE_SUCCESS: 200,
    CODE_CREATED: 201,
    CODE_BAD_REQUEST: 400,
    CODE_INVALID_TOKEN: 401,
    CODE_FORBIDDEN: 403,
    CODE_NOT_FOUND: 404,
    CODE_WRONG_LOGIN: 405,
    CODE_REGISTERED_USER: 406,
    CODE_REGISTERED_EMAIL: 407,
    CODE_OBJECT_ALREADY_EXISTS: 408,
    CODE_OBJECT_NOT_FOUND: 409,
    CODE_UNKNOW_ERROR: 500,
    CODE_UNAVALIABLE_SERVICE: 503,
};

export const LOADING = {
    text: "Buscando dados. Aguarde...",
    textColor: "#FFFFFF",
    spinnerColor: "#FFFFFF",
    bgColor: "rgba(0,0,0,0.5)",
};

export const cpfMask = value => {
    if (!value) {
        return null
    }
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const telefoneMask = value => {
    let telefone;
    if (!value) {
        return null
    } else

        if (value.length === 8) {
            const parte1 = value.slice(0, 4);
            const parte2 = value.slice(4, 8);
            telefone = `${parte1}-${parte2}`;

        } else if (value.length === 9) {
            const parte1 = value.slice(0, 5);
            const parte2 = value.slice(5, 9);
            telefone = `${parte1}-${parte2}`;

        } else if (value.length === 10) {
            const parte1 = value.slice(0, 2);
            const parte2 = value.slice(2, 6);
            const parte3 = value.slice(6, 10);
            telefone = `(${parte1}) ${parte2}-${parte3}`;

        } else if (value.length === 11) {
            const parte1 = value.slice(0, 2);
            const parte2 = value.slice(2, 7);
            const parte3 = value.slice(7, 11);
            telefone = `(${parte1}) ${parte2}-${parte3}`;

        }

    return value.replace(value, telefone);

}


export const monthNavigatorTemplate = (e) => {
    return (
        <Dropdown 
            value={e.value} 
            options={e.options} 
            onChange={(event) => e.onChange(event.originalEvent, event.value)} 
            filter 
            style={{ lineHeight: 1 }} 
        />
    );
}

export const yearNavigatorTemplate = (e) => {
    return (
        <Dropdown 
            value={e.value} 
            options={e.options}
            onChange={(event) => e.onChange(event.originalEvent, event.value)} 
            filter 
            className="p-ml-2" 
            style={{ lineHeight: 1 }} 
        />
    );
}