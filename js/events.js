function formatDate(dateString) {
  const date = new Date(dateString + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
  });
}

function renderEvents(events) {
  return events.map(event => `
    <article class="event">
      <h3>${event.artist}</h3>
      <p class="event-meta">
        <span class="event-date">${formatDate(event.date)}</span>
        ${event.time ? " • " + event.time : ""}
      </p>
      <p class="event-meta">${event.city} at ${event.venue}</p>
      ${event.details ? `<p class="event-details">${event.details}</p>` : ""}
      ${event.link ? `<p><a href="${event.link}">More information</a></p>` : ""}
    </article>
  `).join("");
}

async function loadEvents(options = {}) {
  const upcomingContainer = document.getElementById("events");
  const pastContainer = document.getElementById("past-events");

  if (!upcomingContainer && !pastContainer) return;

  try {
    const response = await fetch("data/events.json");
    const events = await response.json();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = events
      .filter(event => new Date(event.date + "T00:00:00") >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const past = events
      .filter(event => new Date(event.date + "T00:00:00") < today)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const visibleUpcoming = options.limit ? upcoming.slice(0, options.limit) : upcoming;

    if (upcomingContainer) {
      upcomingContainer.innerHTML = visibleUpcoming.length
        ? renderEvents(visibleUpcoming)
        : "<p>No upcoming shows listed right now.</p>";
    }

    if (pastContainer) {
      pastContainer.innerHTML = past.length
        ? renderEvents(past)
        : "<p>No past performances listed yet.</p>";
    }
  } catch (error) {
    if (upcomingContainer) {
      upcomingContainer.innerHTML = "<p>Events could not be loaded.</p>";
    }

    if (pastContainer) {
      pastContainer.innerHTML = "<p>Events could not be loaded.</p>";
    }

    console.error(error);
  }
}