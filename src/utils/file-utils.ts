import { CutoffDay, DatePeriod, Year } from 'types/dates';
import { FullDatePeriodRepr, FullDateRepr } from 'types/file-structure';

/**
 * Converts a UTC Date into a `YYYY_MM_DD` representation.
 *
 * Uses zero-padded components:
 * - YYYY: 4-digit year
 * - MM: 2-digit month (01 = January, 12 = December)
 * - DD: 2-digit day
 *
 * @param date - The Date to format
 * @returns A string in the format `YYYY_MM_DD` (e.g., "2024_07_10")
 */
export const reprFromDate = (date: Date): FullDateRepr => {
	const yyyy = date.getUTCFullYear().toString().padStart(4, '0');
	const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0');
	const dd = date.getUTCDate().toString().padStart(2, '0');
	return `${yyyy}_${mm}_${dd}`;
};

/**
 * Converts a DatePeriod into a string representation of the form:
 * `YYYY_MM_DD__to__YYYY_MM_DD`
 *
 * Delegates formatting to `reprFromDate`.
 *
 * @param datePeriod - The DatePeriod to convert
 * @returns A FullDatePeriodRepr string
 */
export const reprFromDatePeriod = (
	datePeriod: DatePeriod
): FullDatePeriodRepr => {
	return `${reprFromDate(datePeriod.startIncl)}__to__${reprFromDate(datePeriod.endExl)}`;
};

const makeStructure = (year: Year, cuts: CutoffDay[]) => {
	const periods = [];
};

// LifeTracker/
//   Daily/
//     Daily-Root.md
//     yyyy/
//       Daily-yyyy-Root.md
//       mm/
//         Daily-yyyy_mm-Root.md
//         dd/
//           yyyy_mm_dd-Root.md
//           yyyy_mm_dd-Sport.md
//           yyyy_mm_dd-Food.md
//           yyyy_mm_dd-Money.md

//   Money/
//     Money-Root.md
//     PlanList/
//       Money-PlanList-Root.md
//       yyyy/
//         Money-PlanList-yyyy-Root.md
//         Money-Plan-yyyy_mm_dd__to__yyyy_mm_dd.md
//     StatsList/
//       Money-StatsList-Root.md
//       yyyy/
//         Money-StatsList-yyyy-Root.md
//         Money-Stats-yyyy_mm_dd__to__yyyy_mm_dd.md

//   Sport/
//     Sport-Root.md
//     PlanList/
//       Sport-PlanList-Root.md
//       yyyy/
//         Sport-PlanList-yyyy-Root.md
//         Sport-Plan-yyyy_mm_dd__to__yyyy_mm_dd.md
//     StatsList/
//       Sport-StatsList-Root.md
//       yyyy/
//         Sport-StatsList-yyyy-Root.md
//         Sport-Stats-yyyy_mm_dd__to__yyyy_mm_dd.md

//   Food/
//     Food-Root.md
//     PlanList/
//       Food-PlanList-Root.md
//       yyyy/
//         Food-PlanList-yyyy-Root.md
//         Food-Plan-yyyy_mm_dd__to__yyyy_mm_dd.md
//     StatsList/
//       Food-StatsList-Root.md
//       yyyy/
//         Food-StatsList-yyyy-Root.md
//         Food-Stats-yyyy_mm_dd__to__yyyy_mm_dd.md

//   Library/
//     Library-Root.md
//     Sport/
//       Library-Sport-Root.md
//       [NAME].md
//     Food/
//       Library-Food-Root.md
//       IngredientList/
//         Library-Food-IngredientList-Root.md
//         [NAME].md
//       MealList/
//         Library-Food-MealList-Root.md
//         [NAME].md
//     Money/
//       Library-Money-Root.md
//       [NAME].md
