
new Vue({
	el: "#app",
	data: {
		task: "",
		description: "",
		edit: false,
		delete: false,
		cancel: false,
		id2: 0,
		ind: 0,
		tasks: []
	},
	methods: {
		addTask: function(t,d,e) {
			e.preventDefault();
			if(this.task === "" || this.description ==="") {
				//alert("Please fill all fields");
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Please fill all the fields',
					showConfirmButton: false,
					timer: 1600
				});

			} else {
				this.tasks.push({
					task: this.task,
					description: this.description
				});
				localStorage.setItem('tasks',JSON.stringify(this.tasks));
				this.task = "";
				this.description = "";

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Success',
					showConfirmButton: false,
					timer: 1600
				});

			}
				
		},
		editTask: function(t,i) {
			this.edit = !this.edit;
			this.task = t.task;
			this.description = t.description;
			this.ind = i;
		},
		updateTask: function(e) {
			e.preventDefault();
			this.edit = !this.edit;
			let taskdb = {
				task: this.task,
				description: this.description
			};

			this.tasks[this.ind] = taskdb;
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
			let taskDB = JSON.parse(localStorage.getItem('tasks'));
			this.tasks = taskDB;
			this.task="";
			this.description="";
		},
		cancelTask: function(e) {
			e.preventDefault();
			this.task = "";
			this.description = "";
			this.edit = !this.edit;
		},
		deleteTask: function(i) {
			this.tasks.splice(i,1)
			localStorage.setItem('tasks', JSON.stringify(this.tasks));

			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'The task has been delete successful',
				showConfirmButton: false,
				timer: 1600
			});
		}
	},
	created: function(){
		let taskDB = JSON.parse(localStorage.getItem('tasks'));
		if(taskDB === null) {
			this.tasks = [];
		} else {
			this.tasks = taskDB
		}
	}


})

