import { EventEmitter, Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { from, Observable, Observer, of } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { Activity } from 'src/app/models/activity.model';
import { Project } from 'src/app/models/project.model';
import { IIdentityService } from '../identity.service';
import { IProjectService } from '../project.service';

/** Exemplos de filtros de busca
 * https://firebase.google.com/docs/firestore/query-data/index-overview?authuser=0#automatic_indexing
 * https://github.com/firebase/snippets-web/blob/690e78f3464926289034441e24c77ec7bc61ddff/firestore/test.firestore.js#L787-L789
 * citiesRef.where("country", "==", "USA").orderBy("population", "asc")
citiesRef.where("country", "==", "USA").where("population", "<", 3800000)
citiesRef.where("country", "==", "USA").where("population", ">", 690000)
 * var citiesRef = db.collection("cities");
                // [START example_filters]
                citiesRef.where("state", "==", "CA").where("population", "<", 100000).get()
                citiesRef.where("name", ">=", "San Francisco")
                citiesRef.where("regions", "array-contains", "west_coast").get()

Paginação
it("shoud paginate", () => {
              // [START paginate]
              var first = db.collection("cities")
                      .orderBy("population")
                      .limit(25);

              return first.get().then(function (documentSnapshots) {
                // Get the last visible document
                var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
                console.log("last", lastVisible);

                // Construct a new query starting at this document,
                // get the next 25 cities.
                var next = db.collection("cities")
                        .orderBy("population")
                        .startAfter(lastVisible)
                        .limit(25);
              });
              // [END paginate]
            });
*/

@Injectable()
export class FirebaseProjectService implements IProjectService {

    private collection: AngularFirestoreCollection<Project>;

    private _projects: Project[] = [];

    private ListChanged: EventEmitter<Project[]> = new EventEmitter();

    constructor(
        protected firestore: AngularFirestore,
        @Inject('IdentityService') protected identityService: IIdentityService,
    ) {
        this.collection = this.firestore.collection<Project>("projects");
        this.collection.valueChanges().subscribe(
            (values) => {
                this._projects = values;
                this.ListChanged.emit(this._projects);
            });
    }

    public create(fullname: string): Observable<void> {
        let project = new Project(this.identityService.currentUser.uid);
        project.id = this.firestore.createId();
        project.fullname = fullname;
        return from(this.collection.doc(project.id).set({ ...project }));
    }

    public getAll(): Observable<Project[]> {
        return new Observable((obeserver: Observer<Project[]>) => {
            this.ListChanged.subscribe(
                (projects) => obeserver.next(projects.sort((a, b) => (a.fullname > b.fullname) ? 1 : -1))
            );
            obeserver.next(this._projects.sort((a, b) => (a.fullname > b.fullname) ? 1 : -1));
        })
    }

    private getById(projectId: string): Project {
        for (let i = 0; i < this._projects.length; i++) {
            if (this._projects[i].id === projectId) {
                return this._projects[i];
            }
        }
        return null;
    }

    public get(projectId: string): Observable<Project> {
        return new Observable((observer: Observer<Project>) => {
            let result = this.getById(projectId);
            let resultHash = Md5.hashStr(JSON.stringify(result));
            this.ListChanged.subscribe((projects: Project[]) => {
                let newVersion = this.getById(projectId);
                let newVersionHash = Md5.hashStr(JSON.stringify(newVersion));
                if (resultHash !== newVersionHash) {
                    resultHash = newVersionHash;
                    observer.next(newVersion);
                }
            });
            observer.next(result);
        })
    }

    public update(project: Project): Observable<void> {
        return from(this.collection.doc(project.id).set({ ...project }));
    }

    public updateActivity(projectId: string, activities: Activity[]): Observable<void> {
        var aux = activities.map((obj)=> {
            var auxEv = obj.events.map((ev) => {
                return Object.assign({}, ev)
            })
            obj.events = auxEv;
            return Object.assign({}, obj)
        });
        return from(this.collection.doc(projectId).update({
            activities: aux
        }));
    }

    public delete(projectId: string): Observable<void> {
        return from(this.collection.doc(projectId).delete());
    }

    public addActivity(projectId: string, activity: Activity): Observable<void> {
        activity.id = this.firestore.createId();
        return from(this.collection.doc(projectId).update({
            activities: firebase.firestore.FieldValue.arrayUnion({ ...activity })
        }))
    }
}