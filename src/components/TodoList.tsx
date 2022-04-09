import React from "react";
import './styles.css';
import {Todo} from '../model';
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver? "dragactive": ""}`} 
                    ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Active tasks</span>
                        {todos.map((todo, index) => (
                        <SingleTodo todo={todo} todos={todos} key={todo.id} setTodos={setTodos}
                        index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver? "dragcomplete": "remove"}`}  
                    ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Completed tasks</span>
                        <span>
                            {completedTodos.map((todo, index) => (
                            <SingleTodo todo={todo} todos={completedTodos} key={todo.id} 
                            setTodos={setCompletedTodos} index={index}/>
                            ))}
                        </span>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default TodoList;