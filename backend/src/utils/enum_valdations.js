const USER_ROLES = ['admin', 'stylist'];
const HAIR_CONDITIONS = ['frizzy', 'dry', 'oily', 'normal'];
const POROSITY_LEVELS = ['low', 'normal', 'high'];
const TREATMENT_HISTORIES = ['virgin', 'bleached', 'relaxed', 'colored'];
const DAMAGE_LEVELS = ['none', 'mild', 'moderate', 'severe'];
const CHEMICAL_CLASSES = ['oxidative', 'alkaline', 'reducing', 'acidic'];
const SAFETY_TIERS = ['safe_to_proceed', 'proceed_with_caution', 'do_not_proceed'];
const RECOMMENDATION_CATEGORIES = ['safe_to_proceed', 'proceed_with_caution', 'do_not_proceed'];

function isValidEnumValue(value, enumArray) {
  return enumArray.includes(value);
}
