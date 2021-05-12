const backUrl = 'http://localhost:8080';

const refreshTable = (data, callback) => {
    callback([]);
            let rows = [];
            data.forEach((student, index) => {
                let row = 
                    <div className="row" key={index}>
                        <div className="cell">{student.matricula}</div>
                        <div className="cell">{student.nome}</div>
                        <div className="cell">{student.curso}</div>
                        <div className="cell">
                            <a href="#">apagar</a>
                            <a href="#">ver mais</a>
                        </div>
                    </div>
                
                rows.push(row);
            });
            callback(oldTable => [...oldTable, rows]);
}

const searchStudent = (name, course, callback, order) => {
    fetch(`${backUrl}/alunos?name=${name}&course=${course}&order=${order}`)
        .then(response => response.json())
        .then(data => {       
            refreshTable(data, callback);
        });
}

const handleOrder = (name, course, order, setOrder, setTable) => {
    setOrder(order);
    searchStudent(name, course, setTable, order);
}

export {backUrl, refreshTable, searchStudent, handleOrder}