/* ==================================
   MITHIL PORTFOLIO V3.1
================================== */

/* ==================================
   GOOGLE SHEET CONFIG
================================== */

const SHEET_ID =
    "1nL062d1xgUJbXwa38uoN9hVEEWf67S6-954loajW0tY";

const PROFILE_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Profile`;

const CONTACT_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Contact`;

const PROJECTS_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Projects`;

const PROJECT_GALLERY_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/ProjectGallery`;

const COMPANIES_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Companies Worked With`;

const EXPERIENCE_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Experience`;

const QUALIFICATION_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/ProfessionalQualifications`;

const ROLES_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Roles`;

const SKILLS_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Skills`;

const TECHNOLOGY_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Tecnology`;

const ACHIEVEMENTS_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Achievements`;

const SETTINGS_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/Settings`;

const IMAGE_PORTAL_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/ImagePortal`;


/* ==================================
   GLOBAL DATA
================================== */

let profileData = {};
let contactData = {};

let allProjects = [];
let allCompanies = [];
let allQualifications = [];
let allExperience = [];
let allRoles = [];
let allSkills = [];
let allAchievements = [];

let galleryData = [];
let settingsData = {};
let imagePortalData = [];

/* ==================================
   INIT
================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSettings();

        loadProfile();

        loadContact();

        loadProjects();

        loadCompanies();

        loadExperience();

        loadQualifications();

        loadRoles();

        loadSkills();

        loadTechnology();

        loadAchievements();

        loadGallery();

        loadImagePortal();

        setupSearch();

        setupPDFButtons();

    }
);

/* ==================================
   SETTINGS
================================== */

function loadSettings() {

    fetch(SETTINGS_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            data.forEach(row => {

                settingsData[
                    (row.Field || "").trim()
                ] =
                    (row.Value || "").trim();

            });

            if (
                settingsData.PortfolioTitle
            ) {

                document.title =
                    settingsData.PortfolioTitle;

            }

            if (
                settingsData.FooterText
            ) {

                const footer =
                    document.getElementById(
                        "footerText"
                    );

                if (footer) {

                    footer.innerText =
                        settingsData.FooterText;

                }

            }

        })

        .catch(err =>
            console.log(
                "Settings Error",
                err
            )
        );

}

/* ==================================
   PROFILE
================================== */

/* ==================================
   PROFILE
================================== */

function loadProfile() {

    fetch(PROFILE_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            profileData = {};

            data.forEach(row => {

                profileData[
                    (row.Field || "").trim()
                ] =
                    (row.Value || "").trim();

            });

            const name =
                profileData.Name || "";

            const designation =
                profileData.Designation || "";

            const summary =
                profileData.Summary || "";

            const photo =
                profileData.ProfilePhoto || "";

            const homeBg =
                profileData.HomeBackground || "";

            const nameBox =
                document.getElementById("name");

            if (nameBox)
                nameBox.innerText = name;

            const designationBox =
                document.getElementById("designation");

            if (designationBox)
                designationBox.innerText = designation;

            const summaryBox =
                document.getElementById("summary");

            if (summaryBox)
                summaryBox.innerText = summary;

            const profilePhoto =
                document.getElementById("profilePhoto");

            if (profilePhoto)
                profilePhoto.src = photo;

            const contactPhoto =
                document.getElementById("contactPhoto");

            if (contactPhoto)
                contactPhoto.src = photo;

            const contactName =
                document.getElementById("contactName");

            if (contactName)
                contactName.innerText = name;

            const contactDesignation =
                document.getElementById("contactDesignation");

            if (contactDesignation)
                contactDesignation.innerText = designation;

            if (homeBg) {

                const home =
                    document.getElementById("home");

                if (home) {

                    home.style.backgroundImage =
                        `url('${homeBg}')`;

                }

            }

        })

        .catch(err =>
            console.log(
                "Profile Error",
                err
            )
        );

}


/* ==================================
   CONTACT
================================== */

function loadContact() {

    fetch(CONTACT_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            contactData = {};

            data.forEach(row => {

                contactData[
                    (row.Field || "").trim()
                ] =
                    (row.Value || "").trim();

            });

            const email =
                contactData.Email || "";

            const mobile =
                contactData.Mobile || "";

            const linkedin =
                contactData.LinkedIn || "";

            const instagram =
                contactData.Insta ||
                contactData.Instagram ||
                "";

            const bgImage =
                contactData.BackgroundImage || "";

            const emailBox =
                document.getElementById("email");

            if (emailBox)
                emailBox.innerHTML =
                    "Email : " + email;

            const mobileBox =
                document.getElementById("mobile");

            if (mobileBox)
                mobileBox.innerHTML =
                    "Mobile : " + mobile;

            const linkedinBox =
                document.getElementById("linkedin");

            if (linkedinBox)
                linkedinBox.innerHTML =
                    "LinkedIn : " + linkedin;

            const instaBox =
                document.getElementById("instagram");

            if (instaBox && instagram) {

                const username = instagram
                    .replace("https://www.instagram.com/", "")
                    .split("?")[0]
                    .replace(/\/$/, "");

                instaBox.innerHTML =
                    `Instagram : <a href="${instagram}" target="_blank">@${username}</a>`;
            }
            if (bgImage) {

                const contactSection =
                    document.getElementById("contact");

                if (contactSection) {

                    contactSection.style.backgroundImage =
                        `url('${bgImage}')`;

                }

            }

        })

        .catch(err =>
            console.log(
                "Contact Error",
                err
            )
        );

}

/* ==================================
   VALUE FORMAT
================================== */

function formatCr(value) {

    const num =
        Number(value) || 0;

    return (
        "₹" +
        num.toLocaleString() +
        " Cr"
    );

}
/* ==================================
   PROJECTS
================================== */

function loadProjects() {

    fetch(PROJECTS_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            allProjects = Array.isArray(data) ? data : [];

            loadDashboard();

            loadExecutedProjects();

            loadPlanningCategories();

        })

        .catch(err =>
            console.log(
                "Projects Error",
                err
            )
        );

}

/* ==================================
   DASHBOARD
================================== */

function loadDashboard() {

    let executedCount = 0;
    let plannedCount = 0;

    let executedValue = 0;
    let plannedValue = 0;

    if (!Array.isArray(allProjects)) return;

    allProjects.forEach(project => {

        const status =
            (project.Status || "")
                .toLowerCase()
                .trim();

        const value =
            Number(project.Value) || 0;

        if (status === "executed") {

            executedCount++;

            executedValue += value;

        }

        if (status === "planning") {

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
        formatCr(executedValue);

    document.getElementById(
        "plannedValue"
    ).innerText =
        formatCr(plannedValue);

}

/* ==================================
   EXECUTED PROJECTS
================================== */

function loadExecutedProjects() {

    const container =
        document.getElementById(
            "executedProjects"
        );

    container.innerHTML = "";

    if (!Array.isArray(allProjects)) return;

    allProjects.forEach(project => {

        const status =
            (project.Status || "")
                .toLowerCase()
                .trim();

        if (status !== "executed")
            return;

        container.innerHTML += `

<div
class="project-card"
onclick="openProjectGallery('${(
                project["Project Name"] || ""
            ).replace(/'/g, "\\'")}')">

    <img
    src="${project.Image || ""}"
    alt="Project Image">

    <div class="project-info">

        <h3>
            ${project["Project Name"] || ""}
        </h3>

        <p>
            <strong>Category:</strong>
            ${project.Category || ""}
        </p>

        <p>
            <strong>Value:</strong>
            ${formatCr(project.Value)}
        </p>

        <p>
            <strong>Location:</strong>
            ${project.Location || ""}
        </p>

        <p>
            <strong>Client:</strong>
            ${project.Client || ""}
        </p>

        <p>
            <strong>Architect:</strong>
            ${project.Architect || ""}
        </p>

        <p>
            <strong>PMC:</strong>
            ${project.PMC || ""}
        </p>

    </div>

</div>

`;

    });

}

/* ==================================
   PLANNING CATEGORY CARDS
================================== */

function loadPlanningCategories() {

    const container =
        document.getElementById(
            "planningCategoryContainer"
        );

    container.innerHTML = "";

    const planningProjects =
        allProjects.filter(
            p =>
                (p.Status || "")
                    .toLowerCase()
                    .trim() === "planning"
        );

    const categories = {};

    planningProjects.forEach(project => {

        const category =
            project.Category ||
            "Others";

        if (!categories[category]) {

            categories[category] = {

                count: 0,

                value: 0

            };

        }

        categories[category].count++;

        categories[category].value +=
            Number(project.Value) || 0;

    });

    Object.keys(categories)
        .sort()
        .forEach(category => {

            container.innerHTML += `

<div
class="category-card"
onclick="showPlanningProjects('${category.replace(/'/g, "\\'")}')">

    <h3>
        ${category}
    </h3>

    <p>
        Projects :
        ${categories[category].count}
    </p>

    <p>
        Value :
        ${formatCr(
                categories[category].value
            )}
    </p>

</div>

`;

        });

}

/* ==================================
   SHOW PLANNING PROJECTS
================================== */

function showPlanningProjects(
    selectedCategory
) {

    const section =
        document.getElementById(
            "planningProjectsSection"
        );

    const container =
        document.getElementById(
            "planningProjectsContainer"
        );

    container.innerHTML = "";

    const filteredProjects =
        allProjects.filter(project => {

            return (
                (project.Status || "")
                    .toLowerCase()
                    .trim() ===
                "planning" &&

                (project.Category || "")
                    .trim() ===
                selectedCategory
            );

        });

    filteredProjects.forEach(project => {

        container.innerHTML += `

<tr>

    <td>
        ${project["Project Name"] || ""}
    </td>

    <td>
        ${formatCr(project.Value)}
    </td>

    <td>
        ${project.Location || ""}
    </td>

    <td>
        ${project.Client || ""}
    </td>

    <td>
        ${project.Architect || ""}
    </td>

    <td>
        ${project.PMC || ""}
    </td>

    <td>

        <button
        onclick="event.stopPropagation();openProjectGallery('${(
                project["Project Name"] || ""
            ).replace(/'/g, "\\'")}')">

            View

        </button>

    </td>

</tr>

`;

    });

    section.style.display = "block";

    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

/* ==================================
   GALLERY DATA
================================== */

function loadGallery() {

    fetch(PROJECT_GALLERY_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            galleryData = data;

        })

        .catch(err =>
            console.log(
                "Gallery Error",
                err
            )
        );

}

/* ==================================
   GALLERY OPEN
================================== */

function openProjectGallery(
    projectName
) {

    const modal =
        document.getElementById(
            "galleryModal"
        );

    const title =
        document.getElementById(
            "galleryTitle"
        );

    const container =
        document.getElementById(
            "galleryContainer"
        );

    title.innerText =
        projectName + " Gallery";

    container.innerHTML = "";

    const images =
        galleryData.filter(item =>
            (item["Project Name"] || "")
                .trim()
                .toLowerCase() ===
            projectName
                .trim()
                .toLowerCase()
        );

    if (images.length === 0) {

        container.innerHTML = `

<p style="
color:white;
font-size:18px;">

No Images Available

</p>

`;

    }

    images.forEach(item => {

        container.innerHTML += `

<img
src="${item.Image || ''}"
alt="Gallery Image">

`;

    });

    modal.style.display = "block";

}

/* ==================================
   GALLERY CLOSE
================================== */

function closeGallery() {

    document.getElementById(
        "galleryModal"
    ).style.display =
        "none";

}

/* ==================================
   SCROLLERS
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

function scrollPlanning(value) {

    document
        .getElementById(
            "planningCategoryContainer"
        )
        .scrollBy({

            left: value,

            behavior: "smooth"

        });

}
/* ==================================
   WORKING COMPANIES
================================== */

function loadCompanies() {

    fetch(COMPANIES_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            allCompanies = data;

            const container =
                document.getElementById(
                    "workingCompaniesContainer"
                );

            if (!container) return;

            container.innerHTML = "";

            data.forEach(company => {

                container.innerHTML += `

<div class="timeline-item">

    <div class="timeline-title">
        ${company["Company Name"] || ""}
    </div>

    <div class="timeline-subtitle">
        ${company["From Date"] || ""}
        -
        ${company["To Date"] || "Present"}
    </div>

    <div class="timeline-remark">
        ${company.Remark || ""}
    </div>

</div>

`;

            });

        })

        .catch(err =>
            console.log(
                "Companies Error",
                err
            )
        );

}

/* ==================================
   EXPERIENCE
================================== */

function loadExperience() {

    fetch(EXPERIENCE_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            allExperience = data;

            const container =
                document.getElementById(
                    "experienceTimeline"
                );

            if (!container) return;

            container.innerHTML = "";

            data.forEach(exp => {

                container.innerHTML += `

<div class="timeline-item">

    <div class="timeline-year">
        ${exp.Year || ""}
    </div>

    <div class="timeline-position">
        ${exp.Position || ""}
    </div>

</div>

`;

            });

            calculateExperience(data);

        })

        .catch(err =>
            console.log(
                "Experience Error",
                err
            )
        );

}

/* ==================================
   EXPERIENCE CALCULATION
================================== */

function calculateExperience(data) {

    let earliestYear = null;

    data.forEach(row => {

        let yearText =
            (row.Year || "")
                .toString()
                .trim();

        let year =
            parseInt(
                yearText.split("-")[0]
            );

        if (!isNaN(year)) {

            if (
                earliestYear === null ||
                year < earliestYear
            ) {

                earliestYear = year;

            }

        }

    });

    if (earliestYear) {

        const currentYear =
            new Date().getFullYear();

        const totalExperience =
            currentYear - earliestYear;

        const expBox =
            document.getElementById(
                "experienceYears"
            );

        if (expBox) {

            expBox.innerText =
                totalExperience + "+";

        }

    }

}

/* ==================================
   QUALIFICATIONS
================================== */

function loadQualifications() {

    fetch(QUALIFICATION_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            allQualifications = data;

            const container =
                document.getElementById(
                    "qualificationContainer"
                );

            if (!container) return;

            container.innerHTML = "";

            data.forEach(q => {

                container.innerHTML += `

<tr>

<td>
${q["Qualification Type"] || ""}
</td>

<td>
${q.Qualification || ""}
</td>

<td>
${q.Institute || ""}
</td>

<td>
${q.Year || ""}
</td>

<td>
${q.Result || ""}
</td>

<td>

${q["Document Link"]
                        ? `<a href="${q["Document Link"]}" target="_blank">View</a>`
                        : "-"}

</td>

</tr>

`;

            });

        })

        .catch(err =>
            console.log(
                "Qualification Error",
                err
            )
        );

}
/* ==================================
   ROLES & RESPONSIBILITIES
   EXCEL FORMAT
================================== */

function loadRoles() {

    console.log("loadRoles triggered");

    fetch(ROLES_URL)
        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }

            // Store data for PDF generation
            allRoles = data;

            console.log("Roles Data:", data);

            const executionTable =
                document.getElementById("rolesExecution");

            const planningTable =
                document.getElementById("rolesPlanning");

            if (!executionTable || !planningTable) {
                console.error("Roles table body not found");
                return;
            }

            executionTable.innerHTML = "";
            planningTable.innerHTML = "";

            data.forEach(role => {

                const category =
                    (role.Category || "")
                        .toString()
                        .trim()
                        .toLowerCase();

                const row = `
                    <tr>
                        <td>${role["Role Category"] || ""}</td>
                        <td>${role.Responsibility || ""}</td>
                    </tr>
                `;

                if (category.includes("execution")) {
                    executionTable.innerHTML += row;
                }

                if (category.includes("planning")) {
                    planningTable.innerHTML += row;
                }

            });

        })
        .catch(err => {
            console.error("Roles Error:", err);
        });

}

/* ==================================
   SKILLS
================================== */

function loadSkills() {

    fetch(SKILLS_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }

            allSkills = Array.isArray(data) ? data : [];

            const container =
                document.getElementById(
                    "skillsContainer"
                );

            if (!container) return;

            container.innerHTML = "";

            data.forEach(skill => {

                const level =
                    Number(skill.Level) || 0;

                container.innerHTML += `

<div class="skill-card">

<div class="skill-header">

<span class="skill-name">
${skill.Skill || ""}
</span>

<span class="skill-value">
${level}%
</span>

</div>

<div class="skill-bar">

<div
class="skill-progress"
style="width:${level}%">

</div>

</div>

</div>

`;

            });

        })

        .catch(err =>
            console.log(
                "Skills Error",
                err
            )
        );

}
/* ==================================
   TECHNOLOGY
================================== */

function loadTechnology() {

    fetch(TECHNOLOGY_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            const container =
                document.getElementById(
                    "technologyContainer"
                );

            if (!container) return;

            container.innerHTML = "";

            data.forEach(tech => {

                container.innerHTML += `

<tr>

<td>
${tech.Type || ""}
</td>

<td>
${tech["Software / Apps"] || ""}
</td>

</tr>

`;

            });

        })

        .catch(err =>
            console.log(
                "Technology Error",
                err
            )
        );

}

/* ==================================
   ACHIEVEMENTS
================================== */

function loadAchievements() {

    fetch(ACHIEVEMENTS_URL)

        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }

            allAchievements = data;

            const container =
                document.getElementById(
                    "achievementsContainer"
                );

            if (!container) return;

            container.innerHTML = "";

            data.forEach(item => {

                container.innerHTML += `

<div class="achievement-card">

<div class="achievement-title">
${item.Achievement || ""}
</div>

</div>

`;

            });

        })

        .catch(err =>
            console.log(
                "Achievements Error",
                err
            )
        );

}
/* ==================================
   CLOSE MENU AFTER CLICK
================================== */

document.addEventListener(
    "click",
    function (e) {

        const nav =
            document.getElementById(
                "navLinks"
            );

        const menu =
            document.querySelector(
                ".menu-toggle"
            );

        if (
            !nav ||
            !menu
        ) return;

        if (
            !nav.contains(e.target) &&
            !menu.contains(e.target)
        ) {

            nav.classList.remove(
                "active"
            );

        }

    }
);

/* ==================================
   PDF DOWNLOAD
================================== */

function setupPDFButtons() {

    const homeBtn = document.getElementById("downloadProfileBtn");
    const contactBtn = document.getElementById("contactDownloadBtn");

    if (homeBtn) {
        homeBtn.addEventListener("click", generatePortfolioPDF);
    }

    if (contactBtn) {
        contactBtn.addEventListener("click", generatePortfolioPDF);
    }
}


/* ==================================
   PDF GENERATION FUNCTION
================================== */

async function generatePortfolioPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("p", "mm", "a4");

    let y = 20;

    doc.setFillColor(0, 24, 69);
    doc.rect(0, 0, 210, 20, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);

    doc.text(
        profileData.Name || "Portfolio",
        15,
        13
    );

    doc.setTextColor(0, 0, 0);

    y = 35;

    doc.setFontSize(16);
    doc.text(
        "Professional Snapshot",
        15,
        y
    );

    y += 10;

    doc.setFontSize(11);

    const summary =
        doc.splitTextToSize(
            profileData.Summary || "",
            180
        );

    doc.text(
        summary,
        15,
        y
    );

    y +=
        summary.length * 5 +
        10;

    doc.setFontSize(14);

    doc.text(
        "Experience Timeline",
        15,
        y
    );

    y += 10;

    allExperience.forEach(exp => {

        doc.text(
            `${exp.Year || ""} - ${exp.Position || ""}`,
            20,
            y
        );

        y += 6;

    });

    y += 10;

    doc.text(
        "Companies Worked With",
        15,
        y
    );

    y += 10;

    allCompanies.forEach(company => {

        doc.text(
            company["Company Name"] || "",
            20,
            y
        );

        y += 6;

    });

    if (y > 250) {

        doc.addPage();

        y = 20;

    }

    doc.text(
        "Core Competencies",
        15,
        y
    );

    y += 10;

    allSkills.forEach(skill => {

        doc.text(
            `${skill.Skill || ""} (${skill.Level || 0}%)`,
            20,
            y
        );

        y += 6;

    });

    y += 10;

    doc.text(
        "Achievements",
        15,
        y
    );

    y += 10;

    allAchievements.forEach(item => {

        doc.text(
            item.Achievement || "",
            20,
            y
        );

        y += 6;

    });

    doc.save(
        "Mithil_Kareliya_Portfolio.pdf"
    );

}


/* ==================================
   INIT CALL
================================== */


function loadImagePortal() {

    fetch(IMAGE_PORTAL_URL)
        .then(r => r.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.log("Invalid sheet data:", data);
                return;
            }


            imagePortalData = data;

            buildImagePortal();

        })
        .catch(err =>
            console.log("Image Portal Error", err)
        );
}

function buildImagePortal() {

    const container =
        document.getElementById("imagePortalContainer");

    if (!container) return;

    // Hide Close Button
    document.getElementById("imagePortalClose").style.display = "none";

    container.classList.remove("project-slider");
    container.innerHTML = "";

    const categories = {};

    imagePortalData.forEach(item => {

        const cat = item.Category || "Others";

        if (!categories[cat]) {
            categories[cat] = [];
        }

        categories[cat].push(item);

    });

    Object.keys(categories).forEach(cat => {

        const images = categories[cat];

        const randomImage =
            images[Math.floor(Math.random() * images.length)].Image || "";

        container.innerHTML += `

        <div class="image-category-card"
             onclick="openImageCategory('${cat.replace(/'/g, "\\'")}')">

            <img src="${randomImage}" alt="${cat}">

            <div class="project-info-min">
                ${cat}
            </div>

        </div>

        `;

    });

}

function openImageCategory(category) {

    const container =
        document.getElementById("imagePortalContainer");

    if (!container) return;

    // Show Close Button
    document.getElementById("imagePortalClose").style.display = "flex";

    container.innerHTML = "";

    const projects = {};

    imagePortalData
        .filter(item =>
            (item.Category || "").trim().toLowerCase() ===
            category.trim().toLowerCase()
        )
        .forEach(item => {

            const project =
                item["Project Name"] || "Untitled";

            if (!projects[project]) {
                projects[project] = [];
            }

            projects[project].push(item);

        });

    Object.keys(projects).forEach(project => {

        const coverImage =
            projects[project][0].Image || "";

        container.innerHTML += `

        <div class="image-tile"
             onclick="openImageGalleryPortal('${project.replace(/'/g, "\\'")}')">

            <img src="${coverImage}" alt="${project}">

            <div class="project-info-min">
                ${project}
            </div>

        </div>

        `;

    });

}

function openImageGalleryPortal(project) {

    const modal =
        document.getElementById("galleryModal");

    const title =
        document.getElementById("galleryTitle");

    const container =
        document.getElementById("galleryContainer");

    title.innerText = project;

    container.innerHTML = "";

    imagePortalData
        .filter(item =>
            (item["Project Name"] || "").trim().toLowerCase() ===
            project.trim().toLowerCase()
        )
        .forEach(item => {

            container.innerHTML += `
                <img src="${item.Image}" alt="${project}">
            `;

        });

    modal.style.display = "block";

}
function scrollImagePortal(value) {

    document
        .getElementById("imagePortalContainer")
        .scrollBy({
            left: value,
            behavior: "smooth"
        });

}
/* ==================================
   END PDF MODULE
================================== */
function cleanText(str) {
    return (str || "")
        .replace(/\s+/g, " ")   // normalize ALL spaces
        .replace(/\s*\|\s*/g, " | ") // clean pipe formatting
        .trim();
}

/* ==================================
   IMAGE FALLBACK
================================== */

document.addEventListener(
    "error",
    function (e) {

        if (e.target.tagName === "IMG") {

            e.target.onerror = null;

            e.target.src =
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
            < svg xmlns = "http://www.w3.org/2000/svg" width = "600" height = "400" >
                        <rect width="100%" height="100%" fill="#f0f0f0"/>
                        <text x="50%" y="50%"
                              dominant-baseline="middle"
                              text-anchor="middle"
                              fill="#666"
                              font-size="24">
                            Image Unavailable
                        </text>
                    </svg >
        `);

        }

    },
    true
);

/* ==================================
   CLOSE GALLERY ON ESC
================================== */

document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key === "Escape"
        ) {

            closeGallery();

        }

    }
);

/* ==================================
   WINDOW CLICK CLOSE GALLERY
================================== */

window.onclick =
    function (event) {

        const modal =
            document.getElementById(
                "galleryModal"
            );

        if (
            modal &&
            event.target === modal
        ) {

            closeGallery();

        }

    };

/* ==================================
   END OF V3.1
================================== */
document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.getElementById("navLinks");
    const moreBtn = document.getElementById("moreBtn");
    const dropdown = document.querySelector(".dropdown");
    const menu = document.getElementById("moreMenu");
    const overlay = document.getElementById("mobileOverlay");

    // safety check (prevents errors)
    if (!moreBtn || !dropdown || !menu || !overlay) return;

    // OPEN / CLOSE dropdown
    moreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        dropdown.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    // CLOSE when clicking outside (overlay)
    overlay.addEventListener("click", function () {
        dropdown.classList.remove("active");
        overlay.classList.remove("active");
    });

    // CLOSE when clicking any menu item (IMPORTANT FIX)
    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            dropdown.classList.remove("active");
            overlay.classList.remove("active");
        });
    });

    // prevent menu from auto closing when clicking inside
    menu.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    // mobile menu toggle (hamburger)
    window.toggleMenu = function () {
        navLinks.classList.toggle("active");
    };

});
