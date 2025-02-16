document.addEventListener("DOMContentLoaded", () => {
  const followButton = document.getElementById("followButton");
  const followText = document.getElementById("followText");
  const followersNumber = document.getElementById("followersNumber");

  let isFollowing = localStorage.getItem("isFollowing") === "true";
  let followers = parseInt(localStorage.getItem("followers")) || 0;

  updateFollowState();

  followButton.addEventListener("click", () => {
    isFollowing = !isFollowing;
    followers = isFollowing ? followers + 1 : followers - 1;

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
