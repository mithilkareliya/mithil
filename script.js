/* ==================================
   GOOGLE SHEET CONFIG
================================== */

const SHEET_ID =
    "1nL062d1xgUJbXwa38uoN9hVEEWf67S6-954loajW0tY";

const PROFILE_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Profile`;

const PROJECTS_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Projects`;

const EXPERIENCE_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Experience`;

const SKILLS_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Skills`;

const ACHIEVEMENTS_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Achievements`;

const QUALIFICATION_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/ProfessionalQualifications`;


/* ==================================
   LOAD EVERYTHING
================================== */

loadProfile();
loadProjects();
loadExperience();
loadSkills();
loadAchievements();
loadQualifications();


/* ==================================
   PROFILE
================================== */

function loadProfile() {

    fetch(PROFILE_URL)

        .then(response => response.json())

        .then(data => {

            const profile = {};

            data.forEach(row => {

                profile[
                    (row.Field || "").trim()
                ] =
                    (row.Value || "").trim();

            });

            /* HOME */

            document.getElementById(
                "name"
            ).innerText =
                profile.Name || "";

            document.getElementById(
                "designation"
            ).innerText =
                profile.Designation || "";

            document.getElementById(
                "summary"
            ).innerText =
                profile.Summary || "";

            document.getElementById(
                "profilePhoto"
            ).src =
                profile.ProfilePhoto || "";

            document.getElementById(
                "resumeLink"
            ).href =
                profile.ResumePDF || "#";

            /* HERO BACKGROUND */

            document.getElementById(
                "home"
            ).style.backgroundImage =
                `url('${profile.HomeBackground || ""}')`;

            /* CONTACT */

            document.getElementById(
                "contactPhoto"
            ).src =
                profile.ProfilePhoto || "";

            document.getElementById(
                "contactName"
            ).innerText =
                profile.Name || "";

            document.getElementById(
                "contactDesignation"
            ).innerText =
                profile.Designation || "";

            document.getElementById(
                "email"
            ).innerText =
                "Email : " +
                (profile.Email || "");

            document.getElementById(
                "mobile"
            ).innerText =
                "Mobile : " +
                (profile.Mobile || "");

            document.getElementById(
                "linkedin"
            ).innerText =
                "LinkedIn : " +
                (profile.LinkedIn || "");

            document.getElementById(
                "contactResume"
            ).href =
                profile.ResumePDF || "#";

        })

        .catch(error => {

            console.log(error);

        });

}


/* ==================================
   PROJECTS
================================== */

function loadProjects() {

    fetch(PROJECTS_URL)

        .then(response => response.json())

        .then(data => {

            loadDashboard(data);

            loadExecutedProjects(data);

            loadPlanningProjects(data);

        })

        .catch(error => {

            console.log(error);

        });

}


/* ==================================
   DASHBOARD
================================== */

function loadDashboard(data) {

    let executedCount = 0;
    let plannedCount = 0;

    let executedValue = 0;
    let plannedValue = 0;

    data.forEach(project => {

        const value =
            Number(project.Value) || 0;

        if (
            project.Status &&
            project.Status.toLowerCase() ===
            "executed"
        ) {

            executedCount++;

            executedValue += value;

        }

        if (
            project.Status &&
            project.Status.toLowerCase() ===
            "planning"
        ) {

            plannedCount++;

            plannedValue += value;

        }

    });

    document.getElementById(
        "executedCount"
    ).innerText =
        executedCount;

    document.getElementById(
        "plannedCount"
    ).innerText =
        plannedCount;

    document.getElementById(
        "executedValue"
    ).innerText =
        "₹" +
        executedValue.toLocaleString();

    document.getElementById(
        "plannedValue"
    ).innerText =
        "₹" +
        plannedValue.toLocaleString();

}


/* ==================================
   EXECUTED PROJECTS
================================== */

function loadExecutedProjects(data) {

    const container =
        document.getElementById(
            "executedProjects"
        );

    container.innerHTML = "";

    data.forEach(project => {

        if (
            project.Status &&
            project.Status.toLowerCase() ===
            "executed"
        ) {

            container.innerHTML += `

<div class="project-card">

<img
src="${project.Image || ""}"
onerror="this.style.display='none'">

<div class="project-info">

<h3>
${project["Project Name"] || ""}
</h3>

<p>
<strong>Category :</strong>
${project.Category || ""}
</p>

<p>
<strong>Value :</strong>
₹${project.Value || ""}
</p>

<p>
<strong>Location :</strong>
${project.Location || ""}
</p>

<p>
<strong>Client :</strong>
${project.Client || ""}
</p>

<p>
<strong>Architect :</strong>
${project.Architect || ""}
</p>

</div>

</div>

`;

        }

    });

}


/* ==================================
   PLANNING PROJECTS
================================== */

function loadPlanningProjects(data) {

    const table =
        document.getElementById(
            "planningProjects"
        );

    table.innerHTML = "";

    data.forEach(project => {

        if (
            project.Status &&
            project.Status.toLowerCase() ===
            "planning"
        ) {

            table.innerHTML += `

<tr>

<td>${project["Project Name"] || ""}</td>

<td>${project.Category || ""}</td>

<td>₹${project.Value || ""}</td>

<td>${project.Location || ""}</td>

<td>${project.Client || ""}</td>

<td>${project.Architect || ""}</td>

</tr>

`;

        }

    });

}


/* ==================================
   EXPERIENCE TIMELINE
================================== */

function loadExperience() {

    fetch(EXPERIENCE_URL)

        .then(response => response.json())

        .then(data => {

            const container =
                document.getElementById(
                    "experienceTimeline"
                );

            container.innerHTML = "";

            data.forEach(item => {

                container.innerHTML += `

<div class="timeline-item">

<div class="timeline-year">

${item.Year || ""}

</div>

<div class="timeline-position">

${item.Position || ""}

</div>

<div class="timeline-company">

${item.Company || ""}

</div>

</div>

`;

            });

        })

        .catch(error => {

            console.log(error);

        });

}


/* ==================================
   QUALIFICATIONS
================================== */

function loadQualifications() {

    fetch(QUALIFICATION_URL)

        .then(response => response.json())

        .then(data => {

            const container =
                document.getElementById(
                    "qualificationContainer"
                );

            container.innerHTML = "";

            data.forEach(item => {

                container.innerHTML += `

<tr>

<td>
${item["Qualification Type"] || ""}
</td>

<td>
${item.Qualification || ""}
</td>

<td>
${item.Institute || ""}
</td>

<td>
${item.Year || ""}
</td>

<td>
${item.Result || ""}
</td>

</tr>

`;

            });

        })

        .catch(error => {

            console.log(error);

        });

}


/* ==================================
   SKILLS
================================== */

function loadSkills() {

    fetch(SKILLS_URL)

        .then(response => response.json())

        .then(data => {

            const container =
                document.getElementById(
                    "skillsContainer"
                );

            container.innerHTML = "";

            data.forEach(skill => {

                container.innerHTML += `

<div class="skill-card">

<div class="skill-title">

${skill.Skill || ""}

</div>

<div class="skill-bar">

<div class="skill-progress"
style="width:${skill.Level || 0}%">

${skill.Level || 0}%

</div>

</div>

</div>

`;

            });

        })

        .catch(error => {

            console.log(error);

        });

}


/* ==================================
   ACHIEVEMENTS
================================== */

function loadAchievements() {

    fetch(ACHIEVEMENTS_URL)

        .then(response => response.json())

        .then(data => {

            const container =
                document.getElementById(
                    "achievementsContainer"
                );

            container.innerHTML = "";

            data.forEach(item => {

                container.innerHTML += `

<div class="expertise-card">

${item.Achievement || ""}

</div>

`;

            });

        })

        .catch(error => {

            console.log(error);

        });

}


/* ==================================
   EXECUTED PROJECT SCROLLER
================================== */

function scrollExecuted(value) {

    document
        .getElementById(
            "executedProjects"
        )
        .scrollBy({

            left: value,

            behavior: "smooth"

        });

}


/* ==================================
   SEARCH
================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const search =
            document.getElementById(
                "planningSearch"
            );

        if (!search) return;

        search.addEventListener(
            "keyup",
            function () {

                const filter =
                    this.value.toLowerCase();

                const rows =
                    document.querySelectorAll(
                        "#planningProjects tr"
                    );

                rows.forEach(row => {

                    const text =
                        row.innerText.toLowerCase();

                    row.style.display =
                        text.includes(filter)
                            ? ""
                            : "none";

                });

            });

    }
);