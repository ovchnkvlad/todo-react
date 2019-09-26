import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css'
import ItemAddForm from '../item-add-form';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ] 
  }

  createTodoItem(label){
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }


  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
 
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)];
        
      return {
        todoData: newArray
      }
    })
  };
  addItem = (text) => {
    // generate id ?  

    const newItem = this.createTodoItem(text);
  
    // add element to array

    this.setState(({todoData}) => {
      const newArray = [...todoData,newItem];
      return {
        todoData: newArray
      }
    })
  };
  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el) => el.id === id); 

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };
    return [
      ...arr.slice(0, idx),
      newItem, 
      ...arr.slice(idx + 1)];
  };
  onTogleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  onTogleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };
 render() {

  const { todoData } = this.state.todoData;

  const doneCount = todoData.filter((el) => el.done).length;

  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo-app">
    <AppHeader toDo={todoCount} done={doneCount} />
    <div className="top-panel d-flex">
      <SearchPanel />
      <ItemStatusFilter />
    </div>

    <TodoList todos={todoData}
      onDeleted = {this.deleteItem}
      onTogleImportant = {this.onTogleImportant}
      onTogleDone = {this.onTogleDone}
    />
    <ItemAddForm
      onItemAdded = {this.addItem}
    />
  </div>
  );
 }
}
