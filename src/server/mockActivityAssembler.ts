import type { Activity } from "../types/activity";

export async function getActivity(activityId: string): Promise<Activity> {
  return mockActivity(activityId);
}

export async function getActivitySection(
  activityId: string,
  sectionKey: string
) {
  const activity = mockActivity(activityId);
  return activity.sections.find(s => s.key === sectionKey) ?? null;
}

function mockActivity(activityId: string): Activity {
  return {
    id: activityId,
    title: "Taxiing",
    sections: [
      {
        key: "overview",
        label: "Overview",
        blocks: [
          {
            heading: "What",
            body:
              "The controlled movement of an airplane under its own power while on the surface."
          },
          {
            heading: "Why",
            body:
              "To safely move the airplane in the airport environment."
          }
        ]
      },
      {
        key: "checklist",
        label: "Checklist",
        blocks: [
          { heading: "Airport diagram - available"},
          { heading: "Brake check - Complete"},
          { heading: "Mixture - Set/Lean"}
        ]
      },
      {
        key: "notestopilot",
        label: "Notes to Pilot",
        blocks: [
          {
            heading: "Use of brakes",
            body:
              "Avoid riding the brakes. Reduce power before braking."
          }
        ]
      },
      {
        key: "commonerrors",
        label: "Common Errors",
        blocks: [
            {heading: "Off The Centerline", body: "Try to reset the pilot's visual reference by finding a mark on the cowling"}
        ]
      },
      {
        key: "teachingtips",
        label: "Teaching Tips",
        blocks: [
            {heading: "Airport Diagram - Available", body: "Ensure the pilot always has a current airport diagram out and ready to reference."}
        ]
      },
      {
        key: "alternateprocedures",
        label: "Alternate Procedures",
        blocks: [
            {heading: "Airport Diagram - Available", body: "Many EFB apps offer unofficial taxi diagrams..."}
        ]
      },
      {
  key: "prep",
  label: "Prep",
  blocks: [
    {
      table: {
        headers: ["Resource", "Description", "Link"],
        rows: [
          [
            "AFH-Taxiing (Ch 2.18-21) - FAA",
            "Read the section on Taxiing",
            `<a href="https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/airplane_handbook/03_afh_ch2.pdf#page=18">FAA Handbook</a>`
          ],
          [
            "ACS - Taxiing (p. 15)",
            "Checkride requirements for Taxiing",
            `<a href="https://www.faa.gov/sites/faa.gov/files/training_testing/testing/acs/private_airplane_acs_change_1.pdf#page=24">ACS PDF</a>`
          ],
          [
            "AOPA Runway Safety Resources",
            "Runway incursions prevention resources",
            `<a href="https://www.aopa.org/training-and-safety/air-safety-institute/safety-centers/runway-safety">AOPA Safety Center</a>`
          ]
        ]
      }
    }
  ]
},
{
  key: "regulatory",
  label: "Regulatory",
  blocks: [
    {
      heading: "Applies to Certification Levels",
      statusList: [
        { label: "Recreational Pilot Certificate", checked: true },
        { label: "Sport Pilot Certificate", checked: true },
        { label: "Private Pilot Certificate", checked: true },
        { label: "Unknown", checked: false }
      ]
    },
    {
      heading: "Mapped ACS Standards",
      linkGrid: [
        {
          text: "§61.107 - Flight Proficiency (B.ii. Preflight Procedures)",
          href: "#"
        },
        {
          text: "§61.93 - Solo Cross Country Requirements for Student Pilots (2.iii)",
          href: "#"
        },
        {
          text: "Private Pilot ACS - PA.II.D",
          href: "#"
        }
      ]
    }
  ]
}

    ]
  };
}
