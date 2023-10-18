import React, { useState, useEffect } from 'react';
import { VscSignIn, VscSave, VscCheck, VscTrash } from "react-icons/vsc";

const TaskRedactor = function (props) {
   const [taskTitle, setTaskTitle] = useState();
   const [edited, setEdited] = useState();

   function thisTaskEditor() {
      props.task.title = taskTitle;
      props.onEditRender(props.task);
   }

   function changeTest() {

      setEdited(props.task.title)
      console.log(edited)
   }


   //console.log('не в функции получили props edit',taskTitle)
   return (
      <div className='taskEditorModalWindow'>
         <div className='taskEditor'>
            <div >
               <p className='greyZone'
               onClick={function() {
                  // setA(!a);
                  // console.log(taskTitle)
                  // let b = props.task.title;
                  // setTaskTitle(b);
               }}
               >{props.task.title}</p>
                <div className='greyZone' >
                  <input maxLength={150} style={{ width: '96%', borderRadius: '3px', padding: '1% ', fontSize: '18px', backgroundColor: 'rgba(27, 54, 68, 0.8)', color: 'white' }}
                     placeholder="Редактировать заметку"
                     value={taskTitle}
                     onClick={function () {
                        // setTaskTitle(props.task.title);
                     }}
                     onBlur={function() {
                        
                     }}
                     onChange={function (event) {
                        setTaskTitle(event.target.value)
                     }}
                  ></input>
                  <VscCheck size={27} style={{ margin: '1.3% 0 0 1.5%' }}
                     onClick={function () {
                        thisTaskEditor()
                     }
                     } />
               </div>
               <div className='greyZone' >
                  <p style={{ color: 'slategrey' }} >
                     {props.task.description}
                  </p>
               </div>
            </div>
            <div >
               {/* <textarea
                  value={edited}
                  onChange={function (event) {
                     setEdited(event.target.value)
                  }}
                  onBlur={function () {
                     setTaskTitle(edited);
                     console.log(edited, taskTitle)
                     thisTaskEditor();
                  }}
               ></textarea> 
               <button onClick={changeTest}></button>*/}
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <VscSignIn size={30} style={{ margin: '0 0 1.5% 1%', }}
                  onClick={() => props.onClose(props.title)}
               />
               <VscTrash size={30} className='icons tr'
                  onClick={() =>
                     props.onDelete(
                        props.task.id,
                        false,
                        props.task
                     )
                  }
               />
            </div>
         </div>
      </div>
   )
}




export default TaskRedactor;
