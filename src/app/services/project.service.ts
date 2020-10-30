import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';
import { Project } from '../models/project.model';

export interface IProjectService {
    create(fullnema: string): Observable<void>;
    getAll(): Observable<Project[]>;
    update(project: Project): Observable<void>;
    delete(projectId: string): Observable<void>;
    get(projectId: string): Observable<Project>;
    addActivity(projectId: string, activity: Activity): Observable<void>;
    updateActivity(projectId: string, activities: Activity[]): Observable<void>;
}