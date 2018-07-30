import Reflux from 'reflux'

let addToServer = function(options){
    let ret = {code: 0, text: options.text, msg: '添加成功 :)'}

    if(!options.isSucc){
        ret = {code: -1, msg: '添加失败！'}
    }
    
    setTimeout(function(){
        options.callback && options.callback(ret)
    }, options.delay)
}

const actions = Reflux.createActions({addTodo: {asyncResult: true}})

actions.addTodo.listen(function(text, isSucc){
    var that = this;
    addToServer({
        text: text,
        isSucc: isSucc,
        delay: 500,
        callback: function(ret){
            if(ret.code===0){
                that.completed(ret);
            }else{
                that.failed(ret);
            }
        }
    });
});

export default actions