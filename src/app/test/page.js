import LikeButton from "../components/likes";

export default function TestPage() {
  return (
    <div>
      <h1>Post de voyage</h1>
      <LikeButton postId={4} userId={5} />
    </div>
  );
}