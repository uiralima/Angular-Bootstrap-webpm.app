import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

    constructor(
        protected firestore: AngularFirestore,
        @Inject('IdentityService') protected identityService: IIdentityService,
    ) {
        this.collection = this.firestore.collection<Project>("projects");
    }    

    public create(fullname: string): Observable<void> {
        let project = new Project(this.identityService.currentUser.uid);
        project.id = this.firestore.createId();
        project.fullname = fullname;
        return from (this.collection.doc(project.id).set({...project}));
    }

    public getAll(): Observable<Project[]> {
        return this.collection.valueChanges().pipe(
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

    public get(projectId: string): Observable<Project> {
        return this.collection.doc(projectId).get().pipe
        (
            map((value) => {
                return <Project>value.data();
            })
        )
    }

    public update(project: Project): Observable<void> {
        return from (this.collection.doc(project.id).set({...project}));
    }

    public delete(projectId: string): Observable<void> {
        return from (this.collection.doc(projectId).delete());
    }
}