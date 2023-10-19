import { useState, useEffect } from "react";
import Input from './components/inputField'
import './UI/main.css'
import TaskList from "./components/TaskList"
import CompletedTask from "./components/CompletedTask";
import { VscChevronRight, VscChevronDown, } from "react-icons/vsc";

function App() {

   let [tasks, setTasks] = useState([]);

   const [importantTasks, setImportantTasks] = useState([]);

   let [completed, setCompleted] = useState([])

   const [completedShow, setCompletedShow] = useState([]);

   //Показать / убрать список выполненных задач
   function completedListShow() {
      setCompletedShow(!completedShow);
   }

   //Выполнили задачу с текущим id, 
   function completeTask(id) {
      //Нашли ее в массиве задач и добавили в выполненные
      for (let eachTask of tasks) {
         if (eachTask.id === id) {
            //и поменяли переменную в html в зависимости от её важности
            if (eachTask.importance === true) {
               setCompleted([eachTask, ...completed]);
            } else {
               setCompleted([...completed, eachTask]);
            }
            break;
         }
      }
      // удалили эту задачу из списка всех зачад
      tasks = tasks.filter((obj) => {
         return obj.id !== id;
      })
      //и поменяли переменную в html
      setTasks([...tasks]);
   }
   //Отменили выполнение задачи с текущим id, 
   function failTask(id) {
      //Нашли ее в массиве выполненных задач и вернули обратно
      for (let eachTask of completed) {
         if (eachTask.id === id) {
            //и поменяли переменную в html в зависимости от её важности
            if (eachTask.importance === true) {
               setTasks([eachTask, ...tasks]);
            }
            else {
               setTasks([...tasks, eachTask]);
            }
            break;
         }
      }
      // удалили эту задачу из списка выполненных зачад
      completed = completed.filter((obj) => {
         return obj.id !== id;
      })
      //и поменяли переменную в html
      setCompleted([...completed]);
   }
 
   //Добавление задачи с помощью инпута
   function addTask(field) {
      setTasks([...tasks, field]);
   
   }

   //Пометить задачу с данным id как важную
   function markImportance(id) {
      let currentTask;
      for (let eachTask of tasks) {
         if (eachTask.id === id) {
            currentTask = eachTask;
            currentTask.importance = !currentTask.importance;
            break;
         }
      }
      // удалили эту задачу из списка всех зачад и добавили в начало если она важная
      if (currentTask.importance === true) {
         tasks = tasks.filter((obj) => {
            return obj.id !== id;
         })
         tasks.unshift(currentTask)
      }
      //сохранили результат в массиве задач
      setTasks([...tasks]);
   }

   //Убрать задачу с данным id из важных
   function markImportanceToComplited(id) {
      let currentTask;
      for (let eachTask of completed) {
         if (eachTask.id === id) {
            currentTask = eachTask;
            currentTask.importance = !currentTask.importance;
            break;
         }
      }
      // удалили эту задачу из списка всех зачад и добавили в начало если она важная
      if (currentTask.importance === true) {
         completed = completed.filter((obj) => {
            return obj.id !== id;
         })
         completed.unshift(currentTask)
      }
      //и поменяли переменную в html
      setCompleted([...completed]);
   }

   //Удаление записи
   function deleteTask(id, isComplited, array) {
      if (tasks.includes(array)) {
         tasks = tasks.filter((obj) => {
            return obj.id !== id;
         })
      } else {
         completed = completed.filter((obj) => {
            return obj.id !== id;
         })
      }
      if (isComplited) {
         setCompleted([...completed]);
      } else {
         setTasks([...tasks]);
      }
   }

   //taskEditor
   function taskRedactor() {
      setTasks([...tasks]);
   }

   const [showTaskList, setShowTaskList] = useState([]);

   const [isImportant, setIsImportant] = useState(false);

   function showSelectedTasks(importance) {
      if (importance) {
         setShowTaskList(importantTasks);
         setIsImportant(true);
      } else {
         setShowTaskList(tasks);
         setIsImportant(false);
      }
   }

   //При загрузке страницы
   useEffect(() => {
      const rawTasks = localStorage.getItem(`tasks`);
      setTasks(JSON.parse(rawTasks));
      setShowTaskList(...[], JSON.parse(rawTasks));     
   }, [])
   //При изменении важных
   useEffect(() => {
      if(!isImportant) {
         setShowTaskList(tasks);
      }else{
         setShowTaskList(importantTasks);
      }
   }, [importantTasks])
   //При изменении всех зачад
   useEffect(() => {
      localStorage.setItem(`tasks`, JSON.stringify(tasks));
      setImportantTasks(tasks.filter((obj) => { return obj.importance === true }));
   }, [tasks])


   return (
      <div className="App">
         <Input onAdd={addTask}
            onShowImnportantTasks={showSelectedTasks}/>
         {(completed.length === 0) && (tasks.length === 0) && <p className="headers">У вас пока нет задач!</p>}
         <TaskList
            tasks={showTaskList}
            key={Date.now()}
            onComplete={completeTask}
            onImportant={markImportance}
            onDelete={deleteTask}
            onEditRender={taskRedactor}
         />

         {(completed.length > 0) && (!isImportant) && <div><p className="headers" onClick={completedListShow}>{completedShow ? <VscChevronDown size={18} style={{ margin: '0 10px' }} /> : <VscChevronRight size={18} style={{ margin: '0 10px' }} />}Завершенные задачи</p></div>}
         {(completedShow) && (!isImportant) && <CompletedTask
            completed={completed}
            key={Date.now() + 2}
            onFail={failTask}
            onImportant={markImportanceToComplited}
            onDelete={deleteTask} />}
      </div>
   );
}

export default App;
