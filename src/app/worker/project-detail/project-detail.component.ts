import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { IIdentityService } from 'src/app/services/identity.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'app-project-detail',
	templateUrl: './project-detail.component.html',
	styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

	public disableCommands: boolean = false;
	public project: Project;
	public projectForm: FormGroup = new FormGroup({
		fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
		description: new FormControl('')
	})

	constructor(
		@Inject('ProjectService') protected projectService: IProjectService,
		protected notification: NotificationService,
		@Inject('IdentityService') protected identityService: IIdentityService,
		protected activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((param: Params) => {
			let projectId = param["id"];
			this.loadProject(projectId);
		})
	}

	private loadProject(projectId: string): void {
		if ((projectId) && (projectId.length > 0)) {
			this.projectService.get(projectId).subscribe((
				(project: Project) => {
					this.project = project;
					this.projectForm.patchValue({
						fullname: this.project.fullname,
						description: this.project.description
					})
					this.projectForm.updateValueAndValidity();
					this.projectForm.valueChanges.subscribe((value) => {
						this.project.fullname = value.fullname;
						this.project.description = value.description;
					})
				}),
				(error) => this.notification.showError(error.message)
			);
		}
	}

	public get canChange() {
		return (this.project) &&
			(
				(this.identityService.currentUser.uid == this.project.owner) ||
				(this.project.writer.indexOf(this.identityService.currentUser.uid) >= 0)
			);
	}

	public get canView() {
		return (this.project) &&
			(
				(this.identityService.currentUser.uid == this.project.owner) ||
				(this.project.writer.indexOf(this.identityService.currentUser.uid) >= 0) ||
				(this.project.reader.indexOf(this.identityService.currentUser.uid) >= 0)
			);
	}

	public updateProject(): void {
		if (this.projectForm.valid) {
			this.disableCommands = true;
			this.projectService.update(this.project)
				.subscribe(
					() => {
						this.disableCommands = false;
						this.loadProject(this.project.id)
					},
					(error) => {
						this.notification.showError(error.message);
						this.disableCommands = false;
					});
		}

	}

}
