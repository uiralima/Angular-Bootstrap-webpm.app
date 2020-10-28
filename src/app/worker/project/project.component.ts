import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	public projectForm: FormGroup = new FormGroup({
		"projectName": new FormControl(null, [Validators.required])
	})

	constructor(
		@Inject('ProjectService') protected projectService: IProjectService	
	) { }

	ngOnInit(): void {
	}

	public addProject(): void {
		if (this.projectForm.valid) {
			this.projectService.createProject(this.projectForm.value.projectName)
			.subscribe((data) => console.log(data));
		}
	}

}
