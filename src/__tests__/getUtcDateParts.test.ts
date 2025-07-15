import { describe, it, expect } from 'vitest';
import { getMaybeDatePartsFromDate } from '../commands/life-tracker/utils/dates/general';

describe('getMaybeDatePartsFromDate', () => {
	it('returns zero-padded parts for regular date', () => {
		const date = new Date(Date.UTC(2024, 6, 9)); // July 9, 2024
		const result = getMaybeDatePartsFromDate(date);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data.yyyy).toBe('2024');
			expect(result.data.mm).toBe('07');
			expect(result.data.dd).toBe('09');
		}
	});

	it('handles double-digit day and month', () => {
		const date = new Date(Date.UTC(2024, 10, 12)); // Nov 12, 2024
		const result = getMaybeDatePartsFromDate(date);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data.mm).toBe('11');
			expect(result.data.dd).toBe('12');
		}
	});

	it('handles single-digit day and month', () => {
		const date = new Date(Date.UTC(2024, 0, 5)); // Jan 5, 2024
		const result = getMaybeDatePartsFromDate(date);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data.mm).toBe('01');
			expect(result.data.dd).toBe('05');
		}
	});

	it('handles ancient years < 1000', () => {
		const date = new Date(Date.UTC(42, 2, 3)); // March 3, year 0042
		date.setUTCFullYear(42); // JS hack to avoid year 1942
		const result = getMaybeDatePartsFromDate(date);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data.yyyy).toBe('0042');
			expect(result.data.mm).toBe('03');
			expect(result.data.dd).toBe('03');
		}
	});

	it('is UTC-aware', () => {
		const date = new Date(Date.UTC(2024, 0, 1, 23, 59)); // Jan 1, 2024 23:59 UTC
		const result = getMaybeDatePartsFromDate(date);
		expect(result.error).toBe(false);
		if (!result.error) {
			expect(result.data.yyyy).toBe('2024');
			expect(result.data.mm).toBe('01');
			expect(result.data.dd).toBe('01');
		}
	});
});
