import Form from './Form';

const backUrl = 'http://localhost:8080';

const refreshTable = (callback, modalCallback) => {
    callback([]);
    let rows = [];

    fetch(`${backUrl}/alunos?order=`)
        .then(response => response.json())
        .then(data => {
                    
            data.forEach((student, index) => {
                let row = 
                    <div className="row" key={index}>
                        <div className="cell">{student.matricula}</div>
                        <div className="cell">{student.nome}</div>
                        <div className="cell">{student.curso}</div>
                        <div className="cell">
                            <a href="#">apagar</a>
                            <a href="#" onClick={e => toggleModal('open', 'see-more', student.matricula, modalCallback)}>ver mais</a>
                        </div>
                    </div>
                        
                rows.push(row);
            });
        }).finally(() => {
            callback(oldTable => [...oldTable, rows]);
        })
            
    
}

const searchStudent = (name, course, callback, order, modalCallback) => {
    fetch(`${backUrl}/alunos?name=${name}&course=${course}&order=${order}`)
        .then(response => response.json())
        .then(data => {       
            refreshTable(data, callback, modalCallback);
        });
}

const handleOrder = (name, course, order, setOrder, setTable, modalCallback) => {
    setOrder(order);
    searchStudent(name, course, setTable, order, modalCallback);
}

const toggleModal = (action, type, id, callback, tableCallback) => {
    if(action === 'open'){
        if(type === 'see-more'){
            fetch(`${backUrl}/alunos/full/${id}`)
                .then(response => response.json())
                .then(data => { 
                    callback(<Form type={type} data={data} callback={callback}></Form>)     
                });
        }
        if(type === 'add-new'){
            fetch(`${backUrl}/cursos`)
                .then(response => response.json())
                .then(data => { 
                    callback(<Form type={type} data={data} callback={callback} tableCallback={tableCallback}></Form>)     
                });
        }
    }
    else{
        callback([]);
    }
}

export {backUrl, refreshTable, searchStudent, handleOrder, toggleModal}