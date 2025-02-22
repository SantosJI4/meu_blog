document.addEventListener("DOMContentLoaded", () => {
  const followButton = document.getElementById("followButton");
  const followText = document.getElementById("followText");
  const followersNumber = document.getElementById("followersNumber");

  // Get stored state
  let isFollowing = localStorage.getItem("isFollowing") === "true";
  let followers = parseInt(localStorage.getItem("followers")) || 0;

  // Update initial state
  updateFollowState();

  followButton.addEventListener("click", () => {
    isFollowing = !isFollowing;
    followers = isFollowing ? followers + 1 : followers - 1;

    // Save state
    localStorage.setItem("isFollowing", isFollowing);
    localStorage.setItem("followers", followers);

    updateFollowState();
  });

  function updateFollowState() {
    followText.textContent = isFollowing ? "Seguindo" : "Seguir";
    followersNumber.textContent = followers;
    followButton.classList.toggle("following", isFollowing);
  }
});
