import { Observable } from 'rxjs';
import { IIdentityService } from '../identity.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class FirebaseIdentityService implements IIdentityService {

    private collection: AngularFirestoreCollection<User>;

    private userStarted: boolean = false;

    private _currentUser: User = null;

    constructor(private auth: AngularFireAuth,
        protected firestore: AngularFirestore) {
        this.auth.languageCode = new Promise(() => 'pt-BR');
        this.collection = this.firestore.collection<User>("users");
        this.auth.onAuthStateChanged((user: firebase.User) => this.startUser(user));
    }

    private startUser(user: firebase.User): void {
        if (user) {
            this.collection.doc(user.uid).get().subscribe((loadedUser) => { 
                if (!loadedUser.exists) {
                    this.collection.doc(user.uid).set({ ...this.userToMyUser(user) }).then().catch();
                    this._currentUser = this.userToMyUser(user);
                }
                else {
                    this._currentUser = <User>loadedUser.data();
                }
            })
        }
        else {
            this._currentUser = null;
        }
        this.userStarted = true;
    }

    public loaded(): Observable<boolean> {
        return from(this.auth.currentUser.then((user) => {
            this.startUser(user);
            return true;
        }))
    }

    public isAuthenticated(): boolean {
        return this._currentUser != undefined;
    }

    public get currentUser(): User {
        return this._currentUser;
    }

    public registerByEmailAndPassword(email: string, password: string): Observable<User> {
        return from(this.auth.createUserWithEmailAndPassword(email, password)
            .then((data: firebase.auth.UserCredential) => {
                let user = this.credentialToMyUser(data);
                return user;
            }))
    }

    public login(email: string, password: string): Observable<User> {
        return from(this.auth.signInWithEmailAndPassword(email, password)
            .then((data: firebase.auth.UserCredential) => {
                return this.credentialToMyUser(data);
            }));
    }

    public logoff(): Observable<any> {
        return from(this.auth.signOut())
    }

    private credentialToMyUser(credentials: firebase.auth.UserCredential): User {
        return new User(credentials.user.uid, "", credentials.user.email);
    }

    private userToMyUser(user: firebase.User): User {
        return new User(user.uid, "", user.email);
    }

}