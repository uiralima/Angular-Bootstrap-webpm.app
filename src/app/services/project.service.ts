import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

export interface IProjectService {
    create(fullnema: string): Observable<void>;
    getAll(): Observable<Project[]>;
    update(project: Project): Observable<void>;
    delete(projectId: string): Observable<void>;
    get(projectId: string): Observable<Project>;
}