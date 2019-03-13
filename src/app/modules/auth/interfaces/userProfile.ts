/**
 * інтерфейс для об'єкту данних про користувача, що використовується при реєстрації
 */
export interface UserRegistrationInfo {
email: string;
password: string;
nickname: string;
first_name: string;
last_name: string;
phone: string;
gender_orientation: string;
city: string;
country: string;
date_of_birth_day: number;
date_of_birth_month: number;
date_of_birth_year: number;
}
