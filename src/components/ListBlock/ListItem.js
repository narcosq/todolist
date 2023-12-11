import React, { useState,useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const ListItem = ({tasks,
                      successHandler,
                      deleteTask,
                      task,
                      item,
                      itemRight,
                      itemLeft,
                      date,
                      dateIcon,
                      action,
                      actionDelete,
                      userID,
    setTasks
                  }) => {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const updateTaskTitle = (taskId, newTitle) => {
        const updatedTasks = tasks.map((el) => {
            if (el.id === taskId) {
                return { ...el, title: newTitle }; // Update only the title
            } else {
                return el;
            }
        });

        axios
            .put(`https://656d9753bcc5618d3c237d07.mockapi.io/user/${userID}`, {
                array: updatedTasks,
            })
            .then(() => {
                console.log('Название задачи успешно обновлено на сервере.');
            })
            .catch((error) => {
                console.error('Ошибка при обновлении названия задачи на сервере:', error);
            });
        setTasks(updatedTasks);
    };

    const handleTitleClick = () => {
        setEditing(true);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        setEditing(false);

        updateTaskTitle(task.id, editedTitle);
    };
    const handleTitleKeyDown = (e, taskId, editedTitle) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateTaskTitle(taskId, editedTitle);
            setEditing(false)
        }
    };

    return (
        <li
            style={{ position: 'relative', opacity: task.success ? '50%' : '100%', cursor: 'pointer' }}
            className={`${item} todo__item`}
            key={item.id}
            onClick={() => {}}
        >
            <div className={itemLeft}>
                {editing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        autoFocus
                        onKeyDown={(e)=>handleTitleKeyDown(e,task.id, editedTitle)}
                    />
                ) : (
                    <p
                        style={{ textDecoration: task.success ? 'line-through red' : 'none' }}
                        onClick={handleTitleClick}
                    >
                        {task.title}
                    </p>
                )}
            </div>
            <div className={itemRight}>
                <div className={date}>
                    <div className={dateIcon} onClick={(e) => {}}>

                    </div>
                    <span>{task.date}</span>
                </div>
                <div className={action} onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={task.success}
                        onChange={() => successHandler(task.id)}
                    />
                    <span onClick={() => deleteTask(task.id)} className={actionDelete}>
            <MdDelete />
          </span>
                </div>
            </div>
        </li>
    );
};

export default ListItem;
