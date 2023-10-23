import React, { useState, useEffect, } from 'react';
import { VscSignIn, VscSave, VscCheck, VscTrash, VscEdit } from "react-icons/vsc";
import '../UI/InputField.css'

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

               <p className='greyZone'
                  onClick={function () {
                     document.querySelector(".hiddenTaskArea").style.display = (document.querySelector(".hiddenTaskArea").style.display == "none") ? "block" : "none";
                  }}>{props.task.title}</p>

               <div className='hiddenTaskArea' style={{ display: "none" }}>
                  <div className='greyZone' >
                     <input maxLength={150} className='titleField' style={{  }}
                        placeholder="Редактировать задачу"
                        value={taskTitle}
                        onChange={function (event) {
                           setTaskTitle(event.target.value)
                        }}
                     ></input>
                     <VscCheck size={27} className="titleChangeCheck" 
                        onClick={function () {
                           thisTaskEditor()
                        }
                        } />
                  </div>
               </div>

               <div className='greyZone' style={{ display: "flex", flexDirection: "column" }} >
                  <p style={{ color: 'slategrey' }} onClick={() => {
                     const row = Math.floor(props.task.description.length / 25);
                     document.querySelector(".hiddenTaskDescr").rows = row;
                     document.querySelector(".hiddenTaskDescrArea").style.display = (document.querySelector(".hiddenTaskDescrArea").style.display == "none") ? "block" : "none";
                  }}>
                     {props.task.description}
                  </p>
                  <div className='hiddenTaskDescrArea' style={{ display: "none"}}>

                     <textarea className="textarea hiddenTaskDescr" maxLength={150} cols="0" rows="1" 
                        placeholder="Редактировать задачу"
                        value={taskDescr}
                        onBlur={() => {
                           document.querySelector(".hiddenTaskDescrArea").style.display = "none";
                        }}
                        onChange={function (event) {
                           setTaskDescr(event.target.value)
                        }}
                     />
                     <div  >
                        
                        <button className="descrChangeCheck"
                        onClick={thisTaskDecrEditor}
                        >Сохранить</button>
                     </div>
                  </div>
               </div>


            </div>

            <div className='twoObjectsInRow'>
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
