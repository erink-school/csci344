import { useState } from "react";

export default function LikeButton({ post }) {
    const [liked, setLiked] = useState(post.current_user_like_id !== null);
    const [likeId, setLikeId] = useState(post.current_user_like_id);

    function toggleLike() {
        if (liked) {
            fetch(`/api/posts/${post.id}/likes/${likeId}`, {
                method: "DELETE"
            }).then(() => {
                setLiked(false);
                setLikeId(null);
            });
        } else {
            fetch(`/api/posts/${post.id}/likes`, {
                method: "POST"
            })
            .then(res => res.json())
            .then(data => {
                setLiked(true);
                setLikeId(data.id);
            });
        }
    }

    return (
        <button
            onClick={toggleLike}
            role="switch"
            aria-checked={liked}
            aria-label="Like post"
        >
            <i className={liked ? "fas fa-heart text-red-600" : "far fa-heart"}></i>
        </button>
    );
}