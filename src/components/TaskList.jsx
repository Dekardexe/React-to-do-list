import React, { useState } from 'react';
import TaskRedactor from './TaskRedactor';
import Task from './Task';

const TaskList = function (props) {


   return (
      <div>
         <div className='taskList'>
            {props.tasks.map(el =>
               <Task task={el} key={Date.now()}
                  onComplete={props.onComplete}
                  onImportant={props.onImportant}
                  onDelete={props.onDelete}
                  onEdit={props.onEdit} />
                  
               )
            }
         </div>
      </div >
   )
}
export default TaskList;