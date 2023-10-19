import React, { useState } from 'react';
import TaskRedactor from './TaskRedactor';
import Task from './Task';

const TaskList = function (props) {

   const [show, setShow] = useState();
   const [task, setTask] = useState();
   const [prevTaskProps , setPrevTaskProps] = useState();

   function taskEditorShow(eachTaskProps) {
      setTask(eachTaskProps);
      if(prevTaskProps === eachTaskProps){
         setShow(0);
         setPrevTaskProps('a fake prev task property');
      }
      else{
         //Для последовательного срабатывания рендеров. Иначе не работает. Закрыли / открыли
         new Promise((res, rej) => {
            setShow(0)
            res(0);
         }).then((res) => {
            setShow(res+1);
         })

         setPrevTaskProps(eachTaskProps);
      }
   }

   function closeEditor() {
      setShow([undefined]);
   }

   return (
      <div>
         <div className='taskList'>
            {props.tasks.map(eachTask =>
               <Task task={eachTask} key={eachTask.id}
                  onComplete={props.onComplete}
                  onImportant={props.onImportant}
                  onDelete={props.onDelete}
                  onTaskEditorCatch={taskEditorShow}/>
                  
               )
            }
         </div>
         {(show === 1) && <TaskRedactor task={task} onClose={closeEditor} onEditRender={props.onEditRender} onDelete={props.onDelete} /> }
      </div >
   )
}
export default TaskList;