exports.update = (table, values, fields, condition) => {
    let _dadosRequest = values;
 
    let _update = `UPDATE ${table} SET `;

    for (let i = 0; i < fields.length; i++) {
        let coluna = fields[i];

        if (_dadosRequest.hasOwnProperty(coluna)) {
            if (typeof _dadosRequest[coluna] === "string") {
                _update += `${coluna} = '${_dadosRequest[coluna]}',`;
            } else {
                _update += `${coluna} = ${_dadosRequest[coluna]},`; 
            }
        }       
    }
    
    if (condition) {
        _update += condition;
        _update = _update.replace(", WHERE", " WHERE");
    }

    return _update;
}

exports.insert = (table, values, fields) => {
    let _dadosRequest = values;

    let _insert = `INSERT INTO ${table} (`;

    for (let i = 0; i < fields.length; i++) {
        let coluna = fields[i];
        if (_dadosRequest.hasOwnProperty(coluna)) {
           _insert += coluna + ",";
        }
     }
     _insert += ")";
     _insert = _insert.replace(",)",") ");
     _insert += "VALUES (";
     for (let i = 0; i < fields.length; i++) {
        let valor = fields[i];
        if (_dadosRequest.hasOwnProperty(valor)) {
           if (typeof _dadosRequest[valor] === "string") {
              _insert += `'${_dadosRequest[valor]}',`;
           } else {
              _insert += `${_dadosRequest[valor]},`;
           }
        }
     }
     _insert += ")";
     _insert = _insert.replace(",)",") ");
     return _insert;
}