import Reflux from 'reflux'
import TodoActions from '../actions/todoActions'

var state = {
    items: [],
    status: ''
};

var TodoStore = Reflux.createStore({

    init: function(){
        state.items.push('睡觉');
    },

    listenables: [TodoActions],

    onAddTodo: function(text, isSucc){
        var that = this;

        state.status = 'pending';
        this.trigger(state);
    },

    onAddTodoCompleted: function(ret){
        state.status = 'success';
        state.items.push(ret.text);
        this.trigger(state);
    },

    onAddTodoFailed: function(ret){
        state.status = 'error';
        this.trigger(state);
    },

    onGetState: function(){
        return state;
    }
});

TodoStore.listen(function(state){
    console.log('status is: ' + state.status + ', current todos is: ' + state.items);
});


export default TodoStore