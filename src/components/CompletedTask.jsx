import React, { useState } from 'react';
import { VscTrash, VscPass, VscPassFilled, VscCircleLarge, VscFlame, VscRequestChanges, VscEdit, VscStarEmpty, VscStarFull } from "react-icons/vsc";

const CompletedTask = function (props) {
   //console.log(props.tasks)


   return (
      <div>
         <div className='taskList'>
            {props.completed.map(el =>
               <div className='eachTask'>
                  <VscPassFilled className='icons' size={25} style={{ margin: '10px 20px 10px 10px',}} 
                     onClick={() =>
                        props.onFail(
                           el.id
                        )
                     }
                  />
                  <div className='eachTaskMainSpace'>
                     <p> {el.title}</p>

                     {(el.importance) ?
                        <VscStarFull className='icons' size={30} style={{flexShrink: '0.1'}}
                           onClick={() =>
                              props.onImportant(
                                 el.id
                              )
                           }
                        /> 
                        : <VscStarEmpty className='icons' size={30} style={{flexShrink: '0.1'}}
                           onClick={() =>
                              props.onImportant(
                                 el.id
                              )
                           }
                        />}
                  </div>
                  <VscTrash size={22} className='icons tr' style={{ display: 'flex', alignSelf: 'end' }}
                     onClick={() =>
                        props.onDelete(
                           el.id,
                           true,
                           props.completed
                        )
                     }
                  />

               </div>
            )}
         </div>
      </div>
   )
}
export default CompletedTask;