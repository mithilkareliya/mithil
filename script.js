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
    `https://opensheet.elk.sh/${SHEET_ID}/WebsiteSettings`;

/* ==================================
   GLOBAL DATA
================================== */

let profileData = {};
let contactData = {};
let allProjects = [];
let galleryData = [];
let settingsData = {};

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

function loadProfile() {

    fetch(PROFILE_URL)

        .then(r => r.json())

        .then(data => {

            data.forEach(row => {

                profileData[
                    (row.Field || "").trim()
                ] =
                    (row.Value || "").trim();

            });

            document.getElementById(
                "name"
            ).innerText =
                profileData.Name || "";

            document.getElementById(
                "designation"
            ).innerText =
                profileData.Designation || "";

            document.getElementById(
                "summary"
            ).innerText =
                profileData.Summary || "";

            document.getElementById(
                "profilePhoto"
            ).src =
                profileData.ProfilePhoto || "";

            document.getElementById(
                "contactPhoto"
            ).src =
                profileData.ProfilePhoto || "";

            document.getElementById(
                "contactName"
            ).innerText =
                profileData.Name || "";

            document.getElementById(
                "contactDesignation"
            ).innerText =
                profileData.Designation || "";

            if (
                profileData.HomeBackground
            ) {

                document.getElementById(
                    "home"
                ).style.backgroundImage =
                    `url('${profileData.HomeBackground}')`;

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

            data.forEach(row => {

                contactData[
                    (row.Field || "").trim()
                ] =
                    (row.Value || "").trim();

            });

            document.getElementById(
                "email"
            ).innerHTML =
                "Email : " +
                (contactData.Email || "");

            document.getElementById(
                "mobile"
            ).innerHTML =
                "Mobile : " +
                (contactData.Mobile || "");

            document.getElementById(
                "linkedin"
            ).innerHTML =
                "LinkedIn : " +
                (contactData.LinkedIn || "");

            document.getElementById(
                "instagram"
            ).innerHTML =
                "Instagram : " +
                (contactData.Instagram || "");

            if (
                contactData.BackgroundImage
            ) {

                document.getElementById(
                    "contact"
                ).style.backgroundImage =
                    `url('${contactData.BackgroundImage}')`;

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

            allProjects = data;

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

            const container =
                document.getElementById(
                    "workingCompaniesContainer"
                );

            if (!container) return;

            container.innerHTML = "";

            const rows =
                Array.isArray(data)
                    ? data
                    : (data.values || []);

            rows.forEach((company, index) => {

                let companyName = "";
                let fromDate = "";
                let toDate = "";
                let remark = "";

                // ARRAY FORMAT
                if (Array.isArray(company)) {

                    // Skip header row
                    if (
                        index === 0 &&
                        company[0] === "Company Name"
                    ) {
                        return;
                    }

                    companyName =
                        company[0] || "";

                    fromDate =
                        company[1] || "";

                    toDate =
                        company[2] || "Present";

                    remark =
                        company[3] || "";

                }

                // OBJECT FORMAT
                else {

                    companyName =
                        company["Company Name"] || "";

                    fromDate =
                        company["From Date"] || "";

                    toDate =
                        company["To Date"] || "Present";

                    remark =
                        company["Remark"] || "";

                }

                container.innerHTML += `

<div class="timeline-item">

    <div class="timeline-title">
        ${companyName}
    </div>

    <div class="timeline-subtitle">
        ${fromDate} - ${toDate}
    </div>

    <div class="timeline-remark">
        ${remark}
    </div>

</div>

`;

            });

        })

        .catch(err => {

            console.error(
                "Companies Error:",
                err
            );

        });

}
/* ==================================
   EXPERIENCE
================================== */

function loadExperience() {

    fetch(EXPERIENCE_URL)

        .then(r => r.json())

        .then(data => {

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
            currentYear -
            earliestYear;

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
                        : "-"
                    }

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

            const container =
                document.getElementById(
                    "skillsContainer"
                );

            if (!container) return;

            container.innerHTML = "";

            data.forEach(skill => {

                const level =
                    Number(
                        skill.Level
                    ) || 0;

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
   SEARCH
================================== */

function setupSearch() {

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

            document
                .querySelectorAll(
                    "#planningProjectsContainer tr"
                )
                .forEach(row => {

                    row.style.display =
                        row.innerText
                            .toLowerCase()
                            .includes(filter)
                            ? ""
                            : "none";

                });

        }
    );

}

/* ==================================
   MOBILE MENU
================================== */

function toggleMenu() {

    const nav =
        document.getElementById(
            "navLinks"
        );

    nav.classList.toggle(
        "active"
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
   (Using html2pdf library)
================================== */

function generatePortfolioPDF() {

    const element = document.querySelector("#portfolio");
    // 👆 change this ID if your main container is different

    if (!element) {
        console.error("Portfolio container not found!");
        return;
    }

    const options = {
        margin: 0.5,
        filename: "My_Portfolio.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
}


/* ==================================
   INIT CALL
================================== */

document.addEventListener("DOMContentLoaded", function () {
    setupPDFButtons();
});

/* ==================================
   END PDF MODULE
================================== */
function cleanText(str) {
    return (str || "")
        .replace(/\s+/g, " ")   // normalize ALL spaces
        .replace(/\s*\|\s*/g, " | ") // clean pipe formatting
        .trim();
}
async function generatePortfolioPDF() {

    try {

        if (
            typeof window.jspdf ===
            "undefined"
        ) {

            alert(
                "jsPDF library missing.\nAdd jsPDF CDN in index.html"
            );

            return;

        }

        const { jsPDF } =
            window.jspdf;

        const doc =
            new jsPDF(
                "p",
                "mm",
                "a4"
            );

        let y = 20;

        /* HEADER */

        doc.setFillColor(
            0,
            24,
            69
        );

        doc.rect(
            0,
            0,
            210,
            25,
            "F"
        );

        doc.setTextColor(
            255,
            255,
            255
        );

        doc.setFontSize(22);

        doc.text(
            profileData.Name || "",
            15,
            15
        );

        doc.setFontSize(11);

        doc.text(
            profileData.Designation || "",
            15,
            21
        );

        y = 35;

        /* PROFILE */

        doc.setTextColor(
            0,
            0,
            0
        );

        doc.setFontSize(16);

        doc.text(
            "Professional Summary",
            15,
            y
        );

        y += 8;

        doc.setFontSize(10);

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

        /* CONTACT */

        doc.setFontSize(16);

        doc.text(
            "Contact Information",
            15,
            y
        );

        y += 8;

        doc.setFontSize(10);

        doc.text(
            "Email : " +
            (contactData.Email || ""),
            15,
            y
        );

        y += 6;

        doc.text(
            "Mobile : " +
            (contactData.Mobile || ""),
            15,
            y
        );

        y += 6;

        doc.text(
            "LinkedIn : " +
            (contactData.LinkedIn || ""),
            15,
            y
        );

        y += 10;

        /* SKILLS */

        doc.setFontSize(16);

        doc.text(
            "Skills",
            15,
            y
        );

        y += 8;

        const skills =
            await fetch(
                SKILLS_URL
            ).then(r =>
                r.json()
            );

        doc.setFontSize(10);

        skills.forEach(skill => {

            doc.text(
                `${skill.Skill} - ${skill.Level}%`,
                20,
                y
            );

            y += 6;

        });

        y += 5;

        /* PAGE BREAK */

        if (y > 250) {

            doc.addPage();

            y = 20;

        }

        /* EXPERIENCE */

        doc.setFontSize(16);

        doc.text(
            "Professional Experience",
            15,
            y
        );

        y += 8;

        const experience =
            await fetch(
                EXPERIENCE_URL
            ).then(r =>
                r.json()
            );

        doc.setFontSize(10);

        experience.forEach(exp => {

            doc.text(

                `${exp["From Year"] || ""} - ${exp["To Year"] || ""}` +
                ` | ${exp.Position || ""}` +
                ` | ${exp.Company || ""}`,

                20,
                y

            );

            y += 6;

            if (y > 280) {

                doc.addPage();

                y = 20;

            }

        });

        y += 5;

        /* QUALIFICATION */

        doc.setFontSize(16);

        doc.text(
            "Qualifications",
            15,
            y
        );

        y += 8;

        const qualifications =
            await fetch(
                QUALIFICATION_URL
            ).then(r =>
                r.json()
            );

        doc.setFontSize(10);

        qualifications.forEach(q => {

            doc.text(

                `${q.Qualification || ""} | ${q.Institute || ""}`,

                20,
                y

            );

            y += 6;

            if (y > 280) {

                doc.addPage();

                y = 20;

            }

        });

        y += 5;

        /* PROJECTS */

        doc.setFontSize(16);

        doc.text(
            "Projects",
            15,
            y
        );

        y += 8;

        doc.setFontSize(10);

        allProjects.forEach(project => {

            doc.text(

                `${project["Project Name"] || ""}` +
                ` | ${project.Category || ""}` +
                ` | ${formatCr(project.Value)}`,

                20,
                y

            );

            y += 6;

            if (y > 280) {

                doc.addPage();

                y = 20;

            }

        });

        /* FOOTER */

        const pages =
            doc.internal
                .getNumberOfPages();

        for (
            let i = 1;
            i <= pages;
            i++
        ) {

            doc.setPage(i);

            doc.setFontSize(9);

            doc.text(

                "Generated from Live Portfolio Data",

                15,

                290

            );

        }

        doc.save(
            `${profileData.Name || "Portfolio"}_Profile.pdf`
        );

    }

    catch (err) {

        console.log(err);

        alert(
            "PDF Generation Failed"
        );

    }

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
                        <rect width="100%" height="100%" fill="#f0f0f0"/>
                        <text x="50%" y="50%"
                              dominant-baseline="middle"
                              text-anchor="middle"
                              fill="#666"
                              font-size="24">
                            Image Unavailable
                        </text>
                    </svg>
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