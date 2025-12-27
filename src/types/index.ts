export interface PasswordOptions {
  length: number;
  includeNumbers: boolean;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeSpecial: boolean;
}

export interface CharacterSets {
  numbers: string[];
  lowercase: string[];
  uppercase: string[];
  special: string[];
}
