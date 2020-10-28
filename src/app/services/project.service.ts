import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

export interface IProjectService {
    createProject(fullnema: string): Observable<Project>;
}