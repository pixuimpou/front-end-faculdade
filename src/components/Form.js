import {toggleModal, backUrl, refreshTable} from './util';
import {useState} from 'react';

const Form = (props) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [course, setCourse] = useState('');
    
    const submitForm = (e) => {
        e.preventDefault()
        fetch(`${backUrl}/alunos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome: name , cpf, id_curso: course})
        })
        .then(() => {
            refreshTable(props.tableCallback, props.callback)
            toggleModal('close', undefined, undefined, props.callback)
        })
    }

    if(props.type === 'see-more'){
        const data = props.data[0];
        return(
            <div className="modal">
                <div className="modal-content">
                    <h2>Informações</h2>
                    <p className="modal-item">Matricula: {data.matricula}</p>
                    <p className="modal-item">Nome: {data.nome}</p>
                    <p className="modal-item">CPF: {data.cpf}</p>
                    <p className="modal-item">Curso: {data.curso}</p>
                    <button className="btn" onClick={e => toggleModal('close', undefined, undefined, props.callback)}>Fechar</button>
                </div>
            </div>
        )
    }
    if(props.type === 'add-new'){
           
        let courseOptions = []

        props.data.forEach(course => {
            let option =
                <option value={course.id_curso}>{course.curso}</option>
            courseOptions.push(option)
        })

        return(
            <>
                <div className="modal">
                    <div className="modal-content">
                        <form className="modal-form" onSubmit={e => submitForm(e)}>
                            <div className="modal-item">
                                <label htmlFor="name">Nome</label>
                                <input type="text" name="name" id="name" required onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="modal-item">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" name="cpf" id="cpf" required onChange={e => setCpf(e.target.value)}/>
                            </div>
                            <div className="modal-item select">
                                <label htmlFor="course">Curso</label>
                                <select name="course" id="course" onChange={e => setCourse(e.target.value)}>
                                    <option>Selecione</option>
                                    {courseOptions}
                                </select>
                            </div> 
                            <button className="btn" onClick={e => toggleModal('close', undefined, undefined, props.callback)}>Fechar</button>
                            <button className="btn">Enviar</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
    
}

export default Form;