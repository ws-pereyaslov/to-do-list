import React, { Component } from 'react';
import Loader from 'react-loader';
import firebase from 'firebase';
import config from './config-firebase';
import './App.css';

firebase.initializeApp(config);
const service = firebase.functions();
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tasks       : [],
			title       : '',
			description : '',
			loaded      : false,
			switch      : false
		};
	}

	componentDidMount () {
		let getTasks = service.httpsCallable('getTasks');
		getTasks()
			.then((res) => {
				this.setState({
					tasks  : res.data,
					loaded : true
				})
			})
	}

	createTask = () => {
		let task = {
			id          : Math.random().toString(36).substr(2, 9),
			title       : this.state.title,
			description : this.state.description
		};
		let createTask = service.httpsCallable('createTask');
		createTask(task)
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
								<div>
									{this.state.loaded && <span className="empty">List is empty</span>}
									<Loader className="my-spinner" loaded={this.state.loaded} />
								</div>
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
