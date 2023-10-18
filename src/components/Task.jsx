import React, { useState, useEffect } from 'react';
import TaskRedactor from './TaskRedactor';
import { VscTrash, VscSearch, VscSave, VscPass, VscPassFilled, VscCircleLarge, VscFlame, VscRequestChanges, VscEdit, VscStarEmpty, VscStarFull } from "react-icons/vsc";

const Task = function (props) {

   return (
      <div>
         <div className='eachTask' onClick={function () {
            props.onTaskEditorCatch(props.task);
         }
         }>
            <VscCircleLarge className='icons' size={25} style={{ margin: '10px 20px 10px 10px', }}
               onClick={() =>
                  props.onComplete(
                     props.task.id
                  )
               }
            />
            <div className='eachTaskMainSpace'>
               <p style={{ marginTop: '3px' }}>{props.task.title}</p>
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
                  />}
            </div>
         </div>
      </div >
   )
}
export default Task;