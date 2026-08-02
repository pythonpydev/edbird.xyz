(() => {
  const root = document.querySelector(".theme-rollerball .scoreboard-hero.is-live");
  if (!root) {
    return;
  }

  const clockEl = root.querySelector(".clock-time");
  const periodStripItems = [...root.querySelectorAll(".period-strip span")];
  if (!clockEl) {
    return;
  }

  const initialValue = clockEl.textContent ? clockEl.textContent.trim() : "00:00";
  const match = /^(\d{1,2}):(\d{2})$/.exec(initialValue);
  if (!match) {
    return;
  }

  const teamColumns = [...root.querySelectorAll(".team-column")];
  const teamScores = teamColumns.map((column) => column.querySelector(".team-score"));
  const teamPeriodCells = teamColumns.map((column) => {
    const cells = [...column.querySelectorAll(".numeric-strip span")];
    return {
      periodCells: cells.slice(0, 4),
      totalCell: cells[4],
      column
    };
  });

  if (teamScores.some((item) => !item) || teamPeriodCells.some((item) => item.periodCells.length < 4 || !item.totalCell)) {
    return;
  }

  let totalSeconds = Number(match[1]) * 60 + Number(match[2]);
  const periodDuration = Number(root.dataset.periodSeconds || totalSeconds);

  let currentPeriodIndex = Math.max(0, periodStripItems.findIndex((item) => item.classList.contains("is-live")));
  if (currentPeriodIndex === -1) {
    currentPeriodIndex = 0;
  }

  const parseNumber = (el) => {
    return Number((el.textContent || "0").trim()) || 0;
  };

  const syncTotals = () => {
    teamPeriodCells.forEach((team, index) => {
      const periodTotal = team.periodCells.reduce((sum, cell) => sum + parseNumber(cell), 0);
      team.totalCell.textContent = String(periodTotal);
      teamScores[index].textContent = String(periodTotal);
    });
  };

  const setLivePeriod = (nextIndex) => {
    periodStripItems.forEach((item, index) => {
      item.classList.toggle("is-live", index === nextIndex);
    });
  };

  const formatTime = (timeLeft) => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const updateDisplay = () => {
    clockEl.textContent = formatTime(totalSeconds);
  };

  const bumpScore = () => {
    if (totalSeconds <= 0) {
      return;
    }

    // Roughly every 6-10 seconds, bump a random side by 1-3 points.
    const shouldBump = totalSeconds % 3 === 0 && Math.random() > 0.55;
    if (!shouldBump) {
      return;
    }

    const teamIndex = Math.random() > 0.5 ? 0 : 1;
    const delta = Math.ceil(Math.random() * 3);
    const liveCell = teamPeriodCells[teamIndex].periodCells[currentPeriodIndex];

    liveCell.textContent = String(parseNumber(liveCell) + delta);
    teamPeriodCells[teamIndex].column.classList.add("score-flash");
    window.setTimeout(() => {
      teamPeriodCells[teamIndex].column.classList.remove("score-flash");
    }, 240);

    syncTotals();
  };

  const advancePeriodOrFinish = () => {
    if (currentPeriodIndex < periodStripItems.length - 1) {
      currentPeriodIndex += 1;
      setLivePeriod(currentPeriodIndex);
      totalSeconds = periodDuration;
      updateDisplay();
      return;
    }

    root.classList.remove("is-live");
    clockEl.textContent = "00:00";
    const liveCell = periodStripItems[currentPeriodIndex];
    if (liveCell) {
      liveCell.classList.remove("is-live");
      liveCell.textContent = "FINAL";
      liveCell.classList.add("is-live");
    }
    clearInterval(timer);
  };
  setLivePeriod(currentPeriodIndex);
  syncTotals();
  updateDisplay();

  const timer = setInterval(() => {
    if (!root.classList.contains("is-live")) {
      clearInterval(timer);
      return;
    }

    totalSeconds -= 1;
    if (totalSeconds <= 0) {
      advancePeriodOrFinish();
      return;
    }

    bumpScore();
    updateDisplay();
  }, 1000);
})();
