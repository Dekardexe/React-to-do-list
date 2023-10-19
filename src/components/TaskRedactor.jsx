import React, { useState, useEffect } from 'react';
import { VscSignIn, VscSave, VscCheck, VscTrash, VscEdit } from "react-icons/vsc";

const TaskRedactor = function (props) {
   const [taskTitle, setTaskTitle] = useState(props.task.title);

   function thisTaskEditor() {
      props.task.title = taskTitle;
      props.onEditRender(props.task);
   }

   return (
      <div className='taskEditorModalWindow'>
         <div className='taskEditor'>
            <div >
               <div style={{ display: "grid", justifyContent: "end" }}>
                  <VscEdit size={27} style={{ margin: '1.3% 0 0 1.5%', }}
                     onClick={function () {
                        document.querySelector(".hiddenTastArea").style.display = (document.querySelector(".hiddenTastArea").style.display == "none") ? "block" : "none";
                     }}
                  />
               </div>
               <p className='greyZone'>{props.task.title}</p>
               <div className='hiddenTastArea' style={{ display: "none" }}>
                  <div className='greyZone' >

                     <input maxLength={150} style={{ width: '96%', borderRadius: '3px', padding: '1% ', fontSize: '18px', backgroundColor: 'rgba(27, 54, 68, 0.8)', color: 'white' }}
                        placeholder="Редактировать задачу"
                        value={taskTitle}
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
               </div>
               <div className='greyZone' >
                  <p style={{ color: 'slategrey' }} >
                     {props.task.description}
                  </p>
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
      </div >
   )
}




export default TaskRedactor;
