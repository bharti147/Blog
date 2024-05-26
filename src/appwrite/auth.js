import {Client, Account, ID} from appwrite;
import conf from '../conf/conf.js'

export class AuthService{
   
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }
    
}

const authService = new AuthService();
export default authService;

