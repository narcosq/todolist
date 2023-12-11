import React, {useState} from 'react';
import styles from './listBlock.module.css'
import axios from "axios";

import ListItem from "./ListItem";



const ListBlock = ({userID,tasks,setTasks,status}) => {
    const {list,item,itemLeft,itemRight,action,date,dateIcon} = styles;
const [isTagOpen,setIsTagOpen] = useState(false);

  const delTask = (id) =>{
    setTasks(tasks.filter((elem)=>{
        return id !== elem.id
    }))
      axios.get(`https://656d9753bcc5618d3c237d07.mockapi.io/user`)
          .then((response) => {
              const user = response.data[0];
              const index = user.array.findIndex(item => item.id === id);

              if (index !== -1) {
                  user.array.splice(index, 1);

                  axios.put(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${user.id}`, user)
                      .then(() => {
                          console.log('Успешно удален элемент из массива "array".');
                      })
                      .catch(error => {
                          console.error('Ошибка при отправке данных на сервер:', error);
                      });
              } else {
                  console.log('Элемент не найден в массиве "array".');
              }
          })
          .catch(error => {
              console.error('Ошибка при получении данных пользователя:', error);
          });

  };
    const successHandler = (id) => {
        const updatedTasks = tasks.map((el) => {
            if (el.id === id) {
                return { ...el, success: !el.success, pending: !el.pending };
            } else {
                return el;
            }
        });


        setTasks(updatedTasks);

        axios.put(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${userID}`, { array: updatedTasks })
            .then(() => {
                console.log('Данные успешно обновлены на сервере.');
            })
            .catch((error) => {
                console.error('Ошибка при обновлении данных на сервере:', error);
            });
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
<ListItem tasks={tasks} setTasks={setTasks} userID={userID} successHandler={successHandler} delTask={delTask}  task={task}    item={item} date={date} dateIcon={dateIcon} action={action} itemRight={itemRight} itemLeft={itemLeft} setIsTagOpen={setIsTagOpen} isTagOpen={isTagOpen}/>
              ))}

        </ul>
    );
};

export default ListBlock;