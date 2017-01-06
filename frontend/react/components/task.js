import React from 'react';

export default class extends React.Component {
	deleteHandler(e){
		var index = parseInt(e.target.id);
		this.props.del(index);
	}
	doneHandler(e){
		var index = parseInt(e.target.id);
		this.props.done(index);
	}
	render() {
		var list = this.props.list,
				count = list.length;
		return (
			<div>
				<div className="well well-sm">
					You have {count} tasks
				</div>
				<ul className="list-group">
					{list.map((item, index) =>{
						return (
							<li key={index}
								className={"list-group-item " + (item.prior ? "list-group-item-warning " : "") + (item.done ? "task-done" : "")}>
								<button className="badge"
												onClick={this.deleteHandler.bind(this)}
												id={index+'__del'}>
									delete
								</button>
								<button className="badge"
												onClick={this.doneHandler.bind(this)}
												id={index+'__done'} >
									done
								</button>
								{item.txt}
							</li>
							);
					})}
				</ul>
			</div>
		);
	}

}
