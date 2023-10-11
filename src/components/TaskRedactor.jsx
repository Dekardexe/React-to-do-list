import React, { useState } from 'react';
import { VscSignIn, VscSave, VscCheck, VscTrash } from "react-icons/vsc";

const TaskRedactor = function (props) {
   const [edited, setEdited] = useState();

   function constructor() {
      let a = props.task;
      a.title = edited;
      props.onEdit(a);
      props.onClose(props.title);
   }

   //console.log('не в функции получили props edit',edited)
   return (
      <div className='taskEditorModalWindow'>
         <div className='taskEditor'>
            <div >
               <p style={{ overflow: 'auto', fontSize: '24px', margin: '10px', }}>{props.task.title}</p>
               <div style={{ margin: '10px 10px', display: 'flex', justifyContent: 'space-between', }}>
                  <input maxLength={150} style={{ width: '96%', borderRadius: '8px', padding: '1% ', fontSize: '20px', backgroundColor: 'rgba(27, 54, 68, 0.8)', color: 'white' }}
                     placeholder="Редактировать заметку"
                     value={edited}
                     onChange={function (event) {
                        setEdited(event.target.value)
                     }}
                  ></input>
                  <VscCheck size={27} style={{ margin: '1.3% 0 0 1.5%' }}
                     onClick={function () {
                        constructor()
                     }
                     } />
               </div>
               <p style={{ margin: '10px', color: 'slategrey' }} >
                  {props.task.description}
               </p>
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
