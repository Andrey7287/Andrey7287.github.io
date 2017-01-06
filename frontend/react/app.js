import React from 'react';

import Header from './components/header';
import Task from './components/task';
import Footer from './components/footer';
import Add from './components/add';

export default class extends React.Component {
	constructor(prop){
		super(prop);
		this.state = {
			list: lockr.get("toDoList") || []
		};
		this.addNew = this.addNew.bind(this);
		this.delTask = this.delTask.bind(this);
		this.doneTask = this.doneTask.bind(this);
		this.update = this.update.bind(this);
	}
	update(taskList){
		lockr.set("toDoList", taskList);
		this.setState({list: taskList});
	}
	addNew(task, prior) {
		var taskList = this.state.list,
				newTask = {
					txt: task,
					prior: prior
				};
		taskList.push(newTask);
		this.update(taskList);
	}
	delTask(deleted) {
		var taskList = this.state.list;
		taskList = taskList.filter((item, index)=>index !== deleted);
		this.update(taskList);
	}
	doneTask(done){
		var taskList = this.state.list,
				item = taskList[done];
		item.done = !item.done;
		taskList[done] = item;
		this.update(taskList);
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3 app">
						<Header />
						<Add add={this.addNew} />
						<Task list={this.state.list}
									del={this.delTask}
									done={this.doneTask} />
						<Footer />
					</div>
				</div>
			</div>
		);
	}

}
