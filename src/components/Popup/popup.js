import React, {useState} from "react"
import {Modal,Button,Form} from 'react-bootstrap'
import {AiFillTag} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'

const MyVerticallyCenteredModal =(props)=> {
    const [title,setTitle] = useState('');

    const [description,setDescription] =useState('');

    const priority = ['High','Medium','Low','None'];
    const [tag,setTag]=useState('');
    const  [tags,setTags]=useState(['Home','Work','Personal']);
    const addTag = (e) =>{
      if  (e.key === 'Enter' && tag.trim().length){
          if(tags.includes(tag)){
              alert('Такой тег уже существует')
          }else {
          setTags([...tags,tag]);
          setTag('');
          e.target.value =''}
      }
    };

    const {checkTags,setCheckTags,obj,setobj,tasks,setTasks,setIsTitleChange,isTitleChange,isDescription,setIsDescription,action,setAction} = props;
const saveChangeHandler =(id)=>{
    setTasks(tasks.map((task)=>{
        if (task.id === id){
            return {...task,tags:checkTags,priority: obj.priority , title:title.length? title: task.title , description: description.length?description:task.description , }

        } return task

    }));
props.onHide();

};
const delTag =(name)=>{
  setTags(tags.filter(el=>el !== name))
};

const checkTagsHandler = (el) =>{
    checkTags.includes(el) ? setCheckTags(checkTags.filter((item)=> item !==el)): setCheckTags([...checkTags,el])
};
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Task Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='popup__title-block'>
                    {
                        isTitleChange?  <input onChange={(e)=>setTitle(e.target.value)} defaultValue={obj.title} type="text" className='popup__title-input'/> :
                            <><h4 className='popup__title'>{obj.title}</h4>
                                <span onClick={()=>setIsTitleChange(true)} className='popup__title-btn'><FiEdit/></span>
                            </>
                    }




                </div>
                <div className="popup__description-block" >
                    {
                        isDescription? <textarea style={{width:'100%',resize:'none'}} value={tag} onChange={(e)=>setDescription(e.target.value)} defaultValue={obj.description}/> : <div style={{display:"flex",flexDirection:'column',justifyContent:'space-between',paddingBottom:'20px'}}>

                            <p>
                                {obj.description}
                            </p>
                            <span style={{color:'blue',textDecoration:'underline',cursor:'pointer',alignSelf:'flex-end'}} onClick={()=>setIsDescription(true)}>
                                {
                                    obj.description.length ? 'Edit ': 'Add '
                                }
                                description
                            </span>

                        </div>
                    }
                </div>
                <p>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                        <Button style={{width:'40%'}} className={action === 'priority' ? 'active': ''} variant="outline-primary" onClick={()=>setAction('priority')}>!!!! Priority</Button>
                        <Button style={{width:'40%'}} className={action === 'tags' ? 'active': ''} variant="outline-primary" onClick={()=>setAction('tags')}><AiFillTag/>Tags</Button>
                    </div>
                    <div style={{padding:'0 10px'}}>
                        {
                            action === 'priority' ?

                                priority.map((item)=>(
                                    <Form.Check type='radio' id={`check-api-${item}`} style={{display:'flex',alignItems:'center',columnGap:'10px'}}>
                                        <Form.Check.Input checked={item === obj.priority} name='priority' type='radio' isValid onChange={()=>setobj({...obj, priority: item})} style={{borderColor:'blue'}} />
                                        <Form.Check.Label style={{display:'flex',alignItems: 'center',color:'blue'}}>
                                    <span style={{color: item === 'High'? 'red' : item === 'Medium'? 'yellow': item === 'Low' ? 'blue' : 'black',
                                        width: '30px',textAlign: 'center' ,fontSize: '20px',fontWeight: 'bold'
                                    }}>{item === 'High' || item === 'None' ? '!!!': item === 'Medium' ? '!!' : '!'}</span> {item} priority
                                        </Form.Check.Label>
                                    </Form.Check>
                                )): action === 'tags' ?
                                <>
                                    <Form.Control type="text" placeholder="Create Tag" onChange={(e)=>setTag(e.target.value)} onKeyPress={addTag} />
                                    {tags.map((item)=>(
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
                                    <div>
                                        <AiFillTag/>
                                        <span style={{marginLeft:'10px',fontSize:'22px'}}>{item}</span>
                                    </div>
                                    <div style={{display:'flex',alignItems:'center'}}>
                                        <input checked={checkTags.includes(item)} onChange={()=>checkTagsHandler(item)} type="checkbox" style={{width:'25px', height:'25px'}}/>
                                        <span style={{marginLeft:'10px',cursor:'pointer'}} onClick={()=>delTag(item)}>X</span>
                                    </div>
                                </div>
                                )
                                ) }</>
                                : ''





                        }

                    </div>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary' onClick={props.onHide}>Close</Button>
                <Button variant='outline-primary' onClick={()=> saveChangeHandler(obj.id)}>Save change</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default MyVerticallyCenteredModal