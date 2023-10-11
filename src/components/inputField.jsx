import React, { useState } from 'react';
import { VscDiffAdded } from "react-icons/vsc";
const Input = (props) => {
   const [title, setTitle] = useState();
   const [descr, setDescr] = useState();


   function addNewElement() {
      setTitle('');
      setDescr('');
      props.onAdd(
         {
            id: Date.now(),
            title: title,
            description: descr,
            importance: false,
         }
      )
   }

   return (
      <div className='inputField'>
         <form className='inputFieldForm'>
            <input maxlength="150" style={{ width: '96%', borderRadius: '8px', margin: '1% 0 1% 2%', padding: '1% ', fontSize: '20px', backgroundColor: 'rgba(27, 54, 68, 0.8)', color: 'white' }}
               type="text"
               value={title}
               placeholder='Добавьте задачу'
               onChange={event => setTitle(event.target.value)}
            ></input>

            <div style={{ margin: '0 0 0 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
               <textarea maxlength="200" name="Text1" cols="1" rows="2" style={{ width: '80%', borderRadius: '8px', margin: '1% 0 1% 2%', padding: '1% ', fontSize: '16px', resize: 'none', overflow: 'hidden', backgroundColor: 'rgba(27, 54, 68, 0.8)', color: 'white' }}
                  type="text"
                  value={descr}
                  placeholder='Описание'
                  onChange={event => setDescr(event.target.value)}
               ></textarea>
               <VscDiffAdded size={50} style={{margin: '1.3% 2% 0 0', color: 'white', flexShrink: '0.1' }}
                  type="button"
                  onClick={addNewElement}
               />
            </div>
         </form>
      </div>
   )

}
export default Input;