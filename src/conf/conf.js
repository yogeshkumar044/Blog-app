const conf = {
    appwriteURL: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId: String(process.env.REACT_APP_PROJECT_ID),
    appwriteCollectionId: String(process.env.REACT_APP_COLLECTION_ID),
    appwriteDatabaseId: String(process.env.REACT_APP_DATABASE_ID),
    appwriteBucketId: String(process.env.REACT_APP_BUCKET_ID),
    appwriteProfilePicBucketId: String(process.env.REACT_APP_PROFILE_PIC_BUCKET_ID),
    appwriteLikePostCollectonId: String(process.env.REACT_APP_LIKE_COLLECTION_ID)
};

export default conf;
