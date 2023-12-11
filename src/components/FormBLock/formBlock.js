import React from 'react';
import {InputGroup,FormControl,Button} from "react-bootstrap";
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const FormBlock = ({userID, tasks,setTasks,change,setChange}) => {
    const toDate = (date) => {
        return new Intl.DateTimeFormat('en-En', {
            day:'2-digit',
            month:'short',

        }).format(new Date(date))
    };







    const addTask = async () => {
        if (change.trim().length) {
            const newTask = {
                id: uuidv4(),
                title: change,
                date: `${toDate(new Date())}`,
                priority: 'none',
                success: false,
                pending: true,
                tags: [],
                description: ''
            };

            try {
                const response = await axios.get(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${userID}`);
                let userData = response.data;

                if (!userData.array) {
                    userData.array = [];
                }

                userData.array.push(newTask);

                await axios.put(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${userID}`, { array: userData.array });

                setTasks([...tasks, newTask]);
                setChange('');
                console.log('Задача успешно добавлена:', newTask);
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
            }
        }
    };

    const addTask2 = async (e) => {
        if (e.key === 'Enter' && change.trim().length) {
            const newTask = {
                id: uuidv4(),
                title: change,
                date: `${toDate(new Date())}`,
                priority: 'none',
                success: false,
                pending: true,
                tags: [],
                description: ''
            };

            try {
                const response = await axios.get(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${userID}`);
                let userData = response.data;

                if (!userData.array) {
                    userData.array = [];
                }

                userData.array.push(newTask);

                await axios.put(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${userID}`, { array: userData.array });

                setTasks([...tasks, newTask]);
                setChange('');
                console.log('Задача успешно добавлена:', newTask);
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
            }
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