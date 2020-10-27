import { Observable } from 'rxjs';
import { IIdentityService } from '../identity.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.models';

@Injectable()
export class FirebaseIdentityService implements IIdentityService {
    constructor(private auth: AngularFireAuth) {}

    public registerByEmailAndPassword(email: string, password: string): Observable<User> {
        return from (this.auth.createUserWithEmailAndPassword(email, password)
        .then((data: firebase.auth.UserCredential) => {
            return this.toMyUser(data);
        }))
    }

    public login(email: string, password: string): Observable<User> {
        return from (this.auth.signInWithEmailAndPassword(email, password)
        .then((data: firebase.auth.UserCredential) => {
            return this.toMyUser(data);
        }));
    }

    public logoff(): Observable<any> {
        return from (this.auth.signOut())
    }

    private toMyUser(credentials: firebase.auth.UserCredential): User {
        return new User(credentials.user.uid, credentials.user.email);
    }

}