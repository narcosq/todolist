import React from 'react';
import {AiFillTag} from 'react-icons/ai'
import {MdDelete} from "react-icons/md";
const ListItem = ({setIsTagOpen,isTagOpen,successHandler,task,item,setModalShow,setCheckTags,setModalShowObj,itemRight,itemLeft,priority,priorityCircle,date,dateIcon,action,actionDelete,delTask}) => {
    return (
        <li  style= {{position:'relative',opacity: task.success? '50%':'100%',cursor:'pointer'}} className={`${item} todo__item`} key={item.id} onClick={() => {
            setModalShowObj(task);
            setModalShow(true);
            setCheckTags(task.tags)
        }}>
            <div  className={itemLeft}>
                <p style ={{textDecoration: task.success ? 'red line-through' : 'none'}}>
                    {task.title}
                </p>
            </div>
            <div className={itemRight}>
                <div className={priority}>
                    <div className={priorityCircle} style={{background: task.priority === 'High'? 'red' : task.priority === 'Medium'? 'yellow':task.priority==='Low'?'blue':'black'}}/>


                    <span>{task.priority} Priority</span>
                </div>
                <div className={date}>
                    <div className={dateIcon} onClick={(e)=>{
                        e.stopPropagation();
                        setIsTagOpen(!isTagOpen)
                    }}><AiFillTag/></div>
                    <span>{task.date}</span>
                </div>
                <div className={action} onClick={e=>e.stopPropagation()}>
                    <input type="checkbox" checked={task.success} onChange={()=> successHandler(task.id)
                    }/>
                    <span onClick={()=> delTask(task.id)
                    } className={actionDelete}>
                            <MdDelete/>
                        </span>
                </div>
            </div>
            <div className='tags__popup' onClick={(e)=>{
                e.stopPropagation();
                setIsTagOpen(false)
            }} style={{display:isTagOpen?'block':'none'}}>
                <div className='tags__popup-top'>
                    <AiFillTag/>
                    <h4>Tags</h4>
                </div>
                <ul>
                    {
                        task.tags.map((item)=>(
                            <li>{item}</li>
                        ))
                    }
                </ul>
            </div>

        </li>



    )};

export default ListItem;