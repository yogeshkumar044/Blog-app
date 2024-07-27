import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from 'react-icons/fa';
import LikeButton from "./Like";
import ReactPlayer from 'react-player';
import conf from "../conf/conf";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then(post => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .catch(err => {
                    setError("Failed to load post");
                    navigate("/");
                })
                .finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id)
            .then(status => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            })
            .catch(err => {
                setError("Failed to delete post");
            });
    };

    const renderPostContent = () => {
        if (!post) return null;

        if (post.type === "video") {
            return (
                <ReactPlayer
                    className="react-player"
                    url={`https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${post.featuredImage}/view?project=${conf.appwriteProjectId}`}
                    controls={true}
                    width="100%"
                    height="auto"
                    // muted
                    loop={false}
                    playing={true}
                />
            );
        }

        return (
            <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-auto object-cover"
            />
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return post ? (
        <div className="py-8 rounded-2xl bg-gray-700">
            <Container>
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    {renderPostContent()}
                    <div className="px-4 py-4">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h1>
                        <div className="text-gray-700 leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </div>
                    <LikeButton postId={post.$id} userId={post.userId} />
                    {isAuthor && (
                        <div className="px-4 py-2 bg-gray-200 flex justify-end">
                            <Link
                                to={`/edit-post/${post.$id}`}
                                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300 mr-1"
                            >
                                <FaEdit className="text-xl" />
                                <span>Edit</span>
                            </Link>
                            <button
                                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
                                onClick={deletePost}
                            >
                                <FaTrash className="text-xl" />
                                <span>Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : null;
}
