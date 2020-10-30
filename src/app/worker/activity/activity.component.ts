import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Project } from 'src/app/models/project.model';
import { IIdentityService } from 'src/app/services/identity.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IProjectService } from 'src/app/services/project.service';

declare var $: any;

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

	public activityForm: FormGroup = new FormGroup({
		fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
		totalTime: new FormControl('', [Validators.required, Validators.min(1)])
	});

	public disableCommands: boolean = false;

	public filter: string = "";

	public project: Project;

	constructor(
		protected notification: NotificationService,
		@Inject('IdentityService') protected identityService: IIdentityService,
		@Inject('ProjectService') protected projectService: IProjectService,
		protected activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((param: Params) => {
			let projectId = param["projectId"];
			this.loadProject(projectId);
		})
	}

	private loadProject(projectId: string): void {
		if ((projectId) && (projectId.length > 0)) {
			this.projectService.get(projectId).subscribe((
				(project: Project) => {
					this.project = project;
				}),
				(error) => this.notification.showError(error.message)
			);
		}
	}

	public get uid(): string {
		return this.identityService.currentUser.uid;
	}

	public deleteActivity(activityId: string): void {

	}

	public addActivity(): void {
		if (this.activityForm.valid) {
			this.disableCommands = true;
			let activity = new Activity("",
				this.activityForm.value.fullname,
				"",
				this.project.id,
				this.activityForm.value.totalTime,
				0,
				"202501010000",
				"ativo",
				this.uid,
				this.uid,
				[]);
			this.projectService.addActivity(this.project.id, activity).subscribe(
				() => {
					this.disableCommands = false;
					$('#newActivityModal').modal('hide');
				},
				(error) => {
					this.notification.showError(error.message);
					this.disableCommands = false;
				}
			);
		}
	}

}
