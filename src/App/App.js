import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

var API = 'http://localhost:8080/'
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title       : '',
			description : '',
			tasks       : [],
			switch      : false
		};
	}

	componentDidMount () {
		axios.get(API + 'task')
			.then((res) => {
				this.setState({
					tasks : res.data,
				})
			})
			.catch((error) => {
				console.log(error);
			})
	}

	createTask = () => {
		let task = {
			id          : Math.random().toString(36).substr(2, 9),
			title       : this.state.title,
			description : this.state.description
		};
		axios.post(API + 'task', task)
			.then((res) => {
				let tasksClone = this.state.tasks.slice(0);;
				tasksClone.unshift(task);
				this.setState({
					tasks       : tasksClone,
					switch      : !this.state.switch,
					title       : '',
					description : '',
				})
			})
			.catch((error) => {
				console.log(error);
			})
	}

	handleChangeTitle = (event) => {
		this.setState({ title : event.target.value });
	}

	handleChangeDescription = (event) => {
		this.setState({ description : event.target.value });
	}


	switchForm = () => {
		this.setState({
			switch : !this.state.switch,
		})
	}

	render() {
		return (
			<div className="to-do">
				<header className="to-do-header">
					<h1 className="to-do-title">To-Do-List</h1>
				</header>
				<button className="create-button" onClick={this.switchForm}>
				{!this.state.switch ?
					<span>Create task </span>	
					:
					<span>Back</span>	
				}
				</button>
				{!this.state.switch ?
					<section className="to-do-content">
						{
							this.state.tasks.length > 0 ?
								this.state.tasks.map((task, key) => {
									return( 
										<div className="list-item" key={key}>
											<h3>{task.title}</h3>
											<p>{task.description}</p>
										</div>
									)
								})
								:
								<span>List is empty</span>
						}
					</section>
					:
					<section className="to-do-form">
						<div className="my-input">
							<label>Title</label>
							<input value={this.state.title} onChange={this.handleChangeTitle} type="text"/>
						</div>
						<div className="my-input">
							<label>Description</label>
							<input  value={this.state.description} onChange={this.handleChangeDescription} type="text"/>
						</div>
						<button className="create-button" onClick={this.createTask}>Create</button>
					</section>
				}
			</div>
		);
	}
}

export default App;
