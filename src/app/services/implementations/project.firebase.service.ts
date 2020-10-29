import { Inject, Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { IProjectService } from '../project.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IIdentityService } from '../identity.service';
import { catchError, filter, map } from 'rxjs/operators';
import { splitAtColon } from '@angular/compiler/src/util';

@Injectable()
export class FirebaseProjectService implements IProjectService {

    constructor(
        protected firestore: AngularFirestore,
        @Inject('IdentityService') protected identityService: IIdentityService,
    ) {}    

    public create(fullname: string): Observable<void> {
        let project = new Project(this.identityService.currentUser.uid);
        project.id = this.firestore.createId();
        project.fullname = fullname;
        return from (this.firestore.collection(`projects`).doc(project.id).set({...project}));
    }

    public getAll(): Observable<Project[]> {
        return this.firestore.collection<Project>("projects").valueChanges().pipe(
            map((values) => {
                let result = values.filter((f) => {
                    return ((f.owner == this.identityService.currentUser.uid) || 
                    (f.reader.indexOf(this.identityService.currentUser.uid) >= 0) ||
                    (f.writer.indexOf(this.identityService.currentUser.uid) >= 0))
                });
                return result.sort((a, b) => (a.fullname > b.fullname) ? 1 : -1);
            }),
        );
    }

    public update(project: Project): Observable<void> {
        return from (this.firestore.collection<Project>("projects").doc(project.id).set({...project}));
    }

    public delete(projectId: string): Observable<void> {
        return from (this.firestore.collection<Project>("projects").doc(projectId).delete());
    }
}