import React, {useState} from 'react';
import styles from './listBlock.module.css'

import ListItem from "./ListItem";


const ListBlock = ({setModalShowObj,tasks,setTasks,status,setModalShow,setCheckTags}) => {
    const {list,item,itemLeft,itemRight,priority,priorityCircle,action,date,dateIcon,actionDelete} = styles;
const [isTagOpen,setIsTagOpen] = useState(false);
  const delTask = (id) =>{
    setTasks(tasks.filter((elem)=>{
        return id !== elem.id
    }))
  };
   const successHandler = (id) =>{
       setTasks(tasks.map((el)=>{
           if (el.id === id){
               return {...el, success: !el.success , pending :!el.pending}
           }else return el
       }))
   };
    return (
        <ul className={list}>
            {tasks.filter((el)=>{
                if (status === 'Pending'){
                    return  el.pending
                }else if (status === 'Success'){
                    return el.success
                }else  {
                return el}
            }).map((task)=>(
<ListItem  successHandler={successHandler} delTask={delTask} priority={priority} task={task} setModalShow={setModalShow} setModalShowObj={setModalShowObj} setCheckTags={setCheckTags} priorityCircle={priorityCircle} actionDelete={actionDelete} item={item} date={date} dateIcon={dateIcon} action={action} itemRight={itemRight} itemLeft={itemLeft} setIsTagOpen={setIsTagOpen} isTagOpen={isTagOpen}/>
              ))}

        </ul>
    );
};

export default ListBlock;