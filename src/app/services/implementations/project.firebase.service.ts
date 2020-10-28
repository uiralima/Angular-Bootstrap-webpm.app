import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { IProjectService } from '../project.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IIdentityService } from '../identity.service';

@Injectable()
export class FirebaseProjectService implements IProjectService {

    constructor(
        protected firestore: AngularFirestore,
        @Inject('IdentityService') protected identityService: IIdentityService,
    ) {}    

    public createProject(fullname: string): Observable<Project> {
        let project = new Project();
        project.fullname = fullname;
        project.ownerId = this.identityService.currentUser.uid;
        let data: firebase.firestore.DocumentData;
        //project.roles = {};
        //project.roles[this.identityService.currentUser.uid] = 'owner';
        //return from (this.firestore.doc<Project>("prj/" + this.identityService.currentUser.uid).collection("projects").add(project)
        return from (this.firestore.collection("projects").doc(this.firestore.createId()).set(Object.assign({}, project))
        .then((data) =>
        {
            console.log("Data:" + data)
            return project;
        }));
    }
}