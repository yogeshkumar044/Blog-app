import React, { useState, useEffect, useCallback } from 'react';
import AppwriteService from '../appwrite/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import authService from '../appwrite/auth';

const LikeButton = ({ postId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await authService.getCurrentUser();
                setUserData(user);
            } catch (err) {
                console.error('Error fetching user data:', err.message);
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchLikeData = async () => {
            if (!userData || !postId) return;

            setLoading(true);
            
            try {
                const isLiked = await AppwriteService.checkLikeStatus(postId, userData.$id);
                const count = await AppwriteService.getLikeCount(postId);

                setLiked(isLiked);
                setLikeCount(count);
                setError(null);
            } catch (error) {
                console.error('Error fetching like data:', error);
                setError('Failed to load like data.');
            } finally {
                setLoading(false);
            }
        };

        fetchLikeData();
    }, [userData, postId]);

    const handleLike = useCallback(async () => {
        if (!userData) {
            console.error('User data is missing');
            return;
        }

        try {
            if (liked) {
                await AppwriteService.disLikePost(postId, userData.$id);
                setLikeCount(prevCount => prevCount - 1);
            } else {
                await AppwriteService.likePost(postId, userData.$id);
                setLikeCount(prevCount => prevCount + 1);
            }
            setLiked(prevLiked => !prevLiked);
        } catch (error) {
            console.error('Error handling like:', error);
            setError('Failed to update like status.');
        }
    }, [liked, postId, userData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return null;

    return (
        <button
            onClick={handleLike}
            className="flex items-center space-x-1 bg-transparent border-none p-2 cursor-pointer"
            aria-label={liked ? 'Unlike' : 'Like'}
        >
            <FontAwesomeIcon
                icon={liked ? faHeartSolid : faHeart}
                className={`text-red-500 text-lg ${liked ? 'fill-current' : 'stroke-current'}`}
            />
            <span className="text-base">{liked ? 'Liked' : 'Like'}</span>
            <span className="text-base ml-1">{likeCount}</span>
        </button>
    );
};

export default LikeButton;
