import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    // profilePicBucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        // this.profilePicBucket = new Storage(this.client);
    }

    // Utility function to handle errors
    handleError(context, error) {
        console.error(`Appwrite service :: ${context} :: error`, error);
        return false;
    }

    async createPost({ title, slug, content, featuredImage, status, userId ,type}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId ,type}
            );
        } catch (error) {
            return this.handleError('createPost', error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status ,type}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status ,type }
            );
        } catch (error) {
            return this.handleError('updatePost', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            return this.handleError('deletePost', error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            this.handleError('getPost', error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            this.handleError('getPosts', error);
            return false;
        }
    }

    async likePost(postId, userId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikePostCollectonId,
                `${userId}_${postId}`,
                { userId, postId }
            );
        } catch (error) {
            if (error.code === 409) {
                console.log("Appwrite service :: likePost :: Document already exists");
                return false;
            }
            return this.handleError('likePost', error);
        }
    }

    async disLikePost(postId, userId) {
        try {
            const docId = `${userId}_${postId}`;
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikePostCollectonId,
                docId
            );
            return true;
        } catch (error) {
            if (error.code === 404) {
                console.log("Appwrite service :: disLikePost :: Document not found");
                return false;
            }
            return this.handleError('disLikePost', error);
        }
    }

    async checkLikeStatus(postId, userId) {
        const docId = `${userId}_${postId}`;    
        try {
            const likeDoc = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikePostCollectonId,
                docId
            );
            return Boolean(likeDoc);
        } catch (error) {
            // console.error(`Failed to fetch document with ID ${docId}:`, error);
            if (error.code === 404) {
                return false;
            }
            this.handleError('checkLikeStatus', error);
            return false;
        }
    }
    
    

    async getLikeCount(postId) {
        try {
            const query = [Query.equal('postId', postId)];
            const { documents } = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikePostCollectonId,
                query
            );
            return documents.length;
        } catch (error) {
            console.error('Error fetching like count:', error);
            return 0;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            return this.handleError('uploadFile', error);
        }
    }

    // async uploadProfilePicture(file,) {
    //     try {
    //         return await this.profilePicBucket.createFile(
    //             conf.appwriteProfilePicBucketId,
    //             ID.unique(),
    //             file
    //         )
    //     } catch (error) {
    //         console.log('Appwrite service :: uploadProfilePicture :: error', error);
    //         return false;
    //     }
    // }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            return this.handleError('deleteFile', error);
        }
    }

    // async deleteProfilePicture(fileId) {
    //     try {
    //         await this.profilePicBucket.deleteFile(
    //             conf.appwriteProfilePicBucketId,
    //             fileId
    //         );
    //         return true;
    //     } catch (error) {
    //         console.log('Appwrite service :: deleteProfilePicture :: error', error);
    //         return false;
    //     }
    // }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

    // getProfilePicturePreview(fileId) {
    //     return this.profilePicBucket.getFilePreview(
    //         conf.appwriteProfilePicBucketId,
    //         fileId
    //     );
    // }
}

const service = new Service();
export default service;
