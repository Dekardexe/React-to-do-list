import { useState } from "react";
import Input from './components/inputField'
import './UI/main.css'
import TaskList from "./components/TaskList"
import CompletedTask from "./components/CompletedTask";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";

function App() {

   let [tasks, setTasks] = useState([
      {
         id: 1,
         title: "Посадить дерево",
         description: "Интересный смысл у этого выражения, он мне немного не понятен",
         importance: false,
      },
      {
         id: 2,
         title: "Вырастить сына",
         description: "Это процесс долгий, можно немного отложить",
         importance: false,
      },
      {
         id: 3,
         title: "Построить дом",
         description: "Кредитная политика государства не совсем располагает к осуществлению данного пункта",
         importance: false,
      },
      {
         id: 4,
         title: "Сходить в магазин",
         description: "Седьмой раз за день",
         importance: false,
      }
   ]);
   

   let [completed, setCompleted] = useState([])

   let [completedShow, setCompletedShow] = useState([]);

   //Показать / убрать список выполненных задач
   function completedListShow() {
      setCompletedShow(!completedShow);
   }

   //Выполнили задачу с текущим id, 
   function completeTask(id) {
      //Нашли ее в массиве задач и добавили в выполненные
      for (let eachTask of tasks) {
         if (eachTask.id == id) {
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
         return obj.id != id;
      })
      //и поменяли переменную в html
      setTasks([...tasks]);
   }
   //Отменили выполнение задачи с текущим id, 
   function failTask(id) {
      //Нашли ее в массиве выполненных задач и вернули обратно
      for (let eachTask of completed) {
         if (eachTask.id == id) {
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
         return obj.id != id;
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
         if (eachTask.id == id) {
            currentTask = eachTask;
            currentTask.importance = !currentTask.importance;
            break;
         }
      }
      // удалили эту задачу из списка всех зачад и добавили в начало если она важная
      if (currentTask.importance === true) {
         tasks = tasks.filter((obj) => {
            return obj.id != id;
         })
         tasks.unshift(currentTask)
      }
      //и поменяли переменную в html
      setTasks([...tasks]);
   }

   //Убрать задачу с данным id из важных
   function markImportanceToComplited(id) {
      let currentTask;
      for (let eachTask of completed) {
         if (eachTask.id == id) {
            currentTask = eachTask;
            currentTask.importance = !currentTask.importance;
            break;
         }
      }
      // удалили эту задачу из списка всех зачад и добавили в начало если она важная
      if (currentTask.importance === true) {
         completed = completed.filter((obj) => {
            return obj.id != id;
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
            return obj.id != id;
         })
      } else {
         completed = completed.filter((obj) => {
            return obj.id != id;
         })
      }
      if (isComplited) {
         setCompleted([...completed]);
      } else {
         setTasks([...tasks]);
      }
   }

   function taskRedactor() {
      setTasks([...tasks]);
   }



   return (
      <div className="App">
         <Input onAdd={addTask} />
         {(completed.length == 0) && (tasks.length == 0) && <p className="headers">У вас пока нет задач!</p>}
         <TaskList
            tasks={tasks}
            key={Date.now()}
            onComplete={completeTask}
            onImportant={markImportance}
            onDelete={deleteTask}
            onEdit={taskRedactor} />

         {(completed.length > 0) && <div><p className="headers" onClick={completedListShow}>{completedShow ? <VscChevronDown size={18} style={{ margin: '0 10px' }} /> : <VscChevronRight size={18} style={{ margin: '0 10px' }} />}Завершенные задачи</p></div>}
         {(completedShow) && <CompletedTask
            completed={completed}
            onFail={failTask}
            onImportant={markImportanceToComplited}
            onDelete={deleteTask} />}
      </div>
   );
}

export default App;
