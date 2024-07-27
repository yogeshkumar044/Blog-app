import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import LikeButton from '../pages/Like';
import ReactPlayer from 'react-player';
import conf from '../conf/conf';

function PostCard({ $id, title, featuredImage, userId, type }) {
  const renderMediaContent = () => {
    if (type === "video") {
      return (
        <ReactPlayer
              className="react-player"
              url={`https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${featuredImage}/view?project=${conf.appwriteProjectId}`}
              controls={true}
              width="100%"
              height="auto"
              muted
              loop={false}
              playing={true}
        />
      );
    }

    return (
      <img
        src={appwriteService.getFilePreview(featuredImage)}
        alt={title}
        className="w-full h-48 object-cover object-center"
        style={{ minHeight: '200px' }}
      />
    );
  };

  return (
    <div className="bg-white  rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      <Link to={`/post/${$id}`}>
        <div className="relative">
          {renderMediaContent()}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <LikeButton postId={$id} userId={userId} />
          <Link to={`/post/${$id}`} className="flex-1 ml-4">
            <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
