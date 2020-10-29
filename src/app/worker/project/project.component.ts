import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { IIdentityService } from 'src/app/services/identity.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IProjectService } from 'src/app/services/project.service';

declare var $: any;

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	public myProjects: Project[] = [];

	public filter: string = "";

	public disableCommands: boolean = false;

	public projectForm: FormGroup = new FormGroup({
		"projectName": new FormControl(null, [Validators.required])
	})

	constructor(
		@Inject('ProjectService') protected projectService: IProjectService,
		protected notification: NotificationService,
		@Inject('IdentityService') protected identityService: IIdentityService
	) { }

	ngOnInit(): void {
		this.projectService.getAll().subscribe(
			(projects: Project[]) => {
				this.myProjects = projects;
			}
		);
		$('#newProjectModal').on('shown.bs.modal', function (e) {
			$('#projectNameInput').val('');
			$('#projectNameInput').focus();
		})
	}

	public get uid(): string {
		return this.identityService.currentUser.uid;
	}

	public addProject(): void {
		if (this.projectForm.valid) {
			this.disableCommands = true;
			this.projectService.create(this.projectForm.value.projectName)
				.subscribe(() => {
					this.disableCommands = false;
					$('#newProjectModal').modal('hide');
					this.projectForm.value.projectName = '';
				},
					(error) => {
						this.notification.showError(error);
						this.disableCommands = false;
					});
		}
	}

	public deleteProject(projectId: string): void {
		this.projectService.delete(projectId).subscribe(
			() => { },
			(error) => this.notification.showError(error.message)
		);
	}

	public updateProject(project: Project): void {
		this.projectService.update(project).subscribe(
			() => { },
			(error) => this.notification.showError(error)
		);
	}
}
