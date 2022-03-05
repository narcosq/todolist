import React from 'react';
import {InputGroup,FormControl,Button} from "react-bootstrap";
import {v4 as uuidv4} from 'uuid'

const FormBlock = ({tasks,setTasks,change,setChange}) => {
    const toDate = (date) => {
        return new Intl.DateTimeFormat('en-En', {
            day:'2-digit',
            month:'short',

        }).format(new Date(date))
    };
    const addTask2 = (e) =>{
        if(e.key === 'Enter' && change.trim().length){
            setTasks([...tasks,
                {
                    id: uuidv4(),
                    title: change,
                    date: `${toDate(new Date())}`,
                    priority: 'none',
                    success: false,
                    pending: true,
                    tags: [],
                    description: ''


                }]);
            setChange('')
        }
    };

    const addTask = () =>{

        if(change.trim().length ) {
            setTasks([...tasks,
                {
                    id: uuidv4(),
                    title: change,
                    date: `${toDate(new Date())}`,
                    priority: 'none',
                    success: false,
                    pending: true,
                    tags: [],
                    description: ''


                }]);
            setChange('')

        }
    };
    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    onKeyPress={addTask2}
                    placeholder="Enter new Todo"
                    aria-label="Enter new Todo"
                    aria-describedby="basic-addon2"
                    value={change}
                    onChange={ (e) => setChange(e.target.value)}


                />
                <Button variant="outline-secondary" id="button-addon2"  onClick={() => addTask()}>
                    Button
                </Button>
            </InputGroup>
        </>
    );
};

export default FormBlock;