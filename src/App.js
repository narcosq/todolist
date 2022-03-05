import React, {useEffect, useState} from 'react';
import './style.css'
import StatusBlock from "./components/StatusBlock/statusBlock";
import FormBlock from "./components/FormBLock/formBlock";
import ListBlock from "./components/ListBlock/listBlock";
import {MdDelete} from "react-icons/md";
import MyVerticallyCenteredModal from './components/Popup/popup'

const App = () => {
    const [modalShow, setModalShow] =useState(false);
    const [isTitleChange,setIsTitleChange] = useState(false);
    const [isDescription,setIsDescription] = useState(false);
    const [checkTags,setCheckTags] = useState([]);

    const [action,setAction] = useState('');
    const [modalShowObj,setModalShowObj] = useState({
        success:null,
        pending:null,
        date:null,
        title:'',
        description : '',
        priority: '',
        tags : [],
        id: null
    });
    const [change,setChange] = useState('');
    const [tasks,setTasks] = useState([
        {
        id:1,
        title: 'Сходить в кино',
        date : 'jule',
        priority : 'Medium',
        success : true,
        pending : false,
        tags : ['Home'],
        description : ''
    }
    ]);
    const [status,setStatus] = useState('Total');

    useEffect(()=>{
        setTasks(JSON.parse(localStorage.getItem('tasks')))
    },[]);
    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks]);



  return (
      <div className='App'>
          <div className="container">
              <div className='App__content'>
                  <h1 className='App__title'>TODO-LIST</h1>
                  <StatusBlock status={status} setStatus={setStatus} tasks={tasks}/>
                  <FormBlock change={change} setChange={setChange} tasks={tasks} setTasks={setTasks}/>
                  {
                      tasks.length === 0 && status === 'Total' ? <p>Список задач пуст</p>:
                          tasks.filter(el=>el.pending).length === 0 && status === 'Pending' ? <p>Список ожидающих задач пуст</p>:
                              tasks.filter(el=>el.success).length === 0 && status === 'Success' ? <p>Список выполненных задач пуст</p>:
                                  <><ListBlock setCheckTags={setCheckTags} setModalShowObj={setModalShowObj}  setModalShow={setModalShow} status={status} tasks={tasks} setTasks={setTasks}/>

                                      <p className='App__clear' onClick={() =>setTasks([])}>Clear All
                                          <MdDelete/></p></>
                  }


              </div>
          </div>
          <MyVerticallyCenteredModal
              setIsTitleChange={setIsTitleChange}
              isTitleChange={isTitleChange}
              isDescription={isDescription}
              setIsDescription={setIsDescription}
              setTasks={setTasks}
              tasks={tasks}
              setobj={setModalShowObj}
              obj={modalShowObj}
              show={modalShow}
              action={action}
              setAction={setAction}
              checkTags={checkTags}
              setCheckTags={setCheckTags}
              onHide={() => {
                  setIsDescription(false);
                  setIsTitleChange(false);
                  setModalShow(false);
                  setAction('')
              }}
          />
      </div>
  );
};

export default App;
