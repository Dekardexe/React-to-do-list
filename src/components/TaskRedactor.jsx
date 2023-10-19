import React, { useState, useEffect,  } from 'react';
import { VscSignIn, VscSave, VscCheck, VscTrash, VscEdit } from "react-icons/vsc";

const TaskRedactor = function (props) {
   const [taskTitle, setTaskTitle] = useState(props.task.title);
   const [taskDescr, setTaskDescr] = useState(props.task.description);

   function thisTaskEditor() {
      props.task.title = taskTitle;
      props.onEditRender(props.task);
   }

   function thisTaskDecrEditor() {
      props.task.description = taskDescr;
      props.onEditRender(props.task);
   }

   return (
      <div className='taskEditorModalWindow'>
         <div className='taskEditor'>
            <div >
               <div style={{ display: "grid", justifyContent: "end" }}>
                  <VscEdit size={27}
                     onClick={function () {
                        document.querySelector(".hiddenTaskArea").style.display = (document.querySelector(".hiddenTaskArea").style.display == "none") ? "block" : "none";
                     }}
                  />
               </div>

               <p className='greyZone'>{props.task.title}</p>

               <div className='hiddenTaskArea' style={{ display: "none" }}>
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

               <div className='greyZone' style={{displat: "flex", flexDirection: "column"}} >
                  <p style={{ color: 'slategrey' }} onClick={() => {
                     const row = Math.floor(props.task.description.length / 25);
                     document.querySelector(".hiddenTaskDescrArea").rows = row;
                     document.querySelector(".hiddenTaskDescrArea").style.display = (document.querySelector(".hiddenTaskDescrArea").style.display == "none") ? "block" : "none";
                  }}>
                     {props.task.description}
                  </p>
                  <textarea className="hiddenTaskDescrArea" maxLength={150}  cols="0" rows="1" style={{display: "none", width: '100%', overflow: "hidden", resize: "none", borderRadius: '3px', marginTop: "10px", padding: "3px", fontSize: '14px', backgroundColor: 'rgba(60, 60, 60, 255)', color: 'white' }}
                     placeholder="Редактировать задачу"
                     value={taskDescr}
                     onBlur={() => {
                        if(props.task.description == taskDescr){
                           console.log(`равно`);
                            document.querySelector(".hiddenTaskDescrArea").style.display = "none";
                        }else {
                           
                           thisTaskDecrEditor()
                        }
                     }}
                     onChange={function (event) {
                        setTaskDescr(event.target.value)
                     }}
                  /> 
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
