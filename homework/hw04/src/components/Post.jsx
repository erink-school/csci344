import React from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

export default function Post({post}){
    return (
        <section className="bg-white border mb-10">
            <div className="p-4 flex justify-between">
                <h3 className="text-lg font-Comfortaa font-bold">{post.user.username}</h3>
                <button className="icon-button"><i className="fas fa-ellipsis-h"></i></button>
            </div>
            <img src={post.image_url} alt="placeholder image" width="300" height="300"
                className="w-full bg-cover"/>
            <div className="p-4">
                <div className="flex justify-between text-2xl mb-3">
                    <div>
                        <LikeButton post={post} />
                        <button><i className="far fa-comment"></i></button>
                        <button><i className="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        <BookmarkButton post={post} />
                    </div>
                </div>
                <p className="font-bold mb-3">{post.likes.length}</p>
                <div className="text-sm mb-3">
                    <p>
                        <strong>{post.user.username}</strong>
                        {post.alt_text} <button className="button">more</button>
                    </p>
                </div>
                {post.comments.map(comment => (
                    <p key={comment.id} className="text-sm mb-3">
                        <strong>{comment.user.username}</strong>
                        {comment.text}
                    </p>
                ))
                }
                <p className="uppercase text-gray-500 text-xs">1 day ago</p>
            </div>
            <div className="flex justify-between items-center p-3">
                <div className="flex items-center gap-3 min-w-[80%]">
                    <i className="far fa-smile text-lg"></i>
                    <input type="text" className="min-w-[80%] focus:outline-none" placeholder="Add a comment..."/>
                </div>
                <button className="text-blue-500 py-2">Post</button>
            </div>
        </section>
    );
}