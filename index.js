const express = require("express");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const htmlPdf = require("html-pdf-node");

const app = express();
app.use(express.json());

// Read the HTML template
const templatePath = path.join(__dirname, "templates", "1.html");
const templateHtml = fs.readFileSync(templatePath, "utf-8");
const template = Handlebars.compile(templateHtml);

app.post("/generate-pdf", async (req, res) => {
  const data = {
    name: "Ahmed Barhoumi",
    title: "Full Stack Web Developer",
    linkedin: "https://www.linkedin.com/in/ahmedbarhoumi",
    email: "xahmedbarhoumix@gmail.com",
    phone: "+216 56 466 935",
    location: "Monastir, Tunisia",
    profileSummary:
      "Full Stack Developer with over 4 years in programming looking for an internship. Passionate about competitive programming, excelling in problem-solving. Proficient in architecting, developing and deploying innovative software development solutions, fostering collaborative work environments.",
    skills: [
      "HTML & CSS (Bootstrap/SASS/Tailwind)",
      "Javascript/Typescript",
      "Node.js/Express",
      "Rust/C++",
      "MySQL/PostgreSQL/MongoDB",
      "React.js/Next.js",
      "Git/Docker",
      "Python/Mojo",
    ],
    education: [
      {
        degree: "Bachelor Of Computer Science",
        institution:
          "Higher Institute of Computer Sciences and Mathematics of Monastir",
        startYear: "2022",
        endYear: "Now",
      },
      {
        degree: "Baccalaureate Degree specialized in Informatics",
        institution: "Kisbet Mediouni, Monastir",
        startYear: "2021",
        endYear: "2022",
      },
    ],
    experience: [
      {
        position: "Open source contributor",
        company: "Github",
        startDate: "Mar 2024",
        endDate: "Now",
        responsibilities: [
          "Collaborated with a global team of developers, participating in code reviews, bug tracking, and feature enhancements.",
          "Engaged with the open-source community through forums, discussions, and conferences to share knowledge and gather feedback.",
          "Contributed to the creation of educational resources, tutorials, and guides to empower community members and encourage more developers to contribute.",
        ],
      },
      {
        position: "Full stack developer (freelance)",
        company: "Upwork",
        startDate: "Dec 2022",
        endDate: "Now",
        responsibilities: [
          "Delivered high-quality web development projects punctually on Upwork, showcasing technical proficiency and adherence to timelines.",
          "Earned positive feedback and high ratings from clients, establishing a reputation as a reliable and skilled freelancer.",
          "Demonstrated effective communication with clients and quick adaptability to the Upwork platform, contributing to successful collaborations and overall positive client experiences.",
        ],
      },
      {
        position: "Mentor Assistant",
        company: "Technology School",
        startDate: "Nov 2022",
        endDate: "Now",
        responsibilities: [
          "Provided guidance and support to over 15 students across various technology stacks to initiate and successfully complete their end-of-(term / study) projects.",
          "Received positive feedback from students for providing valuable mentorship and contributing to their academic and professional growth.",
        ],
      },
    ],
    languages: ["Arabic (native)", "English", "French"],
  };

  // Generate the HTML content
  const html = template(data);

  // Define the PDF options
  const options = { format: "A4" };

  // Generate the PDF
  htmlPdf
    .generatePdf({ content: html }, options)
    .then((pdfBuffer) => {
      res
        .writeHead(200, {
          "Content-Length": pdfBuffer.length,
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment;filename=cv.pdf",
        })
        .end(pdfBuffer);
    })
    .catch((err) => {
      res.status(500).send("Error generating PDF");
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
