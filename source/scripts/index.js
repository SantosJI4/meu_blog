document.addEventListener("DOMContentLoaded", () => {
  const followBtn = document.getElementById("followBtn");
  const followerCount = document.getElementById("followerCount");

  // Get stored values
  let followers = parseInt(localStorage.getItem("followers")) || 0;
  let isFollowing = localStorage.getItem("isFollowing") === "true";

  // Update initial state
  updateFollowUI();

  followBtn.addEventListener("click", () => {
    isFollowing = !isFollowing;
    followers = isFollowing ? followers + 1 : followers - 1;

    // Store new values
    localStorage.setItem("followers", followers);
    localStorage.setItem("isFollowing", isFollowing);

    updateFollowUI();
  });

  function updateFollowUI() {
    followBtn.textContent = isFollowing ? "Seguindo" : "Seguir";
    followBtn.classList.toggle("following", isFollowing);
    followerCount.textContent = followers;
  }
});
