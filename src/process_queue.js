

function make_promise() {
  var status = 'unresolved',
      outcome = {},
      waiting = [],
      dreading = [],
      tasks = [],
      finishedTasks = [];
  function vouch(deed, func) {
    if(status === 'unresolved' || status === 'running') {
      (deed === 'fulfilled' ? waiting : dreading).push(func);
    }else if(status === deed){
      func(outcome);
    }
  }
  function resolve(deed) {
    if (status === 'unresolved') {
      throw new Error(
          'Resolve called when status still unresolved: ' + status);
    }
    else if (status !== 'running') {
      throw new Error(
          'The promise has already been resolved: ' + status); 
    }
    status = deed;
    (deed === 'fulfilled' ? waiting : dreading)
            .forEach(function (func) {
              try{
                console.log('calling function');
                func(outcome);
              } catch (e) {
                throw e;
              }

            });
    waiting = null;
    dreading = null;
  }
  function taskComplete (id, value) {
    var name = tasks[id];
    console.log(id);
    outcome[name].push(value);
    finishedTasks.push(name);
    console.log('task complete', status, finishedTasks.length);
    if(finishedTasks.length === tasks.length && status === 'running'){
      console.log('resolving');
      resolve('fulfilled'); 
    }
  }
  function addTask (name) {

    tasks.push(name);
    if(typeof outcome[name] === 'undefined'){
      outcome[name] = [];
    }
    return tasks.length - 1;
  }
  return {
    when: function (func) {
      vouch('fulfilled', func);
    },
    fail: function (func) {
      vouch('smashed', func);
    },
    done: function (id, value) {
      taskComplete(id, value);
    },
    smash: function (msg) {
      taskFailed('smashed', msg); 
    },
    status: function () {
      return status;
    },
    newTask: function (name) {
      return addTask(name);
    },
    endTask: function () {
      status = 'running';
    }
  }
}



exports.promise = make_promise;
