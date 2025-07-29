import {length} from './measures/length.js';
import {mass} from './measures/mass.js';


export function convert(value, unit) {
    return {
        value,
        unit,
        to: (targetUnit) => {
            const convertedValue = convertValue(value, unit, targetUnit);
            return convert(convertedValue, targetUnit);
        }
    };
}

function convertValue(value, fromUnit, toUnit) {
    const fromMeasure = getMeasure(fromUnit);
    const toMeasure = getMeasure(toUnit);

    if (!fromMeasure || !toMeasure || fromMeasure !== toMeasure) {
        return value;
    }

    const fromUnitEntry = findUnitInMeasure(fromMeasure, fromUnit);
    const toUnitEntry = findUnitInMeasure(toMeasure, toUnit);

    if (!fromUnitEntry || !toUnitEntry) {
        return value;
    }

    const fromRatio = fromUnitEntry.ratio;
    const toRatio = toUnitEntry.ratio;

    const baseValue = value / fromRatio;
    return baseValue * toRatio;
}

function getMeasure(unit) {
    if (findUnitInMeasure(length, unit)) {
        return length;
    } else if (findUnitInMeasure(mass, unit)) {
        return mass;
    }
    return null;
}

function findUnitInMeasure(measure, unit) {
    return measure.units.find(u =>
        u.names.includes(unit) ||
        (u.symbols && u.symbols.includes(unit))
    );
}