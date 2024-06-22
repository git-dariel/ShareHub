import citizens_charter from "../assets/exhibit/citizens_charter.png";
import cmo_2015 from "../assets/exhibit/cmo_2015.png";
import instructional_mats from "../assets/exhibit/instructional_mats.png";
import univ_policies_guidelines from "../assets/exhibit/univ_policies_guidelines.png";
import university_code from "../assets/exhibit/university_code.png";
import syllabi from "../assets/exhibit/syllabi.png";
import student_handbook from "../assets/exhibit/student_handbook.png";
import admin_manual from "../assets/exhibit/admin_manual.png";
import OrgPic from "../assets/prog-und-survey/OrgPic.jpg";

const common = {};

common.roleOptions = [
  { id: 1, label: "Uploader" },
  { id: 2, label: "Viewer" },
  { id: 3, label: "Commenter" },
];

common.PUS = {
  span1: "PROGRAMS",
  span2: "UNDER",
  span3: "SURVEY",

  icon: OrgPic,
}

common.BSIT = {
  span1: "BACHELOR OF SCIENCE",
  span2: "IN",
  span3: "INFORMATION TECHNOLOGY",

  icon: OrgPic,
}

common.navItems = [
  { name: "Home", to: "/homepage", current: true },
  {
    name: "About PUP Lopez",
    to: "/aboutpage",
    dropdown: true,
    items: [
      { name: "Mission And Vision", to: "/missionvisionpage" },
      { name: "History", to: "/historypage" },
      { name: "Buildings and Facilities", to: "/facilitiespage" },
      { name: "Laboratory Videos", to: "/laboratorypage" },
      { name: "Offices Videos", to: "/officesvideopage" },

    ],
  },
  { name: "Certificate of Authenticity", to: "/certificate-of-authenticitypage" },
  {
    name: "Programs Under Survey",
    to: "/programs-under-survey",
    dropdown: true,
    items: [{ name: "BSIT", to: "/bsit" }],
  },
  {
    name: "Exhibit",
    to: "/exhibit",
    dropdown: true,
    items: [{ name: "Exhibit", to: "/exhibit" }],
  },
];

common.exhibitPaths = [
  {
    path: "/exhibit/citizens-charter",
    text: "Citizen's Charter",
    image: citizens_charter,
  },
  {
    path: "/exhibit/student-handbook",
    text: "Student Handbook",
    image: student_handbook,
  },
  {
    path: "/exhibit/university-code",
    text: "University Code",
    image: university_code,
  },
  {
    path: "/exhibit/university-policies-guidelines",
    text: "University Policies & Guidelines",
    image: univ_policies_guidelines,
  },
  {
    path: "/exhibit/administrative-manual",
    text: "Administrative Manual",
    image: admin_manual,
  },
  { path: "/exhibit/syllabi", text: "Syllabi", image: syllabi },
  {
    path: "/exhibit/instructional-materials",
    text: "Instructional Materials",
    image: instructional_mats,
  },
  { path: "/exhibit/cmo", text: "CMO 2015", image: cmo_2015 },
];

common.undersurvey = [
  {
    path: "/system-under-survey/citizens-charter",
    text: "Program Description",
    image: citizens_charter,
  },
  {
    path: "/system-under-survey/student-handbook",
    text: "Objectives of the Program",
    image: student_handbook,
  },
  {
    path: "/system-under-survey/university-code",
    text: "Areas under Survey",
    image: university_code,
  },
  {
    path: "/system-under-survey/university-policies-and-guidelines",
    text: "Program Video Promotion",
    image: univ_policies_guidelines,
  },
];

export default common;
