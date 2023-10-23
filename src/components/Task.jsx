import React, { useState, useEffect } from 'react';
import TaskRedactor from './TaskRedactor';
import { VscTrash, VscSearch, VscSave, VscPass, VscPassFilled, VscCircleLarge, VscFlame, VscRequestChanges, VscEdit, VscStarEmpty, VscStarFull } from "react-icons/vsc";
import '../UI/Task.css'

const Task = function (props) {


   

   return (
      <div>
         <div className='eachTask' onClick={function () {
            props.onTaskEditorCatch(props.task);
         }
         }>
            <VscCircleLarge className='icons circle' size={25} 
               onClick={() =>
                  props.onComplete(
                     props.task.id
                  )
               }
            />
            <div className='eachTaskMainSpace'>
               <div>
               <p style={{ marginTop: '3px' }}>{props.task.title}</p>
               <p style={{fontSize: "0.8em", color: 'slategray'}}>{props.task.description.slice(0, document.documentElement.clientWidth / 15)} {(props.task.description.length > document.documentElement.clientWidth / 15) ? "..." : ""} </p>
               </div>
               {(props.task.importance) ?
                  <VscStarFull className='icons' size={30} style={{ flexShrink: '0.1' }}
                     onClick={() =>
                        props.onImportant(
                           props.task.id
                        )
                     }
                  /> : <VscStarEmpty className='icons' size={30} style={{ flexShrink: '0.1' }}
                     onClick={() =>
                        props.onImportant(
                           props.task.id
                        )
                     }
                  />
               }
            </div>
         </div>
      </div >
   )
}
export default Task;