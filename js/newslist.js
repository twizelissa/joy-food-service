// News listing page specific JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // News item hover effect - make entire row clickable
  const newsItems = document.querySelectorAll(".news-item");

  newsItems.forEach((item) => {
    // Add click event to entire news item
    item.addEventListener("click", function (e) {
      // Only navigate if the click wasn't directly on the link
      // (to prevent double navigation)
      if (!e.target.closest("a")) {
        // Get the link within this news item
        const link = this.querySelector(".news-content a");
        if (link) {
          window.location.href = link.getAttribute("href");
        }
      }
    });

    // Make the cursor show as a pointer when hovering over a news item
    item.style.cursor = "pointer";
  });

  // Pagination functionality
  const pageNumbers = document.querySelectorAll(".page-number");
  const nextPageButton = document.querySelector(".next-page");

  // Function to simulate page navigation
  function navigateToPage(pageNum) {
    // In a real implementation, this would:
    // 1. Make an AJAX request to fetch new news items
    // 2. Update the news list with new content
    // For this demo, we'll just log the navigation
    console.log("Navigated to page: " + pageNum);

    // Simulate content change by adding a temporary notification
    const newsContainer = document.querySelector(".news-list");
    const notification = document.createElement("div");
    notification.style.padding = "10px";
    notification.style.backgroundColor = "#f0f0f0";
    notification.style.textAlign = "center";
    notification.style.marginBottom = "10px";
    notification.textContent = "Navigated to page " + pageNum;

    // Insert at the top of the news list
    newsContainer.insertBefore(notification, newsContainer.firstChild);

    // Remove the notification after 2 seconds
    setTimeout(() => {
      notification.remove();
    }, 2000);

    // Scroll to top of news list
    newsContainer.scrollIntoView({
      behavior: "smooth",
    });
  }

  // Add click event to page numbers
  if (pageNumbers.length > 0) {
    pageNumbers.forEach((page) => {
      if (!page.classList.contains("current")) {
        page.addEventListener("click", function (e) {
          e.preventDefault();

          // Get the page number
          const pageNum = this.textContent;

          // Remove current class from all page numbers
          pageNumbers.forEach((p) => p.classList.remove("current"));

          // Add current class to clicked page number
          this.classList.add("current");

          // Navigate to the selected page
          navigateToPage(pageNum);
        });
      }
    });
  }

  // Add click event to "Next" button
  if (nextPageButton) {
    nextPageButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Find the current page
      const currentPage = document.querySelector(".page-number.current");
      const currentPageNum = parseInt(currentPage.textContent);
      const nextPageNum = currentPageNum + 1;

      // Find the next page number in the pagination
      const nextPage = Array.from(pageNumbers).find(
        (page) => parseInt(page.textContent) === nextPageNum
      );

      if (nextPage) {
        // Update the pagination UI
        pageNumbers.forEach((p) => p.classList.remove("current"));
        nextPage.classList.add("current");

        // Navigate to the next page
        navigateToPage(nextPageNum);
      } else {
        // If next page number doesn't exist in the pagination,
        // but we still want to allow navigation (e.g., for page 4 when only 1,2,3,5 are shown)
        navigateToPage(nextPageNum);
        console.log("Next page not in pagination, but should still navigate");
      }
    });
  }
});
