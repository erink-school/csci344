import { useState } from "react";

export default function BookmarkButton({ post }) {
    const [bookmarked, setBookmarked] = useState(post.current_user_bookmark_id !== null);
    const [bookmarkId, setBookmarkId] = useState(post.current_user_bookmark_id);

    function toggleBookmark() {
        if (bookmarked) {
            fetch(`/api/bookmarks/${bookmarkId}`, {
                method: "DELETE"
            }).then(() => {
                setBookmarked(false);
                setBookmarkId(null);
            });
        } else {
            fetch(`/api/posts/bookmarks`, {
                method: "POST",
                body: JSON.stringify({ post_id: post.id }),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(data => {
                setBookmarked(true);
                setBookmarkId(data.id);
            });
        }
    }

    return (
        <button
            onClick={toggleBookmark}
            role="switch"
            aria-checked={bookmarked}
            aria-label="Bookmark post"
        >
            <i className={bookmarked ? "fas fa-bookmark" : "far fa-bookmark"}></i>
        </button>
    );
}