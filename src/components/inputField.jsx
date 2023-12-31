import React, { useState, useEffect, useRef } from 'react';
import { VscDiffAdded, VscMenu, VscArrowLeft } from "react-icons/vsc";
import '../UI/InputField.css'

const Input = (props) => {
   const [title, setTitle] = useState();
   const [descr, setDescr] = useState();
   const [show, setShow] = useState(true);
   const [importancePage, setImportancePage] = useState(false);

   function addNewElement() {
      setTitle('');
      setDescr('');
      props.onAdd(
         {
            id: Date.now(),
            title: title,
            description: descr,
            importance: importancePage,
         }
      )
   }

   function markingPageSelector(index) {
      const currentPageSelector = document.querySelectorAll(`.pageSelector`)[index].style;
      currentPageSelector.borderLeft = "8px solid rgba(27, 54, 68, 1)";
      currentPageSelector.backgroundColor = "rgba(60, 60, 60, 1)";
      document.querySelectorAll(`.pageSelector`)[(index + 1) % 2].style.borderLeft = "";
      document.querySelectorAll(`.pageSelector`)[(index + 1) % 2].style.backgroundColor = "";
   }
   useEffect(() => {
      if(show){
         markingPageSelector(importancePage ? 1 : 0);
      }
   }, [show])


   return (
      <>
         {(show)
            ?
            <>
               <div className='inputField'>
                  <form className='inputFieldForm'>
                     
                     <input maxLength="150" className='titleField' 
                        type="text"
                        value={title}
                        placeholder='Добавьте задачу'
                        onChange={event => setTitle(event.target.value)}
                     ></input>

                     <div className='twoObjectsInRow'>
                        <textarea maxLength="200" className='textarea' cols="1" rows="2" style={{ width: '80%'}}
                           type="text"
                           value={descr}
                           placeholder='Добавить заметку'
                           onChange={event => setDescr(event.target.value)}
                        ></textarea>
                        <VscDiffAdded size={55} className="addTaskButton"
                           type="button"
                           onClick={addNewElement}
                        />
                     </div>
                  </form>
                  <div className='pageSelector'
                     onClick={function () {
                        setImportancePage(false)
                        props.onShowImnportantTasks(false);

                        markingPageSelector(0);
                     }}>
                     <p>Мои задачи</p>
                  </div>
                  <div className='pageSelector'
                     onClick={function () {
                        setImportancePage(true);
                        props.onShowImnportantTasks(true);

                        markingPageSelector(1);
                     }}>
                     <p>Важные</p>
                  </div>
                  <VscArrowLeft size={30} style={{ position: 'static' }} className='menuBotton' 
                  onClick={function () {
                     setShow(!show);

                  }} />
               </div>
            </>
            :
            <VscMenu size={30} className='menuBotton' 
            onClick={function () {
               setShow(!show);
            }} />
         }
      </>
   )

}
export default Input;