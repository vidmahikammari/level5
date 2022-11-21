'use strict';
const { Model, Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static async addTask(params) {
			return await Todo.create(params);
		}
		static async showList() {
			console.log('My Todo list \n');

			console.log('Overdue');
			// FILL IN HERE
			await this.overdue().then((tasks) => {
				tasks.forEach((task) => {
					console.log(task.displayableString());
				});
			});

			console.log('\n');

			console.log('Due Today');
			// FILL IN HERE
			await this.dueToday().then((tasks) => {
				tasks.forEach((task) => {
					console.log(task.displayableString());
				});
			});
			console.log('\n');

			console.log('Due Later');
			// FILL IN HERE
			await this.dueLater().then((tasks) => {
				tasks.forEach((task) => {
					console.log(task.displayableString());
				});
			});
		}

		static async overdue() {
			// FILL IN HERE TO RETURN OVERDUE ITEMS
			try {
				return await Todo.findAll({
					where: {
						dueDate: {
							[Op.lt]: new Date(),
						},
					},
					order: [['id', 'ASC']],
				});
			} catch (error) {
				console.error(error);
			}
		}

		static async dueToday() {
			// FILL IN HERE TO RETURN ITEMS DUE TODAY
			try {
				return await Todo.findAll({
					where: {
						dueDate: {
							[Op.eq]: new Date(),
						},
					},
					order: [['id', 'ASC']],
				});
			} catch (error) {
				console.error(error);
			}
		}

		static async dueLater() {
			// FILL IN HERE TO RETURN ITEMS DUE LATER
			try {
				return await Todo.findAll({
					where: {
						dueDate: {
							[Op.gt]: new Date(),
						},
					},
					order: [['id', 'ASC']],
				});
			} catch (error) {
				console.error(error);
			}
		}

		static async markAsComplete(id) {
			// FILL IN HERE TO MARK AN ITEM AS COMPLETE
			try {
				return await Todo.update(
					{ completed: true },
					{
						where: {
							id,
						},
					}
				);
			} catch (error) {
				console.error(error);
			}
		}

		displayableString() {
			let checkbox = this.completed ? '[x]' : '[ ]';
			// Check if due date is today
			let dueDate =
				new Date(this.dueDate).toDateString() ===
				new Date().toDateString()
					? ''
					: this.dueDate;

			let output = `${
				this.id
			}. ${checkbox} ${this.title.trim()} ${dueDate}`;
			return output.trim();
		}
	}
	Todo.init(
		{
			title: DataTypes.STRING,
			dueDate: DataTypes.DATEONLY,
			completed: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Todo',
		}
	);
	return Todo;
};
