import {useState, useEffect} from 'react';
import {backUrl, refreshTable, searchStudent, handleOrder, toggleModal} from './util';

const MainPage = () => {

    const [table, setTable] = useState([]);
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [order, setOrder] = useState('');
    const [modal, setModal] = useState();

    useEffect(() => {
        // fetch(`${backUrl}/alunos?order=`)
        // .then(response => response.json())
        // .then(data => {
            refreshTable(setTable, setModal);
        // });
    }, []);

    return (
        <>
            {modal}
            <div className="filter">
                <label htmlFor="name" className="filter-item">Nome</label>
                <input type="text" name="name" id="name" className="filter-item" onChange={e => setName(e.target.value.replace(/[ ]/g, '+'))}/>
                <label htmlFor="course" className="filter-item">Curso</label>
                <input type="text" name="course" id="course" className="filter-item" onChange={e => setCourse(e.target.value.replace(/[ ]/g, '+'))}/>
                <div className="btn filter-item" onClick={e => searchStudent(name, course, setTable, order, setModal)}>Pesquisar</div>
                <select name="order" id="order" onChange={e => handleOrder(name, course, e.target.value, setOrder, setTable)}>
                    <option value="">Ordenar</option>
                    <option value="id-asc">Matricula Crescente</option>
                    <option value="id-desc">Matricula Decrescente</option>
                    <option value="name-asc">Nome Crescente</option>
                    <option value="name-desc">Nome Decrescente</option>
                    <option value="curso-asc">Curso Crescente</option>
                    <option value="curso-desc">Curso Decrescente</option>
                </select>
            </div>
            <button onClick={e => toggleModal('open', 'add-new', undefined, setModal, setTable)}>Novo Aluno</button>
            <div className="scroll">
                <div className="container">
                    <div className="row">
                        <div className="cell title">Matricula</div>
                        <div className="cell title">Nome</div>
                        <div className="cell title">Curso</div>
                        <div className="cell"></div>
                    </div>
                    {table}
                </div>
            </div>
        </>
        
    )
}

export default MainPage;