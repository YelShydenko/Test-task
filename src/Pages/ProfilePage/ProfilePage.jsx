import "./ProfilePage.scss";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="user__profile">
      <div className="user__profile-title">
        <p>Profile of:</p>
        <p className="user__profile-title__email">{user.email}</p>
      </div>
      <div className="user__profile-rating">
        <p>Average Rating:</p>
        <p className="user__profile-rating__score">No reviews yet</p>
      </div>
    </section>
  );
};

export default ProfilePage;
