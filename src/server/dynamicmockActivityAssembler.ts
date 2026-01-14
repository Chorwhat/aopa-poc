import type { Activity } from "../types/activity";

//THE BELOW COMMENT BLOCK IS A SAMPLE FOR HOW I WOULD FETCH FROM SQL
// import sql from "mssql";

// // Example SQL Server config
// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_NAME,
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
// };

// export async function getActivity(activityId: string): Promise<Activity> {
//   const pool = await sql.connect(config);

//   // 1️⃣ Fetch ActivityTemplates row
//   const activityRes = await pool
//     .request()
//     .input("id", sql.VarChar, activityId)
//     .query(`
//       SELECT *
//       FROM ActivityTemplates
//       WHERE Id = @id
//     `);

//   if (activityRes.recordset.length === 0) throw new Error("Activity not found");
//   const activityRow = activityRes.recordset[0];

//   // 2️⃣ Fetch checklist items
//   const checklistRes = await pool
//     .request()
//     .input("activityId", sql.VarChar, activityId)
//     .query(`
//       SELECT *
//       FROM ActivityChecklistItem
//       WHERE ActivityTemplatesId = @activityId
//       ORDER BY Name
//     `);

//   const checklistItems = checklistRes.recordset;



export async function getActivitySection(activityId: string, sectionKey: string) {
  const activity = await getActivity(activityId);
  return activity.sections.find(s => s.key === sectionKey) ?? null;
}

export async function getActivity(activityId: string): Promise<Activity> {
 



  const activityRow = {
    Title: "Taxiing",
    info_what: "This is the info what",
    info_why: "This is the info why",
    ground_prep: "This is the ground prep"
  }



  const checklistItems = [
  {
    Id: 1,
    ActivityTemplatesId: '1234567890',
    name: 'Mixture',
    notestopilot: 'Check mixture settings',
    teaching_tips: 'Explain mixture',
    alternate_procedures: 'Alternate mixture'
  },
  {
    Id: 2,
    ActivityTemplatesId: '1234567890',
    name: 'Brakes',
    notestopilot: 'Avoid riding brakes',
    teaching_tips: 'Brake technique',
    alternate_procedures: 'Alternate brakes'
  }
]



  const sections = [
    {
      key: "overview",
      label: "Overview",
      blocks: [
        { heading: "What", body: activityRow.info_what },
        { heading: "Why", body: activityRow.info_why },
        { heading: "Ground Prep", body: activityRow.ground_prep },
      ],
    },
    {
      key: "checklist",
      label: "Checklist",
      blocks: checklistItems.map((item) => ({
        heading: item.name,
        body: "", 
      })),
    },
    {
      key: "notestopilot",
      label: "Notes to Pilot",
      blocks: checklistItems
        .filter((item) => item.notestopilot)
        .map((item) => ({
          heading: item.name,
          body: item.notestopilot,
        })),
    },
    {
      key: "teachingtips",
      label: "Teaching Tips",
      blocks: checklistItems
        .filter((item) => item.teaching_tips)
        .map((item) => ({
          heading: item.name,
          body: item.teaching_tips,
        })),
    },
    {
      key: "alternateprocedures",
      label: "Alternate Procedures",
      blocks: checklistItems
        .filter((item) => item.alternate_procedures)
        .map((item) => ({
          heading: item.name,
          body: item.alternate_procedures,
        })),
    },
    // ... regulatory, prep, commonerrors, etc. can be added similarly
  ];

  return {
    id: activityId,
    title: activityRow.Title,
    sections,
  };
}
