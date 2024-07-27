import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account = new Account(this.client);

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
    }

    async createAccount({ email, password, name, profilePicUrl }) {
        try {
            this.validateName(name);

            const userAccount = await this.account.create(ID.unique(), email, password);
            
            if (userAccount) {
                if (profilePicUrl) {
                    await this.account.updateUserProfile(userAccount.$id, { profilePicUrl });
                }
                return this.login({ email, password });
            }
        } catch (error) {
            throw new Error(`Error creating account: ${error.message}`);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw new Error(`Error logging in: ${error.message}`);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.warn(`Error fetching current user: ${error.message}`);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error(`Error logging out: ${error.message}`);
        }
    }

    validateName(name) {
        if (!name || typeof name !== 'string' || name.length < 1 || name.length > 128) {
            throw new Error('Invalid name parameter: Value must be a string between 1 to 128 characters.');
        }
    }
}

const authService = new AuthService();
export default authService;
