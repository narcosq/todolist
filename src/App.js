import React, {useEffect, useState} from 'react';
import axios from "axios";
import './style.css'
import StatusBlock from "./components/StatusBlock/statusBlock";
import FormBlock from "./components/FormBLock/formBlock";
import ListBlock from "./components/ListBlock/listBlock";
import {MdDelete} from "react-icons/md";

    import Register from "./components/Register/register";

const App = () => {


    const [change,setChange] = useState('');
    const [tasks,setTasks] = useState([

    ]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status,setStatus] = useState('Total');
    const [isLogged,setIsLogged] = useState(false);
    const [users,setUsers] = useState([]);
    const leaveAccount=(()=>{
        localStorage.removeItem('userData');
        setIsLogged(false);
    });

    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    const userID = storedUserData ? storedUserData.userID : null;
    useEffect(() => {


        if (storedUserData) {
            setUsername(storedUserData.username);
            setPassword(storedUserData.password);
            setIsLogged(true);
        }
    }, [setIsLogged]);

    useEffect(() => {

        if (storedUserData) {
            setUsername(storedUserData.username);
            setPassword(storedUserData.password);
            setIsLogged(true);

            // Загрузка данных из userData в tasks, если они доступны

        }
    }, [setIsLogged]);
    useEffect(()=>{
        if(storedUserData){
            axios.get(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${storedUserData.userID}`)
                .then(data=>{
                    console.log(data.data)
                    if (data.data.array) {
                        setTasks(data.data.array);
                    }
                })
        }

    },[]);
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks]);
    useEffect(()=>{
        axios('https://656d9753bcc5618d3c237d07.mockapi.io/user')
            .then(({data})=>{
                return setUsers(data)
            })
    },[]);
    useEffect(()=>{
        setTasks(JSON.parse(localStorage.getItem('tasks')) === null? tasks : JSON.parse(localStorage.getItem('tasks')))
    },[]);



  return (
      <div className='App'>
          <div className="container">
              {isLogged?
                  <div className='App__content'>
                      <div className="App__content-top">
                          <h1 className='App__title'>TODO-LIST</h1>
                          <div className="App__content-right">
                              <p className="App__content-title">{username}</p>
                              <button className="App__content-btn" onClick={leaveAccount}>Leave</button>
                          </div>

                      </div>
                      <StatusBlock userID={userID} status={status} setStatus={setStatus} tasks={tasks}/>
                      <FormBlock  userID={userID} change={change} setChange={setChange} tasks={tasks} setTasks={setTasks}/>
                      {
                          tasks.length === 0 && status === 'Total' ? <p>Список задач пуст</p>:
                              tasks.filter(el=>el.pending).length === 0 && status === 'Pending' ? <p>Список ожидающих задач пуст</p>:
                                  tasks.filter(el=>el.success).length === 0 && status === 'Success' ? <p>Список выполненных задач пуст</p>:
                                      <><ListBlock userID={userID}  status={status} tasks={tasks} setTasks={setTasks}/>

                                          <p className='App__clear' onClick={() =>{
                                              axios.put(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${storedUserData.userID}`,{array:[]});
                                              setTasks([])
                                          }
                                          }>Clear All
                                              <MdDelete/></p></>
                      }


                  </div>:
                  <Register userID={userID} users={users} setUsers={setUsers} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setIsLogged={setIsLogged}/>

              }


          </div>

      </div>
  );
};

export default App;
