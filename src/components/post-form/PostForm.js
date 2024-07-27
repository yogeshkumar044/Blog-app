import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",  // Changed to post?.slug to match the default value
            content: post?.content || "",
            status: post?.status || "active",
            type: post?.type || "image", // Default value for file type
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (data) => {
        setIsLoading(true);
        let fileId;

        try {
            // Upload file if provided
            if (data.file && data.file[0]) {
                const file = await appwriteService.uploadFile(data.file[0]);
                fileId = file.$id; // Save the file ID
            }

            // Prepare post data
            const postData = {
                ...data,
                featuredImage: fileId || post?.featuredImage, // Use the file ID if available, otherwise keep the old one
                userId: userData?.$id || null, // Ensure userData is defined
            };

            let dbPost;
            if (post) {
                // Update existing post
                if (!post.$id) {
                    throw new Error("Post ID is missing for update.");
                }
                dbPost = await appwriteService.updatePost(post.$id, postData);

                // Delete the old file if a new file was uploaded
                if (fileId && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
            } else {
                // Create new post
                dbPost = await appwriteService.createPost(postData);
            }

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                console.error("Post submission failed: No post data returned.");
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    disabled={isLoading} // Disable input when loading
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    disabled={isLoading} // Disable input when loading
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    disabled={isLoading} // Disable editor when loading
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured File :"
                    type="file"
                    className="mb-4"
                    accept="image/*, video/*"
                    {...register("file")}
                    disabled={isLoading} // Disable file input when loading
                />
                <Select
                    options={["image", "video"]}
                    label="File Type"
                    className="mb-4"
                    {...register("type", { required: true })}
                    disabled={isLoading} // Disable select when loading
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    disabled={isLoading} // Disable select when loading
                />
                <Button
                    type="submit"
                    className={`w-full py-2 px-4 font-semibold text-white rounded-lg shadow-md transition-colors ${
                        isLoading
                            ? "bg-gray-500 cursor-not-allowed"
                            : post
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
