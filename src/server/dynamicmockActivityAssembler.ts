import type { Activity } from "../types/activity";
import rawData from "../data/activities.json";

/**
 * Public API (unchanged)
 */
export async function getActivitySection(activityId: string, sectionKey: string) {
  const activity = await getActivity(activityId);
  return activity.sections.find(s => s.key === sectionKey) ?? null;
}

/**
 * Find an activity inside categories[]
 */
function findRawActivity(activityId: string) {
  for (const category of rawData.categories ?? []) {
    const found = category.activities?.find(a => a.id === activityId);
    if (found) {
      return found;
    }
  }
  return null;
}

/**
 * Build ONE Activity from nested JSON
 */
export async function getActivity(activityId: string): Promise<Activity> {
  const raw = findRawActivity(activityId);

  if (!raw) {
    throw new Error(`Activity not found: ${activityId}`);
  }

  var nameClean = raw.name.substring(raw.name.indexOf(":") + 1);

  const sections = [
    buildOverview(raw),
    // buildGroundPrep(raw),
    buildChecklist(raw),
    buildNotesToPilot(raw),
    buildTeachingTips(raw),
    buildAlternateProcedures(raw),
    buildCommonErrors(raw),
    // buildCompletionStandards(raw),
    buildRegulatory(raw),
    buildPrep(raw),
  ].filter(Boolean);

  return {
    id: raw.id,
    title: nameClean,
    sections,
  };
}
/* ============================
   SECTION BUILDERS
   ============================ */

function buildOverview(activity) {
  const simulatorContent = activity.checklistItems
    ?.map(item => item.simulator)
    .filter(Boolean)
    .join("<br/><br/>");

  return {
    key: "overview",
    label: "Overview",
    blocks: [
      { heading: "What", body: activity.what },
      { heading: "Why", body: activity.why },

      activity.groundPrep && {
        heading: "Ground Prep",
        body: activity.groundPrep,
      },

      simulatorContent && {
        heading: "Simulator",
        body: simulatorContent,
      },
    ].filter(Boolean),
  };
}

// function buildGroundPrep(activity) {
//   if (!activity.groundPrep) return null;

//   return {
//     key: "groundprep",
//     label: "Ground Prep",
//     blocks: [
//       {
//         list: activity.groundPrep
//           .split("\n")
//           .map(line => line.replace(/^- /, "").trim())
//           .filter(Boolean),
//       },
//     ],
//   };
// }

function buildChecklist(activity) {
  if (!activity.checklistItems?.length) return null;

  return {
    key: "checklist",
    label: "Checklist",
    blocks: activity.checklistItems
      .sort((a, b) => a.order - b.order)
      .map(item => ({
        heading: item.name,
        body: "",
      })),
  };
}


function buildNotesToPilot(activity) {
 const itemsWithNotes = activity.checklistItems.filter(
  i => i.notesToPilot?.trim() && i.notesToPilot.trim() !== "N  A"
);

  // Case 1: EVERYTHING is empty
  if (itemsWithNotes.length === 0) {
    return {
      key: "notestopilot",
      label: "Notes to Pilot",
      blocks: [
        {
          body: "This section is intentionally left blank.",
        },
      ],
    };
  }

  // Case 2: Some items have notes
  return {
    key: "notestopilot",
    label: "Notes to Pilot",
    blocks: itemsWithNotes.map(item => ({
      heading: item.name,
      body: item.notesToPilot,
    })),
  };
}



function buildTeachingTips(activity) {
  return {
    key: "teachingtips",
    label: "Teaching Tips",
    blocks: activity.checklistItems
      .filter(i => i.teachingTips)
      .map(item => ({
        heading: item.name,
        body: item.teachingTips,
      })),
  };
}

function buildAlternateProcedures(activity) {
 const itemsWithAltProcedures = activity.checklistItems.filter(
  i => i.alternateProcedures?.trim() && i.alternateProcedures.trim() !== "N/A"
);

 // Case 1: EVERYTHING is empty
  if (itemsWithAltProcedures.length === 0) {
    return {
      key: "alternateprocedures",
      label: "Alternate Procedures",
      blocks: [
        {
          body: "Write in with suggestions for alternate procedures!.",
        },
      ],
    };
  }

  // Case 2: Some items have notes
  return {
    key: "alternateprocedures",
    label: "Alternate Procedures",
    blocks: itemsWithAltProcedures.map(item => ({
      heading: item.name,
      body: item.alternateProcedures,
    }))
  };



  // return {
  //   key: "alternateprocedures",
  //   label: "Alternate Procedures",
  //   blocks: activity.checklistItems
  //     .filter(
  //       i => i.alternateProcedures && i.alternateProcedures !== "N/A"
  //     )
  //     .map(item => ({
  //       heading: item.name,
  //       body: item.alternateProcedures,
  //     })),
  // };
}

function buildCommonErrors(activity) {
  if (!activity.commonErrors?.length) return null;

  return {
    key: "commonerrors",
    label: "Common Errors",
    blocks: activity.commonErrors.map(err => ({
      heading: err.name,
      body: err.details,
    })),
  };
}

function buildCompletionStandards(activity) {
  if (!activity.completionStandards?.length) return null;

  return {
    key: "completionstandards",
    label: "Completion Standards",
    blocks: [
      {
        table: {
          headers: ["Grade", "Description"],
          rows: activity.completionStandards.map(cs => [
            cs.grade.toString(),
            cs.description,
          ]),
        },
      },
    ],
  };
}

function buildRegulatory(activity) {
  if (!activity.standards?.length) return null;

  return {
    key: "regulatory",
    label: "Regulatory",
    blocks: [
      {
        table: {
          headers: ["Standard", "Reference"],
          rows: activity.standards.map(s => [
            s.name,
            `<a href="${s.link}" target="_blank" rel="noopener">View</a>`,
          ]),
        },
      },
    ],
  };
}

function buildPrep(activity) {
  if (!activity.prepItems?.length) return null;

  return {
    key: "prep",
    label: "Prep",
    blocks: [
      {
        table: {
          headers: ["Resource", "Description", "Link"],
          rows: activity.prepItems
            .sort((a, b) => a.priority - b.priority)
            .map(p => [
              `${p.name} (${p.source})`,
              p.details ?? "",
              `<a href="${p.link}" target="_blank" rel="noopener">Open</a>`,
            ]),
        },
      },
    ],
  };
}
