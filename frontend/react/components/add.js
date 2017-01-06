import React from 'react';

export default class extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			task: "",
			priority: false,
			done: false,
			empty: ""
		}
		this.handlerBtn = this.handlerBtn.bind(this);
		this.handlerInput = this.handlerInput.bind(this);
		this.handlerChk = this.handlerChk.bind(this);
	}
	handlerBtn() {
		if ( this.refs.taskRef.value.trim() === "" ) {
			this.setState({empty: 'alert-danger'})
		} else {
			this.setState({
				empty: '',
				priority: false
			});
			this.refs.taskRef.value = "";
			this.refs.chkRef.checked = false;
			this.props.add(this.state.task, this.state.priority);
		}
	}
	handlerInput(e) {
		this.setState({
			task: e.target.value
		});
	}
	handlerChk(e) {
		this.setState({
			priority: e.target.checked
		});
	}
	render() {
		return (
			<div>
				<form>
					<div className="form-group">
						<label htmlFor="task">Task:</label>
						<input type="text"
									className={"form-control "+this.state.empty}
									id="task"
									ref="taskRef"
									onChange={this.handlerInput} />
					</div>
					<div className="form-group clearfix row">
						<div className="col-xs-6">
							<div className="checkbox">
							<label>
								<input type="checkbox" onChange={this.handlerChk} ref="chkRef"/>
									High priority
								</label>
						</div>
						</div>
						<div className="col-xs-6">
							<button type="submit"
											className="btn btn-default"
											onClick={this.handlerBtn}>
							Submit</button>
						</div>
					</div>
				</form>
			</div>
		);
	}

}
