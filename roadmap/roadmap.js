// Task Management Code

let card = {};

card.wrap = document.querySelector('.cards');
card.newButton = document.querySelector('.new-card');
const newTaskForm = document.getElementById('new-task-form');

card.wrap.addEventListener('click', (e) => {
  // Handle clicks on the card header
  if (e.target.closest('.card__header') && !e.target.classList.contains('task-checkbox')) {
    let parentCard = e.target.closest('.card');
    parentCard.classList.toggle('is-active');
  }
});

// Handle checkbox changes
card.wrap.addEventListener('change', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    let parentCard = e.target.closest('.card');
    parentCard.classList.toggle('completed', e.target.checked);
  }
});

card.newButton.addEventListener('click', () => {
  newTaskForm.style.display = 'block';
  card.newButton.style.display = 'none';
});

// Handle adding new tasks
newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  const priority = document.getElementById('task-priority').value;

  // Validate input
  if (title === '' || description === '') {
    alert('Please fill in all required fields.');
    return;
  }

  // Create new card element
  const newCard = document.createElement('div');
  newCard.classList.add('card');

  let color;
  switch (priority) {
    case 'High':
      color = '#5a4b56';
      break;
    case 'Medium':
      color = '#7a7362';
      break;
    case 'Low':
      color = '#4c6591';
      break;
    default:
      color = '#807b93';
  }
  newCard.style.backgroundColor = color;

  newCard.innerHTML = `
    <div class="card__header">
      <input type="checkbox" class="task-checkbox">
      <h2 class="card__title">${title}</h2>
    </div>
    <div class="schedules">
      <p class="task-description">${description}</p>
      <p class="task-priority"><strong>Priority:</strong> ${priority}</p>
    </div>
  `;

  // Append the new card to the cards container
  card.wrap.appendChild(newCard);

  // Reset the form
  newTaskForm.reset();
  newTaskForm.style.display = 'none';
  card.newButton.style.display = 'block';
});


// Feedback Expansion
$(document).ready(function() {
  // Handle the feedback expansion
  $(".is-expandable").on('click', function(){
    const $that = $(this);
    const $content = $that.find(".content");
    const $contentSpan = $content.find("span");

    if(!$that.hasClass("is-expanded")) {
        // Set initial states
        gsap.set($content, {height: "auto"});
        gsap.set($contentSpan, {opacity: 1});
        gsap.from($content, {height: 0, duration: 0.4, ease: "expo.out"});
        gsap.from($contentSpan, {opacity: 0, duration: 0.4, ease: "expo.out"});
        $that.addClass("is-expanded");
    } else {
        //collapse view
        gsap.to($contentSpan, {opacity: 0, duration: 0.3, ease: "expo.inOut"});
        gsap.to($content, {height: 0, duration: 0.4, ease: "expo.inOut"});
        $that.removeClass("is-expanded");
    }
  });


  // Share Feedback Button
  $('#share-feedback').on('click', function() {
    var link = $('#feedback-link');
    link.show();
    navigator.clipboard.writeText(link.text());
    alert('Link copied to clipboard: ' + link.text());
  });
});

// Close Button
document.querySelector('.close-button').addEventListener('click', function() {
  if (confirm('Are you sure you want to return to the dashboard?')) {
    window.location.href = '../index.html'; //current dashboard path
  }
});



document.addEventListener("DOMContentLoaded", function() {
  // Toggle feedback form visibility
  document.getElementById("show-feedback-form").addEventListener("click", function() {
    const form = document.getElementById("feedback-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

  // Handle new feedback submission
  document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const feedbackTitle = document.getElementById("feedback-title").value.trim();
    const feedbackText = document.getElementById("new-feedback").value.trim();

    // Create a new feedback list item
    const newFeedback = document.createElement("li");
    newFeedback.className = "feedback-milestone no-flicker is-current";

    if (feedbackTitle && feedbackText) {
      // Expandable item if both title and description are provided
      newFeedback.innerHTML = `
        <div class="feedback-action is-expandable">
          <h2 class="title">${feedbackTitle}</h2>
          <div class="content no-flicker" role="region" aria-expanded="false">
            <span>${feedbackText}</span>
          </div>
        </div>
      `;

      // Toggle expand/collapse functionality
      newFeedback.querySelector(".feedback-action").addEventListener("click", function() {
        const content = this.querySelector(".content");
        const expanded = content.getAttribute("aria-expanded") === "true";
        content.setAttribute("aria-expanded", !expanded);
        content.style.display = expanded ? "none" : "block";
      });
    } else {
      // Simple item if only description is provided
      newFeedback.innerHTML = `
        <div class="feedback-action">
          <h2 class="title">${feedbackText}</h2>
        </div>
      `;
    }

    // Append the new feedback to the feedback list
    const feedbackList = document.querySelector(".feedback");
    feedbackList.appendChild(newFeedback);

    // Clear the form and hide it
    document.getElementById("feedback-title").value = "";
    document.getElementById("new-feedback").value = "";
    document.getElementById("feedback-form").style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const addMilestoneButton = document.querySelector(".add-milestone-button");
  const milestoneForm = document.querySelector(".new-milestone-form");
  const milestoneInput = milestoneForm.querySelector("input[name='milestoneTitle']");
  const timelineContainer = document.querySelector(".milestones");

  // Show the form when "Add Milestone" button is clicked
  addMilestoneButton.addEventListener("click", function() {
    milestoneForm.style.display = "block";
    milestoneInput.focus();
  });

  // Hide the form when "Cancel" button is clicked
  milestoneForm.querySelector(".cancel-button").addEventListener("click", function() {
    milestoneForm.style.display = "none";
    milestoneInput.value = ""; // Clear the input
  });

  // Add a new milestone to the timeline when the form is submitted
  milestoneForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload
    const milestoneTitle = milestoneInput.value.trim();

    // Only proceed if there's input
    if (milestoneTitle) {
      // Create new milestone element
      const newMilestone = document.createElement("div");
      newMilestone.className = "milestone";
      newMilestone.innerHTML = `
        <div class="text"><div class="align-bottom">${milestoneTitle}</div></div>
        <div class="point"></div>
        <div class="line"></div>
      `;

      // Append new milestone to the timeline
      timelineContainer.appendChild(newMilestone);

      // Clear the form and hide it
      milestoneInput.value = "";
      milestoneForm.style.display = "none";
    }
  });
});

// local storage of tasklist item
document.addEventListener("DOMContentLoaded", () => {
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');

  function updateProgress() {
    const completedTasks = Array.from(taskCheckboxes).filter(checkbox => checkbox.checked).length;
    const totalTasks = taskCheckboxes.length;
    const progressPercentage = (completedTasks / totalTasks) * 100;

    // Store progress data in localStorage
    localStorage.setItem('taskProgress', JSON.stringify({
      completedTasks,
      totalTasks,
      progressPercentage
    }));
  }

  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });

  // Initial call to set progress if tasks are pre-checked
  updateProgress();
});

