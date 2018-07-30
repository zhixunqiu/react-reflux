import React from 'react'
import Reflux from 'reflux'
import ReactMixin from 'react-mixin'
import TodoStore from '../stores/todoStore'
import TodoActions from '../actions/todoActions'

export default class TestAync extends React.Component{

  componentDidMount() {
    TodoStore.onGetState();
  }

  add(text,sync) {
    TodoActions.addTodo(text,sync)
  }

  render() {
    
    return (
        <div>
          <button onClick={this.add.bind(this,'起床',true)}>起床</button> 
          <button onClick={this.add.bind(this,'吃早餐',false)}>吃早餐</button>
          <button onClick={this.add.bind(this,'上班',true)}>上班</button>          
        </div>
    )
  }
}

// ES6 mixin写法，通过mixin将store的与组件连接，功能是监听store带来的state变化并刷新到this.state
ReactMixin.onClass(TestAync, Reflux.connect(TodoStore,'list'));
