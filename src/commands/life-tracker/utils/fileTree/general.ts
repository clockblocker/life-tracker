import z from 'zod';
import {
	AspectSchema,
	DailyLeaveSchema,
	DDReprSchema,
	MMReprSchema,
	PlanStatsListSchema,
	Section,
	SectionSchema,
	YYYYReprSchema,
} from '../../../../types/file-structure-atoms';
import {
	StructureFromSection,
	LeaveSchemaFromAspect,
	structureFromSection,
} from '../../../../types/project-structure';

// export const test = [
// 	{
// 		folderId: [Section.Daily],
// 		folderNameSchema: Section.Daily,
// 		childFolders: [
// 			{
// 				folderId: 'Daily-YYYY',
// 				folderNameSchema: structureFromSection.Daily.pathParts[0],
// 				childFolders: [
// 					{
// 						folderId: 'Daily-YYYY-MM',
// 						folderNameSchema: structureFromSection.Daily.pathParts[1],
// 						childFolders: [
// 							{
// 								folderId: 'Daily-YYYY-MM-DD',
// 								folderNameSchema: structureFromSection.Daily.pathParts[2],
// 							},
// 						],
// 					},
// 				],
// 				managedChildLeaves: [],
// 				folderRootLeaf: {

//                 },
// 				rootFile: SectionSchema,
// 			},
// 		],
// 	},
// ];
